import inject

from domain import RepositoryInterface
from repo import SQLiteAdapter

def configure_inject() -> None:
    inject.configure(lambda binder: binder.bind(RepositoryInterface, SQLiteAdapter()))
