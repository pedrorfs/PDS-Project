from domain.user import User

def save_new_user(user, repository):
    try:
        # TODO: Check if user object has all required fields
        repository.insert_user(user)
    except:
        raise

def validate_credentials(cpf, password, repository):
    user = repository.search_user('auth', (cpf, password))
    if user:
        return user.id
    return -1

def get_user_by_cpf(cpf, repository):
    user = User(**repository.search_user(cpf))
    return user

def get_user_by_id(id, repository):
    user = User(**repository.search_user('id', id))
    return user