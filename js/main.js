// бургер-меню

var header = document.querySelector('.header');
var burger = document.getElementById('burger');

if (burger && header) {
  burger.onclick = function () {
    header.classList.toggle('header--open');
  };

  var links = document.querySelectorAll('.nav__link');
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      header.classList.remove('header--open');
    };
  }
}
