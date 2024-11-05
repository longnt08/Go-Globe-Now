from click import password_option
from flask import Flask, Blueprint, jsonify
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)  # Khởi tạo ứng dụng Flask
api_routes_users = Blueprint('api_routes_users', __name__)

# Kết nối tới MongoDB
client = MongoClient("mongodb+srv://thanhlong:LTWNhom3@goglobenow.vroew.mongodb.net/?retryWrites=true&w=majority&appName=GoGlobeNow&tlsAllowInvalidCertificates=true")
db = client["people"]
users_collection = db["users"]

@api_routes_users.route('/users', methods=['GET'])
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

app.register_blueprint(api_routes_users)