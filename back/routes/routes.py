from flask import request, jsonify, session
import sqlite3

from app import app, repository
from services.user_services import *
from domain.user import User
from domain.stock import Stock
from domain.repository_interface import UserExists

@app.route('/api/user/new', methods=['POST'])
def create_user_route():
    try:
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
    user.balance = user.balance/100
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
    
    balance = int(request.json['balance'] * 100)
    try:
        add_balance(user_id, balance,  repository)
    except UserNotFound:
        return({'msg': 'User not found'}), 404
    except Exception:
        return({'msg': 'Update failed'}), 500
    
    return jsonify({'msg': 'Balance added to account'}), 200

@app.route('/api/user/favorite', methods=['POST', 'PATCH'])
def add_favorite_stock_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401
    try:
        data = request.json
        if not all(k in data for k in ('code', 'name')):
            return 'Dados inválidos!', 400
        
        stock = Stock(data['code'], data['name'])
        repository.add_favorite_stock(user_id, stock)
        return jsonify({"msg": "Success"}), 201
    
    except sqlite3.Error as err:
        return jsonify({'msg': f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}'}), 500

@app.route('/api/user/favorites', methods=['GET'])
def list_favorites_stocks_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401
    try:
        favorites = repository.list_favorites_stocks(user_id)
        response = [{'Code': item['code'], 'Name': item['name']} for item in favorites]
        return jsonify({'data': response}), 200
        
    except sqlite3.Error as err:
        return jsonify({'msg': f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}'}), 500

@app.route('/api/user/favorite/delete', methods=['DELETE'])
def delete_favorite_stock_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401
    try:
        data = request.json
        if not 'code' in data:
            return jsonify('Dados inválidos!'), 400

        repository.remove_favorite_stock(user_id, data['code'])
        return jsonify({"msg": "Success"}), 200

    except sqlite3.Error as err:
        return jsonify({'msg': f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}'}), 500

@app.route('/api/user/buy', methods=['POST'])
def add_user_stock_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401
    try:
        data = request.json
        if not all(k in data for k in ('code', 'name', 'quantity', 'price')):
            return jsonify({"msg": "Dados inválidos!"}), 400
        
        quantity = data['quantity']
        price = int(data['price'] * 100)
        stock = Stock(data['code'], data['name'])
        
        # Verificar saldo suficiente
        user = repository.search_user('id', user_id)
        total_price = quantity * price
        if user.balance <= total_price:
            return jsonify({"msg": "Saldo insuficiente!"}), 400
        
        user.balance -= total_price
        repository.add_user_stock(user_id, stock, quantity, price)
        repository.add_balance(user)
        return jsonify({"msg": "Success"}), 201
    
    except sqlite3.Error as err:
        return f'Erro {err.sqlite_errorcode} - {err.sqlite_errorname}', 500

@app.route('/api/user/sell', methods=['POST'])
def sell_user_stock_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401
    try:
        data = request.json
        if not all(k in data for k in ('code', 'quantity', 'price')):
            return jsonify({"msg": "Dados inválidos!"}), 400
        
        quantity = data['quantity']
        stock_code = data['code']
        new_price = int(data['price'] * 100)
        
        # Verificar quantidade suficiente de ações
        user_stocks = repository.list_user_stocks(user_id)
        #print(user_stocks)
        user_stock = next((stock for stock in user_stocks if stock['code'] == stock_code), None)
        
        if user_stock is None or user_stock['quantity'] < quantity:
            return jsonify({"msg": "Quantidade de ações insuficiente!"}), 400
        
        total_value = quantity * int(user_stock['price'] * 100)
        repository.sell_user_stock(user_id, stock_code, quantity)
        user = repository.search_user('id', user_id)
        user.balance += total_value
        repository.add_balance(user)

        total_cost = quantity * user_stock['price']
        total_sale = quantity * new_price

        revenue = total_sale - total_cost

        return jsonify({"msg": "Success", 'Revenue': revenue}), 200
    
    except sqlite3.Error as err:
        return f'Erro {err.sqlite_errorcode} - {err.sqlite_errorname}', 500
    
@app.route('/api/user/buy/list', methods=['GET'])
def list_user_stocks_route():
    user_id = session.get('current_user')
    if not user_id:
        return jsonify({'msg': 'Unauthorized request'}), 401
    try:
        stocks = repository.list_user_stocks(user_id)
        response = [{'Code': stock['code'], 'Name': stock['name'], 'Quantity': stock['quantity'], 'Price': stock['price']/100} for stock in stocks]
        return jsonify({'data': response}), 200
        
    except sqlite3.Error as err:
        return jsonify({'msg': f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}'}), 500

