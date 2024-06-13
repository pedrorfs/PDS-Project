from flask import abort, Flask, jsonify, request

from configuration import configure_inject
from domain import User, UserExists

app = Flask(__name__)
configure_inject()

@app.route('/api/user/new', methods=['POST'])
def create_user_route():
    # TODO: Validate json request data
    if request.content_type != 'application/json':
        abort(400)

    try:
        User(**request.json).save_to_repo()
    except UserExists as err:
        return jsonify(str(err)), 409
    except:
        abort(500)

    return jsonify('Success'), 201
