// проверка формы регистрации

var form = document.getElementById('reg-form');

function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}

form.onsubmit = function (e) {
  e.preventDefault();

  showError('err-username', '');
  showError('err-email', '');
  showError('err-password', '');
  showError('err-password2', '');
  showError('err-agree', '');

  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var pass = document.getElementById('password').value;
  var pass2 = document.getElementById('password2').value;
  var agree = document.getElementById('agree').checked;

  var ok = true;

  if (username.length < 3) {
    showError('err-username', 'Минимум 3 символа');
    ok = false;
  }

  if (email.indexOf('@') < 1) {
    showError('err-email', 'Неверный email');
    ok = false;
  }

  if (pass.length < 6) {
    showError('err-password', 'Пароль от 6 символов');
    ok = false;
  }

  if (pass !== pass2) {
    showError('err-password2', 'Пароли разные');
    ok = false;
  }

  if (!agree) {
    showError('err-agree', 'Нужно согласие');
    ok = false;
  }

  if (ok) {
    localStorage.setItem('budgetUser', JSON.stringify({
      username: username,
      email: email,
      fio: username
    }));
    alert('Готово');
    location.href = 'account.html';
  }
};
