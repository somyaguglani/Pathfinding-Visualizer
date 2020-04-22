const specialNodes = [`start`, `target`];
const stairMaze = (board) => {
  let row = board.height - 1;
  let col = 0;
  while (row > 0 && col < board.width) {
    const currNode = board.allNodesArray[row][col];
    const currElement = document.getElementById(`${row}-${col}`);
    if (!specialNodes.includes(currNode.status)) {
      currNode.status = `wall`;
      board.wallsAnimationArray.push(currElement);
    }
    row--;
    col++;
  }
  while (row < board.height - 2 && col < board.width) {
    const currNode = board.allNodesArray[row][col];
    const currElement = document.getElementById(`${row}-${col}`);
    if (!specialNodes.includes(currNode.status)) {
      currNode.status = `wall`;
      board.wallsAnimationArray.push(currElement);
    }
    row++;
    col++;
  }

  while (row > 0 && col < board.width - 1) {
    const currNode = board.allNodesArray[row][col];
    const currElement = document.getElementById(`${row}-${col}`);
    if (!specialNodes.includes(currNode.status)) {
      currNode.status = `wall`;
      board.wallsAnimationArray.push(currElement);
    }
    row--;
    col++;
  }
};

export default stairMaze;
