const gameState = {
  _isActiveGame: false,
  _activePerson: undefined,
  _lives: {comp: 2, player: 2},
  _pass: [],
  _cards: {
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
};

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
      infoNode.innerHTML = this._activePerson === 'comp' ? 'Ваш противник ходит первым' : 'Вы ходите первым';
      infoNode.style.opacity = '1';

      setTimeout(() => {
        infoNode.style.opacity = '0';
      }, 1600);

      if (this._activePerson === 'comp') {
        const commands = document.getElementsByClassName('command');
        for(let command of commands) {
          command.classList.add('battlefield-side__action-panel_command_disable');
        }
      }

      const initCardsCount = 10;

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
        active: {
          count: compCards.length - initCardsCount,
          cards: compCards.filter((card) => !initCardsArr.find((item) => card.img === item.img))
        }
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
        active: {
          count: playerCards.length - initCardsCount,
          cards: playerCards.filter((card) => initCards.has(card))
        }
      };
    } else {
      const commands = document.getElementsByClassName('command');
      for(let command of commands) {
        command.classList.remove('battlefield-side__action-panel_command_disable');
      }

      this.compCards = {
        hand: {count: 0, cards: []},
        reset: {last: null, count: 0, cards: []},
        active: {
          count: compCards.length,
          cards: compCards
        }
      };

      this.playerCards = {
        hand: {count: 0, cards: []},
        reset: {last: null, count: 0, cards: []},
        active: {
          count: playerCards.length,
          cards: playerCards
        }
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

    const infoBlock = document.getElementsByClassName('info-block comp')[0];
    infoBlock.getElementsByClassName('info-block__cards-count')[0].innerHTML = v.hand.count;
    const sideContainer = document.getElementsByClassName('battlefield-side__container comp')[0];
    sideContainer.getElementsByClassName('battlefield-side__count')[0].innerHTML = v.active.count;
  },
});

Object.defineProperty(gameState, "playerCards", {
  set: function (v) {
    this._cards.player = v;

    const infoBlock = document.getElementsByClassName('info-block player')[0];
    infoBlock.getElementsByClassName('info-block__cards-count')[0].innerHTML = v.hand.count;
    const sideContainer = document.getElementsByClassName('battlefield-side__container player')[0];
    sideContainer.getElementsByClassName('battlefield-side__count')[0].innerHTML = v.active.count;

    const cardsContainer = document.getElementById('battlefield-cards').getElementsByClassName('battlefield-row__container')[0];
    const cards = cardsContainer.getElementsByClassName('card-img');

    const oldCardsNodes = [];
    for (const el of cards) {
      if (!v.hand.cards.find((card) => el.src.includes(card.img))) {
        oldCardsNodes.push(el.parentElement);
      }
    }
    oldCardsNodes.forEach((node) => {
      node.remove();
    });

    const newCards = v.hand.cards.filter((card) => {
      for (const el of cards)
        if (el.src.includes(card.img))
          return false;

      return true;
    });
    newCards.forEach((newCard) => {
      const newCardNode = card({ img: newCard.img, hoverScaled: true, cardId: newCard.id });
      cardsContainer.append(newCardNode);
      addHandCardsListeners(newCardNode, newCard);
    });
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
