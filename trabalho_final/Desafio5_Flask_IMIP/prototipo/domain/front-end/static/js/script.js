function switchTab(tab){

  const loginPanel =
    document.getElementById('login-panel');

  const signupPanel =
    document.getElementById('signup-panel');

  const buttons =
    document.querySelectorAll('.tab-btn');

  buttons.forEach(btn=>{
    btn.classList.remove('active');
  });

  if(tab === 'login'){

    loginPanel.classList.add('active');

    signupPanel.classList.remove('active');

    buttons[0].classList.add('active');

  }else{

    signupPanel.classList.add('active');

    loginPanel.classList.remove('active');

    buttons[1].classList.add('active');
  }
}

/* TIPO DE USUÁRIO */
let selectedType = 'student';

function selectType(type){

  selectedType = type;

  const studentBtn =
    document.getElementById('student-btn');

  const teacherBtn =
    document.getElementById('teacher-btn');

  const studentField =
    document.getElementById('student-field');

  const teacherField =
    document.getElementById('teacher-field');

  studentBtn.classList.remove('active');

  teacherBtn.classList.remove('active');

  if(type === 'student'){

    studentBtn.classList.add('active');

    studentField.style.display = 'block';

    teacherField.style.display = 'none';

  }else{

    teacherBtn.classList.add('active');

    studentField.style.display = 'none';

    teacherField.style.display = 'block';
  }
}

function handleLogin() {

    window.location.href = "/home";

}

function togglePw(id){

  const input =
    document.getElementById(id);

  if(input.type === 'password'){

    input.type = 'text';

  }else{

    input.type = 'password';
  }
}

function showToast(msg){

  const toast =
    document.getElementById('toast');

  toast.textContent = msg;

  toast.classList.add('show');

  setTimeout(()=>{

    toast.classList.remove('show');

  },3000);
}

function handleLogin(){

  const email =
    document.getElementById('login-email').value;

  const pass =
    document.getElementById('login-pass').value;

  if(email === '' || pass === ''){

    showToast(
      '⚠️ Preencha todos os campos!'
    );

    return;
  }

  showToast(
    '🎉 Login realizado com sucesso!'
  );
}

function handleSignup(){

  const name =
    document.getElementById('sig-name').value;

  const email =
    document.getElementById('sig-email').value;

  const pass =
    document.getElementById('sig-pass').value;

  const conf =
    document.getElementById('sig-conf').value;

  if(
    name === '' ||
    email === '' ||
    pass === '' ||
    conf === ''
  ){

    showToast(
      '⚠️ Preencha todos os campos!'
    );

    return;
  }

  if(pass.length < 8){

    showToast(
      '⚠️ A senha precisa ter no mínimo 8 caracteres!'
    );

    return;
  }

  if(pass !== conf){

    showToast(
      '⚠️ As senhas não coincidem!'
    );

    return;
  }

  if(selectedType === 'student'){

    const turma =
      document.getElementById('student-class').value;

    if(turma === ''){

      showToast(
        '⚠️ Preencha a turma!'
      );

      return;
    }

    console.log('Aluno:', turma);

  }else{

    const materia =
      document.getElementById('teacher-subject').value;

    if(materia === ''){

      showToast(
        '⚠️ Preencha a matéria!'
      );

      return;
    }

    console.log('Professor:', materia);
  }

  showToast(
    '🎉 Conta criada com sucesso!'
  );
}