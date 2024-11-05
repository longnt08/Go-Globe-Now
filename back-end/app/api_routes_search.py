from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import re
import os

# Kết nối với MongoDB
client = MongoClient("mongodb+srv://thanhlong:LTWNhom3@goglobenow.vroew.mongodb.net/")
db = client.services 
search_api = Blueprint('search_api', __name__)

@search_api.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    keyword = data.get('keyword')
    if not keyword:
        return jsonify({"message": "Keyword is required"}), 400

    # Tìm kiếm các thông tin gần nhất với từ khóa trong MongoDB
    regex = re.compile(f'.*{re.escape(keyword)}.*', re.IGNORECASE)
    results = list(db.available_tours.find({  # Thay thế 'available_tours' bằng tên collection của bạn
        "$or": [
            {"name": regex},
            {"category": regex},
            {"destination": regex}
        ]
    }))

    # Chuyển đổi ObjectId thành chuỗi để trả về JSON hợp lệ
    for result in results:
        result['_id'] = str(result['_id'])

    return jsonify(results), 200
