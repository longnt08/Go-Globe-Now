from flask_cors import CORS
from flask import Flask
from .api_routes import api_routes

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api_routes)
    
    return app