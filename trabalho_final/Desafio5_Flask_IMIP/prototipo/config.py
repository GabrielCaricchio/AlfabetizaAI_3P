# config.py
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'chave-secreta-dev-123'
    # Armazena o banco SQLite em conection/database/database.db
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'conection', 'database', 'database.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
