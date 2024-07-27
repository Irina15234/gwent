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

Object.defineProperty(gameState, 'activePerson', {
  set: function (v) {
    this._activePerson = v;
  },
});

Object.defineProperty(gameState, 'isActiveGame', {
  set: function (v) {
    this._isActiveGame = v;

    if (v) {
      this.activePerson = Math.random() > 0.5 ? 'comp' : 'player';
      const infoNode = document.getElementById('round-info');
      infoNode.innerHTML = v === 'comp' ? 'Ваш противник ходит первым' : 'Вы ходите первым';
      infoNode.style.opacity = '1';

      setTimeout(() => { infoNode.innerHTML = ''; infoNode.style.opacity = '0'; }, 2000);

      const initCardsCount = 2;

      const initCards = new Set();
      let initCardsArr = [];
      while (initCards.size < initCardsCount) {
        initCards.add(compCards[randomIntFromInterval(0, compCards.length - 1)]);
      }
      initCards.forEach((value) => {
        initCardsArr.push(value);
      });

      this.compCards = {
        hand: {count: initCardsCount, cards: initCardsArr},
        reset: {last: null, count: 0, cards: []},
        active: {count: compCards.length - initCardsCount, cards: compCards.filter((card) => initCards.has(card))}
      };

      initCards.clear();
      initCardsArr = [];

      while (initCards.size < initCardsCount) {
        initCards.add(playerCards[randomIntFromInterval(0, playerCards.length - 1)]);
      }
      initCards.forEach((value) => {
        initCardsArr.push(value);
      });

      this.playerCards = {
        hand: {count: initCardsCount, cards: initCardsArr},
        reset: {last: null, count: 0, cards: []},
        active: {count: playerCards.length - initCardsCount, cards: playerCards.filter((card) => initCards.has(card))}
      };
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
    this._cards.comp = v;
  },
});

Object.defineProperty(gameState, "playerCards", {
  set: function (v) {
    this._cards.player = v;
  },
});

Object.defineProperty(gameState, "pass", {
  set: function (v) {
    this._pass = v ? [...this._pass, v] : [];
  },
});

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
