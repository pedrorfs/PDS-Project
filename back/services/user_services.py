from domain.user import User
#from app import repository

def save_new_user(user, repository):
    repository.insert_user(user)