from abc import ABC, abstractmethod

class RepositoryInterface(ABC):
    @abstractmethod
    def insert_user(self, user) -> None:
        pass

class UserExists(Exception):
    pass