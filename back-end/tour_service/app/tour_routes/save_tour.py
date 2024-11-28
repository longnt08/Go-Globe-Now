from flask import Blueprint, request, jsonify
from app.db import get_tour_db, get_pp_db
from bson import ObjectId

save_tour_blueprint = Blueprint('save_tour', __name__)

tour_db = get_tour_db()
people_db = get_pp_db()

registration_tours = tour_db['registration_tours']
tours_collection = tour_db['available_tours']
users_collection = people_db['users']

# save tour
@save_tour_blueprint.route('/tours/save_tour', methods=['POST'])
def save_tour():
    try:
        data = request.get_json()

        if not data or 'user_id' not in data or 'tour_id' not in data:
            return jsonify({'message': 'Invalid input'}), 400
        
        user_id = data['user_id']
        tour_id = data['tour_id']

        # add tour_id to tour_saved field in users collection
        # Đảm bảo rằng `tour_saved` là một mảng
        users_collection.update_one(
            {"_id": ObjectId(user_id), "saved_tours": {"$exists": False}},
            {"$set": {"saved_tours": []}}
        )

        # Sau khi xác nhận `tour_saved` là mảng, thêm `tour_id` vào
        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"saved_tours": tour_id}}
        )

        if result.modified_count > 0 or result.upserted_id:
            return jsonify({'success': 'Tour save successfully'}), 200
        else:
            return jsonify({'message': 'Tour already saved'}), 200
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
# get saved tour
@save_tour_blueprint.route('/tours/get_saved_tours', methods=['GET'])
def get_saved_tours():
    try:
        user_id = request.args.get('user_id')

        user = users_collection.find_one({"_id": ObjectId(user_id)})
        tours_id = user['saved_tours']
        if tours_id:
            saved_tours = []

            for tour_id in tours_id:
                saved_tour = tours_collection.find_one({"_id": ObjectId(tour_id)})
                saved_tour['_id'] = str(saved_tour['_id'])
                saved_tours.append(saved_tour)
        
            return jsonify(saved_tours)
        else:
            return jsonify({'message': "Chua co tour nao duoc luu"}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
#delete saved tour 
@save_tour_blueprint.route('/tours/delete_saved_tour', methods=['PUT'])
def delete_saved_tour():
    try:
        id_data = request.get_json()

        if 'user_id' not in id_data or 'tour_id' not in id_data:
            return jsonify({'message': 'Invalid input'}), 400

        user_id = id_data['user_id']
        tour_id = id_data['tour_id']

        result = users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"saved_tours": tour_id}}
        )

        if result.modified_count > 0:
            return jsonify({'success': 'Tour has been removed successfully'}), 200
        else:
            return jsonify({'message': 'Something went wrong'}), 404

    except Exception as e:
        return jsonify({'message': str(e)}), 500