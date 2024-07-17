from flask import Flask
from adapters.sqlite_adapter import SQLiteAdapter
from adapters.mockdb_adapter import MockDatabase

app = Flask(__name__)

app.config['SECRET_KEY'] = '123'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['TESTING'] = True

if app.config['TESTING'] == True:
    repository = MockDatabase()
else:
    repository = SQLiteAdapter()

from routes import routes
