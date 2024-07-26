function backdropClick(backdrop) {
  backdrop.style.display = 'none'
  document.getElementById("backdrop-card").remove();
}

function addBackdropHandlers() {
  const backdrop = document.getElementById('backdrop');
  backdrop.addEventListener('click', () => backdropClick(backdrop));
}

function addBackdropCardHandlers() {
  const backdropCard = document.getElementById('backdrop-card');

  const getScaledValue = (range1, range2, value) => (value - range1[0]) * (range2[1] - range2[0]) / (range1[1] - range1[0]);

  backdropCard.addEventListener('mousemove', (event) => {
    const width = backdropCard.clientWidth;
    const height = backdropCard.clientHeight;

    const xScaled = getScaledValue([0, width], [0, 10], event.offsetX);
    const xRotation = xScaled - 5;
    const yScaled = getScaledValue([0, height], [0, 10], event.offsetY);
    const yRotation = yScaled - 5;

    backdropCard.style.transform = `translate(-50%, -50%) perspective(200px) rotateY(${xRotation}deg) rotateX(${yRotation}deg)`;
  });
  backdropCard.addEventListener('mouseleave', () => {
    backdropCard.style.transform = 'translate(-50%, -50%)';
  });
}

function onClickLeader({img}) {
  const backdrop = document.getElementById('backdrop');
  backdrop.style.display = 'block';

  backdrop.innerHTML = `
    <div id="backdrop-card">${card({img})}</div>
  `;

  addBackdropCardHandlers();
}

function addLeadersHandlers() {
  const leadersImgs = document.getElementsByClassName('leader-block__img');

  leadersImgs[0].addEventListener('click', () => {
    onClickLeader({img: leadersImgs[0].src})
  });
  leadersImgs[1].addEventListener('click', () => {
    onClickLeader({img: leadersImgs[1].src})
  });
}

function addHandlers() {
  addBackdropHandlers();
  addLeadersHandlers();
}