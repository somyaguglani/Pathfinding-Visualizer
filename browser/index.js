import Node from "../browser/Node.js";
import mazeGenerator from "../browser/animations/mazeGenerator.js";
import randomMaze from "../browser/mazeAlgorithms/randomMaze.js";
import verticalSkew from "../browser/mazeAlgorithms/verticalSkewMaze.js";
import horizontalSkew from "../browser/mazeAlgorithms/horizontalSkewMaze.js";
import stairMaze from "../browser/mazeAlgorithms/stairMaze.js";
import unweightedAlgorithms from "../browser/searchAlgorithms/unweightedAlgorithms.js";
import launchAnimations from "../browser/animations/launchAnimations.js";
import weightedAlgorithms from "../browser/searchAlgorithms/weightedAlgorithms.js";
import launchInstantAnimations from "../browser/animations/launchInstantAnimations.js";
const gridContainer = document.querySelector(`.grid`);
const navbarContainer = document.querySelector(`.navbarContainer`);
let navHeight = navbarContainer.offsetHeight;
const mainContentContainer = document.querySelector(`.mainContentContainer`);

//---------------FUNCTIONS---------------

// ------------CONSTRUCTOR FOR BOARD OBJECT-----------------

function Board(width, height) {
  this.width = width;
  this.height = height;
  this.wallsAnimationArray = [];
  this.algoComplete = false;
  this.speed = `fast`;
  this.algo = ``;
  this.start = ``;
  this.target = ``;
  this.allNodesArray = [];
  this.nodesToAnimate = [];
  this.tutorialContentArray = [];
  this.pressedNodeStatus = `normal`;
  this.mouseDown = false;
  this.keyDown = false;
  this.buttonsActivated = false;
  this.shortestPathNodesToAnimate = [];
  this.previouslyPressedNodeStatus = null;
  this.previouslySwitchedNode = null;
  this.previouslySwitchedNodeWeight = 0;
}

// --------------------FUNCTION FOR INITIALIZING BOARD AREA----------------

Board.prototype.initialize = function () {
  this.contentInitialize();
  this.createGrid();
  this.addEventListeners();
  this.tutorialWork();
  this.restOfListeners();
};

// -----------FUNCTION FOR CREATING GRID----------------

