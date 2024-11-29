from flask import Blueprint, session, jsonify

logout_user_blueprint = Blueprint('logout_user', __name__)

@logout_user_blueprint.route('/users/logout', methods = ['GET'])
def logout():
    try:
        if 'user' in session:
            session.pop('user', None)
            session['is_logged_in'] = False

            return jsonify({'message': 'Logout successfully'}), 200
        else:
            return jsonify({'message': 'You are not logged in'}), 401
    except Exception as e:
        return jsonify({"message": str(e)}), 500