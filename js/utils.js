const changeHandCardsCount = (v, player) => {
  const infoBlock = document.getElementsByClassName(`info-block ${player}`)[0];
  infoBlock.getElementsByClassName('info-block__cards-count')[0].innerHTML = v.hand.count;
  const sideContainer = document.getElementsByClassName(`battlefield-side__container ${player}`)[0];
  sideContainer.getElementsByClassName('battlefield-side__count')[0].innerHTML = v.active.count;
};

const changeHandCardsForComp = (v) => {
  const selectedCard = gameState._cards.comp.hand.cards.find((card) => !v.hand.cards.find((c) => card.id === c.id));

  if (selectedCard) {
    const cardsContainer = document.getElementById('battlefield-board__top').getElementsByClassName(`battlefield-row ${selectedCard.rows[0]}`)[0].getElementsByClassName('battlefield-row__container')[0];

    const newCardNode = card({img: selectedCard.img, hoverScaled: true, cardId: selectedCard.id});
    cardsContainer.append(newCardNode);
    addHandCardsListeners(newCardNode, selectedCard);
  }
};

const changeHandCards = (v) => {
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
    const newCardNode = card({img: newCard.img, hoverScaled: true, cardId: newCard.id});
    cardsContainer.append(newCardNode);
    addHandCardsListeners(newCardNode, newCard);
  });
};

const changeFieldCards = (v, player) => {
  const values = [];

  Object.keys(v.field).forEach((key) => {
    const value = v.field[key].reduce((prev, val) => prev + val.power, 0);
    values.push(value);
    gameState[`${player}Points`] = {[key]: value};
  });
  gameState[`${player}Points`] = {total: values[0] + values[1] + values[2]};
};

const changePoints = (v, player) => {
  const battlefield = document.getElementById(player === 'comp' ? 'battlefield-board__top' : 'battlefield-board__bottom');
  const rows = battlefield.getElementsByClassName('battlefield-row');
  for (let row of rows) {
    const rowType = row.className.split('battlefield-row ')[1];
    row.getElementsByClassName('points')[0].innerHTML = gameState._points[player][rowType];
  }

  document.getElementsByClassName(`info-block ${player}`)[0].getElementsByClassName('points')[0].innerText = gameState._points[player].total;

  const totals = {
    comp: gameState._points.comp.total,
    player: gameState._points.player.total
  };

  const compPoints = document.getElementsByClassName(`info-block comp`)[0].getElementsByClassName('points-container')[0];
  const playerPoints = document.getElementsByClassName(`info-block player`)[0].getElementsByClassName('points-container')[0];

  if (totals.player > totals.comp) {
    compPoints.classList.remove('points-container_gold');
    playerPoints.classList.add('points-container_gold');
  } else if (totals.comp > totals.player) {
    playerPoints.classList.remove('points-container_gold');
    compPoints.classList.add('points-container_gold');
  } else {
    compPoints.classList.remove('points-container_gold');
    playerPoints.classList.remove('points-container_gold');
  }
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const resetGame = () => {
  const commands = document.getElementsByClassName('command');
  for (let command of commands) {
    command.classList.remove('battlefield-side__action-panel_command_disable');
  }

  gameState.compCards = {
    hand: {count: 0, cards: []},
    reset: {last: null, count: 0, cards: []},
    active: {
      count: compCards.length,
      cards: compCards
    },
    field: {warrior: [], archer: [], artillery: []}
  };

  gameState.playerCards = {
    hand: {count: 0, cards: []},
    reset: {last: null, count: 0, cards: []},
    active: {
      count: playerCards.length,
      cards: playerCards
    },
    field: {warrior: [], archer: [], artillery: []}
  };

  const compPoints = document.getElementsByClassName(`info-block comp`)[0].getElementsByClassName('points-container')[0];
  const playerPoints = document.getElementsByClassName(`info-block player`)[0].getElementsByClassName('points-container')[0];
  compPoints.classList.remove('points-container_gold');
  playerPoints.classList.remove('points-container_gold');

  gameState.compPoints = {total: 0, warrior: 0, archer: 0, artillery: 0};
  gameState.playerPoints = {total: 0, warrior: 0, archer: 0, artillery: 0};

  const rows = document.getElementsByClassName('battlefield-row__container');
  for (let row of rows) {
    row.innerHTML = '';
  }
};

const initGame = () => {
  const initActivePerson = () => {
    gameState.activePerson = Math.random() > 0.5 ? 'comp' : 'player';
    const infoNode = document.getElementById('round-info');
    infoNode.innerHTML = gameState._activePerson === 'comp' ? 'Ваш противник ходит первым' : 'Вы ходите первым';
    infoNode.style.opacity = '1';

    setTimeout(() => {
      infoNode.style.opacity = '0';
    }, 1600);
  };
  const initCommands = () => {
    const commands = document.getElementsByClassName('command');
    for (let command of commands) {
      command.classList.add('battlefield-side__action-panel_command_disable');
    }
  };
  const initCards = () => {
    const initCardsCount = 10;

    const initCards = new Set();
    let initCardsArr = [];
    while (initCards.size < initCardsCount) {
      initCards.add(compCards[randomIntFromInterval(0, compCards.length - 1)]);
    }
    initCards.forEach((value) => {
      initCardsArr.push(value);
    });

    gameState.compCards = {
      ...gameState._cards.comp,
      hand: {count: initCardsCount, cards: initCardsArr},
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

    gameState.playerCards = {
      ...gameState._cards.player,
      hand: {count: initCardsCount, cards: initCardsArr},
      active: {
        count: playerCards.length - initCardsCount,
        cards: playerCards.filter((card) => initCards.has(card))
      }
    };
  };

  initActivePerson();
  initCommands();
  initCards();
};

const changePass = () => {
  const compPass = document.getElementsByClassName('info-block comp')[0].getElementsByClassName('pass')[0];
  const playerPass = document.getElementsByClassName('info-block player')[0].getElementsByClassName('pass')[0];

  if (gameState._pass.length) {
    if (gameState._pass.includes('comp')) {
      compPass.style.display = 'block';
    }
    if (gameState._pass.includes('player')) {
      playerPass.style.display = 'block';
    }
  } else {
    compPass.style.display = 'none';
    playerPass.style.display = 'none';
  }
};
