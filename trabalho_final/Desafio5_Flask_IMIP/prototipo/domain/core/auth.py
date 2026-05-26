from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required, current_user
from domain.models.UsuarioModels import Usuario
from domain.models.AlunoModels import Aluno
from domain.models.ProfessorModels import Professor
from adapters.repositories.InterfaceDB import db_repository

auth = Blueprint('auth', __name__)

# LOGIN
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('routes.index'))

    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        senha = request.form.get('senha', '')

        # Usa o port BuscarUsuarios
        usuario = db_repository.buscar_por_email(email)

        if usuario and usuario.ativo and usuario.verificar_senha(senha):
            login_user(usuario, remember=request.form.get('lembrar') == 'on')
            flash('Login realizado com sucesso!', 'success')

            proxima = request.args.get('next')
            return redirect(proxima or url_for('routes.index'))

        flash('E-mail ou senha incorretos.', 'danger')

    return render_template('login.html')


# LOGOUT
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Você saiu da conta.', 'info')
    return redirect(url_for('auth.login'))


# REGISTRO
@auth.route('/registro', methods=['GET', 'POST'])
def registro():
    if current_user.is_authenticated:
        return redirect(url_for('routes.index'))

    if request.method == 'POST':
        nome = request.form.get('nome', '').strip()
        email = request.form.get('email', '').strip().lower()
        telefone = request.form.get('telefone', '').strip()
        senha = request.form.get('senha', '')
        conf = request.form.get('confirmar_senha', '')
        matricula = request.form.get('matricula', '').strip()
        cpf = request.form.get('cpf', '').strip()
        perfil = request.form.get('perfil', 'aluno').strip().lower()

        # Dados exclusivos
        turma = request.form.get('turma', '').strip()
        disciplina = request.form.get('disciplina', '').strip()

        # Validações básicas comuns
        if not nome or not email or not telefone or not senha or not matricula or not cpf or not perfil:
            flash('Preencha todos os campos obrigatórios.', 'warning')
        elif senha != conf:
            flash('As senhas devem ser iguais.', 'warning')
        elif perfil not in ['aluno', 'professor']:
            flash('Perfil de usuário inválido.', 'danger')
        elif perfil == 'aluno' and not turma:
            flash('Preencha o campo Turma para o aluno.', 'warning')
        elif perfil == 'professor' and not disciplina:
            flash('Preencha o campo Disciplina para o professor.', 'warning')
        elif db_repository.buscar_por_email(email):
            flash('E-mail já cadastrado.', 'warning')
        elif db_repository.buscar_por_matricula(matricula):
            flash('Matrícula já cadastrada.', 'warning')
        elif db_repository.buscar_por_cpf(cpf):
            flash('CPF já cadastrado.', 'warning')
        else:
            # Criação do usuário comum
            novo_usuario = Usuario(
                nome=nome,
                email=email,
                telefone=telefone,
                matricula=matricula,
                cpf=cpf,
                perfil=perfil
            )
            novo_usuario.set_senha(senha)

            # Instanciação específica de perfil
            if perfil == 'aluno':
                aluno_extra = Aluno(usuario=novo_usuario, turma=turma)
                novo_usuario.aluno = aluno_extra
            else:
                prof_extra = Professor(usuario=novo_usuario, disciplina=disciplina)
                novo_usuario.professor = prof_extra

            # Gravação no Banco de Dados
            try:
                db_repository.salvar_usuario(novo_usuario)
                flash('Conta cadastrada com sucesso! Faça o Login.', 'success')
                return redirect(url_for('auth.login'))
            except Exception as e:
                flash(f'Erro ao cadastrar conta: {str(e)}', 'danger')
            
    return render_template('registro.html')
