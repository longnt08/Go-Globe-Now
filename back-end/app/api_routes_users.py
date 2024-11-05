import bcrypt
from flask import Blueprint, jsonify, request, session
from pymongo import MongoClient
from bson import ObjectId
import re
from datetime import datetime

user_routes = Blueprint('user_routes', __name__)

client = MongoClient("mongodb+srv://thanhlong:LTWNhom3@goglobenow.vroew.mongodb.net/?retryWrites=true&w=majority&appName=GoGlobeNow")
db = client.people
users_collection = db.users

# email_format_validation
def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None

# strong_password_measurement
def is_strong_password(password):
    return (
        len(password) >= 8 and
        re.search(r"[A-Z]", password) and
        re.search(r"[a-z]", password) and
        re.search(r"[0-9]", password) and
        re.search(r"[!@#$%^&*(),.?\":{}|<>]", password)
    )

@user_routes.route('/users/register', methods = ['POST'])
def register():
    try:
        # Receive user registration info under json.
        user_data = request.get_json()

        # Information validation
        if not user_data or "username" not in user_data or "password" not in user_data:
            return jsonify({"message": "Invalid input"}), 400

        # email_format_validation
        if not is_valid_email(user_data["email"]):
            return jsonify({"message": "Invalid email format."}), 400

        # password_strength
        if not is_strong_password(user_data["password"]):
            return jsonify({"message": "Password must be at least 8 "
                                       "characters long and contain "
                                       "uppercase, lowercase, numbers, "
                                       "and special characters."})

        if user_data.get("gender") not in ["Nam", "Nữ", "Khác"]:
            return jsonify({"message": "Invalid gender value. Please select 'male', 'female', or 'other'."}), 400

        phone_pattern = r'^\d{10,15}$'
        if not re.match(phone_pattern, user_data["phone"]):
            return jsonify({"message": "Invalid phone number format. Should be between 10 and 15 digits."}), 400

        # username_existence_check
        existing_user = users_collection.find_one({"username": user_data["username"]})
        existing_email = users_collection.find_one({"email": user_data["email"]})
        if existing_user:
            return jsonify({"message": "User already exists."}), 400
        if existing_email:
            return jsonify({"message": "Email already exists."}), 400

        # password_encryption
        hashed_password = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
        # overwrite_input_password_with_encrypted_one
        user_data["password"] = hashed_password

        # dob_validation
        dob_str = user_data["dob"]
        try:
            # covert_to_dmy_and_re-assign
            user_data["dob"] = datetime.strptime(dob_str, "%d-%m-%Y")
        except ValueError:
            return jsonify({"message": "Invalid date format. Please use DD-MM-YYYY"}), 400

        # Inserting into MongoDB
        result = users_collection.insert_one(user_data)
        return jsonify({"message": "User registered successfully",
                        "user_id": str(result.inserted_id),
                        "login_url": "http://127.0.0.1:5500/front-end/login.html"}), 201

        # This "return jsonify()" is the final result (namely data) after successfully
        # executing the register() function.

        # Inside which there is a "login_url" json key that JavaScript could fetch the value from.

        # The URL to the login.html must be like shown (copied straight from the browser
        # where VS Code is showing the preview, and it's on another port, different from
        # the server port)

    except Exception as e:
        return jsonify({"message": str(e)}), 500

@user_routes.route('/users/login', methods = ['GET', 'POST'])
def login():
    try:
        credentials = request.get_json()

        if not credentials or "username" not in credentials or "password" not in credentials:
            return jsonify({"message": "Invalid input."}), 400

        username = credentials["username"]
        password = credentials["password"]

        user = users_collection.find_one({"username": username})

        if user and bcrypt.checkpw(password.encode('utf-8'), user["password"]):
            session["user_id"] = str(user["_id"])
            session["username"] = user["username"]
            return jsonify({"message": "Login successful", "user_id": str(user["_id"])})
        else:
            return jsonify({"message": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"message": str(e)}), 500

@user_routes.route('/users/logout', methods = ['POST'])
def logout():
    try:
        session.clear()
        return jsonify({"message": "Log out successful"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@user_routes.route('/users/profile', methods = ['GET'])
def profile():
    if "user_id" in session:
        return jsonify({"message": "User is logged in", "user_id": session["user_id"]}), 200
    else:
        return jsonify({"message": "User not logged in."}), 401
    
@user_routes.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    # Kiểm tra xem người dùng có tồn tại không
    user = users_collection.find_one({"_id": ObjectId(user_id)})  # Sử dụng ObjectId để tìm
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    # Lấy dữ liệu từ yêu cầu
    data = request.get_json()

    # Cập nhật thông tin người dùng
    if 'name' in data:
        users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"name": data['name']}})
    if 'email' in data:
        users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"email": data['email']}})

    # Lấy thông tin người dùng đã cập nhật
    updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
    return jsonify({"message": "User updated", "user": updated_user}), 200

@user_routes.route('/', methods=['GET'])
def get_users():
 # Debug
    users = list(users_collection.find({}))
    for user in users:
        user['_id'] = str(user['_id'])  # Chuyển đổi ObjectId thành chuỗi
        for key, value in user.items():
            if isinstance(value, bytes):
                user[key] = value.decode('utf-8')
    print(f"Users: {users}")  # Debug
    return jsonify(users), 200

@user_routes.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()  # Nhận dữ liệu từ yêu cầu
    new_user = {
        "name": data['name'],
        "email": data['email'],
    }
    users_collection.insert_one(new_user)  # Thêm người dùng mới vào collection
    new_user['_id'] = str(new_user['_id'])  # Chuyển đổi ObjectId thành chuỗi để trả về
    return jsonify({"message": "User added", "user": new_user}), 201

@user_routes.route('/users', methods=['GET'])
def get_users():
    try:
        user = users_collection.find_one({"_id": ObjectId("6729721febc570436d090332")},{"password": 0})
        if user:
            user["_id"] = str(user["_id"])
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500