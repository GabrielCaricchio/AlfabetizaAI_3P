from flask import Flask
from routes import configurar_rotas

app = Flask(__name__)

configurar_rotas(app)

if __name__ == "__main__":
    app.run(debug=True)