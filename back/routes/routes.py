from flask import jsonify, request, session

from app import app, repository
from services.user_services import *
from domain.user import User
from domain.repository_interface import UserExists

@app.route('/api/user/new', methods=['POST'])
def create_user_route():
    try:
        # TODO: Validate json request data
        #user = User.schema().loads(request.json)
        user = User(**request.json)
        save_new_user(user, repository)
    except UserExists:
        return jsonify({'msg': 'User already exists'}), 409
    except Exception:
        return jsonify({'msg': 'Server error'}), 500

    return jsonify({'msg': 'User successfully created'}), 201

@app.route('/api/login', methods=['POST', 'DELETE'])
def login_route():
    match request.method:
        case 'POST':
            session.clear()
            cpf = request.json['cpf']
            password = request.json['password']
            user_id = validate_credentials(cpf, password, repository)
            if user_id >= 0:
                session['current_user'] = user_id
                return jsonify({'msg': 'Validated successfully'}), 200
            return jsonify({'msg': 'User not found'}), 401
        case 'DELETE':
            session.clear()
            return jsonify({'msg': 'Authorization revoked'}), 200

    return jsonify({'msg': 'Authentication failed'}), 401

@app.route('/api/user', methods=['GET'])
def user_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401

    user = get_user_by_id(user_id, repository)
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    return jsonify({'msg': 'User successfully fetched', 'data': user.__dict__}), 200

@app.route('/api/user/update', methods=['PUT'])
def update_user_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401

    try:
        user = User(**request.json)
        edit_user_data(user_id, user, repository)
    except UserNotFound:
        return({'msg': 'User not found'}), 404
    except Exception:
        return({'msg': 'Update failed'}), 500

    return jsonify({'msg': 'User successfully updated'}), 200


@app.route('/api/user/delete', methods=['DELETE'])
def delete_user_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401

    try:
        delete_user(user_id, repository)
    except UserNotFound:
        return({'msg': 'User not found'}), 404
    except Exception:
        return({'msg': 'Update failed'}), 500

    return jsonify({'msg': 'User successfully removed'}), 200

@app.route('/api/user/balance', methods=['PATCH'])
def add_balance_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401
    
    balance = request.json['balance']
    try:
        add_balance(user_id, balance,  repository)
    except UserNotFound:
        return({'msg': 'User not found'}), 404
    except Exception:
        return({'msg': 'Update failed'}), 500

    return jsonify({'msg': 'Balance added to account'}), 200
