from flask import Flask 

import domain.user as user, back.adapters.sqlite_adapter as sqlite_adapter

app = Flask(__name__)

repository = sqlite_adapter.SQLiteAdapter()

from routes import routes
