from flask import Flask, request, jsonify, make_response
import os
from dotenv import load_dotenv
import jwt
import datetime
from functools import wraps

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

users = [{"username": "admin", "password": "admin"}]
educational_contents = [{"id": 1, "title": "The Solar System", "content": "Details about the Solar System."}]
ar_experiences = [{"id": 1, "title": "Solar System AR", "url": "https://example.com/solar-system"}]

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')  

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(*args, **kwargs)
    
    return decorated

@app.route('/login', methods=['POST'])
def login():
    auth = request.form

    if not auth or not auth.get('username') or not auth.get('password'):
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm ="Login required!"'})

    user = next((x for x in users if x["username"] == auth.get('username') and x["password"] == auth.get('password')), None)

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm ="User doesn\'t exist!"'})

    token = jwt.encode({'user': auth.get('username'), 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
    
    return jsonify({'token': token})

@app.route('/education', methods=['GET'])
@token_required
def get_educational_content():
    return jsonify({'educational_contents': educational_contents})

@app.route('/education', methods=['POST'])
@token_required
def add_educational_content():
    data = request.json
    new_content = {"id": len(educational_contents) + 1, "title": data['title'], "content": data['content']}
    educational_contents.append(new_content)
    return jsonify(new_content), 201

@app.route('/ar-experiences', methods=['GET'])
@token_required
def get_ar_experiences():
    return jsonify({'ar_experiences': ar_experiences})

@app.route('/ar-experiences', methods=['POST'])
@token_required
def add_ar_experience():
    data = request.json
    new_ar_experience = {"id": len(ar_experiences) + 1, "title": data['title'], "url": data['url']}
    ar_experiences.append(new_ar_experience)
    return jsonify(new_ar_experience), 201

if __name__ == '__main__':
    app.run(debug=True)