from flask import Flask

education_app = Flask(__name__)

@education_app.route('/')
def display_greeting():
    return 'Hello, World!'

if __name__ == '__main__':
    education_app.run(debug=True)