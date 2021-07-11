function shipFactory(length, name, direction = 'horizontal') {
  const details = {
    name,
    direction,
    isSunk: false,
  };

  const shipSize = new Array(length).fill(1);

  function isSink() {
    if (shipSize.every((part) => part === 'X')) {
      details.isSunk = true;
      return true;
    }
    return false;
  }

  function hit(position) {
    if (isSink()) {
      return true;
    }
    shipSize[position] = 'X';
    return shipSize;
  }

  return {
    details,
    hit,
    isSink,
    shipSize,
  };
}

export default shipFactory;
