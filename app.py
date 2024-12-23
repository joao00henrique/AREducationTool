# views.py
from flask import Blueprint

main = Blueprint('main', __name__)

@main.route('/')
def display_greeting():
    return 'Hello, World!'
```

```python
from flask import Flask
from views import main  # Make sure this import points correctly to your views.py

education_app = Flask(__name__)
education_app.register_blueprint(main)

if __name__ == '__main__':
    education_app.run(debug=True)
```

```python
# app.py or wherever you decide to have your Flask application factory

from flask import Flask

def create_app(config_filename=None):
    app = Flask(__name__)
    from views import main
    app.register_blueprint(main)
    
    return app
```

```python
from yourapplicationfolder import create_app

if __name__ == '__main__':
    education_app = create_app()
    education_app.run(debug=True)