from abc import ABC, abstractmethod

class BuscarUsuariosPort(ABC):
    @abstractmethod
    def buscar_por_id(self, user_id):
        """Busca um usuário por seu ID"""
        pass

    @abstractmethod
    def buscar_por_email(self, email):
        """Busca um usuário por seu e-mail"""
        pass

    @abstractmethod
    def buscar_por_matricula(self, matricula):
        """Busca um usuário por sua matrícula"""
        pass

    @abstractmethod
    def buscar_por_cpf(self, cpf):
        """Busca um usuário por seu CPF"""
        pass
