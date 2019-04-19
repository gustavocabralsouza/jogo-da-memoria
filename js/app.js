jQuery(function () {
  main();
  // $('.btn-start').click();
});

// variables
const cards = '.card';
const activeCards = '.card.show:not(.verified)';
const activeCardsVerified = '.verified';
const activeCardsValues = '.card.show:not(.verified) .card-back span svg';
const descMoves = '.moves span:first-of-type'
const numMoves = '.moves span:last-of-type'
const start = '.bk-start';

// call functions
function main() {
  $('.btn-start').on('click', function (e) {
    building();
    $(this).fadeOut(0);
    $(start).fadeOut("slow");
    game();
  });
}

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
  // array = embaralhar(array.concat(array));
  array = array.concat(array);

  const div = array.map(function (num) {
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

  $('.container-game').append(div);

  for (let i = 0; i < 5; i++) {
    $('.stars .stars-active').append('<i class="fas fa-star"></i>');
    $('.stars .stars-inactive').append('<i class="far fa-star"></i>');
  }

  // log
  console.log('built html');
}

// logic of the game
function game() {
  $('.card').on('click', function (e) {
    // validando clique
    if (e.currentTarget.className.indexOf('show') > -1) {
      return;
    }

    // até dois cards ativos
    if ($(activeCards).length === 2) {
      hideCards($(activeCards));
    }

    // exibir valor do card
    showCard($(this));

    // verificando valores
    if ($(activeCards).length === 2) {
      checkCards(activeCardsValues, activeCards);
    }

    // check fim do jogo
    setTimeout(() => checkEnd(activeCards), 500);
    
  });

  $('.btn-reload').on('click', function (e) {
    // reset moves
    $(numMoves).text('0');
    $(descMoves).text('Movimentos:');
    
    // reset stars
    $('.stars .stars-active').css('width', '0%')

    // reset cards
    $(cards).removeClass('show').removeClass('verified');

    // log
    console.log('game restarted');
  });

  const showCard = (elem) => elem.toggleClass('show');

  const hideCards = (elem) => {
    if (elem.length > 1) {
      elem.removeClass('show').removeClass('error');;
      // count moves
      countMoves();
    }
  }

  const checkCards = (cards, activeCards) => {
    if ($(cards)[0].dataset.icon === $(cards)[1].dataset.icon) {
      // hit
      setTimeout(() => $(activeCards).addClass('verified'), 500);
      // count moves
      countMoves();
    } else {
      setTimeout(() => $(activeCards).addClass('error'), 500);
      setTimeout(() => hideCards($(activeCards)), 1000);
    }
  }

  const checkEnd = (t) => {
    console.log($('.card:not(.verified)').length);
    // if ($('.verified').length === 16) {
      if ($('.card:not(.verified)').length === 0) {
      setTimeout(() => endGame(), 500);
    }
  }

  const countMoves = () => {
    const num = $(numMoves).text() || 0;
    $(numMoves).text(parseInt(num) + 1);
  }

  const endGame = () => {
    // scores
    const num = $(numMoves).text();
    const total = 100*8/num; 
    $('.stars .stars-active').css(`width`, `${total}%`)
    // modal
    $('#modal-end-game').modal('show');
    console.log('end game');
  }

  // log
  console.log('game started');
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