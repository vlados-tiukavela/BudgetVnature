// поиск по категориям

var poisk = document.getElementById('search-categories');
var filtr = document.getElementById('filter-type');
var kartochki = document.querySelectorAll('.product-card');

function obnovitSpisok() {
  var tekst = poisk.value.toLowerCase();
  var tip = filtr.value;

  for (var i = 0; i < kartochki.length; i++) {
    var k = kartochki[i];
    var nazv = k.getAttribute('data-name');
    var tipK = k.getAttribute('data-type');
    var podhodit = true;

    if (tekst && nazv.indexOf(tekst) === -1) {
      podhodit = false;
    }
    if (tip !== 'all' && tipK !== tip) {
      podhodit = false;
    }

    if (podhodit) {
      k.style.display = 'block';
    } else {
      k.style.display = 'none';
    }
  }
}

poisk.oninput = obnovitSpisok;
filtr.onchange = obnovitSpisok;
