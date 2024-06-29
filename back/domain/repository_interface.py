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

class UserExists(Exception):
    pass

class UserNotFound(Exception):
    pass
