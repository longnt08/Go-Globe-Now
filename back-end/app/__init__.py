from flask import Flask
from flask_cors import CORS
from .api_routes_search import search_api
from .api_routes_users import user_routes
from .api_routes_tours import tour_routes
from flask_session import Session

def create_app():
    app = Flask(__name__)
    app.secret_key = "e38a247a9d69d5e2a3300ef93dfadbbd8a25994af9cba660db61b523e37b71b7"

    app.config["SESSION_TYPE"] = "filesystem"
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_USE_SIGNER'] = True

    Session(app)
    CORS(app, supports_credentials=True, origins = ["http://127.0.0.1:5500"])

    app.register_blueprint(search_api, url_prefix='/api')
    app.register_blueprint(user_routes)
    app.register_blueprint(tour_routes)
    
    return app