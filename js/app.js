jQuery(function () {
  main();
});

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
  });

  const showCard = (elem) => elem.toggleClass('show');
  const hideCards = (elem) => {
    if(elem.length > 1){
      elem.removeClass('show');
    }
  }

  const checkCards = (cards, activeCards) => {
    if ($(cards)[0].textContent === $(cards)[1].textContent) {
      $(activeCards).addClass('verified')
    } else {
      setTimeout(() => hideCards($(activeCards)), 1200);
    }
  }
}