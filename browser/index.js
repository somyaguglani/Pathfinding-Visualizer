import Node from "../browser/Node.js";

const gridContainer = document.querySelector(`.grid`);
console.log(gridContainer);

//---------------FUNCTIONS---------------
function Board(width, height) {
  this.width = width;
  this.height = height;
  this.animationsArray = [];
  this.algoDone = false;
  this.speed = `fast`;
  this.algo = ``;
  this.start = ``;
  this.target = ``;
  this.allNodesArray = [];
}

Board.prototype.initialize = function () {
  this.createGrid();
  this.addEventListenters();
  this.tutorialWork();
};

Board.prototype.createGrid = function () {
  let htmlOfGrid = ``;
  for (let row = 0; row < this.width; row++) {
    let gridRow = `<tr>`;
    const allNodesRowArray = [];
    for (let col = 0; col < this.height; col++) {
      //the node can be a start node or target node or unvisited node

      const id = `${row}-${col}`;
      let nodeStatus;
      if (
        row === Math.floor(this.height / 2) &&
        col === Math.floor(this.width / 4)
      ) {
        nodeStatus = `start`;
        this.start = `${id}`;
      } else if (
        row === Math.floor(this.height / 2) &&
        col === 3 * Math.floor(this.width / 4)
      ) {
        nodeStatus = `target`;
        this.target = `${id}`;
      } else {
        nodeStatus = `unvisited`;
      }
      const newNode = new Node(id, nodeStatus);
      allNodesRowArray.push(newNode);
      girdRow += `<td id = "${id}"class = "${nodeStatus}"></td>`;
    }
    gridRow += `</tr>`;
    this.allNodesArray.push(allNodesRowArray);
    htmlOfGrid += gridRow;
  }
  gridContainer.innerHTML = htmlOfGrid;
  console.log(this.allNodesArray);
  console.log(htmlOfGrid);
};

//----------------MAKING BOARD OBJECT-------------
