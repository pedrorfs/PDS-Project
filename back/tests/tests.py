import pytest
from flask import session

from app import app, repository

@pytest.fixture
def client():
    return app.test_client()

@pytest.fixture(autouse=True)
def teardown(client):
    yield
    with client.session_transaction() as session:
        session.clear()
    repository.clear_tables()

@pytest.fixture
def set_login(client):
    with client.session_transaction() as session:
        session['current_user'] = 1

@pytest.fixture
def set_user(client):
    data = {
            'cpf': '00032100077',
            'password': 'pass',
            'name': 'user',
            'email': 'abc@test.com',
    }

    client.post('/api/user/new', json=data)

def test_create_user(client):
    data = {
            'cpf': '12345678900',
            'password': 'abc',
            'name': 'user',
            'email': 'a@b.com'
    }

    response = client.post('/api/user/new', json=data)

    assert response.status_code == 201

def test_create_user_conflict(client, set_user):
    data = {
            'cpf': '00032100077',
            'password': 'pass',
            'name': 'user',
            'email': 'abc@test.com'
    }

    response = client.post('/api/user/new', json=data)

    assert response.status_code == 409

def test_login(client, set_user):
    with client:
        data = {
            'cpf': '00032100077',
            'password': 'pass'
        }

        response = client.post('/api/login', json=data)

        assert response.status_code == 200
        assert session.get('current_user') == 1

def test_login_fail(client):
    with client:
        data = {
            'cpf': '1234567811',
            'password': 'word'
        }

        response = client.post('/api/login', json=data)

        assert response.status_code == 401
        assert session.get('current_user') == None

def test_logout(client):
    with client:
        response = client.delete('/api/login')

        assert response.status_code == 200
        assert session.get('current_user') == None


def test_get_user_data(client, set_user, set_login):
    response = client.get('/api/user')

    user_data = response.json['data']
    keys = ['id', 'cpf', 'password', 'name', 'email', 'balance']

    assert response.status_code == 200
    assert all(k in user_data for k in keys)

def test_get_user_not_found(client, set_login):
    response = client.get('/api/user')
    assert response.status_code == 404

def test_update_user(client, set_user, set_login):
    data = {
            'cpf': '55544433322',
            'password': 'qwerty',
            'name': 'blabla',
            'email': 'b@a.com'
    }

    response = client.put('/api/user/update', json=data)
    assert response.status_code == 200

    response = client.get('/api/user')
    res_data = response.json['data']
    res_data.pop('id')
    res_data.pop('balance')

    assert response.status_code == 200
    assert data == res_data

def test_delete_user(client, set_user, set_login):
    response = client.delete('/api/user/delete')
    assert response.status_code == 200

    response = client.get('/api/user')
    assert response.status_code == 404

def test_add_balance(client, set_user, set_login):
    response = client.get('/api/user')
    old_balance = response.json['data']['balance']

    data = {'balance': 20000}
    response = client.patch('/api/user/balance', json=data)
    assert response.status_code == 200

    response = client.get('/api/user')
    res_data = response.json['data']
    assert response.status_code == 200
    assert res_data['balance'] - data['balance'] == old_balance

def test_add_favorite_stock(client, set_user, set_login):
    data = {'code': 'AAPL', 'name': 'Apple Inc.'}
    response = client.post('/api/user/favorite', json=data)
    assert response.status_code == 201

def test_list_favorites(client, set_user, set_login):
    data1 = {'code': 'AAPL', 'name': 'Apple Inc.'}
    data2 = {'code': 'BBB', 'name': 'Big Brother Brasil'}
    response = client.post('/api/user/favorite', json=data1)
    response = client.post('/api/user/favorite', json=data2)

    response = client.get('/api/user/favorites')
    favorites = response.json['data']

    assert response.status_code == 200
    assert len(favorites) == 2
    assert favorites[0]['Code'] == 'AAPL'
    assert favorites[0]['Name'] == 'Apple Inc.'
    assert favorites[1]['Code'] == 'BBB'
    assert favorites[1]['Name'] == 'Big Brother Brasil'

def test_delete_favorite_stock(client, set_user, set_login):
    data = {'code': 'AAPL', 'name': 'Apple Inc.'}
    response = client.post('/api/user/favorite', json=data)

    response = client.delete('/api/user/favorite/delete', json={'code': 'AAPL'})
    assert response.status_code == 200
    
    response = client.get('/api/user/favorites')
    favorites = response.json['data']
    assert len(favorites) == 0

def test_buy_stock(client, set_user, set_login):
    data = {'code': 'AAPL', 'name': 'Apple Inc.', 'quantity': 5, 'price': 150.0}
    response = client.post('/api/user/buy', json=data)
    assert response.status_code == 201
    #assert 

def test_sell_stock(client, set_user, set_login):
    data = {'code': 'AAPL', 'name': 'Apple Inc.', 'quantity': 5, 'price': 150.0}
    client.post('/api/user/buy', json=data)
    
    sell_data = {'code': 'AAPL', 'quantity': 2, 'price': 155.0}
    response = client.post('/api/user/sell', json=sell_data)
    assert response.status_code == 200
    #assert response.get_json()['Revenue'] == 10 * 2

def test_list_user_stocks(client, set_user, set_login):
    data1 = {'code': 'AAPL', 'name': 'Apple Inc.', 'quantity': 5, 'price': 150.0}
    client.post('/api/user/buy', json=data1)
    data2 = {'code': 'MSFT', 'name': 'Microsoft Corp.', 'quantity': 3, 'price': 50.0}
    client.post('/api/user/buy', json=data2)
    
    response = client.get('/api/user/buy/list')
    stocks = response.json['data']
    print(stocks)
    assert response.status_code == 200
    assert len(stocks) == 2
    assert any(stock['Code'] == 'AAPL' for stock in stocks)
    assert any(stock['Code'] == 'MSFT' for stock in stocks)