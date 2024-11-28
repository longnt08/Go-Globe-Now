from flask import Blueprint, request, jsonify
from app.db import get_tour_db
from bson import ObjectId

get_tour_blueprint = Blueprint('get_tour', __name__)

db = get_tour_db()
tours_collection = db['available_tours']

# get tour details
@get_tour_blueprint.route('/tours/<tour_id>', methods=['GET'])
def get_tour_details(tour_id):
    try:
        tour = tours_collection.find_one({"_id": ObjectId(tour_id)})
        if tour:
            tour["_id"] = str(tour["_id"])
            return jsonify(tour), 200
        else:
            return jsonify({"error": "Tour not found"}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
# get all tours 
@get_tour_blueprint.route('/tours', methods=['GET'])
def get_all_tour():
    try:
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
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
# filter tours
@get_tour_blueprint.route('/tours/filter_tours', methods=['GET'])
def filter_tours():
    try:
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

        return jsonify(filtered_tours), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500