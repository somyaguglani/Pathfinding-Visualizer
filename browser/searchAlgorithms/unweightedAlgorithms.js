// ---------------------FUNCTION FOR BREADTH-FIRST AND DEPTH-FIRST SEARCH--------------------

const unweightedAlgorithm = (board, type) => {
  if (
    board.start.length === 0 ||
    board.target.length === 0 ||
    board.start === board.target
  ) {
    return false;
  }
  let starting = board.getNode(board.start);
  let queue = [starting];
  let visitedNodes = { starting: true };

  while (queue.length) {
    let currentNode = type === `breadthfirst` ? queue.shift() : queue.pop();
    board.nodesToAnimate.push(currentNode);
    if (type === `depthfirst`) visitedNodes[currentNode.id] = true;
    currentNode.status = `visited`;
    if (currentNode.id === board.target) return `success`;
    let currentNeighbors = getNeighbors(currentNode.id, board, type);
    console.log(currentNode.id, currentNeighbors);
    currentNeighbors.forEach((neighbour) => {
      if (!visitedNodes[neighbour]) {
        if (type === `breadthfirst`) visitedNodes[neighbour] = true;
        board.getNode(neighbour).previousNode = currentNode.id;
        queue.push(board.getNode(neighbour));
      }
    });
  }
  return false;
};

// --------------FUNCTION FOR EXPLORING FOUR POSSIBLE NEIGHBOURS OF A NODE-------------------

function getNeighbors(id, board, type) {
  let coordinates = id.split(`-`);
  let row = parseInt(coordinates[0]);
  let col = parseInt(coordinates[1]);
  let neighbors = [];
  let potentialNeighbor;
  if (board.allNodesArray[row - 1] && board.allNodesArray[row - 1][col]) {
    potentialNeighbor = `${(row - 1).toString()}-${col.toString()}`;
    if (board.getNode(potentialNeighbor).status !== `wall`) {
      if (type === "breadthfirst") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (board.allNodesArray[row][col + 1]) {
    potentialNeighbor = `${row.toString()}-${(col + 1).toString()}`;
    if (board.getNode(potentialNeighbor).status !== `wall`) {
      if (type === `breadthfirst`) {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (board.allNodesArray[row + 1] && board.allNodesArray[row + 1][col]) {
    potentialNeighbor = `${(row + 1).toString()}-${col.toString()}`;
    if (board.getNode(potentialNeighbor).status !== `wall`) {
      if (name === `breadthfirst`) {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  if (board.allNodesArray[row][col - 1]) {
    potentialNeighbor = `${row.toString()}-${(col - 1).toString()}`;
    if (board.getNode(potentialNeighbor).status !== `wall`) {
      if (name === `breadthfirst`) {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }
  return neighbors;
}

export default unweightedAlgorithm;
