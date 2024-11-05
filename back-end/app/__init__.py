from flask_cors import CORS
from flask import Flask
from .api_routes import api_routes
from .api_routes_users import api_routes_user

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api_routes)
    app.register_blueprint(api_routes_user)
    
    return app