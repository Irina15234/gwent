function infoBlock({title, subtitle, cardsCount, livesCount, person}) {
  const pointsClasses = 'points-container' + ' ' + person;

  return `
    <div class="info-block">
      <div class="info-block__container">
        <div class="info-block__avatar-container">
          <div class="info-block__avatar" ></div>
        </div>
        <div>
          <div>
            <p class="info-block__title">${title}</p>
            <p class="info-block__subtitle">${subtitle}</p>
          </div>
          <div>
            <div class="info-block__cards">
              <img width="24" height="24" src="../../assets/cards-filled.svg" alt="">
              <span>${cardsCount}</span>
            </div>
            <div class="info-block__lives">
              <img width="24" height="24" src="../../assets/red-gem.svg" alt="">
              <img width="24" height="24" src="../../assets/red-gem.svg" alt="">
            </div>
          </div>
        </div>
      </div>
      
      <div class="${pointsClasses}"><span class="points">0</span></div>
    </div>`
}