function backdropClick(backdrop) {
  backdrop.style.display = 'none'
  document.getElementById("backdrop-card").remove();
}

function addBackdropHandlers() {
  const backdrop = document.getElementById('backdrop');
  backdrop.addEventListener('click', () => backdropClick(backdrop));
}

function addBackdropCardHandlers() {
  const backdropCard = document.getElementById('backdrop-card');

  const getScaledValue = (range1, range2, value) => (value - range1[0]) * (range2[1] - range2[0]) / (range1[1] - range1[0]);

  backdropCard.addEventListener('mousemove', (event) => {
    const width = backdropCard.clientWidth;
    const height = backdropCard.clientHeight;

    const xScaled = getScaledValue([0, width], [0, 10], event.offsetX);
    const xRotation = xScaled - 5;
    const yScaled = getScaledValue([0, height], [0, 10], event.offsetY);
    const yRotation = yScaled - 5;

    backdropCard.style.transform = `translate(-50%, -50%) perspective(200px) rotateY(${xRotation}deg) rotateX(${yRotation}deg)`;
  });
  backdropCard.addEventListener('mouseleave', () => {
    backdropCard.style.transform = 'translate(-50%, -50%)';
  });
}

function onClickLeader({img}) {
  const backdrop = document.getElementById('backdrop');
  backdrop.style.display = 'block';

  const backdropCard = document.createElement("div");
  backdropCard.id = "backdrop-card";
  backdropCard.append(card({img}));

  backdrop.append(backdropCard);

  addBackdropCardHandlers();
}

function addLeadersHandlers() {
  const leadersImgs = document.getElementsByClassName('leader-block__img');

  leadersImgs[0].addEventListener('click', () => {
    onClickLeader({img: leadersImgs[0].src})
  });
  leadersImgs[1].addEventListener('click', () => {
    onClickLeader({img: leadersImgs[1].src})
  });
}

function addHandlers() {
  addBackdropHandlers();
  addLeadersHandlers();
  addActionPanelHandlers();

  document.addEventListener('contextmenu', event => event.preventDefault());
}

function addActionPanelHandlers() {
  const start = document.getElementById('start-command');
  const continueCommand = document.getElementById('continue-command');
  const end = document.getElementById('end-command');
  const endGame = document.getElementById('endgame-command');

  start.addEventListener('click', () => {
    gameState.isActiveGame = true;
    continueCommand.className = '';
    end.className = '';
    endGame.className = '';
    start.classList.add('battlefield-side__action-panel_command_disabled');
  });
  continueCommand.addEventListener('click', () => {
    gameState.pass = [...gameState._pass, 'player'];
  });
  end.addEventListener('click', () => {
    gameState.activePerson = gameState.activePerson === 'player' ? 'comp' : 'player';
  });
  endGame.addEventListener('click', () => {
    gameState.isActiveGame = false;
    continueCommand.classList.add('battlefield-side__action-panel_command_disabled');
    end.classList.add('battlefield-side__action-panel_command_disabled');
    endGame.classList.add('battlefield-side__action-panel_command_disabled');
    start.className = '';
  });
}

function addHandCardsListeners(cardNode, card) {
  cardNode.addEventListener('click', () => {
    if (!gameState._isActiveGame || gameState._activePerson !== 'player') return;

    if (cardNode.classList.value.includes('card_select')) {
      cardNode.classList.remove('card_select');

      const selectedRows = document.getElementsByClassName('battlefield-row_select');
      for (let row of selectedRows) {
        row.classList.remove('battlefield-row_select');
      }

      return;
    }

    const selectedCards = document.getElementsByClassName('card_select');
    if (selectedCards.length) {
      selectedCards[0].classList.remove('card_select');
      const selectedRows = document.getElementsByClassName('battlefield-row_select');
      for (let row of selectedRows) {
        row.classList.remove('battlefield-row_select');
      }
    }

    cardNode.classList.add('card_select');
    const playerBattlefield = document.getElementById("battlefield-board__bottom");

    card.rows.forEach((row) => {
      const rowNode = playerBattlefield.getElementsByClassName(`battlefield-row ${row}`)[0];
      rowNode.getElementsByClassName('battlefield-row__container')[0].classList.add('battlefield-row_select');
    });
  });

  cardNode.addEventListener('contextmenu', () => {
    // zoom card container
  });
}
