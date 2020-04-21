const mazeGenerator = (board) => {
  let speed = 0;
  if (board.speed === `fast`) speed = 5;
  else if (board.speed === `average`) speed = 25;
  else if (board.speed === `slow`) speed = 75;

  console.log(board.wallsAnimationArray);
  for (
    let currIndex = 0;
    currIndex < board.wallsAnimationArray.length;
    currIndex++
  ) {
    setTimeout((currIndex) => {
      const currElement = board.wallsAnimationArray[currIndex];
      console.log(currElement); //how to parse this
      const [i, j] = currElement.id.split(`-`);
      const currNode = board.allNodesArray[i][j];
      currElement.className =
        currNode.weight === 0 ? `wall` : `unvisited weight`;

      if (currIndex === board.wallsAnimationArray.length - 1) {
        board.wallsAnimationArray = [];
        board.toggleButtons();
      }
    }, speed * (currIndex + 1));
  }
};
export default mazeGenerator;
