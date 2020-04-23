// ---------------FUNCTION FOR BREADTH FIRST ALGORITHM-------------------

const breadthFirstAlgo = (board) => {
  if (
    board.start.length === 0 ||
    board.target.length === 0 ||
    board.start === board.target
  ) {
    return false;
  }
  const queue = [];
  const visitedNodes = [];
  const [i, j] = board.start.split(`-`);
  const root = board.allNodesArray[i][j];
  queue.push(root);
  visitedNodes[board.start] = true;
  while (queue.length) {
    let currentNode = queue.shift();
    board.nodesToAnimate.push(currentNode);
    currentNode.status = `visited`;
    if (currentNode.id === board.target) return `success`;

    let currentNeighbours = getNeighbours(board, currentNode.id);

    currentNeighbours.forEach((neighbour) => {
      if (!visitedNodes[neighbour]) {
        visitedNodes[neighbour] = true;
        const [row, col] = neighbour.split(`-`);
        board.allNodesArray[row][col].previousNode = currentNode.id;
        const neighbourNode = board.allNodesArray[row][col];
        queue.push(neighbourNode);
      }
    });
  }
  return false;
};

// ----------------FUNCTION FOR DECIDING NEIGHBOURS OF A NODE-----------------

const getNeighbours = (board, id) => {
  const [row, col] = id.split(`-`);
  const neighbours = [];
  if (board.allNodesArray[row - 1] && board.allNodesArray[row - 1][col]) {
    if (board.allNodesArray[row - 1][col].status !== `wall`) {
      neighbours.push(`${row - 1}-${col}`);
    }
  }
  if (board.allNodesArray[row][col + 1]) {
    if (board.allNodesArray[row][col + 1].status !== `wall`) {
      neighbours.push(`${row}-${col + 1}`);
    }
  }
  if (board.allNodesArray[row + 1] && board.allNodesArray[row + 1][col]) {
    if (board.allNodesArray[row + 1][col].status !== `wall`) {
      neighbours.push(`${row + 1}-${col}`);
    }
  }
  if (board.allNodesArray[row][col - 1]) {
    if (board.allNodesArray[row][col - 1].status !== `wall`) {
      neighbours.push(`${row}-${col - 1}`);
    }
  }
  return neighbours;
};

export default breadthFirstAlgo;
