import sqlite3
import os.path

from domain.repository_interface import RepositoryInterface, UserExists, UserNotFound
from domain.user import User
from domain.stock import Stock

class MockDatabase(RepositoryInterface):
    def __init__(self):
        #self.db = sqlite3.connect('file:mem?mode=memory&cache=shared', uri=True)
        self.db = sqlite3.connect(':memory:')
        with open(os.path.dirname(__file__) + '/../schema.sql') as init_file:
            init_script = init_file.read()
        cursor = self.db.cursor()
        cursor.executescript(init_script)

    def insert_user(self, user):
        # Serialize user data
        user = user.__dict__

        with self.db as connection:
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
        with self.db as connection:
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
        
    def update_user(self, user):
        user = user.__dict__

        with self.db as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('UPDATE user SET cpf = :cpf, name = :name, password = :password, email = :email WHERE id = (:id)', user)
                connection.commit()
            except sqlite3.OperationalError:
                raise UserNotFound

    def remove_user(self, id):
        with self.db as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('DELETE FROM user WHERE id = ?', (id,))
                connection.commit()
            except sqlite3.OperationalError:
                raise UserNotFound

    def add_balance(self, user):
        user = user.__dict__

        with self.db as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('UPDATE user SET balance = :balance WHERE id = (:id)', user)
                connection.commit()
            except sqlite3.OperationalError:
                raise UserNotFound
    
    def insert_stock(self, stock):
        stock_code = stock.code
        stock = stock.__dict__
        with self.db as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('SELECT id FROM stock WHERE code = ?', (stock_code,))
                
                row = cursor.fetchone()

                if row is None:
                    cursor.execute('INSERT INTO stock (code, name) VALUES (:code, :name)', stock)
                    connection.commit()
                    return cursor.lastrowid
                else:
                    return row[0]
                
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')

    def add_favorite_stock(self, user_id, stock):

        with self.db as connection:
            try:
                cursor = connection.cursor()
                stock_id = self.insert_stock(stock)
                cursor.execute('INSERT INTO favorite_stock (user_id, stock_id) VALUES (?, ?)', (user_id, stock_id))
                connection.commit()
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')
    

    def list_favorites_stocks(self, user_id):
        with self.db as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('''
                SELECT stock.code, stock.name
                FROM favorite_stock
                JOIN stock ON favorite_stock.stock_id = stock.id
                WHERE favorite_stock.user_id = ?
            ''', (user_id,))
                favorites = cursor.fetchall()

                return favorites
            
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')
                return None
    
    def remove_favorite_stock(self, user_id, stock_code):
        with self.db as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('SELECT id FROM stock WHERE code = ?', (stock_code,))
                stock_id = cursor.fetchone()
                if stock_id:
                    cursor.execute('DELETE FROM favorite_stock WHERE user_id = ? AND stock_id = ?', (user_id, stock_id[0]))
                    connection.commit()
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')

    def add_user_stock(self, user_id, stock, quantity, price):

        with self.db as connection:
            try:
                cursor = connection.cursor()
                stock_id = self.insert_stock(stock)
                cursor.execute('INSERT INTO user_stock (user_id, stock_id, quantity, price) VALUES (?, ?, ?, ?)', 
                    (user_id, stock_id, quantity, price))
                connection.commit()
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')

    def sell_user_stock(self, user_id, stock_code, quantity):
        with self.db as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('SELECT id FROM stock WHERE code = ?', (stock_code,))
                stock_id = cursor.fetchone()[0]
                if stock_id:
                    cursor.execute('UPDATE user_stock SET quantity = quantity - ? WHERE user_id = ? AND stock_id = ?', (quantity, user_id, stock_id))
                    connection.commit()
                    cursor.execute('DELETE FROM user_stock WHERE user_id = ? AND stock_id = ? AND quantity <= 0', (user_id, stock_id))
                    connection.commit()
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')

    def list_user_stocks(self, user_id):
        with self.db as connection:
            try:
                cursor = connection.cursor()
                cursor.execute('''
                SELECT stock.code, stock.name, quantity, price
                FROM user_stock
                JOIN stock ON user_stock.stock_id = stock.id
                WHERE user_stock.user_id = ?
                ''', (user_id,))
                stocks = cursor.fetchall()

                return stocks
            
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')
                return None

    def clear_tables(self):
        with self.db as connection:
            cursor = connection.cursor()
            cursor.executescript('''
                DELETE FROM user;
                DELETE FROM sqlite_sequence WHERE name='user';
                DELETE FROM stock;
                DELETE FROM sqlite_sequence WHERE name='stock';
                DELETE FROM user_stock;
                DELETE FROM sqlite_sequence WHERE name='user_stock';
                DELETE FROM favorite_stock;
                DELETE FROM sqlite_sequence WHERE name='favorite_stock';
            ''')
