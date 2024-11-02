from app import create_app
from flask import make_response

app = create_app()
@app.after_request
def apply_csp(response):
    response.headers['Content-Security-Policy'] = "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;"
    return response

if __name__ == '__main__':
    app.run(debug=True)