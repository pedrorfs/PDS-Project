from flask import Flask 

import domain.user as user

app = Flask(__name__)

from routes import routes