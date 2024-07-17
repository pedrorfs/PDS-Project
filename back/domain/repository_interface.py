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
    def insert_stock():
        pass
    
    @abstractmethod
    def list_favorites_stocks():
        pass

    @abstractmethod
    def add_favorite_stock():
        pass
    
    @abstractmethod
    def remove_favorite_stock():
        pass

    @abstractmethod
    def add_user_stock():
        pass

    @abstractmethod
    def list_user_stocks():
        pass

    @abstractmethod
    def sell_user_stock():
        pass

class UserExists(Exception):
    pass

class UserNotFound(Exception):
    pass
