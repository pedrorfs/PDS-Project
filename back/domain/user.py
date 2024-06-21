class User():
    def __init__(self, cpf, name, email, password, balance=None):
        self.cpf = cpf
        self.name = name
        self.email = email
        self.password = password
        self.balance = balance

    #def persist(self, repo: UserRepo):
    #    repo.insert_user(self)
