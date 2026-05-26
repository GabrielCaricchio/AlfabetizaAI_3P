import os
import sys
from flask import Flask
from adapters.repositories.InterfaceDB import db, db_repository
from flask_login import LoginManager

# Garante que a raiz do projeto esteja no path para que possamos importar config
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from config import Config

def create_app():
    app = Flask(
        __name__,
        template_folder=os.path.join(BASE_DIR, 'domain', 'front-end', 'templates'),
        static_folder=os.path.join(BASE_DIR, 'domain', 'front-end', 'static')
    )

    app.config.from_object(Config)
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'          # rota do login
    login_manager.login_message = 'Faça login para acessar esta página.'
    login_manager.login_message_category = 'warning'

    @login_manager.user_loader
    def carregar_usuario(user_id):
        # Utiliza o port BuscarUsuarios (via db_repository) em vez de query direta
        return db_repository.buscar_por_id(int(user_id))

    with app.app_context():
        # Importações sob demanda para carregar os blueprints e evitar imports circulares
        from domain.core.routes import routes_bp
        from domain.core.auth import auth

        app.register_blueprint(routes_bp)
        app.register_blueprint(auth)

    return app
