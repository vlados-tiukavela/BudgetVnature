// валидация формы регистрации

var form = document.getElementById('reg-form');

function showError(id, msg) {
  var el = document.getElementById(id);
  var fieldId = id.replace('err-', '');
  var input = document.getElementById(fieldId);

  el.textContent = msg;
  if (input && input.classList) {
    if (msg) input.classList.add('form__input--error');
    else input.classList.remove('form__input--error');
  }
}

function clearErrors() {
  showError('err-username', '');
  showError('err-email', '');
  showError('err-password', '');
  showError('err-password2', '');
  showError('err-agree', '');
}

function validateEmail(email) {
  // проверка формата email
  return email.indexOf('@') > 0 && email.indexOf('.') > email.indexOf('@');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  clearErrors();

  var username = document.getElementById('username').value.trim();
  var email = document.getElementById('email').value.trim();
  var pass = document.getElementById('password').value;
  var pass2 = document.getElementById('password2').value;
  var agree = document.getElementById('agree').checked;

  var ok = true;

  if (username.length < 3) {
    showError('err-username', 'Имя должно быть не короче 3 символов');
    ok = false;
  }

  if (!validateEmail(email)) {
    showError('err-email', 'Введите корректный email');
    ok = false;
  }

  if (pass.length < 6) {
    showError('err-password', 'Пароль минимум 6 символов');
    ok = false;
  }

  if (pass !== pass2) {
    showError('err-password2', 'Пароли не совпадают');
    ok = false;
  }

  if (!agree) {
    showError('err-agree', 'Нужно согласие с условиями');
    ok = false;
  }

  if (ok) {
    // сохраняем в localStorage как будто зарегались
    localStorage.setItem('budgetUser', JSON.stringify({
      username: username,
      email: email,
      fio: username
    }));
    alert('Регистрация успешна! Переходим в кабинет.');
    window.location.href = 'account.html';
  }
});

// проверка при вводе (чуть интерактива)
document.getElementById('email').addEventListener('blur', function () {
  if (this.value && !validateEmail(this.value)) {
    showError('err-email', 'Некорректный email');
  }
});
