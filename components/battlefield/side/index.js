function renderBattlefieldSide({}) {
  const side = document.getElementById('battlefield-side');

  side.innerHTML = sideContainer({
    lastDiscard: gameState._cards.comp.reset.last,
    count: gameState._cards.comp.active.count,
    card: 'assets/nilfgaard.png',
    personName: 'comp'
  });

  side.innerHTML += actionPanel();

  side.innerHTML += sideContainer({
    lastDiscard: gameState._cards.player.reset.last,
    count: gameState._cards.player.active.count,
    card: 'assets/temeria.png',
    personName: 'player'
  });
}

function sideContainer({lastDiscard, count, card, personName}) {
  const containerClasses = 'battlefield-side__container' + ' ' + personName;

  return `
    <div class="${containerClasses}">
      <div class="battlefield-side__discard battlefield-side__discard_disabled"><img alt="" style="" src=${lastDiscard} /></div>
      <div class="battlefield-side__card-desk">
        <img alt="" src=${card} />
        <div class="battlefield-side__count">${count}</div>
      </div>
    </div>
  `;
}

function actionPanel() {
  return `
    <div class="battlefield-side__action-panel">
      <p id="start-command">Начать</p>
      <p id="continue-command" class="command battlefield-side__action-panel_command_invisible">Пас</p>
      <p id="end-command" class="command battlefield-side__action-panel_command_invisible">Завершить ход</p>
      <p id="endgame-command" class="battlefield-side__action-panel_command_invisible">Сдаться</p>
    </div>
  `;
}