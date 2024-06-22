from domain.repository_interface import UserExists

def save_new_user(user, repository):
    try:
        repository.insert_user(user)
    except:
        raise