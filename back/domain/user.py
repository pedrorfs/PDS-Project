from dataclasses import dataclass
from typing import Optional

@dataclass
class User():
    cpf: str
    password: str
    id: int = -1
    name: Optional[str] = None
    email: Optional[str] = None
    balance: Optional[int] = None
