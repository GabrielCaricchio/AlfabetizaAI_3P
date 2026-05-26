from flask import render_template, request
from services import criar_atividade
from models import alunos

def configurar_rotas(app):

    @app.route("/")
    def inicio():
        return render_template("inicio.html")
    
    @app.route("/aluno")
    def aluno():
        return render_template("index.html") 
    
    @app.route("/atividade", methods=["POST"])
    def atividade():
        nome = request.form.get("nome")
        serie = request.form.get("serie")
        atividade_criada = criar_atividade(nome, serie)
        
        return render_template("atividade.html",
                               nome=nome, serie=serie, 
                               atividade=atividade_criada)
        
    @app.route("/professor")
    def professor():
        return render_template("professor.html", alunos=alunos)
