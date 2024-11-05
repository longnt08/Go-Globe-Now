from flask import Flask, jsonify, Blueprint, g
from pymongo import MongoClient
from bson import ObjectId
from pymongo import MongoClient
import ssl

app = Flask(__name__)
api_routes_user = Blueprint('api_routes_user', __name__)

# Kết nối với MongoDB
client = MongoClient(
    "mongodb+srv://thanhlong:LTWNhom3@goglobenow.vroew.mongodb.net/?retryWrites=true&w=majority&appName=GoGlobeNow&tlsAllowInvalidCertificates=true"
)
db = client["people"]
user_collection = db["users"]

# Giả sử `id` đã được lưu trong g từ trước sau khi người dùng đăng nhập
@api_routes_user.before_request
def load_user_id():
    # Lấy id đã lưu từ một nguồn khác, ví dụ sau khi người dùng đăng nhập
    g.id = "6728901f28adda4546b857a0"  # Đặt id test tạm thời

# Định tuyến để lấy thông tin người dùng dựa trên ID đã lưu
@api_routes_user.route('/user', methods=['GET'])
def get_user():
    try:
        # Lấy id từ g.id
        user_id = g.get('id')
        print("User ID từ g:", user_id)  # Debug: kiểm tra ID

        if user_id:
            # Tạo ObjectId từ id lấy được
            obj_id = ObjectId(user_id)
            print("Object ID:", obj_id)  # Debug: kiểm tra ObjectId

            # Thực hiện truy vấn với MongoDB
            user = user_collection.find_one({"_id": obj_id})
            print("User tìm thấy:", user)  # Debug: kiểm tra user

            if user:
                user["_id"] = str(user["_id"])  # Chuyển đổi ObjectId thành chuỗi
                return jsonify(user), 200
            else:
                return jsonify({"error": "Không tìm thấy người dùng"}), 404
        else:
            return jsonify({"error": "Không tìm thấy ID người dùng trong ngữ cảnh"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

app.register_blueprint(api_routes_user)

if __name__ == '__main__':
    app.run(debug=True)
