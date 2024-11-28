from flask import Blueprint, request, jsonify
from flask_session import Session

logout_user_blueprint = Blueprint('logout_user', __name__)

@logout_user_blueprint.route('/users/logout', methods = ['GET'])
def logout():
    try:
        Session.clear()
        return jsonify({"message": "Log out successful"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500