Board.prototype.createGrid = function () {
  let htmlOfGrid = ``;
  for (let row = 0; row < this.height; row++) {
    let gridRow = `<tr id = "row_${row}">`;
    const allNodesRowArray = [];
    for (let col = 0; col < this.width; col++) {
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

// -----------------------FUNCTION FOR ADDING LISTENERS TO GRID --------------

Board.prototype.addEventListeners = function () {
  for (let row = 0; row < this.height; row++) {
    for (let col = 0; col < this.width; col++) {
      const currentNodeId = `${row}-${col}`;
      const currentNodeElement = document.getElementById(currentNodeId);
      const currentNode = this.allNodesArray[row][col];

      currentNodeElement.addEventListener(`mousedown`, (e) => {
        e.preventDefault();
        if (this.buttonsActivated) {
          this.mouseDown = true;
          if (
            currentNode.status === `start` ||
            currentNode.status === `target`
          ) {
            this.pressedNodeStatus = currentNode.status;
          } else {
            this.pressedNodeStatus = `normal`;
            this.changeNormalNode(currentNode, currentNodeElement);
          }
        }
      });

      currentNodeElement.addEventListener(`mouseup`, (e) => {
        if (this.buttonsActivated) {
          this.mouseDown = false;
          if (this.pressedNodeStatus === `target`) this.target = currentNodeId;
          else if (this.pressedNodeStatus === `start`)
            this.start = currentNodeId;
          this.pressedNodeStatus = `normal`;
        }
      });

      currentNodeElement.addEventListener(`mouseenter`, (e) => {
        if (this.buttonsActivated) {
          if (this.mouseDown && this.pressedNodeStatus !== `normal`) {
            this.changeSpecialNode(currentNode, currentNodeElement);
            if (this.pressedNodeStatus === `target`) {
              this.target = currentNodeId;
              if (this.algoComplete) this.redoAlgo();
            } else if (this.pressedNodeStatus === `start`) {
              this.start = currentNodeId;
              if (this.algoComplete) this.redoAlgo();
            }
          } else if (this.mouseDown) {
            this.changeNormalNode(currentNode, currentNodeElement);
          }
        }
      });

      currentNodeElement.addEventListener(`mouseleave`, (e) => {
        if (this.buttonsActivated) {
          if (this.mouseDown && this.pressedNodeStatus !== `normal`) {
            this.changeSpecialNode(currentNode, currentNodeElement);
          }
        }
      });
    }
  }
};

// --------------FUNCTION FOR DEALING WITH START AND TARGET NODES------------

Board.prototype.changeSpecialNode = function (currentNode, currentNodeElement) {
  let previousElement;
  if (this.previouslySwitchedNode)
    previousElement = document.getElementById(this.previouslySwitchedNode.id);
  if (currentNode.status !== `target` && currentNode.status !== `start`) {
    if (this.previouslySwitchedNode) {
      this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;
      previousElement.className =
        this.previouslySwitchedNodeWeight === 15
          ? `unvisited weight`
          : this.previouslyPressedNodeStatus;
      this.previouslySwitchedNode.weight =
        this.previouslySwitchedNodeWeight === 15 ? 15 : 0;
      this.previouslySwitchedNode = null;
      this.previouslySwitchedNodeWeight = currentNode.weight;
      this.previouslyPressedNodeStatus = currentNode.status;
      currentNodeElement.className = this.pressedNodeStatus;
      currentNode.status = this.pressedNodeStatus;
      currentNode.weight = 0;
    }
  } else if (
    currentNode.status !== this.pressedNodeStatus &&
    !this.algoComplete
  ) {
    this.previouslySwitchedNode.status = this.pressedNodeStatus;
    previousElement.className = this.pressedNodeStatus;
  } else if (currentNode.status === this.pressedNodeStatus) {
    this.previouslySwitchedNode = currentNode;
    currentNodeElement.className = this.previouslyPressedNodeStatus;
    currentNode.status = this.previouslyPressedNodeStatus;
  }
};

// --------------FUNCTION FOR DEALING WITH WALLS AND WEIGHTS------------

Board.prototype.changeNormalNode = function (currNode, currNodeElement) {
  const specialNodes = [`start`, `target`];
  const unweightedalgos = [`breadthfirst`, `depthfirst`];
  if (!this.keyDown) {
    if (!specialNodes.includes(currNode.status)) {
      currNodeElement.className =
        currNode.status !== `wall` ? `wall` : `unvisited`;
      currNode.status =
        currNodeElement.className !== `wall` ? `unvisited` : `wall`;
      currNode.weight = 0;
    }
  } else if (this.keyDown === 87 && !unweightedalgos.includes(this.algo)) {
    if (!specialNodes.includes(currNode.status)) {
      currNodeElement.className =
        currNode.weight !== 15 ? `unvisited weight` : `unvisited`;
      currNode.weight =
        currNodeElement.className !== `unvisited weight` ? 0 : 15;
      currNode.status = `unvisited`;
    }
  }
};

// -------------FUNCTION FOR ACCESSING NODE OF PROVIDED ID---------------

Board.prototype.getNode = function (id) {
  const [i, j] = id.split(`-`);
  return this.allNodesArray[i][j];
};

// ----------------------FUNCTION FOR REDOING AN ALGORITHM---------------------

Board.prototype.redoAlgo = function () {
  this.clearPath();
  this.instantAlgorithm();
};

// ---------------FUNCTION FOR RUNNING AN ALGORITHM INSTANTLY----------------------------

Board.prototype.instantAlgorithm = function () {
  let success;
  if (this.algo === `astar`) {
    success = weightedAlgorithms(this, this.algo);
    launchInstantAnimations(this, success, `weighted`);
  } else if (this.algo === `dijkstra`) {
    success = weightedAlgorithms(this, this.algo);
    launchInstantAnimations(this, success, `weighted`);
  } else if (this.algo === `bestfirst`) {
    success = weightedAlgorithms(this, this.algo);
    launchInstantAnimations(this, success, `weighted`);
  } else if (this.algo === `breadthfirst`) {
    this.clearWeights();
    success = unweightedAlgorithms(this, this.algo);
    launchInstantAnimations(this, success, `unweighted`);
  } else if (this.algo === `depthfirst`) {
    this.clearWeights();
    success = unweightedAlgorithms(this, this.algo);
    launchInstantAnimations(this, success, `unweighted`);
  }
  this.algoComplete = true;
};

// -----------------------FUNCTIONS FOR CLEARING WALLS AND WEIGHTS AND SETTING THE BOARD TO IT'S INITIAL STATE---------------

// -----------FUNCTION FOR CLEARING WALLS AND WEIGHTS -------------------

Board.prototype.clearWallsAndWeights = function () {
  this.clearPath();
  for (let row = 0; row < this.height; row++) {
    for (let col = 0; col < this.width; col++) {
      const currentNode = this.allNodesArray[row][col];
      if (currentNode.status === `wall` || currentNode.weight === 15) {
        let currentNodeElement = document.getElementById(`${row}-${col}`);
        currentNodeElement.className = `unvisited`;
        currentNode.status = `unvisited`;
        currentNode.weight = 0;
      }
    }
  }
};

// ----------------FUNCTION FOR CLEARING WEIGHTS--------------------

Board.prototype.clearWeights = function () {
  for (let row = 0; row < this.height; row++) {
    for (let col = 0; col < this.width; col++) {
      const currentNode = this.allNodesArray[row][col];
      if (currentNode.weight === 15) {
        let currentNodeElement = document.getElementById(`${row}-${col}`);
        currentNodeElement.className = `unvisited`;
        currentNode.status = `unvisited`;
        currentNode.weight = 0;
      }
    }
  }
};

// ------------------FUNCTION FOR CLEARING NODE STATUS------------------
//why not weights?
Board.prototype.clearStatus = function () {
  const specialStatus = [`wall`, `start`, `target`];
  for (let row = 0; row < this.height; row++) {
    for (let col = 0; col < this.width; col++) {
      const currentNode = this.allNodesArray[row][col];
      currentNode.previousNode = null;
      currentNode.direction = null;
      currentNode.distance = Infinity;
      currentNode.totalDistance = Infinity;
      currentNode.heuristicDistance = null;
      if (!specialStatus.includes(currentNode.status)) {
        currentNode.status = `unvisited`;
      }
    }
  }
};

// -----------------FUNCTION FOR CLEARING PATH------------------------

Board.prototype.clearPath = function () {
  let startNode = this.getNode(this.start);
  let targetNode = this.getNode(this.target);
  startNode.status = `start`;
  let startNodeElement = document.getElementById(this.start);
  startNodeElement.className = `start`;
  targetNode.status = `target`;
  let targetNodeElement = document.getElementById(this.target);
  targetNodeElement.className = `target`;
  this.algoComplete = false;
  const specialStatus = [`wall`, `start`, `target`];
  for (let row = 0; row < this.height; row++) {
    for (let col = 0; col < this.width; col++) {
      let currentNode = this.allNodesArray[row][col];
      let currentNodeElement = document.getElementById(`${row}-${col}`);
      currentNode.previousNode = null;
      currentNode.distance = Infinity;
      currentNode.totalDistance = Infinity;
      currentNode.heuristicDistance = null;
      currentNode.direction = null;

      if (currentNode.weight === 15) {
        currentNode.status = `unvisited`;
        currentNodeElement.className = `unvisited weight`;
      } else if (!specialStatus.includes(currentNode.status)) {
        currentNode.status = `unvisited`;
        currentNodeElement.className = `unvisited`;
      }
    }
  }
};

Board.prototype.reset = function () {
  this.getNode(this.start).status = `start`;
  document.getElementById(this.start).className = `startTransparent`;
  this.getNode(this.target).status = `target`;
};

// ---------------FUNCTION FOR PROVIDING TEXT FOR TUTORIAL-------------

let counter = 0;

Board.prototype.contentInitialize = function () {
  this.tutorialContentArray.push(
    `<h1>Welcome to Pathfinding Visualizer!</h1>
        <h2>
          This short tutorial will walk you through all of the features of this
          application.
        </h2>
        <p>
          If you want to dive right in, feel free to press the "Skip Tutorial"
          button below. Otherwise, press "Next"!
        </p>
        <div class="pageCounter">1/7</div>
        <p>If you want to see the source code for this application, check out my <a  href="https://github.com/somyaguglani/Pathfinding-Visualizer" >github </a></p>
        <img style=" height:150px;" src="./styling/imagesAndSvg/c_icon.png" alt="startingIcon">

        <div class ="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`
  );
  this.tutorialContentArray.push(`<h1>What is a pathfinding algorithm?</h1>
        <h2>
        At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!
        </h2>
        <p>
        All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1.
        </p>
        <div class="pageCounter">2/7</div>
        <img src="./styling/imagesAndSvg/path.png" alt="path">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
  this.tutorialContentArray.push(`<h1>Picking an algorithm</h1>
        <h2>
        Choose an algorithm from the "Algorithms" drop-down menu.
        </h2>
        <p>
       Note that some algorithms are <strong>unweighted</strong>, while others are <strong>weighted</strong>. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path.
        </p>
        <div class="pageCounter">3/7</div>
        <img src="./styling/imagesAndSvg/algorithms.png" alt="algoDemo">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
  this.tutorialContentArray.push(`<h1>Meet the algorithms</h1>
        <h2>
       Not all algorithms are created equal.
        </h2>
        <p>
     <strong> Dijkstra's Algorithm</strong> (weighted): the father of pathfinding algorithms; guarantees the shortest path
     </br>
  </br>
 <strong>A* Search  </strong>(weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm
 </br>
  </br>
 <strong>Greedy Best-first Search  </strong>(weighted): a faster, more heuristic-heavy version of A*; does not guarantee the shortest path
 </br>
  </br>
 <strong>Breath-first Search </strong> (unweighted): a great algorithm; guarantees the shortest path
 </br>
  </br>
 <strong>Depth-first Search </strong> (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path
        </p>
        <div class="pageCounter">4/7</div>
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
  this.tutorialContentArray.push(`<h1>Adding walls and weights</h1>
        <h3>
       Click on the grid to add a wall. Click on W to add weights and again to stop. Generate mazes and patterns from the "Mazes & Patterns" drop-down menu.
        </h3>
        <p>
       Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable. They are simply more "costly" to move through. In this application, moving through a weight node has a "cost" of 15.
        </p>
        <div class="pageCounter">5/7</div>
        <img src="./styling/imagesAndSvg/walls.gif" alt="wallsDemo">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
  this.tutorialContentArray.push(`<h1>Dragging nodes</h1>
        <h2>
    Click and drag the start and target nodes to move them.
        </h2>
        <p>
      Note that you can drag nodes even after an algorithm has finished running. This will allow you to instantly see different paths.
        </p>
        <div class="pageCounter">6/7</div>
        <img src="./styling/imagesAndSvg/dragging.gif" alt="draggingDemo">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Next</button>
        </div>`);
  this.tutorialContentArray.push(`<h1>Visualizing and more</h1>
        <h2>
       Use the navbar buttons to visualize algorithms and explore other features!
        </h2>
        <p>
      You can clear the current path, clear walls and weights, clear the entire board, and adjust the visualization speed, all from the navbar. If you want to access this tutorial again, click on "Pathfinding Visualizer" in the top left corner of your screen.
        </p>
        <div class="pageCounter">7/7</div>
        <img class = "responsive-img" src="./styling/imagesAndSvg/navbar.png" alt="algoDemo">
        <div class="tutorialButtons">
          <button class="skipButton">Skip Tutorial</button>
          <button class="prevButton">Previous</button>
          <button class="nextButton">Finish</button>
        </div>`);
};

// ------------------FUNCTION FOR BUTTONS AND DYNAMIC CONTENT OF TUTORIAL MODAL--------------

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
        board.toggleButtons();
      } else if (e.currentTarget.classList.value === `prevButton`) {
        if (counter > 0) {
          counter--;
          modalInner.innerHTML = board.tutorialContentArray[counter];
          board.tutorialWork();
        }
      } else if (e.currentTarget.classList.value === `nextButton`) {
        if (counter === board.tutorialContentArray.length - 1) {
          modal.style.display = `none`;
          board.toggleButtons();
          return;
        }
        if (counter < board.tutorialContentArray.length) {
          counter++;
          modalInner.innerHTML = board.tutorialContentArray[counter];
          board.tutorialWork();
        }
      }
    });
  });
};

