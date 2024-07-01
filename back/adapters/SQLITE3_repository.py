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
    

    def insert_stock(self, stock):
        stock_code = stock.code
        stock = stock.__dict__
        with closing(sqlite3.connect('database.db')) as connection:
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

        with closing(sqlite3.connect('database.db')) as connection:
            try:
                cursor = connection.cursor()
                stock_id = self.insert_stock(stock)
                cursor.execute('INSERT INTO favorite_stock (user_id, stock_id) VALUES (?, ?)', (user_id, stock_id))
                connection.commit()
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')
    

    def list_favorites_stocks(self, user_id):
        with closing(sqlite3.connect('database.db')) as connection:
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
    

    def add_user_stock(self, user_id, stock, quantity, price):

        with closing(sqlite3.connect('database.db')) as connection:
            try:
                cursor = connection.cursor()
                stock_id = self.insert_stock(stock)
                cursor.execute('INSERT INTO user_stock (user_id, stock_id, quantity, price) VALUES (?, ?, ?, ?)', 
                    (user_id, stock_id, quantity, price))
                connection.commit()
            except sqlite3.Error as err:
                print(f'Error {err.sqlite_errorcode} - {err.sqlite_errorname}')

    def list_user_stocks(self, user_id):
        with closing(sqlite3.connect('database.db')) as connection:
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