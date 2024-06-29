import sqlite3
from contextlib import closing

from domain.repository_interface import RepositoryInterface, UserExists, UserNotFound
from domain.user import User

class SQLiteAdapter(RepositoryInterface):
    def insert_user(self, user):
        # Serialize user data
        user = user.__dict__

        with closing(sqlite3.connect('database.db')) as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('INSERT INTO user (cpf, name, email, password) VALUES(:cpf, :name, :email, :password)', user)
                connection.commit()
            except sqlite3.IntegrityError:
                raise UserExists
            
    def dict_factory(self, cursor, row):
        fields = [column[0] for column in cursor.description]
        return {key: value for key, value in zip(fields, row)}

    def search_user(self, key, value):
        with closing(sqlite3.connect('database.db')) as connection:
            connection.row_factory = self.dict_factory
            cursor = connection.cursor()
            match key:
                case 'cpf':
                    cursor.execute('SELECT * FROM user WHERE cpf = ?', (value,))
                case 'id':
                    cursor.execute('SELECT * FROM user WHERE id = ?', (value,))
                case 'auth':
                    cursor.execute('SELECT * FROM user WHERE cpf = ? and password = ?', value)
            
            result = cursor.fetchone()
            if not result:
                return None
            return User(**result)
        
    def update_user(self, id, user):
        user = user.__dict__

        with closing(sqlite3.connect('database.db')) as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('UPDATE user SET cpf = :cpf, name = :name, password = :password, email = :email WHERE id = (:id)', user)
                connection.commit()
            except sqlite3.OperationalError:
                raise UserNotFound

    def remove_user(self, id):
        with closing(sqlite3.connect('database.db')) as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('DELETE FROM user WHERE id = ?', (id,))
                connection.commit()
            except sqlite3.OperationalError:
                raise UserNotFound