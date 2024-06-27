from flask import Flask

from adapters.sqlite_adapter import SQLiteAdapter

app = Flask(__name__)

app.config['SECRET_KEY'] = '123'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

repository = SQLiteAdapter()

from routes import routes
