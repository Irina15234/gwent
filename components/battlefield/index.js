function renderBattlefield() {
    const battlefieldBoardTop = document.getElementById("battlefield-board__top");
    const battlefieldBoardBottom = document.getElementById("battlefield-board__bottom");
    const battlefieldCards = document.getElementById("battlefield-cards");

    battlefieldBoardTop.innerHTML = battlefieldRow("artillery");
    battlefieldBoardTop.innerHTML += battlefieldRow("archer");
    battlefieldBoardTop.innerHTML += battlefieldRow("warrior");

    battlefieldBoardBottom.innerHTML = battlefieldRow("warrior");
    battlefieldBoardBottom.innerHTML += battlefieldRow("archer");
    battlefieldBoardBottom.innerHTML += battlefieldRow("artillery");

    battlefieldCards.innerHTML = battlefieldCardsContainer({});

    renderBattlefieldSide({});
}