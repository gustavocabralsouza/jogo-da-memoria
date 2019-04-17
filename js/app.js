jQuery(function () {
  main();
});

// variables
const activeCards = '.card.show:not(.verified)';
const activeCardsVerified = '.verified';
const activeCardsValues = '.card.show:not(.verified) .card-back span';
const descMoves = '.moves span:first-of-type'
const numMoves = '.moves span:last-of-type'
const start = '.bk-start';
function main() {
  $('.btn-start').on('click', function (e) {
    building();
    $(start).fadeOut("slow");
    game();
  });
}

// html building
function building() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8];
  array = embaralhar(array.concat(array));

  const div = array.map(function (num) {
    const html = `
    <div class="card">
      <div class="card-front">
        <span>front</span>
      </div>
      <div class="card-back">
        <span>${num}</span>
      </div>
    </div>
    `
    return html;
  });

  $('.container-game').append(div);

}

// logic of the game
function game() {
  $('.card').on('click', function (e) {
    //validando clique
    if (e.currentTarget.className.indexOf('show') > -1) {
      return;
    }

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

    //check fim do jogo
    checkEnd(activeCards);
  });

  const showCard = (elem) => elem.toggleClass('show');

  const hideCards = (elem) => {
    if (elem.length > 1) {
      elem.removeClass('show');
      //count moves
      countMoves();
    }
  }

  const checkCards = (cards, activeCards) => {
    if ($(cards)[0].textContent === $(cards)[1].textContent) {
      $(activeCards).addClass('verified')
      //count moves
      countMoves();
    } else {
      setTimeout(() => hideCards($(activeCards)), 800);
    }
  }

  const checkEnd = (t) => {
    if ($('.verified').length === 16) {
      setTimeout(() => $('#modal-end-game').modal('show'), 500);
    }
  }

  const countMoves = () => {
    const num = $(numMoves).text() || 0;
    $(numMoves).text(parseInt(num) + 1);
  }

}

//shuffling array
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