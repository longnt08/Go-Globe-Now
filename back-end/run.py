from app import create_app
from flask import Flask, render_template,send_from_directory

app = create_app()
app = Flask(__name__, template_folder='front-end/templates')


@app.route('/users')
def show_users():
    return render_template('testapi.html') 

if __name__ == '__main__':
    app.run(debug=True)
