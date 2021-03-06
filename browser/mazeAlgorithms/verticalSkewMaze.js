// ------------FUNCTION FOR GENERATING RECURSIVE VERTICALLY SKEWED MAZE------------------

const specialNodes = [`start`, `target`];

const verticalSkewMaze = (
  board,
  rowsi,
  rowei,
  colsi,
  colei,
  orientation,
  outerWalls
) => {
  if (rowei < rowsi || colei < colsi) return;
  if (!outerWalls) {
    for (let row = 0; row < board.height; row++) {
      for (let col = 0; col < board.width; col++) {
        const currNode = board.getNode(`${row}-${col}`);
        if (!specialNodes.includes(currNode.status)) {
          if (
            row === 0 ||
            row === board.height - 1 ||
            col === 0 ||
            col === board.width - 1
          ) {
            const currElement = document.getElementById(`${row}-${col}`);
            board.wallsAnimationArray.push(currElement);
            currNode.status = `wall`;
          }
        }
      }
    }
    outerWalls = true;
  }

  if (orientation === `horizontal`) {
    let possibleRows = [];
    for (let currIndex = rowsi; currIndex <= rowei; currIndex += 2) {
      possibleRows.push(currIndex);
    }

    let possibleCols = [];
    for (let currIndex = colsi - 1; currIndex <= colei + 1; currIndex += 2) {
      possibleCols.push(currIndex);
    }

    let randomRI = Math.floor(Math.random() * possibleRows.length);
    let randomCI = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRI];
    let columnRandom = possibleCols[randomCI];
    for (let row = 0; row < board.height; row++) {
      for (let col = 0; col < board.width; col++) {
        if ((row + col) * Math.random() < 40) {
          const currNode = board.getNode(`${row}-${col}`);
          if (!specialNodes.includes(currNode.status)) {
            if (
              row === currentRow &&
              col !== columnRandom &&
              col >= colsi - 1 &&
              col <= colei + 1
            ) {
              const currElement = document.getElementById(`${row}-${col}`);
              board.wallsAnimationArray.push(currElement);
              currNode.status = `wall`;
            }
          }
        }
      }
    }

    if (currentRow - 2 - rowsi > colei - colsi) {
      verticalSkewMaze(
        board,
        rowsi,
        currentRow - 2,
        colsi,
        colei,
        orientation,
        outerWalls
      );
    } else {
      verticalSkewMaze(
        board,
        rowsi,
        currentRow - 2,
        colsi,
        colei,
        `vertical`,
        outerWalls
      );
    }
    if (rowei - (currentRow + 2) > colei - colsi) {
      verticalSkewMaze(
        board,
        currentRow + 2,
        rowei,
        colsi,
        colei,
        `vertical`,
        outerWalls
      );
    } else {
      verticalSkewMaze(
        board,
        currentRow + 2,
        rowei,
        colsi,
        colei,
        `vertical`,
        outerWalls
      );
    }
  } else {
    let possibleCols = [];
    for (let currIndex = colsi; currIndex <= colei; currIndex += 2) {
      possibleCols.push(currIndex);
    }

    let possibleRows = [];
    for (let currIndex = rowsi - 1; currIndex <= rowei + 1; currIndex += 2) {
      possibleRows.push(currIndex);
    }

    let randomCI = Math.floor(Math.random() * possibleCols.length);
    let randomRI = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomCI];
    let rowRandom = possibleCols[randomRI];
    for (let row = 0; row < board.height; row++) {
      for (let col = 0; col < board.width; col++) {
        if (
          (row + (col % 50)) * Math.random() < 22 &&
          ((row % 15) + col) * Math.random() < 22
        ) {
          const currNode = board.getNode(`${row}-${col}`);
          if (!specialNodes.includes(currNode.status)) {
            if (
              col === currentCol &&
              row !== rowRandom &&
              row >= rowsi - 1 &&
              row <= rowei + 1
            ) {
              const currElement = document.getElementById(`${row}-${col}`);
              board.wallsAnimationArray.push(currElement);
              currNode.status = `wall`;
            }
          }
        }
      }
    }

    if (rowei - rowsi > currentCol - 2 - colsi) {
      verticalSkewMaze(
        board,
        rowsi,
        rowei,
        colsi,
        currentCol - 2,
        `vertical`,
        outerWalls
      );
    } else {
      verticalSkewMaze(
        board,
        rowsi,
        rowei,
        colsi,
        currentCol - 2,
        orientation,
        outerWalls
      );
    }
    if (rowei - rowsi > colei - (currentCol + 2)) {
      verticalSkewMaze(
        board,
        rowsi,
        rowei,
        currentCol + 2,
        colei,
        `horizontal`,
        outerWalls
      );
    } else {
      verticalSkewMaze(
        board,
        rowsi,
        rowei,
        currentCol + 2,
        colei,
        orientation,
        outerWalls
      );
    }
  }
};
export default verticalSkewMaze;
