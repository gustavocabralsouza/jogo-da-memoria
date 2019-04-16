jQuery(function () {
  building();
  main();
});

function building() {
  // let array = [1, 2, 3, 4, 5, 6, 7, 8];
  let array = [1, 2];
  array = embaralhar(array.concat(array));

  const div = array.map(function (num) {
    return `<div class="card"><div class="card-front"><span>front</span></div><div class="card-back"><span>${num}</span></div></div>`;
  });

  $('.container-game').append(div);

}

function main() {
  $('.card').on('click', function (e) {
    //clicked on card that contains the show class
    if (e.currentTarget.className.indexOf('show') > -1) {
      return;
    }

    const activeCards = '.card.show:not(.verified)';
    const activeCardsValues = '.card.show:not(.verified) .card-back span';

    // até dois cards ativos
    if ($(activeCards).length === 2) {
      hideCards($(activeCards));
    }

    //exibir valor do card
    showCard($(this));

    //verificando valores
    if ($(activeCards).length === 2) {
      checkCards(activeCardsValues, activeCards);
    }

    //check end game
    checkEnd(activeCards);
  });

  const showCard = (elem) => elem.toggleClass('show');

  const hideCards = (elem) => {
    if (elem.length > 1) {
      elem.removeClass('show');
    }
  }

  const checkCards = (cards, activeCards) => {
    if ($(cards)[0].textContent === $(cards)[1].textContent) {
      $(activeCards).addClass('verified')
    } else {
      setTimeout(() => hideCards($(activeCards)), 800);
    }
  }
  const checkEnd = (t) => {
    // if ($('.verified').length === 16) {
    if ($('.verified').length === 4) {
      alert('End Game!');
    }
  }

}

function embaralhar(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
} 