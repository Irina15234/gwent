function card({img, hoverScaled}) {
  const classes = `card ${hoverScaled ? 'card_scale' : ''}`;

  const cardNode = document.createElement("div");
  cardNode.className = classes;

  const imgNode = document.createElement('img');
  imgNode.className = 'card-img';
  imgNode.alt = "";
  imgNode.src = img;

  cardNode.append(imgNode);

  return cardNode;
}