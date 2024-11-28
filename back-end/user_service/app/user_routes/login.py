from flask import Blueprint, request, jsonify
from app.db import get_db
import bcrypt

db = get_db()
users_collection = db['users']

login_user_blueprint = Blueprint('login_user', __name__)

@login_user_blueprint.route('/users/login', methods = ['POST'])
def login():
    try:
        credentials = request.get_json()

        if not credentials or "username" not in credentials or "password" not in credentials:
            return jsonify({"message": "Invalid input."}), 400

        username = credentials["username"]
        password = credentials["password"]

        user = users_collection.find_one({"username": username})

        if user and bcrypt.checkpw(password.encode('utf-8'), user["password"]):
            return jsonify({
                "message": "Login successful", 
                "user_id": str(user["_id"]),
                "username": user['username']
                })
        else:
            return jsonify({"message": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"message": str(e)}), 500