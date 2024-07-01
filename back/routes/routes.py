from flask import request
import sqlite3
from app import app
from services.user_services import save_new_user
from domain.user import User
from domain.stock import Stock

import adapters.SQLITE3_repository as SQLITE3_repository

repository = SQLITE3_repository.UserRepositorySQLite()

@app.route('/api/user/new', methods=['POST'])
def create_user_route():
    # TODO: Validate json request data
    user = User(**request.json)
    
    save_new_user(user, repository)
    return 'Success', 201


@app.route('/')
def index_route():
    return "Hello World!"


@app.route('/api/user/<int:user_id>/favorite', methods=['POST'])
def add_favorite_stock_route(user_id):
    try:
        data = request.json
        if not all(k in data for k in ('code', 'name')):
            return 'Dados inválidos!', 400
        
        stock = Stock(data['code'], data['name'])
        repository.add_favorite_stock(user_id, stock)
        return "success", 201
    
    except sqlite3.Error as err:
        return f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}', 500

@app.route('/api/user/<int:user_id>/favorites', methods=['GET'])
def list_favorites_stocks_route(user_id):
    try:
        favorites = repository.list_favorites_stocks(user_id)
        response = [{'Code': code, 'Name': name} for code, name in favorites]
        return response, 200
        
    except sqlite3.Error as err:
        return f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}', 500
    
@app.route('/api/user/<int:user_id>/buy', methods=['POST'])
def add_user_stock_route(user_id):
    try:
        data = request.json
        if not all(k in data for k in ('code', 'name', 'quantity', 'price')):
            return "Dados inválidos!", 400
        
        quantity = data['quantity']
        price = data['price']
        stock = Stock(data['code'], data['name'])
        repository.add_user_stock(user_id, stock, quantity, price)
        return "success", 201
    
    except sqlite3.Error as err:
        return f'Erro {err.sqlite_errorcode} - {err.sqlite_errorname}', 500

@app.route('/api/user/<int:user_id>/buy/list', methods=['GET'])
def list_user_stocks_route(user_id):
    try:
        stocks = repository.list_user_stocks(user_id)
        response = [{'Code': code, 'Name': name, 'Quantity': quantity, 'Price': price} for code, name, quantity, price in stocks]
        return response, 200
        
    except sqlite3.Error as err:
        return f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}', 500