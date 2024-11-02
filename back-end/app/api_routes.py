from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson import ObjectId

api_routes = Blueprint('api_routes', __name__)

client = MongoClient("mongodb+srv://thanhlong:LTWNhom3@goglobenow.vroew.mongodb.net/?retryWrites=true&w=majority&appName=GoGlobeNow")
db = client.services
tours_collection = db.available_tours

# API get tours to display in screen
@api_routes.route('/tours', methods=['GET'])
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
@api_routes.route('/tours/filter_tours', methods=['GET'])
def get_products():
    tours_cursor = tours_collection.find()

    min_price = request.args.get('min_price', default=0, type=int)
    max_price = request.args.get('max_price', default=float('inf'), type=int)
    category = request.args.get('category', default="all", type=str)

    # filter tours
    filtered_tours = [
        {
            **tour, 
            "_id": str(tour["_id"])
        }
        for tour in tours_cursor
        if (min_price <= tour['price'] <= max_price) and
           (category == "all" or tour['category'] == category)
    ]

    return jsonify(filtered_tours)