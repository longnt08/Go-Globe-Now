from flask import Blueprint
from .login import login_user_blueprint
from .register import register_user_blueprint
from .logout import logout_user_blueprint
from .update_info import update_info_user_blueprint
from .get_info import get_info_user_blueprint

user_blueprint = Blueprint('user', __name__)

# dang ky cac blueprint
user_blueprint.register_blueprint(login_user_blueprint)
user_blueprint.register_blueprint(register_user_blueprint)
user_blueprint.register_blueprint(logout_user_blueprint)
user_blueprint.register_blueprint(update_info_user_blueprint)
user_blueprint.register_blueprint(get_info_user_blueprint)