// личный кабинет - вкладки, операции, график

// загрузка пользователя
var userData = localStorage.getItem('budgetUser');
if (userData) {
  var user = JSON.parse(userData);
  document.getElementById('user-name').textContent = user.username || user.fio || 'Пользователь';
  if (user.fio) document.getElementById('fio').value = user.fio;
  if (user.email) document.getElementById('profile-email').value = user.email;
} else {
  // гость без регистрации
  document.getElementById('user-name').textContent = 'Гость';
}

// вкладки
var tabBtns = document.querySelectorAll('.tabs__btn');
tabBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var tabId = btn.getAttribute('data-tab');

    tabBtns.forEach(function (b) {
      b.classList.remove('tabs__btn--active');
    });
    btn.classList.add('tabs__btn--active');

    document.querySelectorAll('.tabs__panel').forEach(function (panel) {
      panel.hidden = true;
      panel.classList.remove('tabs__panel--active');
    });

    var panel = document.getElementById('tab-' + tabId);
    panel.hidden = false;
    panel.classList.add('tabs__panel--active');

    if (tabId === 'stats') {
      drawChart();
    }
  });
});

// сохранение профиля
document.getElementById('profile-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var fio = document.getElementById('fio').value;
  var email = document.getElementById('profile-email').value;

  var saved = userData ? JSON.parse(userData) : {};
  saved.fio = fio;
  saved.email = email;
  saved.username = saved.username || fio.split(' ')[0];
  localStorage.setItem('budgetUser', JSON.stringify(saved));
  document.getElementById('user-name').textContent = saved.username;
  alert('Профиль сохранён');
});

// аватар
document.getElementById('avatar-input').addEventListener('change', function (e) {
  var file = e.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (ev) {
      document.getElementById('avatar-img').src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// выход
document.getElementById('btn-logout').addEventListener('click', function () {
  if (confirm('Точно выйти?')) {
    localStorage.removeItem('budgetUser');
    window.location.href = 'index.html';
  }
});

// модалка операции
var opModal = document.getElementById('operation-modal');
document.getElementById('btn-add-operation').addEventListener('click', function () {
  opModal.removeAttribute('hidden');
});

document.querySelectorAll('[data-close-modal]').forEach(function (el) {
  el.addEventListener('click', function () {
    var m = el.closest('.modal');
    if (m) m.setAttribute('hidden', '');
  });
});

document.getElementById('operation-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var type = document.getElementById('op-type').value;
  var cat = document.getElementById('op-category').value || 'Другое';
  var sum = document.getElementById('op-sum').value;

  if (!sum || sum <= 0) {
    alert('Введите сумму');
    return;
  }

  var tbody = document.getElementById('operations-body');
  var tr = document.createElement('tr');
  var today = new Date();
  var dateStr = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

  var typeText = type === 'income' ? 'Доход' : 'Расход';
  var typeClass = type === 'income' ? 'operations-table__income' : 'operations-table__expense';
  var sign = type === 'income' ? '+ ' : '- ';

  tr.innerHTML = '<td>' + dateStr + '</td><td class="' + typeClass + '">' + typeText + '</td><td>' + cat + '</td><td>' + sign + sum + ' руб.</td>';
  tbody.insertBefore(tr, tbody.firstChild);

  opModal.setAttribute('hidden', '');
  document.getElementById('operation-form').reset();
});

// простой круговой график на canvas (без библиотек)
function drawChart() {
  var canvas = document.getElementById('chart-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  var cx = w / 2;
  var cy = h / 2;
  var r = 140;

  // пример данных для графика
  var data = [
    { label: 'Продукты', value: 35, color: '#2d6a4f' },
    { label: 'Транспорт', value: 15, color: '#40916c' },
    { label: 'Развлечения', value: 20, color: '#52b788' },
    { label: 'Жильё', value: 25, color: '#74c69d' },
    { label: 'Другое', value: 5, color: '#95d5b2' }
  ];

  var total = 0;
  for (var i = 0; i < data.length; i++) {
    total += data[i].value;
  }

  ctx.clearRect(0, 0, w, h);
  var start = -Math.PI / 2;

  for (var j = 0; j < data.length; j++) {
    var slice = (data[j].value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + slice);
    ctx.closePath();
    ctx.fillStyle = data[j].color;
    ctx.fill();
    start += slice;
  }

  // дырка посередине (как donut)
  ctx.beginPath();
  ctx.arc(cx, cy, 70, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
}

// нарисовать при загрузке если открыта stats - нет, только при клике
// но можно сразу для теста
drawChart();
