from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

api_routes = Blueprint('api_routes', __name__)

client = MongoClient("mongodb://localhost:27017/")
db = client.GoGlobeNow
tours_collection = db.tours

# API get tours
@api_routes.route('/api/tours', methods=['GET'])
def get_all_tour():
    # query all tours from mongoDB
    tours_cursor = tours_collection.find()

    tours = [
        {
            "id": str(tour["_id"]),
            "name": tour['name'],
            'price': tour['price'],
            'category': tour['category'],
            'img': tour['img']
        }
        for tour in tours_cursor
    ]

    return jsonify(tours)