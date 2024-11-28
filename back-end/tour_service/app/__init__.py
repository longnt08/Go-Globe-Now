from flask import Flask
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
import os
from .tour_routes import tour_blueprint

# nap bien tu .env
load_dotenv()

def create_app():
    app = Flask(__name__)

    # secret key
    app.secret_key = os.getenv('SECRET_KEY')

    # cau hinh session
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_USE_SIGNER'] = True
    Session(app)

    # cau hinh CORS
    CORS(app, supports_credentials=True, origins=['http://127.0.0.1:5500'])
    
    # dang ky blueprint tu tour
    app.register_blueprint(tour_blueprint)

    return app