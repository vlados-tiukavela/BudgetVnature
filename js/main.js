// общий скрипт: бургер, модалки, слайдер на главной

(function () {
  // бургер меню на всех страницах
  var header = document.querySelector('.header');
  var burger = document.querySelector('.header__burger');

  if (burger && header) {
    burger.addEventListener('click', function () {
      header.classList.toggle('header--open');
    });

    var links = document.querySelectorAll('.nav__link');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        header.classList.remove('header--open');
      });
    }

    // закрыть меню если кликнули мимо
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        header.classList.remove('header--open');
      }
    });
  }

  // слайдер (только на главной)
  var slides = document.querySelectorAll('.slider__slide');
  var btnPrev = document.querySelector('.slider__arrow--prev');
  var btnNext = document.querySelector('.slider__arrow--next');
  var dotsContainer = document.querySelector('.slider__dots');
  var currentSlide = 0;
  var timer;

  if (slides.length > 0 && dotsContainer) {
    // точки
    for (var d = 0; d < slides.length; d++) {
      var dot = document.createElement('button');
      dot.className = 'slider__dot';
      if (d === 0) dot.classList.add('slider__dot--active');
      dot.setAttribute('type', 'button');
      dot.setAttribute('data-index', d);
      dotsContainer.appendChild(dot);
    }

    function showSlide(n) {
      if (n >= slides.length) currentSlide = 0;
      else if (n < 0) currentSlide = slides.length - 1;
      else currentSlide = n;

      for (var s = 0; s < slides.length; s++) {
        slides[s].classList.remove('slider__slide--active');
      }
      slides[currentSlide].classList.add('slider__slide--active');

      var dots = document.querySelectorAll('.slider__dot');
      for (var j = 0; j < dots.length; j++) {
        dots[j].classList.remove('slider__dot--active');
      }
      if (dots[currentSlide]) dots[currentSlide].classList.add('slider__dot--active');
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        showSlide(currentSlide - 1);
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        showSlide(currentSlide + 1);
      });
    }

    if (dotsContainer) {
      dotsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('slider__dot')) {
          var idx = parseInt(e.target.getAttribute('data-index'), 10);
          showSlide(idx);
        }
      });
    }

    // автопрокрутка каждые 5 сек
    function startAuto() {
      timer = setInterval(function () {
        showSlide(currentSlide + 1);
      }, 5000);
    }
    startAuto();

    // анимация при скролле - появление карточек
    var cards = document.querySelectorAll('.feature-card, .review');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      cards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
      });
    }
  }

  // модальные окна (общая функция для всех страниц где есть)
  var modalTriggers = document.querySelectorAll('[data-modal]');
  modalTriggers.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var id = btn.getAttribute('data-modal');
      var modal = document.getElementById(id);
      if (modal) {
        modal.removeAttribute('hidden');
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', function () {
      var modal = el.closest('.modal');
      if (modal) modal.setAttribute('hidden', '');
    });
  });

})();
