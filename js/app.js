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
  // array = embaralhar(array.concat(array));
  array = array.concat(array);

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
  const bkStart = '.bk-start';

  $('.btn-start').on('click', function (e) {
    // cookies
    setCookie('start', 'true', 1);

    $(this).fadeOut(0);
    $(bkStart).fadeOut("slow");
    game();
  });

  // auto click start
  const cookieStart = getCookie('start');
  // if (cookieStart) {
  //   $(bkStart).fadeOut(0);
  // }
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

  $(".container-game").one("click", function () {
    timer();
  });

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
    location.reload();
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
    let num = $(numMoves).text() || 0;
    $(numMoves).text(parseInt(num) + 1);

    num = $(numMoves).text();

    if (num > 8) {
      scores(num);
    }
  }

  const endGame = () => {
    // timer
    const stringTimer = $('.container-timer span').text().replace('00h', '').replace('00m', '');
    const htmlStars = $('.stars').html();

    console.log(htmlStars);

    // scores
    const num = $(numMoves).text();
    scores(num);

    const html = `<h2>Congratulations</h2>
    <p>Você concluiu este maravilhoso e desafiador jogo!</p>
    <p>Todos os pares foram encontrados no tempo de ${stringTimer} com ${num} movimentos.</p>
    <p>Pontuação: <label></p>`;

    $("#modal-end-game .modal-body h2, #modal-end-game .modal-body p, #modal-end-game .modal-body .stars").remove();
    $('#modal-end-game .modal-body').append(html);
    $('#modal-end-game .modal-body p label').append(`<div class="stars">${htmlStars}</label></div>`);

    // modal
    $('#modal-end-game').modal('show');

    // timer
    clearTimeout(intervalo);
  }

  const scores = (num) => {
    const total = 100 * 8 / num;
    $('.stars .stars-active').css(`width`, `${total}%`)
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

// timer
let hours = 0, mins = 0, seconds = 0;

function timer() {
  intervalo = setTimeout(function () {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      mins++;
      if (mins > 59) {
        mins = 0;
        hours++;
        if (hours < 10) { $("#hora").text('0' + hours + 'h') } else $("#hora").text(hours + ':');
      }
      (mins < 10) ? $("#minuto").text('0' + mins + 'm') : $("#minuto").text(mins + ':');
    }

    (seconds < 10) ? $("#segundo").text('0' + seconds + 's') : $("#segundo").text(seconds + 's');

    $("#hora").text() != '00h' ? $("#hora").css('display', 'inline-block') : $("#hora").css('display', 'none');
    $("#minuto").text() != '00m' ? $("#minuto").css('display', 'inline-block') : $("#minuto").css('display', 'none');

    timer();
  }, 1000);
}

// set cookies
function setCookie(cname, cvalue, exdays) {
  const newDate = new Date();
  newDate.setTime(newDate.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + newDate.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get cookies
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}