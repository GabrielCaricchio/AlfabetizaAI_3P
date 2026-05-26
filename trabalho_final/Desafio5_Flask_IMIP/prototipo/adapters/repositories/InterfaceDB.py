from flask_sqlalchemy import SQLAlchemy
from ports.driven.SalvarUsuario import SalvarUsuarioPort
from ports.driven.AtualizarUsuario import AtualizarUsuarioPort
from ports.driven.DeletarUsuario import DeletarUsuarioPort
from ports.driving.buscarUsuarios import BuscarUsuariosPort

db = SQLAlchemy()

class DatabaseRepository(SalvarUsuarioPort, AtualizarUsuarioPort, DeletarUsuarioPort, BuscarUsuariosPort):
    def salvar_usuario(self, usuario):
        db.session.add(usuario)
        if usuario.aluno:
            db.session.add(usuario.aluno)
        if usuario.professor:
            db.session.add(usuario.professor)
        db.session.commit()

    def atualizar_usuario(self, usuario):
        db.session.commit()

    def deletar_usuario(self, usuario):
        if usuario.aluno:
            db.session.delete(usuario.aluno)
        if usuario.professor:
            db.session.delete(usuario.professor)
        db.session.delete(usuario)
        db.session.commit()

    def buscar_por_id(self, user_id):
        from domain.models.UsuarioModels import Usuario
        return Usuario.query.get(int(user_id))

    def buscar_por_email(self, email):
        from domain.models.UsuarioModels import Usuario
        return Usuario.query.filter_by(email=email).first()

    def buscar_por_matricula(self, matricula):
        from domain.models.UsuarioModels import Usuario
        return Usuario.query.filter_by(matricula=matricula).first()

    def buscar_por_cpf(self, cpf):
        from domain.models.UsuarioModels import Usuario
        return Usuario.query.filter_by(cpf=cpf).first()

db_repository = DatabaseRepository()
