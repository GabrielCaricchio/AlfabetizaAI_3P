from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from adapters.repositories.InterfaceDB import db

class Usuario(UserMixin, db.Model):
    __tablename__ = 'usuarios'

    id        = db.Column(db.Integer, primary_key=True)
    nome      = db.Column(db.String(50), nullable=False)
    email     = db.Column(db.String(50), unique=True, nullable=False)
    telefone  = db.Column(db.String(20), nullable=False)
    senha     = db.Column(db.String(255), nullable=False)
    matricula = db.Column(db.String(50), unique=True, nullable=False)
    cpf       = db.Column(db.String(20), unique=True, nullable=False)
    perfil    = db.Column(db.String(20), nullable=False)   # 'professor' ou 'aluno'
    ativo     = db.Column(db.Boolean, default=True)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    # Relacionamentos
    professor     = db.relationship('Professor', back_populates='usuario', uselist=False)
    aluno         = db.relationship('Aluno',     back_populates='usuario', uselist=False)

    def set_senha(self, senha_pura):
        self.senha = generate_password_hash(senha_pura)

    def verificar_senha(self, senha_pura):
        return check_password_hash(self.senha, senha_pura)

    def __repr__(self):
        return f'<Usuario {self.email} | {self.perfil}>'
