from flask import Blueprint, request, jsonify

users_api = Blueprint('users_api', __name__)

# Giả sử bạn có một danh sách người dùng ở đây
users = {
    1: {"name": "Nguyễn Văn A", "email": "a@example.com"},
    2: {"name": "Trần Thị B", "email": "b@example.com"},
}
@users_api.route('/', methods=['GET'])
def get_users():
    return jsonify(users), 200

@users_api.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    # Kiểm tra xem người dùng có tồn tại không
    if user_id not in users:
        return jsonify({"message": "User not found"}), 404
    
    # Lấy dữ liệu từ yêu cầu
    data = request.get_json()

    # Cập nhật thông tin người dùng
    if 'name' in data:
        users[user_id]['name'] = data['name']
    if 'email' in data:
        users[user_id]['email'] = data['email']

    return jsonify({"message": "User updated", "user": users[user_id]}), 200
