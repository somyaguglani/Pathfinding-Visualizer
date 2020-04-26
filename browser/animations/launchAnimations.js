const launchAnimations = (board) => {
  const nodesToAnimate = board.nodesToAnimate.slice(0);
  console.log(`launch animations`);
  for (let currIndex = 0; currIndex < nodesToAnimate.length; currIndex++) {
    const currentNode = nodesToAnimate[currIndex];
    // console.log(currentNode);
    currentNode.status = `visited`;
    const currentNodeElement = document.getElementById(currentNode.id);
    // console.log(currentNodeElement);
    currentNodeElement.className = `visited`;
  }
};
export default launchAnimations;
