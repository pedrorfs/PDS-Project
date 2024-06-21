from flask import Flask 

import domain.user as user, adapters.SQLITE3_repository as SQLITE3_repository

app = Flask(__name__)

repository = SQLITE3_repository.UserRepositorySQLite()

from routes import routes