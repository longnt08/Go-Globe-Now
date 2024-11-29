from flask import Blueprint, jsonify, session

profile_user_blueprint = Blueprint('profile_user', __name__)

@profile_user_blueprint.route('/users/profile', methods=['GET'])
def get_profile():
    try:
        if 'user' in session:
            return jsonify(session['user']), 200
        else: 
            return jsonify({'message': 'You are not logged in'}), 401
    except Exception as e:
        return jsonify({'message': str(e)}), 500