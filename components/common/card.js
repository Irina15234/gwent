function card({img, hoverScaled, cardId}) {
  const classes = `card ${hoverScaled ? 'card_scale' : ''}`;

  const cardNode = document.createElement("div");
  cardNode.className = classes;

  const imgNode = document.createElement('img');
  imgNode.className = 'card-img';
  imgNode.alt = "";
  imgNode.src = img;
  imgNode.id = cardId;

  cardNode.append(imgNode);

  return cardNode;
}