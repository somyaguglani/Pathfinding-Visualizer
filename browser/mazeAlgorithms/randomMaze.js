let specialNodes = [`start`, `target`];

const randomMaze = (board, type) => {
  for (let row = 0; row < board.height; row++) {
    for (let col = 0; col < board.height; col++) {
      let random = Math.random();
      const currElement = document.getElementById(`${row}-${col}`);
      const currNode = board.allNodesArray[row][col];
      let limit = type === `wall` ? 0.25 : 0.35;
      if (random < limit && !specialNodes.includes(currElement.className)) {
        if (type === `wall`) {
          currElement.className = `wall`;
          currNode.status = `wall`;
          currNode.weight = 0;
        } else if (type === `weight`) {
          currElement.className = `unvisited weight`;
          currNode.status = "unvisited";
          currNode.weight = 15;
        }
      }
    }
  }
};

export default randomMaze;
