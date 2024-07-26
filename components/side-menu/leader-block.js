function leaderBlock({leader, isActiveAction}) {
  const actionClasses = 'leader-block__action' + (isActiveAction ? ' leader-block__action_active' : '');

  return `
    <div class="leader-block">
      <div class="leader-block__container">
        <img class="leader-block__img" alt="" src=${leader.card} />
      </div>
      
      <div class="${actionClasses}">
        <div class="leader-block__action-button"><div class="leader-block__action-button-img"></div></div>
      </div>
    </div>
  `;
}