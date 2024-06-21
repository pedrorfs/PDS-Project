from flask import request
from app import app, repository

import domain.user as user, adapters.SQLITE3_repository as SQLITE3_repository

@app.route('/api/user/new', methods=['POST'])
def create_user_route():
    # TODO: Validate json request data
    user.User(**request.json).persist(repository)
    return 'Success', 201


@app.route('/')
def index():
    return "Hello World!!!!!"