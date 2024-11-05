from flask import Blueprint, jsonify, request, session
from pymongo import MongoClient
from bson import ObjectId

tour_routes = Blueprint('tour_routes', __name__)

client = MongoClient("mongodb+srv://thanhlong:LTWNhom3@goglobenow.vroew.mongodb.net/?retryWrites=true&w=majority&appName=GoGlobeNow")
db = client.services
tours_collection = db.available_tours
registration_tours = db.registration_tours

# get all tours to display in screen
@tour_routes.route('/tours', methods=['GET'])
def get_all_tour():
    # query all tours from mongoDB
    tours_cursor = tours_collection.find()

    tours = [
        {
            "_id": str(tour["_id"]),
            "name": tour['name'],
            'price': tour['price'],
            'category': tour['category'],
            'img': tour['img']
        }
        for tour in tours_cursor
    ]

    return jsonify(tours)

# filter tours
@tour_routes.route('/tours/filter_tours', methods=['GET'])
def filter_tours():
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

# get tour details
@tour_routes.route('/tours/<tour_id>', methods=['GET'])
def get_tour_details(tour_id):
    tour = tours_collection.find_one({"_id": ObjectId(tour_id)})
    if tour:
        tour["_id"] = str(tour["_id"])
        return jsonify(tour)
    else:
        return jsonify({"error": "Tour not found"}), 404
    
# handle tour registration
@tour_routes.route('/tours/register_tour', methods=["POST"])
def register_tour():
    data = request.json

    registration = {
        "tour_id": ObjectId(data["tour_id"]),
        "name": data["name"],
        "gender": data['gender'],
        "birthday": data['birthday'],
        "phone": data["phone"],
        "email": data["email"],
        "cccd": data["cccd"],
        "address": data["address"],
        "numPeople": int(data["numPeople"]),
        "startDay": data['startDay']
    }

    # save data to mongoDB
    registration_tours.insert_one(registration)

    return jsonify({"message": "Tour registered successfully"})