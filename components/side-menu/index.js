function renderSideMenu() {
    const sideMenu = document.getElementById("side-menu");

    sideMenu.innerHTML = leaderBlock({
        leader: { card: 'assets/cards/emgir.jpg' },
    });

    sideMenu.innerHTML += infoBlock({
        title: 'Противник',
        subtitle: 'Нильфгаард',
        person: { emblem: 'assets/nilfEmblem.png', name: 'comp' },
        cardsCount: gameState._cards.comp.hand.count
    });

    sideMenu.innerHTML += infoBlock({
        title: 'Геральт',
        subtitle: 'Королевства севера',
        person: { emblem: 'assets/temEmblem.png', name: 'player' },
        cardsCount: gameState._cards.player.hand.count
    });

    sideMenu.innerHTML += leaderBlock({
        leader: { card: 'assets/cards/foltest.jpg' },
    });
}