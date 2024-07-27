function renderSideMenu() {
    const sideMenu = document.getElementById("side-menu");

    sideMenu.innerHTML = leaderBlock({
        leader: { card: 'assets/cards/emgir.jpg' },
        isActiveAction: true
    });

    sideMenu.innerHTML += infoBlock({
        title: 'Противник',
        subtitle: 'Нильфгаард',
        person: { emblem: 'assets/nilfEmblem.png' },
        cardsCount: gameState._cards.comp.hand.count,
        livesCount: gameState._lives.comp
    });

    sideMenu.innerHTML += infoBlock({
        title: 'Геральт',
        subtitle: 'Королевства севера',
        person: { emblem: 'assets/temEmblem.png' },
        cardsCount: gameState._cards.player.hand.count,
        livesCount: gameState._lives.player
    });

    sideMenu.innerHTML += leaderBlock({
        leader: { card: 'assets/cards/foltest.jpg' },
        isActiveAction: false
    });
}