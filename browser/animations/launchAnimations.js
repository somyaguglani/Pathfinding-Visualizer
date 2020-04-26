const launchAnimations = (board) => {
  const nodesToAnimate = board.nodesToAnimate.slice(0);
  console.log(`launch animations`);
  for (let currIndex = 0; currIndex < nodesToAnimate.length; currIndex++) {
    const currentNode = nodesToAnimate[currIndex];

    const currentNodeElement = document.getElementById(currentNode.id);
    // console.log(currentNodeElement);
    currentNodeElement.className = currentNode.status;
  }
};
export default launchAnimations;
