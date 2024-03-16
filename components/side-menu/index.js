function renderSideMenu() {
    const sideMenu = document.getElementById("side-menu");

    sideMenu.innerHTML = leaderBlock({
        leader: null,
        isActiveAction: true
    });

    sideMenu.innerHTML += infoBlock({
        title: 'Противник',
        subtitle: 'Нильфгаард',
        avatar: null,
        cardsCount: 20,
        livesCount: 2
    });

    sideMenu.innerHTML += infoBlock({
        title: 'Геральт',
        subtitle: 'Королевства севера',
        avatar: null,
        cardsCount: 20,
        livesCount: 2
    });

    sideMenu.innerHTML += leaderBlock({
        leader: null,
        isActiveAction: false
    });
}