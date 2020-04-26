const astarAlgorithm = (board, heuristic) => {
  if (
    board.start.length === 0 ||
    board.target.length === 0 ||
    board.start === board.target
  ) {
    return false;
  }

  board.getNode(board.start).distance = 0;
  board.getNode(board.start).totalDistance = 0;
  board.getNode(board.start).direction = `up`;
  let unvisitedNodes = [];
  for (let row = 0; row < board.height; row++) {
    for (let col = 0; col < board.width; col++) {
      unvisitedNodes.push(`${row}-${col}`);
    }
  }
  console.log(unvisitedNodes);
  while (unvisitedNodes.length) {
    let currentNode = closestNode(board, unvisitedNodes);
    while (currentNode.status === `wall` && unvisitedNodes.length) {
      currentNode = closestNode(board, unvisitedNodes);
    }
    if (currentNode.distance === Infinity) return false;
    board.nodesToAnimate.push(currentNode);
    currentNode.status = `visited`;
    if (currentNode.id === board.target) {
      return `success`;
    }
    updateNeighbors(board, currentNode, heuristic);
  }
};

// --------------astar

const closestNode = (board, unvisitedNodes) => {
  let currentClosest;
  let index;

  for (let currIndex = 0; currIndex < unvisitedNodes.length; currIndex++) {
    if (
      !currentClosest ||
      currentClosest.totalDistance >
        board.getNode(unvisitedNodes[currIndex]).totalDistance
    ) {
      currentClosest = board.getNode(unvisitedNodes[currIndex]);
      index = currIndex;
    } else if (
      currentClosest.totalDistance ===
      board.getNode(unvisitedNodes[currIndex]).totalDistance
    ) {
      if (
        currentClosest.heuristicDistance >
        board.getNode(unvisitedNodes[currIndex]).heuristicDistance
      ) {
        currentClosest = board.getNode(unvisitedNodes[currIndex]);
        index = currIndex;
      }
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
};

const manhattanDistance = (firstNode, secondNode) => {
  const firstNodeCoordinates = firstNode.id
    .split(`-`)
    .map((coordinate) => parseInt(coordinate));
  const secondNodeCoordinates = secondNode.id
    .split(`-`)
    .map((coordinate) => parseInt(coordinate));
  const x1 = firstNodeCoordinates[0];
  const y1 = firstNodeCoordinates[1];
  const x2 = secondNodeCoordinates[0];
  const y2 = secondNodeCoordinates[1];
  const deltax = Math.abs(x1 - x2);
  const deltay = Math.abs(y1 - y2);

  return deltax + deltay;
};

const getNeighbors = (id, board) => {
  let coordinates = id.split(`-`);
  let row = parseInt(coordinates[0]);
  let col = parseInt(coordinates[1]);
  const neighbors = [];
  let potentialNeighbor;

  if (board.allNodesArray[row - 1] && board.allNodesArray[row - 1][col]) {
    potentialNeighbor = `${(row - 1).toString()}-${col.toString()}`;
    if (board.getNode(potentialNeighbor).status !== `wall`)
      neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row + 1] && board.allNodesArray[row + 1][col]) {
    potentialNeighbor = `${(row + 1).toString()}-${col.toString()}`;
    if (board.getNode(potentialNeighbor).status !== `wall`)
      neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row][col - 1]) {
    potentialNeighbor = `${row.toString()}-${(col - 1).toString()}`;
    if (board.getNode(potentialNeighbor).status !== `wall`)
      neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row][col + 1]) {
    potentialNeighbor = `${row.toString()}-${(col + 1).toString()}`;
    if (board.getNode(potentialNeighbor).status !== `wall`)
      neighbors.push(potentialNeighbor);
  }
  return neighbors;
};

const updateNeighbors = (board, currentNode, heuristic) => {
  let neighbours = getNeighbors(currentNode.id, board);
  for (let neighbour of neighbours) {
    if (board.target.length !== 0) {
      updateNode(
        currentNode,
        board.getNode(neighbour),
        board.getNode(board.target)
      );
    } else {
      updateNode(currentNode, board.getNode(neighbour));
    }
  }
};

const updateNode = (currentNode, targetNode, actualTargetNode) => {
  let distance = getDistance(currentNode, targetNode);
  if (!targetNode.heuristicDistance)
    targetNode.heuristicDistance = manhattanDistance(
      targetNode,
      actualTargetNode
    );
  let distanceToCompare =
    currentNode.distance + targetNode.weight + distance[0];
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.totalDistance =
      targetNode.distance + targetNode.heuristicDistance;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
};

const getDistance = (nodeOne, nodeTwo) => {
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "up"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "up"];
    }
  } else if (x2 > x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "down"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "down"];
    }
  }
  if (y2 < y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "left"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "left"];
    }
  } else if (y2 > y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "right"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "right"];
    }
  }
};

export default astarAlgorithm;
