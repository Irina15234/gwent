function renderBattlefield() {
    const battlefieldBoardTop = document.getElementById("battlefield-board__top");
    const battlefieldBoardBottom = document.getElementById("battlefield-board__bottom");
    const battlefieldCards = document.getElementById("battlefield-cards");

    battlefieldBoardTop.innerHTML = battlefieldRow({});
    battlefieldBoardTop.innerHTML += battlefieldRow({});
    battlefieldBoardTop.innerHTML += battlefieldRow({});

    battlefieldBoardBottom.innerHTML = battlefieldRow({});
    battlefieldBoardBottom.innerHTML += battlefieldRow({});
    battlefieldBoardBottom.innerHTML += battlefieldRow({});

    battlefieldCards.innerHTML = battlefieldCardsContainer({});

    renderBattlefieldSide({});
}