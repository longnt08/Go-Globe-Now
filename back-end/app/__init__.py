from flask import Flask
from .api_routes_users import users_api

def create_app():
    app = Flask(__name__)

    # Đăng ký blueprint
    app.register_blueprint(users_api, url_prefix='/api/users')

    return app
