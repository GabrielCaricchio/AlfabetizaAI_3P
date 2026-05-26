from flask import render_template
from core.app import app

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
