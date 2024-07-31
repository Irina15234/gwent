function battlefieldRow(row) {
  const rowClasses = `battlefield-row ${row}`;

  return `
    <div class="${rowClasses}">
      <div class="points-container"><span class="points">0</span></div>
      <div class="battlefield-row__spec-container"></div>
      <div class="battlefield-row__container"></div>
    </div>`
}