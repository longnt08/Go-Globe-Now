from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# connect to MongoDB
client = MongoClient(os.getenv('MONGODB_URI'))

# connect to services db
def get_tour_db():
    db = client['services']

    return db

# connect to people db
def get_pp_db():
    db = client['people']

    return db