from datetime import datetime
from adapters.repositories.InterfaceDB import db

class Aluno(db.Model):
    __tablename__ = 'alunos'

    id              = db.Column(db.Integer, primary_key=True)
    usuario_id      = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False, unique=True)
    turma           = db.Column(db.String(100), nullable=True)
    data_nascimento = db.Column(db.Date)
    nivel_leitura   = db.Column(db.String(50), default='Pré-Silábico')
    # Nível de leitura segue a psicogênese: Pré-Silábico → Silábico → Silábico-Alfabético → Alfabético
    internado       = db.Column(db.Boolean, default=True)    
    data_entrada    = db.Column(db.Date,  default=datetime.utcnow)
    data_saida      = db.Column(db.Date,  nullable=True)     

    # Relacionamentos
    usuario    = db.relationship('Usuario',      back_populates='aluno')

    def __repr__(self):
        return f'<Aluno {self.usuario.nome if self.usuario else self.id}>'
