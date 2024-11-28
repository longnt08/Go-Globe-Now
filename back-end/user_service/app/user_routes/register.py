from flask import Blueprint, request, jsonify
from app.db import get_db
import re, bcrypt
from datetime import datetime

register_user_blueprint = Blueprint('register_user', __name__)

db = get_db()
users_collection = db['users']

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

# đăng ký người dùng
@register_user_blueprint.route('/users/register', methods = ['POST'])
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

    except Exception as e:
        return jsonify({"message": str(e)}), 500