from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from .api_routes_search import search_api

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.secret_key = 'ptranvanh'
    app.register_blueprint(search_api, url_prefix='/api')
    return app
