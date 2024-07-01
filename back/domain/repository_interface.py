from abc import ABC, abstractmethod

class RepositoryInterface(ABC):
    @abstractmethod
    def insert_user():
        pass

    @abstractmethod
    def search_user():
        pass

    @abstractmethod
    def update_user():
        pass

    @abstractmethod
    def remove_user():
        pass

    @abstractmethod
    def add_balance():
        pass

    @abstractmethod
    def insert_stock(self, stock):
        pass
    
    @abstractmethod
    def list_favorites_stocks(self, user_id):
        pass

    def add_favorite_stock(self, user_id, stock):
        pass
    
    @abstractmethod
    def add_user_stock(self, user_id, stock, quantity, price):
        pass

    @abstractmethod
    def list_user_stocks(self, user_id):
        pass

class UserExists(Exception):
    pass

class UserNotFound(Exception):
    pass
