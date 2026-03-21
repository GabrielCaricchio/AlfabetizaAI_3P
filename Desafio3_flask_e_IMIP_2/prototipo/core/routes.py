from flask import render_template, jsonify
from core.app import app
from ai.chatbot import gerar_pergunta

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/biblioteca')
def livros():
    return render_template('biblioteca.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/api/questao')
def api_questao():
    dados = gerar_pergunta()
    return jsonify(dados)
