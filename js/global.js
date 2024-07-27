const gameState = {};

Object.defineProperty(gameState, "_isActiveGame", {
  value: false,
  writeable: true,
  configurable: true,
});
Object.defineProperty(gameState, "_activePerson", {
  writeable: true,
  configurable: true
});
Object.defineProperty(gameState, "_lives", {
  value: {comp: 2, player: 2},
  writeable: true,
  configurable: true,
});
Object.defineProperty(gameState, "_pass", {
  value: [],
  writeable: true,
  configurable: true,
});
Object.defineProperty(gameState, "_cards", {
  value: {
    comp: {
      hand: {count: 0, cards: []},
      reset: {last: null, count: 0, cards: []},
      active: {count: compCards.length, cards: compCards}
    },
    player: {
      hand: {count: 0, cards: []},
      reset: {last: null, count: 0, cards: []},
      active: {count: playerCards.length, cards: playerCards}
    }
  },
  writeable: true,
  configurable: true,
});

Object.defineProperty(gameState, 'isActiveGame', {
  set: function (v) {
    this._isActiveGame = v;
  },
});

Object.defineProperty(gameState, 'activePerson', {
  set: function (v) {
    this._activePerson = v;
  },
});

Object.defineProperty(gameState, 'lives', {
  set: function (v) {
    this._lives = v;
  },
});

Object.defineProperty(gameState, "comp-cards", {
  set: function (v) {
    this._cards.comp = v;
  },
});

Object.defineProperty(gameState, "player-cards", {
  set: function (v) {
    this._cards.player = v;
  },
});

Object.defineProperty(gameState, "pass", {
  set: function (v) {
    this._pass = v ? [...this._pass, v] : [];
  },
});
