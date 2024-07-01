from flask import Flask

app = Flask(__name__)

app.config['SECRET_KEY'] = '123'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

from routes import routes