// ------------FUNCTION FOR ACTIVATING AND DEACTIVATING CLICKS FOR ALL BUTTONS-------------

Board.prototype.toggleButtons = function () {
  this.buttonsActivated = !this.buttonsActivated;

  const algoOptions = document.querySelectorAll(`.algoOptions`);
  const mazes = document.querySelectorAll(`.maze`);
  const speeds = document.querySelectorAll(`.speeds`);
  const visualizeButton = document.querySelector(`.visualizeButton`);
  const clearLinks = document.querySelectorAll(`.clearLinks`);

  if (this.buttonsActivated === false) {
    algoOptions.forEach((option) => {
      option.classList.add(`activatedLink`);
    });
    mazes.forEach((maze) => {
      maze.classList.add(`activatedLink`);
    });
    clearLinks.forEach((link) => {
      link.classList.add(`activatedLink`);
    });
    speeds.forEach((speed) => {
      speed.classList.add(`activatedLink`);
    });

    visualizeButton.classList.add(`activatedLink`);
  } else {
    algoOptions.forEach((option) => {
      option.classList.remove(`activatedLink`);
    });
    mazes.forEach((maze) => {
      maze.classList.remove(`activatedLink`);
    });
    clearLinks.forEach((link) => {
      link.classList.remove(`activatedLink`);
    });
    speeds.forEach((speed) => {
      speed.classList.remove(`activatedLink`);
    });
    visualizeButton.classList.remove(`activatedLink`);
  }
};

