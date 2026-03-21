import os
import sys

# Ensure project directory is in sys.path if needed, usually handled by python running from folder
from core.app import app

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
