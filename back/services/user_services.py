from domain.user import User
from domain.repository_interface import UserNotFound

def save_new_user(user, repository):
    try:
        # TODO: Check if user object has all required fields
        repository.insert_user(user)
    except Exception:
        raise

def edit_user_data(id, new_user_data, repository):
    old_user_data = repository.search_user('id', id)
    if not old_user_data:
        raise UserNotFound
    
    new_user_data.id = old_user_data.id
    try:
        repository.update_user(new_user_data)
    except Exception:
        raise

def validate_credentials(cpf, password, repository):
    user = repository.search_user('auth', (cpf, password))
    if user:
        return user.id
    return -1

def get_user_by_cpf(cpf, repository):
    return repository.search_user('cpf', cpf)

def get_user_by_id(id, repository):
    return repository.search_user('id', id)

def delete_user(id, repository):
    try:
        repository.remove_user(id)
    except Exception:
        raise

def add_balance(id, balance, repository):
    user = repository.search_user('id', id)
    if not user:
        raise UserNotFound
    
    user.balance += balance
    try:
        repository.add_balance(user)
    except Exception:
        raise
