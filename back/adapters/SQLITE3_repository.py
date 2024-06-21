import sqlite3
from contextlib import closing
from adapters.user_repository import UserRepo

class UserRepositorySQLite(UserRepo):
    def insert_user(self, user):
        # Serialize user data into JSON
        user = user.__dict__

        with closing(sqlite3.connect('database.db')) as connection:
            try: 
                cursor = connection.cursor()
                cursor.execute('INSERT INTO user (cpf, name, email, password) VALUES(:cpf, :name, :email, :password)', user)
                connection.commit()
            except sqlite3.Error as err:
                # TODO: unique value already exists in db (must pass which one to the caller)
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')