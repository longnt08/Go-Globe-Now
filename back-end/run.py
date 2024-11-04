from app import create_app
from flask import send_from_directory

app = create_app()

@app.route('/users')
def show_users():
    print("Route /users được gọi")  # Debug
    return send_from_directory('front-end', 'testapi.html')

if __name__ == '__main__':
    print("Khởi động ứng dụng Flask...")  # Debug
    app.run(debug=True)
