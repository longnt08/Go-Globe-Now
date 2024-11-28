from flask import Blueprint, request, jsonify
from app.db import get_db
from bson import ObjectId

update_info_user_blueprint = Blueprint('update_info_user', __name__)

db = get_db()
users_collection = db['users']

@update_info_user_blueprint.route('/users/update_user', methods=['PUT'])
def update_user():
    try:
        changed_info = request.get_json()

        user_id = changed_info['user_id']

        update_fields = {
            "first_name": changed_info.get('first_name'),
            "last_name": changed_info.get('last_name'),
            "gender": changed_info.get('gender'),
            "dob": changed_info.get('birthday'),
            "phone": changed_info.get('phone'),
            "email": changed_info.get('email'),
            "address": changed_info.get('address')
        }

        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_fields}
        )

        if result.modified_count > 0:
            return jsonify({'success': 'User updated successfully'}), 200
        else:
            return jsonify({'message': 'Some thing went wrong, please check your change info'}), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 500