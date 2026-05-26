from abc import ABC, abstractmethod

class DeletarUsuarioPort(ABC):
    @abstractmethod
    def deletar_usuario(self, usuario):
        """Deleta um usuário do banco de dados"""
        pass
