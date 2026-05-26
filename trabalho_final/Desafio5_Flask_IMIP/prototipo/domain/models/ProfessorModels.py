from adapters.repositories.InterfaceDB import db

class Professor(db.Model):
    __tablename__ = 'professores'

    id            = db.Column(db.Integer, primary_key=True)
    usuario_id    = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False, unique=True)
    especialidade = db.Column(db.String(100))           # Ex: 'Alfabetização', 'Matemática'
    registro      = db.Column(db.String(50))             # Registro profissional (opcional)
    disciplina    = db.Column(db.String(100), nullable=True)

    # Relacionamentos
    usuario  = db.relationship('Usuario',          back_populates='professor')

    def __repr__(self):
        return f'<Professor {self.usuario.nome if self.usuario else self.id}>'
