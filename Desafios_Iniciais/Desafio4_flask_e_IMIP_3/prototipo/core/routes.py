from flask import render_template, jsonify, request
from core.app import app
from ai.chatbot import gerar_pergunta
from database.db import db
from database.models import Usuario

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/biblioteca')
def livros():
    return render_template('biblioteca.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/registrar', methods=['GET', 'POST'])
def registrar():
    if request.method == 'GET':
        return render_template('registrar.html')
    elif request.method == 'POST':
        nome = request.form['InputName1']
        email = request.form['InputEmail1']
        senha = request.form['InputPassword1']

        novo_usuario = Usuario(nome=nome, email=email, senha=senha)
        db.session.add(novo_usuario)
        db.session.commit()
        return "Usuário registrado com sucessso!"
@app.route('/api/questao')
def api_questao():
    dados = gerar_pergunta()
    return jsonify(dados)
