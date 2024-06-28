from abc import ABC, abstractmethod

class RepositoryInterface(ABC):
    @abstractmethod
    def insert_user(self, user):
        pass

    @abstractmethod
    def search_user(self, key, value):
        pass

    @abstractmethod
    def update_user(self, id, user):
        pass

class UserExists(Exception):
    pass

class UserNotFound(Exception):
    pass
