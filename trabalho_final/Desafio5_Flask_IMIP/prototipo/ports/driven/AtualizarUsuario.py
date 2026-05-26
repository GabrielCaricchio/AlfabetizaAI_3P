from abc import ABC, abstractmethod

class AtualizarUsuarioPort(ABC):
    @abstractmethod
    def atualizar_usuario(self, usuario):
        """Atualiza um usuário no banco de dados"""
        pass
