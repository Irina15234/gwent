function infoBlock({title, subtitle, cardsCount, person}) {
  const blockClasses = `info-block ${person.name}`;

  return `
    <div class="${blockClasses}">
      <div class="info-block__container">
        <div class="info-block__avatar-container">
          <div class="info-block__avatar"><img alt="" src=${person.emblem} /></div>
        </div>
        <div>
          <div>
            <p class="info-block__title">${title}</p>
            <p class="info-block__subtitle">${subtitle}</p>
          </div>
          <div>
            <div class="info-block__cards">
              <img width="24" height="24" src="../../assets/cards-filled.svg" alt="">
              <span class='info-block__cards-count'>${cardsCount}</span>
            </div>
            <div class="info-block__lives">
              <img width="24" height="24" src="../../assets/red-gem.svg" alt="">
              <img width="24" height="24" src="../../assets/red-gem.svg" alt="">
            </div>
          </div>
        </div>
      </div>
      
      <div class='points-container'><span class="points">0</span></div>
    </div>`
}