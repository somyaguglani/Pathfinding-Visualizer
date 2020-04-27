import { drawShortestPathTimeout } from "../animations/shortestPathAnimation.js";

// ------------------FUNCTION FOR LAUNCHING ANIMATIONS--------------------

const launchAnimations = (board, success, type) => {
  let nodesToAnimate = [...board.nodesToAnimate];
  let speed =
    board.speed === `fast` ? 0 : board.speed === `average` ? 100 : 500;

  const timeout = (currIndex) => {
    setTimeout(function () {
      if (currIndex === nodesToAnimate.length) {
        board.nodesToAnimate = [];
        if (success) {
          if (
            document.getElementById(board.target).className !==
            `visitedTargetNodeBlue`
          ) {
            document.getElementById(
              board.target
            ).className = `visitedTargetNodeBlue`;
          }
          drawShortestPathTimeout(board, type);
          board.shortestPathNodesToAnimate = [];
          board.reset();
          return;
        } else {
          board.reset();
          board.toggleButtons();
          return;
        }
      } else if (currIndex === 0) {
        document.getElementById(board.start).className = `visitedStartNodeBlue`;
        change(nodesToAnimate[currIndex]);
      } else {
        change(nodesToAnimate[currIndex], nodesToAnimate[currIndex - 1]);
      }
      timeout(currIndex + 1);
    }, speed);
  };

  const change = (currentNode, previousNode) => {
    let currentNodeElement = document.getElementById(currentNode.id);
    const specialClasses = [
      `start`,
      `target`,
      `visitedStartNodeBlue`,
      `visitedTargetNodeBlue`,
    ];
    if (!specialClasses.includes(currentNodeElement.className)) {
      currentNodeElement.className =
        currentNode.weight === 15 ? `visited weight` : `visited`;
    }

    if (previousNode) {
      let previousNodeElement = document.getElementById(previousNode.id);
      if (!specialClasses.includes(previousNodeElement.className)) {
        previousNodeElement.className =
          previousNode.weight === 15 ? `visited weight` : `visited`;
      }
    }
  };

  timeout(0);
};

export default launchAnimations;
