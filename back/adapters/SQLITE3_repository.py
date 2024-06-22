import sqlite3
from contextlib import closing
from adapters.user_repository import UserRepo

from domain import RepositoryInterface, UserExists

class SQLiteAdapter(RepositoryInterface):
    def insert_user(self, user):
        # Serialize user data
        user = user.__dict__

        with closing(sqlite3.connect('database.db')) as connection:
            try: 
                cursor = connection.cursor()
                cursor.execute('INSERT INTO user (cpf, name, email, password) VALUES(:cpf, :name, :email, :password)', user)
                connection.commit()
            except sqlite3.IntegrityError as err:
                conflict_field = str(err).split()[-1]
                raise UserExists(conflict_field)