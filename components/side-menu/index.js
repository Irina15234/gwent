function renderSideMenu() {
    const sideMenu = document.getElementById("side-menu");

    sideMenu.innerHTML = leaderBlock({
        leader: { card: 'assets/cards/emgir.jpg' },
        isActiveAction: true
    });

    sideMenu.innerHTML += infoBlock({
        title: 'Противник',
        subtitle: 'Нильфгаард',
        person: null,
        cardsCount: 20,
        livesCount: 2
    });

    sideMenu.innerHTML += infoBlock({
        title: 'Геральт',
        subtitle: 'Королевства севера',
        person: null,
        cardsCount: 20,
        livesCount: 2
    });

    sideMenu.innerHTML += leaderBlock({
        leader: { card: 'assets/cards/foltest.jpg' },
        isActiveAction: false
    });
}