// ------------FUNCTION FOR ATTACHING LISTENERS FOR REST OF THE BUTTONS------------

Board.prototype.restOfListeners = function () {
  const logo = document.querySelector(`.refreshLogo`);
  const dropDowns = document.querySelectorAll(`.dropDown`);
  const visualizeButton = document.querySelector(`.visualizeButton`);
  const algoDescription = document.querySelector(`.algoDescription`);
  const algoOptions = document.querySelectorAll(`.algoOptions`);
  const mazes = document.querySelectorAll(`.maze`);
  const speeds = document.querySelectorAll(`.speeds`);
  const clearBoard = document.getElementById(`clearBoard`);
  const clearWallsAndWeights = document.getElementById(`clearWallsAndWeights`);
  const clearPath = document.getElementById(`clearPath`);

  logo.addEventListener(`click`, (e) => {
    e.preventDefault();
    location.reload();
  });

  dropDowns.forEach((linkButton) => {
    linkButton.addEventListener(`click`, (e) => {
      dropDowns.forEach((dropdown) => {
        if (dropdown !== e.currentTarget) {
          dropdown.classList.remove(`displayDropdown`);
          const a = dropdown.querySelector(`a`);
          a.classList.remove(`activatedLink`);
        }
      });

      e.currentTarget.classList.toggle(`displayDropdown`);
      const link = e.currentTarget.querySelector(`a`);
      link.classList.toggle(`activatedLink`);
    });
  });

  visualizeButton.addEventListener(`click`, (e) => {
    if (this.buttonsActivated) {
      if (this.algo.length === 0) {
        e.currentTarget.innerHTML = `Pick an Algorithm!`;
        return;
      }
      this.clearPath();
      this.toggleButtons();
      let success;
      if (this.algo === `astar`) {
        success = weightedAlgorithms(this, this.algo);
        launchAnimations(this, success, `weighted`);
      } else if (this.algo === `dijkstra`) {
        success = weightedAlgorithms(this, this.algo);
        launchAnimations(this, success, `weighted`);
      } else if (this.algo === `bestfirst`) {
        success = weightedAlgorithms(this, this.algo);
        launchAnimations(this, success, `weighted`);
      } else if (this.algo === `breadthfirst`) {
        this.clearWeights();
        success = unweightedAlgorithms(this, this.algo);
        launchAnimations(this, success, `unweighted`);
      } else if (this.algo === `depthfirst`) {
        this.clearWeights();
        success = unweightedAlgorithms(this, this.algo);
        launchAnimations(this, success, `unweighted`);
      }
      this.algoComplete = true;
    }
  });

  algoOptions.forEach((algo) => {
    algo.addEventListener(`click`, (e) => {
      if (this.buttonsActivated) {
        this.algo = e.currentTarget.id;
        const weightCancellable = document.querySelector(`.cancelable`);
        if (this.algo === `astar`) {
          weightCancellable.classList.remove(`cancelNow`);
          visualizeButton.innerHTML = `Visualize A* !`;
          algoDescription.innerHTML = `A* Search is <strong>weighted</strong> and <strong>guarantees</strong> the shortest path!`;
        } else if (this.algo === `dijkstra`) {
          weightCancellable.classList.remove(`cancelNow`);
          visualizeButton.innerHTML = `Visualize Dijkstra's !`;
          algoDescription.innerHTML = `Dijkstra's Algorithm is <strong>weighted</strong> and <strong>guarantees</strong> the shortest path!`;
        } else if (this.algo === `bestfirst`) {
          weightCancellable.classList.remove(`cancelNow`);
          visualizeButton.innerHTML = `Visualize Greedy !`;
          algoDescription.innerHTML = `Greedy Best-first Search is <strong>weighted</strong> and <strong>does not guarantee</strong> the shortest path!`;
        } else if (this.algo === `breadthfirst`) {
          weightCancellable.classList.add(`cancelNow`);
          visualizeButton.innerHTML = `Visualize BFS !`;
          algoDescription.innerHTML = `Breadth-first Search is <strong>unweighted</strong> and <strong>guarantees</strong> the shortest path!`;
        } else if (this.algo === `depthfirst`) {
          weightCancellable.classList.add(`cancelNow`);
          visualizeButton.innerHTML = `Visualize DFS !`;
          algoDescription.innerHTML = `Depth-first Search is <strong>unweighted</strong> and <strong>does not guarantee</strong> the shortest path!`;
        }
      }
    });
  });

  mazes.forEach((maze) => {
    maze.addEventListener(`click`, (e) => {
      if (this.buttonsActivated) {
        const currentMaze = e.currentTarget.id;
        this.clearWallsAndWeights();
        this.toggleButtons();
        if (currentMaze === `verticalskew`) {
          verticalSkew(
            this,
            2,
            this.height - 3,
            2,
            this.width - 3,
            "vertical",
            false
          );
          mazeGenerator(this);
        } else if (currentMaze === `horizontalskew`) {
          horizontalSkew(
            this,
            2,
            this.height - 3,
            2,
            this.width - 3,
            "horizontal",
            false
          );
          mazeGenerator(this);
        } else if (currentMaze === `randomwall`) {
          randomMaze(this, `wall`);
        } else if (currentMaze === `randomweight`) {
          randomMaze(this, `weight`);
        } else if (currentMaze === `stair`) {
          stairMaze(this);
          mazeGenerator(this);
        }
      }
    });
  });

  clearBoard.addEventListener(`click`, (e) => {
    if (this.buttonsActivated) {
      let contentHeight = mainContentContainer.offsetHeight;
      let docHeight = document.documentElement.scrollHeight;
      let docWidth = document.documentElement.scrollWidth;
      let height = Math.floor((docHeight - contentHeight - navHeight) / 24);
      let width = Math.floor(docWidth / 23);
      let start =
        Math.floor(height / 2).toString() +
        `-` +
        Math.floor(width / 4).toString();
      let target =
        Math.floor(height / 2).toString() +
        `-` +
        Math.floor((3 * width) / 4).toString();

      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          let currentNode = board.allNodesArray[row][col];
          let currentNodeElement = document.getElementById(`${row}-${col}`);
          if (`${row}-${col}` === start) {
            currentNodeElement.className = `start`;
            currentNode.status = `start`;
          } else if (`${row}-${col}` === target) {
            currentNodeElement.className = `target`;
            currentNode.status = `target`;
          } else {
            currentNodeElement.className = `unvisited`;
            currentNode.status = `unvisited`;
          }

          this.weight = 0;
          this.previousNode = null;
          this.direction = null;
          this.distance = Infinity;
          this.totalDistance = Infinity;
          this.heuristicDistance = null;
          this.path = null;
          this.direction = null;
        }
      }
      this.wallsAnimationArray = [];
      this.algoComplete = false;
      this.start = start;
      this.target = target;
      this.nodesToAnimate = [];
      this.pressedNodeStatus = `normal`;
      this.mouseDown = false;
      this.keyDown = false;
      this.shortestPathNodesToAnimate = [];
      this.previouslyPressedNodeStatus = null;
      this.previouslySwitchedNode = null;
      this.previouslySwitchedNodeWeight = 0;
    }
  });

  clearWallsAndWeights.addEventListener(`click`, (e) => {
    if (this.buttonsActivated) {
      this.clearWallsAndWeights();
    }
  });

  clearPath.addEventListener(`click`, (e) => {
    if (this.buttonsActivated) {
      this.clearPath();
    }
  });

  speeds.forEach((speed) => {
    speed.addEventListener(`click`, (e) => {
      if (this.buttonsActivated) {
        this.speed = e.currentTarget.id;
      }
    });
  });
};

//----------------MAKING BOARD OBJECT-------------

let contentHeight = mainContentContainer.offsetHeight;
let docHeight = document.documentElement.scrollHeight;
let docWidth = document.documentElement.scrollWidth;
if (docWidth < 600) docHeight = docHeight + 500;
let height = Math.floor((docHeight - contentHeight - navHeight) / 27);
let width = Math.floor(docWidth / 25);
let board = new Board(width, height);
board.initialize();

// ------------EVENT LISTENERS-------------------

window.addEventListener(`keydown`, (e) => {
  if (board.keyDown) {
    board.keyDown = false;
  } else {
    board.keyDown = e.keyCode;
  }
});
export default board.getNode;
