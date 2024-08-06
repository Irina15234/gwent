function compAction() {
  if (gameState._pass.includes('comp')) {
    gameState.activePerson = 'player';
    return;
  }

  if (gameState._points.comp.total > gameState._points.player.total) {
    gameState.pass = 'comp';
    gameState.activePerson = 'player';
    return;
  }

  const handCards = gameState._cards.comp.hand.cards;
  const fieldCards = gameState._cards.comp.field;

  if (handCards.length) {
    const selectedCard = handCards[0];
    const cardType = selectedCard.rows[0];

    gameState.compCards = {...gameState._cards.comp,
      hand: {
        count: handCards.length - 1,
        cards: handCards.filter((card) => card.id !== selectedCard.id)
      },
      field: { ...fieldCards, [cardType]: [...fieldCards[cardType], selectedCard] },
    };
  } else {
    gameState.pass = 'comp';
  }

  gameState.activePerson = 'player';
}