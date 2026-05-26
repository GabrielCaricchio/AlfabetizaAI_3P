from flask import Blueprint, render_template, jsonify, request, redirect, url_for, flash
from flask_login import login_required, current_user
from domain.models.UsuarioModels import Usuario
from adapters.repositories.InterfaceDB import db_repository
from adapters.integrations.InterfaceAI import gerar_pergunta

#Definição do Blueprint para as rotas principais
routes_bp = Blueprint('routes', __name__)

# PÁGINA INICIAL
@routes_bp.route('/')
@login_required
def index():
    return render_template('index.html')

# BIBLIOTECA
@routes_bp.route('/biblioteca')
@login_required
def livros():
    return render_template('biblioteca.html')

# QUIZ
@routes_bp.route('/quiz')
@login_required
def quiz():
    return render_template('quiz.html')

# MINHA EVOLUÇÃO
@routes_bp.route('/evolucao')
@login_required
def evolucao():
    return render_template('evolucao.html')

# ROTA DA API QUE GERA AS QUESTÕES DO QUIZ COM A IA
@routes_bp.route('/api/questao')
@login_required
def api_questao():
    dados = gerar_pergunta()
    return jsonify(dados)


