from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

api_routes = Blueprint('api_routes', __name__)

client = MongoClient("mongodb://localhost:27017/")
db = client.GoGlobeNow
tours_collection = db.tours

# API get tours to display in screen
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

# API filter tours
@api_routes.route('/api/tours', methods=['GET'])
def get_products():
    tours_cursor = tours_collection.find()

    min_price = request.args.get('min_price', default=0, type=int)
    max_price = request.args.get('max_price', default=float('inf'), type=int)
    category = request.args.get('category', default=None, type=str)

    # filter tours
    filtered_tours = [
        tour for tour in tours_cursor
        if (min_price <= tour['price'] <= max_price) and
        (category == "Tất cả" or tour['category'] == category)
    ]

    return jsonify(filtered_tours)