from flask import Flask, request

import domain, repo

app = Flask(__name__)

@app.route('/user/new', methods=['POST'])
def create_user_route():
    domain.User(**request.json).persist(repo.UserRepositorySQLite())
    return 'Success', 201
