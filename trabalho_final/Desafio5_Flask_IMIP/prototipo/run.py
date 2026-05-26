import os
import sys

# Insere o diretório atual no path para importações absolutas
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from domain.core.app import create_app
from adapters.repositories.InterfaceDB import db
# Carrega todos os modelos para registro de metadados no SQLAlchemy
import domain.models

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        # Cria as tabelas na pasta conection/database/ se não existirem
        db.create_all()

    app.run(host="0.0.0.0", port=5000, debug=True)