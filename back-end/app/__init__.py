from flask import Flask
from flask_cors import CORS
from .api_routes_search import search_api
from .api_routes_users import user_routes

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(search_api, url_prefix='/api')
    app.register_blueprint(user_routes)
    return app
