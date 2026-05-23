from flask import Flask
from database.db import db

app = Flask(__name__,
            template_folder='../frontend/templates',
            static_folder='../frontend/static')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

from core import routes
