document.addEventListener("DOMContentLoaded", function () {
    const radioAluno = document.getElementById("perfil_aluno");
    const radioProfessor = document.getElementById("perfil_professor");
    const fieldTurma = document.getElementById("field_turma");
    const fieldDisciplina = document.getElementById("field_disciplina");
    const inputTurma = document.getElementById("turma");
    const inputDisciplina = document.getElementById("disciplina");

    function toggleFields() {
        if (radioAluno && radioAluno.checked) {
            if (fieldTurma) fieldTurma.style.display = "block";
            if (inputTurma) inputTurma.required = true;
            
            if (fieldDisciplina) fieldDisciplina.style.display = "none";
            if (inputDisciplina) {
                inputDisciplina.required = false;
                inputDisciplina.value = ""; 
            }
        } else if (radioProfessor && radioProfessor.checked) {
            if (fieldDisciplina) fieldDisciplina.style.display = "block";
            if (inputDisciplina) inputDisciplina.required = true;
            
            if (fieldTurma) fieldTurma.style.display = "none";
            if (inputTurma) {
                inputTurma.required = false;
                inputTurma.value = ""; 
            }
        }
    }

    if (radioAluno && radioProfessor) {
        radioAluno.addEventListener("change", toggleFields);
        radioProfessor.addEventListener("change", toggleFields);
        // Inicializa o estado no carregamento
        toggleFields();
    }

    // Validação de senhas
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            const senha = document.getElementById("senha");
            const confirmarSenha = document.getElementById("confirmar_senha");
            
            if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
                e.preventDefault();
                alert("As senhas não coincidem. Por favor, tente novamente.");
                confirmarSenha.focus();
            }
        });
    }
});
