jQuery(function () {
  main();
});

function main() {

  $('.card').on('click', function (e) {
    //clicked on card that contains the show class
    if (e.currentTarget.className.indexOf('show') > -1) {
      return;
    }

    const activeCards = '.card.show';
    const activeCardsValues = '.card.show .card-back span';

    //até dois cards ativos
    if ($(activeCards).length === 2) {
      hideCards($(activeCards));
    }

    //exibir valor do card
    showCard($(this));

    //verificando valores
    if ($(activeCards).length === 2) {
      // hideCards($(activeCards));
      checkCards(activeCardsValues, activeCards);
    }

  });


  const showCard = (elem) => elem.toggleClass('show');
  const hideCards = (elem) => elem.removeClass('show');

  const checkCards = (elem, activeCards) => {
    if ($(elem)[0].textContent === $(elem)[1].textContent) {
      $($(activeCards)[0]).addClass('verified')
    } else {
      setTimeout(() => hideCards($(activeCards)), 1500);
    }
  }
}