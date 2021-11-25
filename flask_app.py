from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/register_page', methods=['GET'])
def register_page():
    render_template('register_page.html')


@app.route('/map_page', methods=['GET'])
def register_page():
    render_template('map_page.html')
