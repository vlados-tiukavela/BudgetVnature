// личный кабинет

var userData = localStorage.getItem('budgetUser');
if (userData) {
  var user = JSON.parse(userData);
  document.getElementById('user-name').textContent = user.username || 'Пользователь';
  if (user.fio) document.getElementById('fio').value = user.fio;
  if (user.email) document.getElementById('profile-email').value = user.email;
}

var tabBtns = document.querySelectorAll('.tabs__btn');
for (var i = 0; i < tabBtns.length; i++) {
  tabBtns[i].onclick = function () {
    var tabId = this.getAttribute('data-tab');

    for (var j = 0; j < tabBtns.length; j++) {
      tabBtns[j].classList.remove('tabs__btn--active');
    }
    this.classList.add('tabs__btn--active');

    document.getElementById('tab-profile').hidden = true;
    document.getElementById('tab-history').hidden = true;
    document.getElementById('tab-stats').hidden = true;
    document.getElementById('tab-' + tabId).hidden = false;
  };
}

document.getElementById('profile-form').onsubmit = function (e) {
  e.preventDefault();
  var fio = document.getElementById('fio').value;
  var email = document.getElementById('profile-email').value;
  var saved = userData ? JSON.parse(userData) : {};
  saved.fio = fio;
  saved.email = email;
  saved.username = fio.split(' ')[0];
  localStorage.setItem('budgetUser', JSON.stringify(saved));
  document.getElementById('user-name').textContent = saved.username;
  alert('Сохранено');
};

document.getElementById('operation-form').onsubmit = function (e) {
  e.preventDefault();
  var type = document.getElementById('op-type').value;
  var cat = document.getElementById('op-category').value;
  var sum = document.getElementById('op-sum').value;

  if (!sum) {
    alert('Введите сумму');
    return;
  }

  var tipText = type === 'income' ? 'Доход' : 'Расход';
  var klass = type === 'income' ? 'operations-table__income' : 'operations-table__expense';
  var data = new Date();
  var dataStr = data.getDate() + '.' + (data.getMonth() + 1) + '.' + data.getFullYear();

  var tr = document.createElement('tr');
  tr.innerHTML = '<td>' + dataStr + '</td><td class="' + klass + '">' + tipText + '</td><td>' + cat + '</td><td>' + sum + ' руб.</td>';
  document.getElementById('operations-body').appendChild(tr);
  this.reset();
};

document.getElementById('btn-logout').onclick = function () {
  localStorage.removeItem('budgetUser');
  location.href = 'index.html';
};
