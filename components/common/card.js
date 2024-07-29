function card({img, hoverScaled}) {
  const classes = `card ${hoverScaled ? 'card_scale' : ''}`;

  return `
    <div class="${classes}">
      <img class="card-img" alt="" src=${img} />
    </div>
  `;
}