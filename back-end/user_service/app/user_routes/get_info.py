from flask import Blueprint, jsonify
from app.db import get_db
from bson import ObjectId

get_info_user_blueprint = Blueprint('get_info_user', __name__)

db = get_db()
users_collection = db['users']

@get_info_user_blueprint.route('/users/<id>', methods=['GET'])
def get_users(id):
    try:
        user = users_collection.find_one({"_id": ObjectId(id)})
        if user:
            user["_id"] = str(user["_id"])
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500