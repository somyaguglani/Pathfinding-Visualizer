//Greedy best first search is also based on precumputations but unlike A* the f-cost = h-cost which is the distance from target nodes so A* is better

//Dijkstra's Algorithm assumes that all nodes other than source are at Infinity and so finds the path to target by always updating the neighbours.

import astarAlgorithm from "../searchAlgorithms/astarAlgorithm.js";

// -----------------------FUNCTION FOR WEIGHTED ALGORITHMS----------------------

const weightedAlgorithms = (board, type) => {
  if (type === `astar`) return astarAlgorithm(board);

  if (
    board.start.length === 0 ||
    board.target.length === 0 ||
    board.start === board.target
  ) {
    return false;
  }
  board.getNode(board.start).distance = 0;
  board.getNode(board.start).direction = `right`;
  let unvisitedNodes = [];
  for (let row = 0; row < board.height; row++) {
    for (let col = 0; col < board.width; col++) {
      unvisitedNodes.push(`${row}-${col}`);
    }
  }

  while (unvisitedNodes.length) {
    let currentNode = closestNode(board, unvisitedNodes);
    while (currentNode.status === `wall` && unvisitedNodes.length) {
      currentNode = closestNode(board, unvisitedNodes);
    }
    if (currentNode.distance === Infinity) {
      return false;
    }
    board.nodesToAnimate.push(currentNode);
    currentNode.status = `visited`;
    if (currentNode.id === board.target) {
      return `success`;
    }

    if (type === `bestfirst`) {
      updateNeighbors(board, currentNode, type);
    } else if (type === `dijkstra`) {
      updateNeighbors(board, currentNode, type);
    }
  }
};

// --------------------FUNCTION FOR FINDING THE CLOSEST NODE--------------------

const closestNode = (board, unvisitedNodes) => {
  let currentClosest, index;
  for (let currIndex = 0; currIndex < unvisitedNodes.length; currIndex++) {
    if (
      !currentClosest ||
      currentClosest.distance >
        board.getNode(unvisitedNodes[currIndex]).distance
    ) {
      currentClosest = board.getNode(unvisitedNodes[currIndex]);
      index = currIndex;
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
};

// ------------------FUNCTION FOR UPDATING NEIGHBOURS  AND NODES-----------------

const updateNeighbors = (board, currentNode, type) => {
  let neighbours = getNeighbors(currentNode.id, board);
  for (let neighbour of neighbours) {
    if (board.target.length !== 0) {
      updateNode(
        currentNode,
        board.getNode(neighbour),
        board.getNode(board.target),
        type
      );
    } else {
      updateNode(currentNode, board.getNode(neighbour), type);
    }
  }
};

function updateNode(currentNode, targetNode, actualTargetNode, type) {
  let distance = getDistance(currentNode, targetNode);
  let distanceToCompare;
  if (actualTargetNode && type === `bestfirst`) {
    distanceToCompare =
      targetNode.weight +
      distance[0] +
      manhattanDistance(targetNode, actualTargetNode);
  } else {
    distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
  }
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
}

// ------------------FUNCTION FOR EXPLORING ALL FOUR NEIGHBOURS OF A NODE-------------------

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

// ------------------FUNCTION FOR CALCULATING DISTANCES BETWEEN NODES-----------------------

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

const getDistance = (nodeOne, nodeTwo) => {
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCoordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    }
  } else if (x2 > x1) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    }
  }
  if (y2 < y1) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    }
  } else if (y2 > y1) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    }
  }
};

export default weightedAlgorithms;
