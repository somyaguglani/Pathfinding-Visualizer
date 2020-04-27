import { addShortestPath } from "../animations/shortestPathAnimation.js";

// ----------------FUNCTION FOR LAUNCHING INSTANT ANIMATIONS------------------

const launchInstantAnimations = (board, success, type) => {
  let nodesToAnimate = [...board.nodesToAnimate];
  let shortestPathNodes;
  for (let currIndex = 0; currIndex < nodesToAnimate.length; currIndex++) {
    if (currIndex === 0) change(nodesToAnimate[currIndex]);
    else change(nodesToAnimate[currIndex], nodesToAnimate[currIndex - 1]);
  }
  board.nodesToAnimate = [];
  if (success) {
    addShortestPath(board, `draw`);
    shortestPathNodes = board.shortestPathNodesToAnimate;
  } else {
    board.reset();
    return;
  }

  let i;
  for (i = 0; i < shortestPathNodes.length; i++) {
    if (i === 0) shortestPathChange(shortestPathNodes[i]);
    else shortestPathChange(shortestPathNodes[i], shortestPathNodes[i - 1]);
  }
  board.reset();
  shortestPathChange(board.getNode(board.target), shortestPathNodes[i - 1]);
  board.shortestPathNodesToAnimate = [];

  const change = (currentNode, previousNode) => {
    let currentNodeElement = document.getElementById(currentNode.id);
    const specialClasses = [
      `start`,
      `shortest-path`,
      `instantshortest-path`,
      `instantshortest-path weight`,
    ];
    if (previousNode) {
      let previousNodeElement = document.getElementById(previousNode.id);
      if (!specialClasses.includes(previousNodeElement.className)) {
        previousNodeElement.className =
          previousNode.weight === 15
            ? `instantvisited weight`
            : `instantvisited`;
      }
    }
  };

  const shortestPathChange = (currentNode, previousNode) => {
    let currentNodeElement = document.getElementById(currentNode.id);
    if (type === `unweighted`) {
      currentNodeElement.className = `shortest-path-unweighted`;
    } else {
      if (currentNode.direction === `up`) {
        currentNodeElement.className = `shortest-path-up`;
      } else if (currentNode.direction === `down`) {
        currentNodeElement.className = `shortest-path-down`;
      } else if (currentNode.direction === `right`) {
        currentNodeElement.className = `shortest-path-right`;
      } else if (currentNode.direction === `left`) {
        currentNodeElement.className = `shortest-path-left`;
      }
    }

    if (previousNode) {
      let previousNodeElement = document.getElementById(previousNode.id);
      previousNodeElement.className =
        previousNode.weight === 15
          ? `instantshortest-path weight`
          : `instantshortest-path`;
    } else {
      let element = document.getElementById(board.start);
      element.className = `startTransparent`;
    }
  };
};

export default launchInstantAnimations;
