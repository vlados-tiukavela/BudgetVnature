// страница категорий - поиск, фильтр, показать ещё

var grid = document.getElementById('categories-grid');
var cards = grid.querySelectorAll('.product-card');
var searchInput = document.getElementById('search-categories');
var filterSelect = document.getElementById('filter-type');
var btnMore = document.getElementById('btn-show-more');

// показать скрытые карточки
btnMore.addEventListener('click', function () {
  var hidden = document.querySelectorAll('.product-card--hidden');
  hidden.forEach(function (card) {
    card.classList.remove('product-card--hidden');
  });
  btnMore.style.display = 'none';
});

function filterCards() {
  var searchText = searchInput.value.toLowerCase();
  var typeFilter = filterSelect.value;

  cards.forEach(function (card) {
    var name = card.getAttribute('data-name') || '';
    var type = card.getAttribute('data-type') || '';
    var title = card.querySelector('.product-card__title').textContent.toLowerCase();

    var matchSearch = name.indexOf(searchText) >= 0 || title.indexOf(searchText) >= 0 || searchText === '';
    var matchType = typeFilter === 'all' || type === typeFilter;

    if (matchSearch && matchType && !card.classList.contains('product-card--hidden')) {
      card.style.display = '';
    } else if (matchSearch && matchType && card.classList.contains('product-card--hidden')) {
      // скрытые "ещё" не показываем при фильтре пока не нажали кнопку
      card.style.display = 'none';
    } else {
      card.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', filterCards);
filterSelect.addEventListener('change', filterCards);

// модалка категории
document.querySelectorAll('[data-modal="cat-modal"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var catName = link.getAttribute('data-cat');
    document.getElementById('cat-modal-title').textContent = catName;
    document.getElementById('cat-modal').removeAttribute('hidden');
  });
});
