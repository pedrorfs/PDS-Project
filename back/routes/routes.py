from flask import abort, jsonify, request

from app import app, repository
from services.user_services import save_new_user
from domain.user import User
from domain.repository_interface import UserExists

@app.route('/api/user/new', methods=['POST'])
def create_user_route():
    # TODO: Validate json request data
    if request.content_type != 'application/json':
        abort(400)

    try:
        user = User(**request.json)
        save_new_user(user, repository)
    except UserExists as err:
        abort(409)
    except:
        abort(500)

    return jsonify('Success'), 201
