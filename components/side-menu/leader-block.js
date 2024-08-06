function leaderBlock({leader}) {
  return `
    <div class="leader-block">
      <div class="leader-block__container">
        <img class="leader-block__img" alt="" src=${leader.card} />
      </div>
    </div>
  `;
}