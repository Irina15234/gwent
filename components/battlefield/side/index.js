function renderBattlefieldSide({}) {
  const side = document.getElementById('battlefield-side');

  side.innerHTML = sideContainer({lastDiscard: null, count: 21, card: 'assets/nilfgaard.png' });
  side.innerHTML += sideContainer({lastDiscard: null, count: 13, card: 'assets/temeria.png' });
}

function sideContainer({lastDiscard, count, card}) {
  return `
    <div class="battlefield-side__container">
      <div class="battlefield-side__discard battlefield-side__discard_disabled"><img alt="" style="" src=${lastDiscard} /></div>
      <div class="battlefield-side__card-desk">
        <img alt="" src=${card} />
        <div class="battlefield-side__count">${count}</div>
      </div>
    </div>
  `;
}