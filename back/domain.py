from abc import ABC, abstractmethod

import inject

class RepositoryInterface(ABC):
    @abstractmethod
    def insert_user(self, user) -> None:
        pass

class UserExists(Exception):
    pass

class User():
    @inject.autoparams('repo')
    def __init__(self, repo: RepositoryInterface, cpf, name, email, password, balance=None):
        self.__repo = repo
        self.cpf = cpf
        self.name = name
        self.email = email
        self.password = password
        self.balance = balance

    def save_to_repo(self):
        try:
            self.__repo.insert_user(self)
        except:
            raise
