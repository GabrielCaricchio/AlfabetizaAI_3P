import os
import sys


# Ensure project directory is in sys.path if needed, usually handled by python running from folder
from core.app import app
from database.db import db
from database.models import Usuario

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        
    app.run(host="0.0.0.0", port=5000, debug=True)
