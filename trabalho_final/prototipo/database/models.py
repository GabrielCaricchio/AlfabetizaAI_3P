from database.db import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    senha = db.Column(db.String(30), nullable=False)