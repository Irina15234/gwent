const gameState = {
  _isActiveGame: false,
  _activePerson: undefined,
  _isActiveAction: true,
  _lives: {comp: 2, player: 2},
  _pass: [],
  _cards: {
    comp: {
      hand: {count: 0, cards: []},
      reset: {last: null, count: 0, cards: []},
      active: {count: compCards.length, cards: compCards},
      field: { warrior: [], archer: [], artillery: [] }
    },
    player: {
      hand: {count: 0, cards: []},
      reset: {last: null, count: 0, cards: []},
      active: {count: playerCards.length, cards: playerCards},
      field: { warrior: [], archer: [], artillery: [] }
    }
  },
  _points: {
    comp: { total: 0, warrior: 0, archer: 0, artillery: 0 },
    player: { total: 0, warrior: 0, archer: 0, artillery: 0 }
  }
};

Object.defineProperty(gameState, 'activePerson', {
  set: function (v) {
    this._activePerson = v;

    if (v === 'comp') {
      compAction();
    }
  },
});

Object.defineProperty(gameState, 'isActiveAction', {
  set: function (v) {
    this._isActiveAction = v;
  },
});

Object.defineProperty(gameState, 'isActiveGame', {
  set: function (v) {
    this._isActiveGame = v;

    if (v) {
      initGame();
      if (gameState._activePerson === 'comp') {
        compAction();
      }
    } else {
      resetGame();
    }
  },
});

Object.defineProperty(gameState, 'lives', {
  set: function (v) {
    this._lives = v;
  },
});

Object.defineProperty(gameState, "compCards", {
  set: function (v) {
    changeHandCardsCount(v, 'comp');
    changeHandCardsForComp(v);
    changeFieldCards(v, 'comp');

    this._cards.comp = v;
  },
});

Object.defineProperty(gameState, "playerCards", {
  set: function (v) {
    this._cards.player = v;

    changeHandCardsCount(v, 'player');
    changeHandCards(v);
    changeFieldCards(v, 'player');
  },
});

Object.defineProperty(gameState, "pass", {
  set: function (v) {
    this._pass = v ? [...this._pass, v] : [];

    changePass();
  },
});

Object.defineProperty(gameState, "compPoints", {
  set: function (v) {
    this._points.comp = { ...this._points.comp, ...v };

    changePoints(v, 'comp');
  },
});

Object.defineProperty(gameState, "playerPoints", {
  set: function (v) {
    this._points.player = { ...this._points.player, ...v };

    changePoints(v, 'player');
  },
});
