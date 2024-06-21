from abc import ABC, abstractmethod

class UserRepo(ABC):
    @abstractmethod
    def insert_user(self, user):
        pass