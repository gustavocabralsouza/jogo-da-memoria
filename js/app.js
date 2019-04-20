jQuery(function () {
  building();
  main(); 
});

// html building
function building() {
  let array = [
    '<i class="fab fa-html5"></i>',
    '<i class="fab fa-behance"></i>',
    '<i class="fab fa-angular"></i>',
    '<i class="fab fa-css3"></i>',
    '<i class="fab fa-js"></i>',
    '<i class="fab fa-git"></i>',
    '<i class="fab fa-less"></i>',
    '<i class="fab fa-dribbble"></i>'
  ];
  array = embaralhar(array.concat(array));

  const htmlCards = array.map(function (num) {
    const html = `
    <div class="card">
      <div class="card-front"></div>
      <div class="card-back">
        <span>${num}</span>
      </div>
    </div>
    `
    return html;
  });

  $('.container-game').append(htmlCards);

  for (let i = 0; i < 5; i++) {
    $('.stars .stars-active').append('<i class="fas fa-star"></i>');
    $('.stars .stars-inactive').append('<i class="far fa-star"></i>');
  }
}

// call functions
function main() {
  const start = '.bk-start';

  $('.btn-start').on('click', function (e) {
    $(this).fadeOut(0);
    $(start).fadeOut("slow");
    game();
  });
}

// logic of the game
function game() {
  // variables
  const cards = '.card';
  const activeCards = '.card.show:not(.verified)';
  const activeCardsVerified = '.verified';
  const activeCardsValues = '.card.show:not(.verified) .card-back span svg';
  const descMoves = '.moves span:first-of-type'
  const numMoves = '.moves span:last-of-type'

  $('.card').on('click', function (e) {
    // validando clique
    if (e.currentTarget.className.indexOf('show') > -1) {
      return;
    }

    const activeCardsBefore = $(activeCards);

    // exibir valor do card
    $(this).toggleClass('show');

    // até dois cards ativos
    if (activeCardsBefore.length === 2) {
      checkCardsSimple($(activeCardsValues), $(activeCards));
      hideCards(activeCardsBefore);
    }
    const activeCardsAfter = $(activeCards);
    // verificando valores
    if (activeCardsAfter.length === 2) {
      checkCardsComplete($(activeCardsValues), $(activeCards));
    }

    // check fim do jogo 
    setTimeout(() => checkEndGame(activeCards), 500);
  });

  $('.btn-reload').on('click', function (e) {
    // reset moves
    $(numMoves).text('0');
    $(descMoves).text('Movimentos:');

    // reset stars
    $('.stars .stars-active').css('width', '0%')

    // reset cards
    $(cards).removeClass('show').removeClass('verified');
  });

  const hideCards = (elem) => {
    if (elem.length > 1) {
      elem.removeClass('show').removeClass('error');
    }
  }

  const checkCardsComplete = (cards, activeCards) => {
    if ($(cards)[0].dataset.icon === $(cards)[1].dataset.icon) {
      // hit 
      activeCards.addClass('verified');
    } else {
      //wrong
      activeCards.addClass('error');
      setTimeout(() => hideCards(activeCards), 500);
    }
    // count moves
    countMoves();
  }

  const checkCardsSimple = (cards, activeCards) => {
    if ($(cards)[0].dataset.icon === $(cards)[1].dataset.icon) {
      // hit 
      activeCards.addClass('verified');
    }
  }

  const checkEndGame = (t) => {
    if ($('.card:not(.verified)').length === 0) {
      setTimeout(() => endGame(), 300);
    }
  }

  const countMoves = () => {
    const num = $(numMoves).text() || 0;
    $(numMoves).text(parseInt(num) + 1);
  }

  const endGame = () => {
    // scores
    const num = $(numMoves).text();
    const total = 100 * 8 / num;
    $('.stars .stars-active').css(`width`, `${total}%`)

    const html = `<p>Você concluiu este maravilhoso e desafiador jogo!</p>
    <p>Todos os pares foram encontrados depois de ${num} movimentos.</p>`;

    $('#modal-end-game .modal-body').append(html);


    'Parabéns, você concluiu este maravilhoso e desafiador jogo!    Voce encontrou todos os pares em XX mins depois de X movimentos.'


    // modal
    $('#modal-end-game').modal('show');
  } 
}

// shuffling array
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