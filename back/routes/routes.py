from flask import request
from app import app, repository
from services.user_services import save_new_user

from domain.user import User

@app.route('/api/user/new', methods=['POST'])
def create_user_route():
    # TODO: Validate json request data
    user = User(**request.json)
    
    save_new_user(user, repository)
    return 'Success', 201


@app.route('/')
def index():
    return "Hello World!"