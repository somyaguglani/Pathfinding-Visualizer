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
  this.tutorialWork();
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
};

let counter = 0;
const contentArray = [];
contentArray.push(
  `<h1>Welcome to Pathfinding Visualizer!</h1>
        <h2>
          This short tutorial will walk you through all of the features of this
          application.
        </h2>
        <p>
          If you want to dive right in, feel free to press the "Skip Tutorial"
          button below. Otherwise, press "Next"!
        </p>
        <div class="pageCounter">${counter + 1}/9</div>
        <p>If you want to see the source code for this application, check out my <a  href="https://github.com/somyaguglani/Pathfinding-Visualizer" >github </a></p>
        <img style=" height:150px;" src="./styling/imagesAndSvg/c_icon.png" alt="startingIcon">

        <div class ="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`
);
contentArray.push(`<h1>What is a pathfinding algorithm?</h1>
        <h2>
        At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!
        </h2>
        <p>
        All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.
        </p>
        <div class="pageCounter">${counter + 1}/9</div>
        <img src="./styling/imagesAndSvg/path.png" alt="path">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
contentArray.push(`<h1>Picking an algorithm</h1>
        <h2>
        Choose an algorithm from the "Algorithms" drop-down menu.
        </h2>
        <p>
       Note that some algorithms are <strong>unweighted</strong>, while others are <strong>weighted</strong>. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path.
        </p>
        <div class="pageCounter">${counter + 1}/9</div>
        <img src="./styling/imagesAndSvg/algorithms.png" alt="algoDemo">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
contentArray.push(`<h1>Meet the algorithms</h1>
        <h2>
       Not all algorithms are created equal.
        </h2>
        <p>
     <strong> Dijkstra's Algorithm</strong> (weighted): the father of pathfinding algorithms; guarantees the shortest path
     </br>
 <strong>A* Search  </strong>(weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm
 </br>
 <strong>Greedy Best-first Search  </strong>(weighted): a faster, more heuristic-heavy version of A*; does not guarantee the shortest path
 </br>
 <strong>Swarm Algorithm  </strong>(weighted): a mixture of Dijkstra's Algorithm and A*; does not guarantee the shortest-path
 </br>
 <strong>Convergent Swarm Algorithm (weighted) </strong>: the faster, more heuristic-heavy version of Swarm; does not guarantee the shortest path
 </br>
 <strong>Bidirectional Swarm Algorithm </strong> (weighted): Swarm from both sides; does not guarantee the shortest path
 </br>
 <strong>Breath-first Search </strong> (unweighted): a great algorithm; guarantees the shortest path
 </br>
 <strong>Depth-first Search </strong> (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path
        </p>
        <div class="pageCounter">${counter + 1}/9</div>
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
contentArray.push(`<h1>Adding walls and weights</h1>
        <h3>
       Click on the grid to add a wall. Click on the grid while pressing W to add a weight. Generate mazes and patterns from the "Mazes & Patterns" drop-down menu.
        </h3>
        <p>
       Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable. They are simply more "costly" to move through. In this application, moving through a weight node has a "cost" of 15.
        </p>
        <div class="pageCounter">${counter + 1}/9</div>
        <img src="./styling/imagesAndSvg/walls.gif" alt="wallsDemo">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
contentArray.push(`<h1>Dragging nodes</h1>
        <h2>
    Click and drag the start, bomb, and target nodes to move them.
        </h2>
        <p>
      Note that you can drag nodes even after an algorithm has finished running. This will allow you to instantly see different paths.
        </p>
        <div class="pageCounter">${counter + 1}/9</div>
        <img src="./styling/imagesAndSvg/dragging.gif" alt="draggingDemo">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
contentArray.push(`<h1>Visualizing and more</h1>
        <h2>
       Use the navbar buttons to visualize algorithms and to do other stuff!
        </h2>
        <p>
      You can clear the current path, clear walls and weights, clear the entire board, and adjust the visualization speed, all from the navbar. If you want to access this tutorial again, click on "Pathfinding Visualizer" in the top left corner of your screen.
        </p>
        <div class="pageCounter">${counter + 1}/9</div>
        <img src="./styling/imagesAndSvg/navbar.png" alt="algoDemo">
        <h3>Now it's time to play around with the visualizer. Enjoy!</h3>
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Finish</button>
        </div>`);

Board.prototype.tutorialWork = function () {
  const board = this;
  const modal = document.querySelector(`.tuturialContainerModal`);
  const modalInner = document.querySelector(`.modalInner`);
  const tutorialButtonsFlex = document.querySelectorAll(`.tutorialButtons`);
  const tutorialButtons = tutorialButtonsFlex[0].querySelectorAll(`button`);
  tutorialButtons.forEach((button) => {
    button.addEventListener(`click`, function (e) {
      if (e.currentTarget.classList.value === `skipButton`) {
        modal.style.display = `none`;
      } else if (e.currentTarget.classList.value === `prevButton`) {
        if (counter > 0) {
          counter--;
          modalInner.innerHTML = contentArray[counter];
          board.tutorialWork();
        }
      } else if (e.currentTarget.classList.value === `nextButton`) {
        if (counter === contentArray.length - 1) {
          modal.style.display = `none`;
          return;
        }
        if (counter < contentArray.length) {
          counter++;
          modalInner.innerHTML = contentArray[counter];
          board.tutorialWork();
        }
      }
    });
  });
};

//----------------MAKING BOARD OBJECT-------------

let contentHeight = mainContentContainer.offsetHeight;
let docHeight = document.documentElement.scrollHeight;
let docWidth = document.documentElement.scrollWidth;
let height = Math.floor((docHeight - contentHeight - navHeight) / 25);
let width = Math.floor(docWidth / 24);
let board = new Board(width, height);
board.initialize();
//errors-> pic, counter, concepts->event listeners
