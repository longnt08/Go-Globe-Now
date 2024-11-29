from flask import Flask
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
from redis import Redis
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    # secret key
    app.secret_key = os.getenv('SECRET_KEY')

    # cau hinh Session
    app.config["SESSION_TYPE"] = 'redis'
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_USE_SIGNER'] = True
    app.config['SESSION_COOKIE_NAME'] = 'session'
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_REDIS'] = Redis(host='localhost', port=6379, db=0)
    Session(app)

    # cau hinh CORS
    CORS(app, supports_credentials=True, origins=['http://127.0.0.1:5500'])
    
    # dang ky blueprint tu user
    from .user_routes import user_blueprint
    app.register_blueprint(user_blueprint)

    return app