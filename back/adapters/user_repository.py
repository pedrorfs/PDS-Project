from abc import ABC, abstractmethod

class UserRepo(ABC):
    @abstractmethod
    def insert_user(self, user):
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

    