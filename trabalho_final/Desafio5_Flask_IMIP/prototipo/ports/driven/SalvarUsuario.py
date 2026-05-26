from abc import ABC, abstractmethod

class SalvarUsuarioPort(ABC):
    @abstractmethod
    def salvar_usuario(self, usuario):
        """Salva um usuário no banco de dados"""
        pass
