from flask import Flask, request

import domain, repo

app = Flask(__name__)

repository = repo.UserRepositorySQLite()

@app.route('/api/user/new', methods=['POST'])
def create_user_route():
    # TODO: Validate json request data
    domain.User(**request.json).persist(repository)
    return 'Success', 201
