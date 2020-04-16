import Node from "../browser/Node.js";

const gridContainer = document.querySelector(`.grid`);

const navbarContainer = document.querySelector(`.navbarContainer`);
let navHeight = navbarContainer.offsetHeight;
const mainContentContainer = document.querySelector(`.mainContentContainer`);
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
  // this.addEventListenters();
  // this.tutorialWork();
};

Board.prototype.createGrid = function () {
  let htmlOfGrid = ``;
  for (let row = 0; row < this.height; row++) {
    let gridRow = `<tr id = "row_${row}">`;
    const allNodesRowArray = [];
    for (let col = 0; col < this.width; col++) {
      //the node can be a start node or target node or unvisited node

      const id = `${row}-${col}`;
      let nodeStatus;
      if (
        row === Math.floor(this.height / 2) &&
        col === Math.floor(this.width / 4) &&
        this.start.length === 0
      ) {
        nodeStatus = `start`;
        this.start = `${id}`;
      } else if (
        row === Math.floor(this.height / 2) &&
        col === Math.floor((3 * this.width) / 4) &&
        this.target.length === 0
      ) {
        nodeStatus = `target`;
        this.target = `${id}`;
      } else {
        nodeStatus = `unvisited`;
      }
      const newNode = new Node(id, nodeStatus);
      allNodesRowArray.push(newNode);
      gridRow += `<td id="${id}" class="${nodeStatus}"></td>`;
    }
    htmlOfGrid += `${gridRow}</tr>`;
    this.allNodesArray.push(allNodesRowArray);
  }
  gridContainer.innerHTML = htmlOfGrid;

  console.log(this.allNodesArray);
};

//----------------MAKING BOARD OBJECT-------------

let contentHeight = mainContentContainer.offsetHeight;
let docHeight = document.documentElement.scrollHeight;
let docWidth = document.documentElement.scrollWidth;
let height = Math.floor((docHeight - contentHeight - navHeight) / 25);
let width = Math.floor(docWidth / 24);
let board = new Board(width, height);
console.log(width, height);
board.initialize();
