//-----------------FUNCTION FOR GETTING SHORTEST PATH IN ARRAY -----------------

const addShortestPath = (board, type) => {
  let currentNode;
  currentNode = board.getNode(board.getNode(board.target).previousNode);
  while (currentNode.id !== board.start) {
    baord.shortestPathNodesToAnimate.unshift(currentNode);
    if (type === `draw`) {
      document.getElementById(currentNode.id).className = `shortest-path`;
    }
    currentNode = board.getNode(currentNode.previousNode.id);
  }
};

//---------------------FUNCTION FOR DRAWING SHORTEST PATH---------------------

const drawShortestPathTimeout = (board, type) => {
  let currentNode;
  let currentNodesToAnimate = [];
  currentNode = board.getNode(board.getNode(board.target).previousNode);
  while (currentNode.id !== board.start) {
    currentNodesToAnimate.unshift(currentNode);
    currentNode = board.getNode(currentNode.previousNode.id);
  }

  timeout(0);

  const timeout = (currentIndex) => {
    if (!currentNodesToAnimate.length) {
      currentNodesToAnimate.push(board.getNode(board.start));
    }
    setTimeout(function () {
      if (currentIndex === 0) {
        shortestPathChange(currentNodesToAnimate[currentIndex]);
      } else if (currentIndex < currentNodesToAnimate.length) {
        shortestPathChange(
          currentNodesToAnimate[currentIndex],
          currentNodesToAnimate[currentIndex - 1]
        );
      } else if (currentIndex === currentNodesToAnimate.length) {
        shortestPathChange(
          board.getNode(board.target),
          currentNodesToAnimate[currentIndex - 1],
          `target`
        );
      }
      if (currentIndex > currentNodesToAnimate.length) {
        board.toggleButtons();
        return;
      }
      timeout(currentIndex + 1);
    }, 40);
  };

  function shortestPathChange(currentNode, previousNode, istarget) {
    if (currentNode.id !== board.start) {
      if (
        currentNode.id !== board.target ||
        (currentNode.id === board.target && istarget)
      ) {
        let currentNodeElement = document.getElementById(currentNode.id);
        if (type === `unweighted`) {
          currentNodeElement.className = `shortest-path-unweighted`;
        } else {
          let direction = `direction`;
          if (currentNode[direction] === `up`) {
            currentNodeElement.className = `shortest-path-up`;
          } else if (currentNode[direction] === `down`) {
            currentNodeElement.className = `shortest-path-down`;
          } else if (currentNode[direction] === `right`) {
            currentNodeElement.className = `shortest-path-right`;
          } else if (currentNode[direction] === `left`) {
            currentNodeElement.className = `shortest-path-left`;
          } else {
            currentNodeElement.className = `shortest-path`;
          }
        }
      }
    }
    if (previousNode) {
      if (previousNode.id !== board.target && previousNode.id !== board.start) {
        let previousNodeElement = document.getElementById(previousNode.id);
        previousNodeElement.className =
          previousNode.weight === 15 ? `shortest-path weight` : `shortest-path`;
      }
    } else {
      let element = document.getElementById(board.start);
      element.className = `startTransparent`;
    }
  }
};

export { addShortestPath, drawShortestPathTimeout };
