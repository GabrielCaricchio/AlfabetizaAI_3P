from main import app
from flask import render_template
from markupsafe import escape

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/camisas')
def camisas():
    tipos_camisas_python= {'tipo': 'manga comprida',
                    'preço': 119.99,
                    'descrição': 'camisa de linho branca'}

    return render_template('produtos/camisas.html',
                           marca='Sheinss brasil',
                           tipos_camisas_html = tipos_camisas_python)

@app.route('/calças')
def calças():
    tipos_calças_python= {'tipo': 'calça jeans',
                    'preço': 159.99,
                    'descrição': 'calça jeans azul, preta, ou bege de jeans da melhor qualidade'}
    outras_calças_python = ['calça de seda', 'calça de linho', 'calça de academia', 'calça militar']

    return render_template('produtos/calças.html',
                           tipos_calças_html = tipos_calças_python,
                           outras_calças_html = outras_calças_python)

@app.route('/ola/<nome>')
def ola(nome):
    #nome = escape(nome)
    return f'Olá {nome}, seja bem vindo'

@app.route('/cadastro', methods = ['GET', 'POST'])
def cadastro():
    return render_template('usuario/cadastro.html')

@app.route('/login')
def login():
    return render_template('usuario/login.html')
