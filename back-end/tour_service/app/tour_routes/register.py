from flask import Blueprint, request, jsonify
from app.db import get_tour_db, get_pp_db
from bson import ObjectId

register_tour_blueprint = Blueprint('register_tour', __name__)

tour_db = get_tour_db()
people_db = get_pp_db()

registration_tours = tour_db['registration_tours']
tours_collection = tour_db['available_tours']
users_collection = people_db['users']

# register tours
@register_tour_blueprint.route('/tours/register_tour', methods=["POST"])
def register_tour():
    try:
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

        tour_id = data['tour_id']
        user_id = data['user_id']

        # save tour id to registered tours in users collection
        users_collection.update_one(
            {"_id": ObjectId(user_id), "registered_tours": {"$exists": False}},
            {"$set": {"registered_tours": []}}
        )
        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"registered_tours": tour_id}}
        )

        if result.modified_count > 0 or result.upserted_id:
            users_collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$pull": {"saved_tours": tour_id}}  # Xóa tour_id khỏi saved_tours nếu tồn tại
            )
            return jsonify({'success': 'Tour registered successfully'}), 200
        else:
            return jsonify({'message': 'Tour already registered'}), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
# get registered tours
@register_tour_blueprint.route('/tours/get_registered_tours', methods=['GET'])
def get_register_tours():
    try:
        user_id = request.args.get('user_id')

        user = users_collection.find_one({'_id': ObjectId(user_id)})
        registered_tours_id = user['registered_tours']

        if registered_tours_id:
            registered_tours = []

            for tour_id in registered_tours_id:
                registered_tour = registration_tours.find_one({'tour_id': ObjectId(tour_id)})
                tour = tours_collection.find_one({'_id': ObjectId(tour_id)})

                result = {}

                result['startDate'] = registered_tour['startDay']
                result['name'] = tour['name']
                result['img'] = tour['img']
                result['price'] = tour['price']

                registered_tours.append(result)
            
            return jsonify(registered_tours)
        else:
            return jsonify({'_id': 'Chua co tour nao duoc dang ky'}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500