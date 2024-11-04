from flask_cors import CORS
from flask import Flask
from .api_routes import api_routes
from .api_routes_users import api_routes
from flask_session import Session

def create_app():
    app = Flask(__name__)
    app.secret_key = "your_secret_key"

    # Configure session stored on the server-side.
    app.config["SESSION_TYPE"] = "filesystem"
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_USE_SIGNER'] = True

    Session(app)

    CORS(app)
    app.register_blueprint(api_routes)

    return app