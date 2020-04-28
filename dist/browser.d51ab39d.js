// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"browser/Node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// ---------------CLASS FOR THE NODE OBJECT-----------
function Node(id, status) {
  this.id = id;
  this.status = status;
  this.weight = 0;
  this.previousNode = null;
  this.direction = null;
  this.distance = Infinity;
  this.totalDistance = Infinity;
  this.heuristicDistance = null;
  this.path = null;
  this.direction = null;
}

var _default = Node;
exports.default = _default;
},{}],"browser/animations/mazeGenerator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// ------------------FUNCTION FOR GENERATING MAZE ANIMATIONS------------
var mazeGenerator = function mazeGenerator(board) {
  var speed = 0;
  if (board.speed === "fast") speed = 5;else if (board.speed === "average") speed = 25;else if (board.speed === "slow") speed = 75;

  var _loop = function _loop(currIndex) {
    setTimeout(function () {
      var currElement = board.wallsAnimationArray[currIndex];

      var _currElement$id$split = currElement.id.split("-"),
          _currElement$id$split2 = _slicedToArray(_currElement$id$split, 2),
          i = _currElement$id$split2[0],
          j = _currElement$id$split2[1];

      var currNode = board.allNodesArray[i][j];
      currElement.className = currNode.weight === 0 ? "wall" : "unvisited weight";

      if (currIndex === board.wallsAnimationArray.length - 1) {
        board.wallsAnimationArray = [];
        board.toggleButtons();
      }
    }, speed * (currIndex + 1));
  };

  for (var currIndex = 0; currIndex < board.wallsAnimationArray.length; currIndex++) {
    _loop(currIndex);
  }
};

var _default = mazeGenerator;
exports.default = _default;
},{}],"browser/mazeAlgorithms/randomMaze.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ---------------------FUNCTION FOR GENERATING RANDOM WALL OR WEIGHT MAZE--------------------
var specialNodes = ["start", "target"];

var randomMaze = function randomMaze(board, type) {
  for (var row = 0; row < board.height; row++) {
    for (var col = 0; col < board.width; col++) {
      var random = Math.random();
      var currElement = document.getElementById("".concat(row, "-").concat(col));
      var currNode = board.allNodesArray[row][col];
      var limit = type === "wall" ? 0.25 : 0.35;

      if (random < limit && !specialNodes.includes(currElement.className)) {
        if (type === "wall") {
          currElement.className = "wall";
          currNode.status = "wall";
          currNode.weight = 0;
        } else if (type === "weight") {
          currElement.className = "unvisited weight";
          currNode.status = "unvisited";
          currNode.weight = 15;
        }
      }
    }
  }

  board.toggleButtons();
};

var _default = randomMaze;
exports.default = _default;
},{}],"browser/mazeAlgorithms/verticalSkewMaze.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ------------FUNCTION FOR GENERATING RECURSIVE VERTICALLY SKEWED MAZE------------------
var specialNodes = ["start", "target"];

var verticalSkewMaze = function verticalSkewMaze(board, rowsi, rowei, colsi, colei, orientation, outerWalls) {
  if (rowei < rowsi || colei < colsi) return;

  if (!outerWalls) {
    for (var row = 0; row < board.height; row++) {
      for (var col = 0; col < board.width; col++) {
        var currNode = board.getNode("".concat(row, "-").concat(col));

        if (!specialNodes.includes(currNode.status)) {
          if (row === 0 || row === board.height - 1 || col === 0 || col === board.width - 1) {
            var currElement = document.getElementById("".concat(row, "-").concat(col));
            board.wallsAnimationArray.push(currElement);
            currNode.status = "wall";
          }
        }
      }
    }

    outerWalls = true;
  }

  if (orientation === "horizontal") {
    var possibleRows = [];

    for (var currIndex = rowsi; currIndex <= rowei; currIndex += 2) {
      possibleRows.push(currIndex);
    }

    var possibleCols = [];

    for (var _currIndex = colsi - 1; _currIndex <= colei + 1; _currIndex += 2) {
      possibleCols.push(_currIndex);
    }

    var randomRI = Math.floor(Math.random() * possibleRows.length);
    var randomCI = Math.floor(Math.random() * possibleCols.length);
    var currentRow = possibleRows[randomRI];
    var columnRandom = possibleCols[randomCI];

    for (var _row = 0; _row < board.height; _row++) {
      for (var _col = 0; _col < board.width; _col++) {
        if ((_row + _col) * Math.random() < 40) {
          var _currNode = board.getNode("".concat(_row, "-").concat(_col));

          if (!specialNodes.includes(_currNode.status)) {
            if (_row === currentRow && _col !== columnRandom && _col >= colsi - 1 && _col <= colei + 1) {
              var _currElement = document.getElementById("".concat(_row, "-").concat(_col));

              board.wallsAnimationArray.push(_currElement);
              _currNode.status = "wall";
            }
          }
        }
      }
    }

    if (currentRow - 2 - rowsi > colei - colsi) {
      verticalSkewMaze(board, rowsi, currentRow - 2, colsi, colei, orientation, outerWalls);
    } else {
      verticalSkewMaze(board, rowsi, currentRow - 2, colsi, colei, "vertical", outerWalls);
    }

    if (rowei - (currentRow + 2) > colei - colsi) {
      verticalSkewMaze(board, currentRow + 2, rowei, colsi, colei, "vertical", outerWalls);
    } else {
      verticalSkewMaze(board, currentRow + 2, rowei, colsi, colei, "vertical", outerWalls);
    }
  } else {
    var _possibleCols = [];

    for (var _currIndex2 = colsi; _currIndex2 <= colei; _currIndex2 += 2) {
      _possibleCols.push(_currIndex2);
    }

    var _possibleRows = [];

    for (var _currIndex3 = rowsi - 1; _currIndex3 <= rowei + 1; _currIndex3 += 2) {
      _possibleRows.push(_currIndex3);
    }

    var _randomCI = Math.floor(Math.random() * _possibleCols.length);

    var _randomRI = Math.floor(Math.random() * _possibleRows.length);

    var currentCol = _possibleCols[_randomCI];
    var rowRandom = _possibleCols[_randomRI];

    for (var _row2 = 0; _row2 < board.height; _row2++) {
      for (var _col2 = 0; _col2 < board.width; _col2++) {
        if ((_row2 + _col2 % 50) * Math.random() < 22 && (_row2 % 15 + _col2) * Math.random() < 22) {
          var _currNode2 = board.getNode("".concat(_row2, "-").concat(_col2));

          if (!specialNodes.includes(_currNode2.status)) {
            if (_col2 === currentCol && _row2 !== rowRandom && _row2 >= rowsi - 1 && _row2 <= rowei + 1) {
              var _currElement2 = document.getElementById("".concat(_row2, "-").concat(_col2));

              board.wallsAnimationArray.push(_currElement2);
              _currNode2.status = "wall";
            }
          }
        }
      }
    }

    if (rowei - rowsi > currentCol - 2 - colsi) {
      verticalSkewMaze(board, rowsi, rowei, colsi, currentCol - 2, "vertical", outerWalls);
    } else {
      verticalSkewMaze(board, rowsi, rowei, colsi, currentCol - 2, orientation, outerWalls);
    }

    if (rowei - rowsi > colei - (currentCol + 2)) {
      verticalSkewMaze(board, rowsi, rowei, currentCol + 2, colei, "horizontal", outerWalls);
    } else {
      verticalSkewMaze(board, rowsi, rowei, currentCol + 2, colei, orientation, outerWalls);
    }
  }
};

var _default = verticalSkewMaze;
exports.default = _default;
},{}],"browser/mazeAlgorithms/horizontalSkewMaze.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ------------FUNCTION FOR GENERATING RECURSIVE HORIZONTALLY SKEWED MAZE------------------
var specialNodes = ["start", "target"];

var horizontalSkewMaze = function horizontalSkewMaze(board, rowsi, rowei, colsi, colei, orientation, outerWalls) {
  if (rowei < rowsi || colei < colsi) return;

  if (!outerWalls) {
    for (var row = 0; row < board.height; row++) {
      for (var col = 0; col < board.width; col++) {
        var currNode = board.getNode("".concat(row, "-").concat(col));

        if (!specialNodes.includes(currNode.status)) {
          if (row === 0 || row === board.height - 1 || col === 0 || col === board.width - 1) {
            var currElement = document.getElementById("".concat(row, "-").concat(col));
            board.wallsAnimationArray.push(currElement);
            currNode.status = "wall";
          }
        }
      }
    }

    outerWalls = true;
  }

  if (orientation === "horizontal") {
    var possibleRows = [];

    for (var currIndex = rowsi; currIndex <= rowei; currIndex += 2) {
      possibleRows.push(currIndex);
    }

    var possibleCols = [];

    for (var _currIndex = colsi - 1; _currIndex <= colei + 1; _currIndex += 2) {
      possibleCols.push(_currIndex);
    }

    var randomRI = Math.floor(Math.random() * possibleRows.length);
    var randomCI = Math.floor(Math.random() * possibleCols.length);
    var currentRow = possibleRows[randomRI];
    var columnRandom = possibleCols[randomCI];

    for (var _row = 0; _row < board.height; _row++) {
      for (var _col = 0; _col < board.width; _col++) {
        if ((_row + _col) * Math.random() < 20) {
          var _currNode = board.getNode("".concat(_row, "-").concat(_col));

          if (!specialNodes.includes(_currNode.status)) {
            if (_row === currentRow && _col !== columnRandom && _col >= colsi - 1 && _col <= colei + 1) {
              var _currElement = document.getElementById("".concat(_row, "-").concat(_col));

              board.wallsAnimationArray.push(_currElement);
              _currNode.status = "wall";
            }
          }
        }
      }
    }

    if (currentRow - 2 - rowsi > colei - colsi) {
      horizontalSkewMaze(board, rowsi, currentRow - 2, colsi, colei, orientation, outerWalls);
    } else {
      horizontalSkewMaze(board, rowsi, currentRow - 2, colsi, colei, "horizontal", outerWalls);
    }

    if (rowei - (currentRow + 2) > colei - colsi) {
      horizontalSkewMaze(board, currentRow + 2, rowei, colsi, colei, orientation, outerWalls);
    } else {
      horizontalSkewMaze(board, currentRow + 2, rowei, colsi, colei, "vertical", outerWalls);
    }
  } else {
    var _possibleCols = [];

    for (var _currIndex2 = colsi; _currIndex2 <= colei; _currIndex2 += 2) {
      _possibleCols.push(_currIndex2);
    }

    var _possibleRows = [];

    for (var _currIndex3 = rowsi - 1; _currIndex3 <= rowei + 1; _currIndex3 += 2) {
      _possibleRows.push(_currIndex3);
    }

    var _randomCI = Math.floor(Math.random() * _possibleCols.length);

    var _randomRI = Math.floor(Math.random() * _possibleRows.length);

    var currentCol = _possibleCols[_randomCI];
    var rowRandom = _possibleCols[_randomRI];

    for (var _row2 = 0; _row2 < board.height; _row2++) {
      for (var _col2 = 0; _col2 < board.width; _col2++) {
        if ((_row2 + _col2 % 50) * Math.random() < 22 && (_row2 % 15 + _col2) * Math.random() < 22) {
          var _currNode2 = board.getNode("".concat(_row2, "-").concat(_col2));

          if (!specialNodes.includes(_currNode2.status)) {
            if (_col2 === currentCol && _row2 !== rowRandom && _row2 >= rowsi - 1 && _row2 <= rowei + 1) {
              var _currElement2 = document.getElementById("".concat(_row2, "-").concat(_col2));

              board.wallsAnimationArray.push(_currElement2);
              _currNode2.status = "wall";
            }
          }
        }
      }
    }

    if (rowei - rowsi > currentCol - 2 - colsi) {
      horizontalSkewMaze(board, rowsi, rowei, colsi, currentCol - 2, "horizontal", outerWalls);
    } else {
      horizontalSkewMaze(board, rowsi, rowei, colsi, currentCol - 2, "horizontal", outerWalls);
    }

    if (rowei - rowsi > colei - (currentCol + 2)) {
      horizontalSkewMaze(board, rowsi, rowei, currentCol + 2, colei, "horizontal", outerWalls);
    } else {
      horizontalSkewMaze(board, rowsi, rowei, currentCol + 2, colei, orientation, outerWalls);
    }
  }
};

var _default = horizontalSkewMaze;
exports.default = _default;
},{}],"browser/mazeAlgorithms/stairMaze.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ------------FUNCTION FOR GENERATING STAIR MAZE---------------------
var specialNodes = ["start", "target"];

var stairMaze = function stairMaze(board) {
  var row = board.height - 1;
  var col = 0;

  while (row > 0 && col < board.width) {
    var currNode = board.allNodesArray[row][col];
    var currElement = document.getElementById("".concat(row, "-").concat(col));

    if (!specialNodes.includes(currNode.status)) {
      currNode.status = "wall";
      board.wallsAnimationArray.push(currElement);
    }

    row--;
    col++;
  }

  while (row < board.height - 2 && col < board.width) {
    var _currNode = board.allNodesArray[row][col];

    var _currElement = document.getElementById("".concat(row, "-").concat(col));

    if (!specialNodes.includes(_currNode.status)) {
      _currNode.status = "wall";
      board.wallsAnimationArray.push(_currElement);
    }

    row++;
    col++;
  }

  while (row > 0 && col < board.width - 1) {
    var _currNode2 = board.allNodesArray[row][col];

    var _currElement2 = document.getElementById("".concat(row, "-").concat(col));

    if (!specialNodes.includes(_currNode2.status)) {
      _currNode2.status = "wall";
      board.wallsAnimationArray.push(_currElement2);
    }

    row--;
    col++;
  }
};

var _default = stairMaze;
exports.default = _default;
},{}],"browser/searchAlgorithms/unweightedAlgorithms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// While breadthfirst search uses a queue to visit nodes of all children connected to the node , depthfirst uses a stack and explores in one direction completely and then others .
// ---------------------FUNCTION FOR BREADTH-FIRST AND DEPTH-FIRST SEARCH--------------------
var unweightedAlgorithm = function unweightedAlgorithm(board, type) {
  if (board.start.length === 0 || board.target.length === 0 || board.start === board.target) {
    return false;
  }

  var starting = board.getNode(board.start);
  var queue = [starting];
  var visitedNodes = {
    starting: true
  };

  var _loop = function _loop() {
    var currentNode = type === "breadthfirst" ? queue.shift() : queue.pop();
    board.nodesToAnimate.push(currentNode);
    if (type === "depthfirst") visitedNodes[currentNode.id] = true;
    currentNode.status = "visited";
    if (currentNode.id === board.target) return {
      v: "success"
    };
    var currentNeighbors = getNeighbors(currentNode.id, board, type);
    console.log(currentNode.id, currentNeighbors);
    currentNeighbors.forEach(function (neighbour) {
      if (!visitedNodes[neighbour]) {
        if (type === "breadthfirst") visitedNodes[neighbour] = true;
        board.getNode(neighbour).previousNode = currentNode.id;
        queue.push(board.getNode(neighbour));
      }
    });
  };

  while (queue.length) {
    var _ret = _loop();

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return false;
}; // --------------FUNCTION FOR EXPLORING FOUR POSSIBLE NEIGHBOURS OF A NODE-------------------


function getNeighbors(id, board, type) {
  var coordinates = id.split("-");
  var row = parseInt(coordinates[0]);
  var col = parseInt(coordinates[1]);
  var neighbors = [];
  var potentialNeighbor;

  if (board.allNodesArray[row - 1] && board.allNodesArray[row - 1][col]) {
    potentialNeighbor = "".concat((row - 1).toString(), "-").concat(col.toString());

    if (board.getNode(potentialNeighbor).status !== "wall") {
      if (type === "breadthfirst") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }

  if (board.allNodesArray[row][col + 1]) {
    potentialNeighbor = "".concat(row.toString(), "-").concat((col + 1).toString());

    if (board.getNode(potentialNeighbor).status !== "wall") {
      if (type === "breadthfirst") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }

  if (board.allNodesArray[row + 1] && board.allNodesArray[row + 1][col]) {
    potentialNeighbor = "".concat((row + 1).toString(), "-").concat(col.toString());

    if (board.getNode(potentialNeighbor).status !== "wall") {
      if (name === "breadthfirst") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }

  if (board.allNodesArray[row][col - 1]) {
    potentialNeighbor = "".concat(row.toString(), "-").concat((col - 1).toString());

    if (board.getNode(potentialNeighbor).status !== "wall") {
      if (name === "breadthfirst") {
        neighbors.push(potentialNeighbor);
      } else {
        neighbors.unshift(potentialNeighbor);
      }
    }
  }

  return neighbors;
}

var _default = unweightedAlgorithm;
exports.default = _default;
},{}],"browser/animations/shortestPathAnimation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawShortestPathTimeout = exports.addShortestPath = void 0;

//-----------------FUNCTION FOR GETTING SHORTEST PATH IN ARRAY -----------------
var addShortestPath = function addShortestPath(board, type) {
  var currentNode;
  currentNode = board.getNode(board.getNode(board.target).previousNode);

  while (currentNode.id !== board.start) {
    board.shortestPathNodesToAnimate.unshift(currentNode);

    if (type === "draw") {
      document.getElementById(currentNode.id).className = "shortest-path";
    }

    currentNode = board.getNode(currentNode.previousNode);
  }
}; //---------------------FUNCTION FOR DRAWING SHORTEST PATH---------------------


exports.addShortestPath = addShortestPath;

var drawShortestPathTimeout = function drawShortestPathTimeout(board, type) {
  var currentNode;
  var currentNodesToAnimate = [];
  currentNode = board.getNode(board.getNode(board.target).previousNode);

  while (currentNode.id !== board.start) {
    currentNodesToAnimate.unshift(currentNode);
    currentNode = board.getNode(currentNode.previousNode);
  }

  var timeout = function timeout(currentIndex) {
    if (!currentNodesToAnimate.length) {
      currentNodesToAnimate.push(board.getNode(board.start));
    }

    setTimeout(function () {
      if (currentIndex === 0) {
        shortestPathChange(currentNodesToAnimate[currentIndex]);
      } else if (currentIndex < currentNodesToAnimate.length) {
        shortestPathChange(currentNodesToAnimate[currentIndex], currentNodesToAnimate[currentIndex - 1]);
      } else if (currentIndex === currentNodesToAnimate.length) {
        shortestPathChange(board.getNode(board.target), currentNodesToAnimate[currentIndex - 1], "target");
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
      if (currentNode.id !== board.target || currentNode.id === board.target && istarget) {
        var currentNodeElement = document.getElementById(currentNode.id);

        if (type === "unweighted") {
          currentNodeElement.className = "shortest-path-unweighted";
        } else {
          var direction = "direction";

          if (currentNode[direction] === "up") {
            currentNodeElement.className = "shortest-path-up";
          } else if (currentNode[direction] === "down") {
            currentNodeElement.className = "shortest-path-down";
          } else if (currentNode[direction] === "right") {
            currentNodeElement.className = "shortest-path-right";
          } else if (currentNode[direction] === "left") {
            currentNodeElement.className = "shortest-path-left";
          } else {
            currentNodeElement.className = "shortest-path";
          }
        }
      }
    }

    if (previousNode) {
      if (previousNode.id !== board.target && previousNode.id !== board.start) {
        var previousNodeElement = document.getElementById(previousNode.id);
        previousNodeElement.className = previousNode.weight === 15 ? "shortest-path weight" : "shortest-path";
      }
    } else {
      var element = document.getElementById(board.start);
      element.className = "startTransparent";
    }
  }

  timeout(0);
};

exports.drawShortestPathTimeout = drawShortestPathTimeout;
},{}],"browser/animations/launchAnimations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shortestPathAnimation = require("../animations/shortestPathAnimation.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ------------------FUNCTION FOR LAUNCHING ANIMATIONS--------------------
var launchAnimations = function launchAnimations(board, success, type) {
  var nodesToAnimate = _toConsumableArray(board.nodesToAnimate);

  var speed = board.speed === "fast" ? 0 : board.speed === "average" ? 100 : 500;

  var timeout = function timeout(currIndex) {
    setTimeout(function () {
      if (currIndex === nodesToAnimate.length) {
        board.nodesToAnimate = [];

        if (success) {
          if (document.getElementById(board.target).className !== "visitedTargetNodeBlue") {
            document.getElementById(board.target).className = "visitedTargetNodeBlue";
          }

          (0, _shortestPathAnimation.drawShortestPathTimeout)(board, type);
          board.shortestPathNodesToAnimate = [];
          board.reset();
          return;
        } else {
          board.reset();
          board.toggleButtons();
          return;
        }
      } else if (currIndex === 0) {
        document.getElementById(board.start).className = "visitedStartNodeBlue";
        change(nodesToAnimate[currIndex]);
      } else {
        change(nodesToAnimate[currIndex], nodesToAnimate[currIndex - 1]);
      }

      timeout(currIndex + 1);
    }, speed);
  };

  var change = function change(currentNode, previousNode) {
    var currentNodeElement = document.getElementById(currentNode.id);
    var specialClasses = ["start", "target", "visitedStartNodeBlue", "visitedTargetNodeBlue"];

    if (!specialClasses.includes(currentNodeElement.className)) {
      currentNodeElement.className = currentNode.weight === 15 ? "visited weight" : "visited";
    }

    if (previousNode) {
      var previousNodeElement = document.getElementById(previousNode.id);

      if (!specialClasses.includes(previousNodeElement.className)) {
        previousNodeElement.className = previousNode.weight === 15 ? "visited weight" : "visited";
      }
    }
  };

  timeout(0);
};

var _default = launchAnimations;
exports.default = _default;
},{"../animations/shortestPathAnimation.js":"browser/animations/shortestPathAnimation.js"}],"browser/searchAlgorithms/astarAlgorithm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//The basic approach of A* is that it precomputes distances before taking decisions on what to choose
// It consists of g-cost which is the distance from start node and h-cost which is the distance from target
//f-cost = g-cost + h-cost.
//Since A* is a weighted algorithm along with dijkstra's algorithm and greedy best first search they get called from weightedAlgorithms.js
//---------------------FUNCTION FOR A* ALGORITHM------------------------
var astarAlgorithm = function astarAlgorithm(board) {
  if (board.start.length === 0 || board.target.length === 0 || board.start === board.target) {
    return false;
  }

  board.getNode(board.start).distance = 0;
  board.getNode(board.start).totalDistance = 0;
  board.getNode(board.start).direction = "up";
  var unvisitedNodes = [];

  for (var row = 0; row < board.height; row++) {
    for (var col = 0; col < board.width; col++) {
      unvisitedNodes.push("".concat(row, "-").concat(col));
    }
  }

  while (unvisitedNodes.length) {
    var currentNode = closestNode(board, unvisitedNodes);

    while (currentNode.status === "wall" && unvisitedNodes.length) {
      currentNode = closestNode(board, unvisitedNodes);
    }

    if (currentNode.distance === Infinity) return false;
    board.nodesToAnimate.push(currentNode);
    currentNode.status = "visited";

    if (currentNode.id === board.target) {
      return "success";
    }

    updateNeighbors(board, currentNode);
  }
}; // ------------FUNCTION FOR GETTING THE CLOSEST NODE ACCORDING TO DISTANCES---------------


var closestNode = function closestNode(board, unvisitedNodes) {
  var currentClosest;
  var index;

  for (var currIndex = 0; currIndex < unvisitedNodes.length; currIndex++) {
    if (!currentClosest || currentClosest.totalDistance > board.getNode(unvisitedNodes[currIndex]).totalDistance) {
      currentClosest = board.getNode(unvisitedNodes[currIndex]);
      index = currIndex;
    } else if (currentClosest.totalDistance === board.getNode(unvisitedNodes[currIndex]).totalDistance) {
      if (currentClosest.heuristicDistance > board.getNode(unvisitedNodes[currIndex]).heuristicDistance) {
        currentClosest = board.getNode(unvisitedNodes[currIndex]);
        index = currIndex;
      }
    }
  }

  unvisitedNodes.splice(index, 1);
  return currentClosest;
}; // ---------------------FUNCTION FOR GETTING DIFFERENCE OF DISTANCE BETWEEN TWO NODES---------------


var manhattanDistance = function manhattanDistance(firstNode, secondNode) {
  var firstNodeCoordinates = firstNode.id.split("-").map(function (coordinate) {
    return parseInt(coordinate);
  });
  var secondNodeCoordinates = secondNode.id.split("-").map(function (coordinate) {
    return parseInt(coordinate);
  });
  var x1 = firstNodeCoordinates[0];
  var y1 = firstNodeCoordinates[1];
  var x2 = secondNodeCoordinates[0];
  var y2 = secondNodeCoordinates[1];
  var deltax = Math.abs(x1 - x2);
  var deltay = Math.abs(y1 - y2);
  return deltax + deltay;
}; // -------------------FUNCTION FOR EXPLORING FOUR NEIGHBOURS OF A NODE --------------------


var getNeighbors = function getNeighbors(id, board) {
  var coordinates = id.split("-");
  var row = parseInt(coordinates[0]);
  var col = parseInt(coordinates[1]);
  var neighbors = [];
  var potentialNeighbor;

  if (board.allNodesArray[row - 1] && board.allNodesArray[row - 1][col]) {
    potentialNeighbor = "".concat((row - 1).toString(), "-").concat(col.toString());
    if (board.getNode(potentialNeighbor).status !== "wall") neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row + 1] && board.allNodesArray[row + 1][col]) {
    potentialNeighbor = "".concat((row + 1).toString(), "-").concat(col.toString());
    if (board.getNode(potentialNeighbor).status !== "wall") neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row][col - 1]) {
    potentialNeighbor = "".concat(row.toString(), "-").concat((col - 1).toString());
    if (board.getNode(potentialNeighbor).status !== "wall") neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row][col + 1]) {
    potentialNeighbor = "".concat(row.toString(), "-").concat((col + 1).toString());
    if (board.getNode(potentialNeighbor).status !== "wall") neighbors.push(potentialNeighbor);
  }

  return neighbors;
}; // ----------------FUNCTIONS FOR UPDATING THE DISTANCES OF NEIGHBOURS RELATIVE TO START AND TARGET NODE -----------------


var updateNeighbors = function updateNeighbors(board, currentNode) {
  var neighbours = getNeighbors(currentNode.id, board);

  var _iterator = _createForOfIteratorHelper(neighbours),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var neighbour = _step.value;

      if (board.target.length !== 0) {
        updateNode(currentNode, board.getNode(neighbour), board.getNode(board.target));
      } else {
        updateNode(currentNode, board.getNode(neighbour));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var updateNode = function updateNode(currentNode, targetNode, actualTargetNode) {
  var distance = getDistance(currentNode, targetNode);
  if (!targetNode.heuristicDistance) targetNode.heuristicDistance = manhattanDistance(targetNode, actualTargetNode);
  var distanceToCompare = currentNode.distance + targetNode.weight + distance[0];

  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.totalDistance = targetNode.distance + targetNode.heuristicDistance;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
}; // -----------------FUNCTION FOR GETTING DISTANCE BETWEEN TWO NODES -----------------


var getDistance = function getDistance(nodeOne, nodeTwo) {
  var currentCoordinates = nodeOne.id.split("-");
  var targetCoordinates = nodeTwo.id.split("-");
  var x1 = parseInt(currentCoordinates[0]);
  var y1 = parseInt(currentCoordinates[1]);
  var x2 = parseInt(targetCoordinates[0]);
  var y2 = parseInt(targetCoordinates[1]);

  if (x2 < x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "up"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "up"];
    }
  } else if (x2 > x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "down"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "down"];
    }
  }

  if (y2 < y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "left"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "left"];
    }
  } else if (y2 > y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "right"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "right"];
    }
  }
};

var _default = astarAlgorithm;
exports.default = _default;
},{}],"browser/searchAlgorithms/weightedAlgorithms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _astarAlgorithm = _interopRequireDefault(require("../searchAlgorithms/astarAlgorithm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// -----------------------FUNCTION FOR WEIGHTED ALGORITHMS----------------------
var weightedAlgorithms = function weightedAlgorithms(board, type) {
  if (type === "astar") return (0, _astarAlgorithm.default)(board);

  if (board.start.length === 0 || board.target.length === 0 || board.start === board.target) {
    return false;
  }

  board.getNode(board.start).distance = 0;
  board.getNode(board.start).direction = "right";
  var unvisitedNodes = [];

  for (var row = 0; row < board.height; row++) {
    for (var col = 0; col < board.width; col++) {
      unvisitedNodes.push("".concat(row, "-").concat(col));
    }
  }

  while (unvisitedNodes.length) {
    var currentNode = closestNode(board, unvisitedNodes);

    while (currentNode.status === "wall" && unvisitedNodes.length) {
      currentNode = closestNode(board, unvisitedNodes);
    }

    if (currentNode.distance === Infinity) {
      return false;
    }

    board.nodesToAnimate.push(currentNode);
    currentNode.status = "visited";

    if (currentNode.id === board.target) {
      return "success";
    }

    if (type === "bestfirst") {
      updateNeighbors(board, currentNode, type);
    } else if (type === "dijkstra") {
      updateNeighbors(board, currentNode, type);
    }
  }
}; // --------------------FUNCTION FOR FINDING THE CLOSEST NODE--------------------


var closestNode = function closestNode(board, unvisitedNodes) {
  var currentClosest, index;

  for (var currIndex = 0; currIndex < unvisitedNodes.length; currIndex++) {
    if (!currentClosest || currentClosest.distance > board.getNode(unvisitedNodes[currIndex]).distance) {
      currentClosest = board.getNode(unvisitedNodes[currIndex]);
      index = currIndex;
    }
  }

  unvisitedNodes.splice(index, 1);
  return currentClosest;
}; // ------------------FUNCTION FOR UPDATING NEIGHBOURS  AND NODES-----------------


var updateNeighbors = function updateNeighbors(board, currentNode, type) {
  var neighbours = getNeighbors(currentNode.id, board);

  var _iterator = _createForOfIteratorHelper(neighbours),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var neighbour = _step.value;

      if (board.target.length !== 0) {
        updateNode(currentNode, board.getNode(neighbour), board.getNode(board.target), type);
      } else {
        updateNode(currentNode, board.getNode(neighbour), type);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

function updateNode(currentNode, targetNode, actualTargetNode, type) {
  var distance = getDistance(currentNode, targetNode);
  var distanceToCompare;

  if (actualTargetNode && type === "bestfirst") {
    distanceToCompare = targetNode.weight + distance[0] + manhattanDistance(targetNode, actualTargetNode);
  } else {
    distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
  }

  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
} // ------------------FUNCTION FOR EXPLORING ALL FOUR NEIGHBOURS OF A NODE-------------------


var getNeighbors = function getNeighbors(id, board) {
  var coordinates = id.split("-");
  var row = parseInt(coordinates[0]);
  var col = parseInt(coordinates[1]);
  var neighbors = [];
  var potentialNeighbor;

  if (board.allNodesArray[row - 1] && board.allNodesArray[row - 1][col]) {
    potentialNeighbor = "".concat((row - 1).toString(), "-").concat(col.toString());
    if (board.getNode(potentialNeighbor).status !== "wall") neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row + 1] && board.allNodesArray[row + 1][col]) {
    potentialNeighbor = "".concat((row + 1).toString(), "-").concat(col.toString());
    if (board.getNode(potentialNeighbor).status !== "wall") neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row][col - 1]) {
    potentialNeighbor = "".concat(row.toString(), "-").concat((col - 1).toString());
    if (board.getNode(potentialNeighbor).status !== "wall") neighbors.push(potentialNeighbor);
  }

  if (board.allNodesArray[row][col + 1]) {
    potentialNeighbor = "".concat(row.toString(), "-").concat((col + 1).toString());
    if (board.getNode(potentialNeighbor).status !== "wall") neighbors.push(potentialNeighbor);
  }

  return neighbors;
}; // ------------------FUNCTION FOR CALCULATING DISTANCES BETWEEN NODES-----------------------


var manhattanDistance = function manhattanDistance(firstNode, secondNode) {
  var firstNodeCoordinates = firstNode.id.split("-").map(function (coordinate) {
    return parseInt(coordinate);
  });
  var secondNodeCoordinates = secondNode.id.split("-").map(function (coordinate) {
    return parseInt(coordinate);
  });
  var x1 = firstNodeCoordinates[0];
  var y1 = firstNodeCoordinates[1];
  var x2 = secondNodeCoordinates[0];
  var y2 = secondNodeCoordinates[1];
  var deltax = Math.abs(x1 - x2);
  var deltay = Math.abs(y1 - y2);
  return deltax + deltay;
};

var getDistance = function getDistance(nodeOne, nodeTwo) {
  var currentCoordinates = nodeOne.id.split("-");
  var targetCoordinates = nodeTwo.id.split("-");
  var x1 = parseInt(currentCoordinates[0]);
  var y1 = parseInt(currentCoordinates[1]);
  var x2 = parseInt(targetCoordinates[0]);
  var y2 = parseInt(targetCoordinates[1]);

  if (x2 < x1) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    }
  } else if (x2 > x1) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    }
  }

  if (y2 < y1) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    }
  } else if (y2 > y1) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    }
  }
};

var _default = weightedAlgorithms;
exports.default = _default;
},{"../searchAlgorithms/astarAlgorithm.js":"browser/searchAlgorithms/astarAlgorithm.js"}],"browser/animations/launchInstantAnimations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shortestPathAnimation = require("../animations/shortestPathAnimation.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ----------------FUNCTION FOR LAUNCHING INSTANT ANIMATIONS------------------
var launchInstantAnimations = function launchInstantAnimations(board, success, type) {
  var change = function change(currentNode, previousNode) {
    var currentNodeElement = document.getElementById(currentNode.id);
    var specialClasses = ["start", "shortest-path", "instantshortest-path", "instantshortest-path weight"];

    if (previousNode) {
      var previousNodeElement = document.getElementById(previousNode.id);

      if (!specialClasses.includes(previousNodeElement.className)) {
        previousNodeElement.className = previousNode.weight === 15 ? "instantvisited weight" : "instantvisited";
      }
    }
  };

  var shortestPathChange = function shortestPathChange(currentNode, previousNode) {
    var currentNodeElement = document.getElementById(currentNode.id);

    if (type === "unweighted") {
      currentNodeElement.className = "shortest-path-unweighted";
    } else {
      if (currentNode.direction === "up") {
        currentNodeElement.className = "shortest-path-up";
      } else if (currentNode.direction === "down") {
        currentNodeElement.className = "shortest-path-down";
      } else if (currentNode.direction === "right") {
        currentNodeElement.className = "shortest-path-right";
      } else if (currentNode.direction === "left") {
        currentNodeElement.className = "shortest-path-left";
      }
    }

    if (previousNode) {
      var previousNodeElement = document.getElementById(previousNode.id);
      previousNodeElement.className = previousNode.weight === 15 ? "instantshortest-path weight" : "instantshortest-path";
    } else {
      var element = document.getElementById(board.start);
      element.className = "startTransparent";
    }
  };

  var nodesToAnimate = _toConsumableArray(board.nodesToAnimate);

  var shortestPathNodes;

  for (var currIndex = 0; currIndex < nodesToAnimate.length; currIndex++) {
    if (currIndex === 0) change(nodesToAnimate[currIndex]);else change(nodesToAnimate[currIndex], nodesToAnimate[currIndex - 1]);
  }

  board.nodesToAnimate = [];

  if (success) {
    (0, _shortestPathAnimation.addShortestPath)(board, "draw");
    shortestPathNodes = board.shortestPathNodesToAnimate;
  } else {
    board.reset();
    return;
  }

  var i;

  for (i = 0; i < shortestPathNodes.length; i++) {
    if (i === 0) shortestPathChange(shortestPathNodes[i]);else shortestPathChange(shortestPathNodes[i], shortestPathNodes[i - 1]);
  }

  board.reset();
  shortestPathChange(board.getNode(board.target), shortestPathNodes[i - 1]);
  board.shortestPathNodesToAnimate = [];
};

var _default = launchInstantAnimations;
exports.default = _default;
},{"../animations/shortestPathAnimation.js":"browser/animations/shortestPathAnimation.js"}],"browser/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("../browser/Node.js"));

var _mazeGenerator = _interopRequireDefault(require("../browser/animations/mazeGenerator.js"));

var _randomMaze = _interopRequireDefault(require("../browser/mazeAlgorithms/randomMaze.js"));

var _verticalSkewMaze = _interopRequireDefault(require("../browser/mazeAlgorithms/verticalSkewMaze.js"));

var _horizontalSkewMaze = _interopRequireDefault(require("../browser/mazeAlgorithms/horizontalSkewMaze.js"));

var _stairMaze = _interopRequireDefault(require("../browser/mazeAlgorithms/stairMaze.js"));

var _unweightedAlgorithms = _interopRequireDefault(require("../browser/searchAlgorithms/unweightedAlgorithms.js"));

var _launchAnimations = _interopRequireDefault(require("../browser/animations/launchAnimations.js"));

var _weightedAlgorithms = _interopRequireDefault(require("../browser/searchAlgorithms/weightedAlgorithms.js"));

var _launchInstantAnimations = _interopRequireDefault(require("../browser/animations/launchInstantAnimations.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var gridContainer = document.querySelector(".grid");
var navbarContainer = document.querySelector(".navbarContainer");
var navHeight = navbarContainer.offsetHeight;
var mainContentContainer = document.querySelector(".mainContentContainer"); //---------------FUNCTIONS---------------
// ------------CONSTRUCTOR FOR BOARD OBJECT-----------------

function Board(width, height) {
  this.width = width;
  this.height = height;
  this.wallsAnimationArray = [];
  this.algoComplete = false;
  this.speed = "fast";
  this.algo = "";
  this.start = "";
  this.target = "";
  this.allNodesArray = [];
  this.nodesToAnimate = [];
  this.tutorialContentArray = [];
  this.pressedNodeStatus = "normal";
  this.mouseDown = false;
  this.keyDown = false;
  this.buttonsActivated = false;
  this.shortestPathNodesToAnimate = [];
  this.previouslyPressedNodeStatus = null;
  this.previouslySwitchedNode = null;
  this.previouslySwitchedNodeWeight = 0;
} // --------------------FUNCTION FOR INITIALIZING BOARD AREA----------------


Board.prototype.initialize = function () {
  this.contentInitialize();
  this.createGrid();
  this.addEventListeners();
  this.tutorialWork();
  this.restOfListeners();
}; // -----------FUNCTION FOR CREATING GRID----------------


Board.prototype.createGrid = function () {
  var htmlOfGrid = "";

  for (var row = 0; row < this.height; row++) {
    var gridRow = "<tr id = \"row_".concat(row, "\">");
    var allNodesRowArray = [];

    for (var col = 0; col < this.width; col++) {
      var id = "".concat(row, "-").concat(col);
      var nodeStatus = void 0;

      if (row === Math.floor(this.height / 2) && col === Math.floor(this.width / 4) && this.start.length === 0) {
        nodeStatus = "start";
        this.start = "".concat(id);
      } else if (row === Math.floor(this.height / 2) && col === Math.floor(3 * this.width / 4) && this.target.length === 0) {
        nodeStatus = "target";
        this.target = "".concat(id);
      } else {
        nodeStatus = "unvisited";
      }

      var newNode = new _Node.default(id, nodeStatus);
      allNodesRowArray.push(newNode);
      gridRow += "<td id=\"".concat(id, "\" class=\"").concat(nodeStatus, "\"></td>");
    }

    htmlOfGrid += "".concat(gridRow, "</tr>");
    this.allNodesArray.push(allNodesRowArray);
  }

  gridContainer.innerHTML = htmlOfGrid;
}; // -----------------------FUNCTION FOR ADDING LISTENERS TO GRID --------------


Board.prototype.addEventListeners = function () {
  var _this = this;

  for (var row = 0; row < this.height; row++) {
    var _loop = function _loop(col) {
      var currentNodeId = "".concat(row, "-").concat(col);
      var currentNodeElement = document.getElementById(currentNodeId);
      var currentNode = _this.allNodesArray[row][col];
      currentNodeElement.addEventListener("mousedown", function (e) {
        e.preventDefault();

        if (_this.buttonsActivated) {
          _this.mouseDown = true;

          if (currentNode.status === "start" || currentNode.status === "target") {
            _this.pressedNodeStatus = currentNode.status;
          } else {
            _this.pressedNodeStatus = "normal";

            _this.changeNormalNode(currentNode, currentNodeElement);
          }
        }
      });
      currentNodeElement.addEventListener("mouseup", function (e) {
        if (_this.buttonsActivated) {
          _this.mouseDown = false;
          if (_this.pressedNodeStatus === "target") _this.target = currentNodeId;else if (_this.pressedNodeStatus === "start") _this.start = currentNodeId;
          _this.pressedNodeStatus = "normal";
        }
      });
      currentNodeElement.addEventListener("mouseenter", function (e) {
        if (_this.buttonsActivated) {
          if (_this.mouseDown && _this.pressedNodeStatus !== "normal") {
            _this.changeSpecialNode(currentNode, currentNodeElement);

            if (_this.pressedNodeStatus === "target") {
              _this.target = currentNodeId;
              if (_this.algoComplete) _this.redoAlgo();
            } else if (_this.pressedNodeStatus === "start") {
              _this.start = currentNodeId;
              if (_this.algoComplete) _this.redoAlgo();
            }
          } else if (_this.mouseDown) {
            _this.changeNormalNode(currentNode, currentNodeElement);
          }
        }
      });
      currentNodeElement.addEventListener("mouseleave", function (e) {
        if (_this.buttonsActivated) {
          if (_this.mouseDown && _this.pressedNodeStatus !== "normal") {
            _this.changeSpecialNode(currentNode, currentNodeElement);
          }
        }
      });
    };

    for (var col = 0; col < this.width; col++) {
      _loop(col);
    }
  }
}; // --------------FUNCTION FOR DEALING WITH START AND TARGET NODES------------


Board.prototype.changeSpecialNode = function (currentNode, currentNodeElement) {
  var previousElement;
  if (this.previouslySwitchedNode) previousElement = document.getElementById(this.previouslySwitchedNode.id);

  if (currentNode.status !== "target" && currentNode.status !== "start") {
    if (this.previouslySwitchedNode) {
      this.previouslySwitchedNode.status = this.previouslyPressedNodeStatus;
      previousElement.className = this.previouslySwitchedNodeWeight === 15 ? "unvisited weight" : this.previouslyPressedNodeStatus;
      this.previouslySwitchedNode.weight = this.previouslySwitchedNodeWeight === 15 ? 15 : 0;
      this.previouslySwitchedNode = null;
      this.previouslySwitchedNodeWeight = currentNode.weight;
      this.previouslyPressedNodeStatus = currentNode.status;
      currentNodeElement.className = this.pressedNodeStatus;
      currentNode.status = this.pressedNodeStatus;
      currentNode.weight = 0;
    }
  } else if (currentNode.status !== this.pressedNodeStatus && !this.algoComplete) {
    this.previouslySwitchedNode.status = this.pressedNodeStatus;
    previousElement.className = this.pressedNodeStatus;
  } else if (currentNode.status === this.pressedNodeStatus) {
    this.previouslySwitchedNode = currentNode;
    currentNodeElement.className = this.previouslyPressedNodeStatus;
    currentNode.status = this.previouslyPressedNodeStatus;
  }
}; // --------------FUNCTION FOR DEALING WITH WALLS AND WEIGHTS------------


Board.prototype.changeNormalNode = function (currNode, currNodeElement) {
  var specialNodes = ["start", "target"];
  var unweightedalgos = ["breadthfirst", "depthfirst"];

  if (!this.keyDown) {
    if (!specialNodes.includes(currNode.status)) {
      currNodeElement.className = currNode.status !== "wall" ? "wall" : "unvisited";
      currNode.status = currNodeElement.className !== "wall" ? "unvisited" : "wall";
      currNode.weight = 0;
    }
  } else if (this.keyDown === 87 && !unweightedalgos.includes(this.algo)) {
    if (!specialNodes.includes(currNode.status)) {
      currNodeElement.className = currNode.weight !== 15 ? "unvisited weight" : "unvisited";
      currNode.weight = currNodeElement.className !== "unvisited weight" ? 0 : 15;
      currNode.status = "unvisited";
    }
  }
}; // -------------FUNCTION FOR ACCESSING NODE OF PROVIDED ID---------------


Board.prototype.getNode = function (id) {
  var _id$split = id.split("-"),
      _id$split2 = _slicedToArray(_id$split, 2),
      i = _id$split2[0],
      j = _id$split2[1];

  return this.allNodesArray[i][j];
}; // ----------------------FUNCTION FOR REDOING AN ALGORITHM---------------------


Board.prototype.redoAlgo = function () {
  this.clearPath();
  this.instantAlgorithm();
}; // ---------------FUNCTION FOR RUNNING AN ALGORITHM INSTANTLY----------------------------


Board.prototype.instantAlgorithm = function () {
  var success;

  if (this.algo === "astar") {
    success = (0, _weightedAlgorithms.default)(this, this.algo);
    (0, _launchInstantAnimations.default)(this, success, "weighted");
  } else if (this.algo === "dijkstra") {
    success = (0, _weightedAlgorithms.default)(this, this.algo);
    (0, _launchInstantAnimations.default)(this, success, "weighted");
  } else if (this.algo === "bestfirst") {
    success = (0, _weightedAlgorithms.default)(this, this.algo);
    (0, _launchInstantAnimations.default)(this, success, "weighted");
  } else if (this.algo === "breadthfirst") {
    this.clearWeights();
    success = (0, _unweightedAlgorithms.default)(this, this.algo);
    (0, _launchInstantAnimations.default)(this, success, "unweighted");
  } else if (this.algo === "depthfirst") {
    this.clearWeights();
    success = (0, _unweightedAlgorithms.default)(this, this.algo);
    (0, _launchInstantAnimations.default)(this, success, "unweighted");
  }

  this.algoComplete = true;
}; // -----------------------FUNCTIONS FOR CLEARING WALLS AND WEIGHTS AND SETTING THE BOARD TO IT'S INITIAL STATE---------------
// -----------FUNCTION FOR CLEARING WALLS AND WEIGHTS -------------------


Board.prototype.clearWallsAndWeights = function () {
  this.clearPath();

  for (var row = 0; row < this.height; row++) {
    for (var col = 0; col < this.width; col++) {
      var currentNode = this.allNodesArray[row][col];

      if (currentNode.status === "wall" || currentNode.weight === 15) {
        var currentNodeElement = document.getElementById("".concat(row, "-").concat(col));
        currentNodeElement.className = "unvisited";
        currentNode.status = "unvisited";
        currentNode.weight = 0;
      }
    }
  }
}; // ----------------FUNCTION FOR CLEARING WEIGHTS--------------------


Board.prototype.clearWeights = function () {
  for (var row = 0; row < this.height; row++) {
    for (var col = 0; col < this.width; col++) {
      var currentNode = this.allNodesArray[row][col];

      if (currentNode.weight === 15) {
        var currentNodeElement = document.getElementById("".concat(row, "-").concat(col));
        currentNodeElement.className = "unvisited";
        currentNode.status = "unvisited";
        currentNode.weight = 0;
      }
    }
  }
}; // ------------------FUNCTION FOR CLEARING NODE STATUS------------------
//why not weights?


Board.prototype.clearStatus = function () {
  var specialStatus = ["wall", "start", "target"];

  for (var row = 0; row < this.height; row++) {
    for (var col = 0; col < this.width; col++) {
      var currentNode = this.allNodesArray[row][col];
      currentNode.previousNode = null;
      currentNode.direction = null;
      currentNode.distance = Infinity;
      currentNode.totalDistance = Infinity;
      currentNode.heuristicDistance = null;

      if (!specialStatus.includes(currentNode.status)) {
        currentNode.status = "unvisited";
      }
    }
  }
}; // -----------------FUNCTION FOR CLEARING PATH------------------------


Board.prototype.clearPath = function () {
  var startNode = this.getNode(this.start);
  var targetNode = this.getNode(this.target);
  startNode.status = "start";
  var startNodeElement = document.getElementById(this.start);
  startNodeElement.className = "start";
  targetNode.status = "target";
  var targetNodeElement = document.getElementById(this.target);
  targetNodeElement.className = "target";
  this.algoComplete = false;
  var specialStatus = ["wall", "start", "target"];

  for (var row = 0; row < this.height; row++) {
    for (var col = 0; col < this.width; col++) {
      var currentNode = this.allNodesArray[row][col];
      var currentNodeElement = document.getElementById("".concat(row, "-").concat(col));
      currentNode.previousNode = null;
      currentNode.distance = Infinity;
      currentNode.totalDistance = Infinity;
      currentNode.heuristicDistance = null;
      currentNode.direction = null;

      if (currentNode.weight === 15) {
        currentNode.status = "unvisited";
        currentNodeElement.className = "unvisited weight";
      } else if (!specialStatus.includes(currentNode.status)) {
        currentNode.status = "unvisited";
        currentNodeElement.className = "unvisited";
      }
    }
  }
};

Board.prototype.reset = function () {
  this.getNode(this.start).status = "start";
  document.getElementById(this.start).className = "startTransparent";
  this.getNode(this.target).status = "target";
}; // ---------------FUNCTION FOR PROVIDING TEXT FOR TUTORIAL-------------


var counter = 0;

Board.prototype.contentInitialize = function () {
  this.tutorialContentArray.push("<h1>Welcome to Pathfinding Visualizer!</h1>\n        <h2>\n          This short tutorial will walk you through all of the features of this\n          application.\n        </h2>\n        <p>\n          If you want to dive right in, feel free to press the \"Skip Tutorial\"\n          button below. Otherwise, press \"Next\"!\n        </p>\n        <div class=\"pageCounter\">1/7</div>\n        <p>If you want to see the source code for this application, check out my <a  href=\"https://github.com/somyaguglani/Pathfinding-Visualizer\" >github </a></p>\n        <img style=\" height:150px;\" src=\"../styling/imagesAndSvg/c_icon.png\" alt=\"startingIcon\">\n\n        <div class =\"tutorialButtons\">\n          <button class=\"skipButton\">Skip Tutorial</button>\n          <button class=\"prevButton\">Previous</button>\n          <button class=\"nextButton\">Next</button>\n        </div>");
  this.tutorialContentArray.push("<h1>What is a pathfinding algorithm?</h1>\n        <h2>\n        At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!\n        </h2>\n        <p>\n        All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a \"cost\" of 1 and movements from a node to another have a \"cost\" of 1.\n        </p>\n        <div class=\"pageCounter\">2/7</div>\n        <img src=\"../styling/imagesAndSvg/path.png\" alt=\"path\">\n        <div class=\"tutorialButtons\">\n          <button class=\"skipButton\">Skip Tutorial</button>\n          <button class=\"prevButton\">Previous</button>\n          <button class=\"nextButton\">Next</button>\n        </div>");
  this.tutorialContentArray.push("<h1>Picking an algorithm</h1>\n        <h2>\n        Choose an algorithm from the \"Algorithms\" drop-down menu.\n        </h2>\n        <p>\n       Note that some algorithms are <strong>unweighted</strong>, while others are <strong>weighted</strong>. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path.\n        </p>\n        <div class=\"pageCounter\">3/7</div>\n        <img src=\"../styling/imagesAndSvg/algorithms.png\" alt=\"algoDemo\">\n        <div class=\"tutorialButtons\">\n          <button class=\"skipButton\">Skip Tutorial</button>\n          <button class=\"prevButton\">Previous</button>\n          <button class=\"nextButton\">Next</button>\n        </div>");
  this.tutorialContentArray.push("<h1>Meet the algorithms</h1>\n        <h2>\n       Not all algorithms are created equal.\n        </h2>\n        <p>\n     <strong> Dijkstra's Algorithm</strong> (weighted): the father of pathfinding algorithms; guarantees the shortest path\n     </br>\n <strong>A* Search  </strong>(weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm\n </br>\n <strong>Greedy Best-first Search  </strong>(weighted): a faster, more heuristic-heavy version of A*; does not guarantee the shortest path\n </br>\n <strong>Swarm Algorithm  </strong>(weighted): a mixture of Dijkstra's Algorithm and A*; does not guarantee the shortest-path\n </br>\n <strong>Convergent Swarm Algorithm </strong>(weighted) : the faster, more heuristic-heavy version of Swarm; does not guarantee the shortest path\n </br>\n <strong>Bidirectional Swarm Algorithm </strong> (weighted): Swarm from both sides; does not guarantee the shortest path\n </br>\n <strong>Breath-first Search </strong> (unweighted): a great algorithm; guarantees the shortest path\n </br>\n <strong>Depth-first Search </strong> (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path\n        </p>\n        <div class=\"pageCounter\">4/7</div>\n        <div class=\"tutorialButtons\">\n          <button class=\"skipButton\">Skip Tutorial</button>\n          <button class=\"prevButton\">Previous</button>\n          <button class=\"nextButton\">Next</button>\n        </div>");
  this.tutorialContentArray.push("<h1>Adding walls and weights</h1>\n        <h3>\n       Click on the grid to add a wall. Click on W to add weights and again to stop. Generate mazes and patterns from the \"Mazes & Patterns\" drop-down menu.\n        </h3>\n        <p>\n       Walls are impenetrable, meaning that a path cannot cross through them. Weights, however, are not impassable. They are simply more \"costly\" to move through. In this application, moving through a weight node has a \"cost\" of 15.\n        </p>\n        <div class=\"pageCounter\">5/7</div>\n        <img src=\"../styling/imagesAndSvg/walls.gif\" alt=\"wallsDemo\">\n        <div class=\"tutorialButtons\">\n          <button class=\"skipButton\">Skip Tutorial</button>\n          <button class=\"prevButton\">Previous</button>\n          <button class=\"nextButton\">Next</button>\n        </div>");
  this.tutorialContentArray.push("<h1>Dragging nodes</h1>\n        <h2>\n    Click and drag the start, bomb, and target nodes to move them.\n        </h2>\n        <p>\n      Note that you can drag nodes even after an algorithm has finished running. This will allow you to instantly see different paths.\n        </p>\n        <div class=\"pageCounter\">6/7</div>\n        <img src=\"../styling/imagesAndSvg/dragging.gif\" alt=\"draggingDemo\">\n        <div class=\"tutorialButtons\">\n          <button class=\"skipButton\">Skip Tutorial</button>\n          <button class=\"prevButton\">Previous</button>\n          <button class=\"nextButton\">Next</button>\n        </div>");
  this.tutorialContentArray.push("<h1>Visualizing and more</h1>\n        <h2>\n       Use the navbar buttons to visualize algorithms and to do other stuff!\n        </h2>\n        <p>\n      You can clear the current path, clear walls and weights, clear the entire board, and adjust the visualization speed, all from the navbar. If you want to access this tutorial again, click on \"Pathfinding Visualizer\" in the top left corner of your screen.\n        </p>\n        <div class=\"pageCounter\">7/7</div>\n        <img class = \"responsive-img\" src=\"../styling/imagesAndSvg/navbar.png\" alt=\"algoDemo\">\n        <h2>Now that you know everything, it's time to play around with the visualizer. Enjoy!</h2>\n        <div class=\"tutorialButtons\">\n          <button class=\"skipButton\">Skip Tutorial</button>\n          <button class=\"prevButton\">Previous</button>\n          <button class=\"nextButton\">Finish</button>\n        </div>");
}; // ------------------FUNCTION FOR BUTTONS AND DYNAMIC CONTENT OF TUTORIAL MODAL--------------


Board.prototype.tutorialWork = function () {
  var board = this;
  var modal = document.querySelector(".tuturialContainerModal");
  var modalInner = document.querySelector(".modalInner");
  var tutorialButtonsFlex = document.querySelectorAll(".tutorialButtons");
  var tutorialButtons = tutorialButtonsFlex[0].querySelectorAll("button");
  tutorialButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      if (e.currentTarget.classList.value === "skipButton") {
        modal.style.display = "none";
        board.toggleButtons();
      } else if (e.currentTarget.classList.value === "prevButton") {
        if (counter > 0) {
          counter--;
          modalInner.innerHTML = board.tutorialContentArray[counter];
          board.tutorialWork();
        }
      } else if (e.currentTarget.classList.value === "nextButton") {
        if (counter === board.tutorialContentArray.length - 1) {
          modal.style.display = "none";
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
}; // ------------FUNCTION FOR ACTIVATING AND DEACTIVATING CLICKS FOR ALL BUTTONS-------------


Board.prototype.toggleButtons = function () {
  this.buttonsActivated = !this.buttonsActivated;
  var algoOptions = document.querySelectorAll(".algoOptions");
  var mazes = document.querySelectorAll(".maze");
  var speeds = document.querySelectorAll(".speeds");
  var visualizeButton = document.querySelector(".visualizeButton");
  var clearLinks = document.querySelectorAll(".clearLinks");

  if (this.buttonsActivated === false) {
    algoOptions.forEach(function (option) {
      option.classList.add("activatedLink");
    });
    mazes.forEach(function (maze) {
      maze.classList.add("activatedLink");
    });
    clearLinks.forEach(function (link) {
      link.classList.add("activatedLink");
    });
    speeds.forEach(function (speed) {
      speed.classList.add("activatedLink");
    });
    visualizeButton.classList.add("activatedLink");
  } else {
    algoOptions.forEach(function (option) {
      option.classList.remove("activatedLink");
    });
    mazes.forEach(function (maze) {
      maze.classList.remove("activatedLink");
    });
    clearLinks.forEach(function (link) {
      link.classList.remove("activatedLink");
    });
    speeds.forEach(function (speed) {
      speed.classList.remove("activatedLink");
    });
    visualizeButton.classList.remove("activatedLink");
  }
}; // ------------FUNCTION FOR ATTACHING LISTENERS FOR REST OF THE BUTTONS------------


Board.prototype.restOfListeners = function () {
  var _this2 = this;

  var logo = document.querySelector(".refreshLogo");
  var dropDowns = document.querySelectorAll(".dropDown");
  var visualizeButton = document.querySelector(".visualizeButton");
  var algoDescription = document.querySelector(".algoDescription");
  var algoOptions = document.querySelectorAll(".algoOptions");
  var mazes = document.querySelectorAll(".maze");
  var speeds = document.querySelectorAll(".speeds");
  var clearBoard = document.getElementById("clearBoard");
  var clearWallsAndWeights = document.getElementById("clearWallsAndWeights");
  var clearPath = document.getElementById("clearPath");
  logo.addEventListener("click", function (e) {
    e.preventDefault();
    location.reload();
  });
  dropDowns.forEach(function (linkButton) {
    linkButton.addEventListener("click", function (e) {
      dropDowns.forEach(function (dropdown) {
        if (dropdown !== e.currentTarget) {
          dropdown.classList.remove("displayDropdown");
          var a = dropdown.querySelector("a");
          a.classList.remove("activatedLink");
        }
      });
      e.currentTarget.classList.toggle("displayDropdown");
      var link = e.currentTarget.querySelector("a");
      link.classList.toggle("activatedLink");
    });
  });
  visualizeButton.addEventListener("click", function (e) {
    if (_this2.buttonsActivated) {
      if (_this2.algo.length === 0) {
        e.currentTarget.innerHTML = "Pick an Algorithm!";
        return;
      }

      _this2.clearPath();

      _this2.toggleButtons();

      var success;

      if (_this2.algo === "astar") {
        success = (0, _weightedAlgorithms.default)(_this2, _this2.algo);
        (0, _launchAnimations.default)(_this2, success, "weighted");
      } else if (_this2.algo === "dijkstra") {
        success = (0, _weightedAlgorithms.default)(_this2, _this2.algo);
        (0, _launchAnimations.default)(_this2, success, "weighted");
      } else if (_this2.algo === "bestfirst") {
        success = (0, _weightedAlgorithms.default)(_this2, _this2.algo);
        (0, _launchAnimations.default)(_this2, success, "weighted");
      } else if (_this2.algo === "breadthfirst") {
        _this2.clearWeights();

        success = (0, _unweightedAlgorithms.default)(_this2, _this2.algo);
        (0, _launchAnimations.default)(_this2, success, "unweighted");
      } else if (_this2.algo === "depthfirst") {
        _this2.clearWeights();

        success = (0, _unweightedAlgorithms.default)(_this2, _this2.algo);
        (0, _launchAnimations.default)(_this2, success, "unweighted");
      }

      _this2.algoComplete = true;
    }
  });
  algoOptions.forEach(function (algo) {
    algo.addEventListener("click", function (e) {
      if (_this2.buttonsActivated) {
        _this2.algo = e.currentTarget.id;
        var weightCancellable = document.querySelector(".cancelable");

        if (_this2.algo === "astar") {
          weightCancellable.classList.remove("cancelNow");
          visualizeButton.innerHTML = "Visualize A* !";
          algoDescription.innerHTML = "A* Search is <strong>weighted</strong> and <strong>guarantees</strong> the shortest path!";
        } else if (_this2.algo === "dijkstra") {
          weightCancellable.classList.remove("cancelNow");
          visualizeButton.innerHTML = "Visualize Dijkstra's !";
          algoDescription.innerHTML = "Dijkstra's Algorithm is <strong>weighted</strong> and <strong>guarantees</strong> the shortest path!";
        } else if (_this2.algo === "bestfirst") {
          weightCancellable.classList.remove("cancelNow");
          visualizeButton.innerHTML = "Visualize Greedy !";
          algoDescription.innerHTML = "Greedy Best-first Search is <strong>weighted</strong> and <strong>does not guarantee</strong> the shortest path!";
        } else if (_this2.algo === "breadthfirst") {
          weightCancellable.classList.add("cancelNow");
          visualizeButton.innerHTML = "Visualize BFS !";
          algoDescription.innerHTML = "Breadth-first Search is <strong>unweighted</strong> and <strong>guarantees</strong> the shortest path!";
        } else if (_this2.algo === "depthfirst") {
          weightCancellable.classList.add("cancelNow");
          visualizeButton.innerHTML = "Visualize DFS !";
          algoDescription.innerHTML = "Depth-first Search is <strong>unweighted</strong> and <strong>does not guarantee</strong> the shortest path!";
        }
      }
    });
  });
  mazes.forEach(function (maze) {
    maze.addEventListener("click", function (e) {
      if (_this2.buttonsActivated) {
        var currentMaze = e.currentTarget.id;

        _this2.clearWallsAndWeights();

        _this2.toggleButtons();

        if (currentMaze === "verticalskew") {
          (0, _verticalSkewMaze.default)(_this2, 2, _this2.height - 3, 2, _this2.width - 3, "vertical", false);
          (0, _mazeGenerator.default)(_this2);
        } else if (currentMaze === "horizontalskew") {
          (0, _horizontalSkewMaze.default)(_this2, 2, _this2.height - 3, 2, _this2.width - 3, "horizontal", false);
          (0, _mazeGenerator.default)(_this2);
        } else if (currentMaze === "randomwall") {
          (0, _randomMaze.default)(_this2, "wall");
        } else if (currentMaze === "randomweight") {
          (0, _randomMaze.default)(_this2, "weight");
        } else if (currentMaze === "stair") {
          (0, _stairMaze.default)(_this2);
          (0, _mazeGenerator.default)(_this2);
        }
      }
    });
  });
  clearBoard.addEventListener("click", function (e) {
    if (_this2.buttonsActivated) {
      var _contentHeight = mainContentContainer.offsetHeight;
      var _docHeight = document.documentElement.scrollHeight;
      var _docWidth = document.documentElement.scrollWidth;

      var _height = Math.floor((_docHeight - _contentHeight - navHeight) / 24);

      var _width = Math.floor(_docWidth / 23);

      var start = Math.floor(_height / 2).toString() + "-" + Math.floor(_width / 4).toString();
      var target = Math.floor(_height / 2).toString() + "-" + Math.floor(3 * _width / 4).toString();

      for (var row = 0; row < _this2.height; row++) {
        for (var col = 0; col < _this2.width; col++) {
          var currentNode = board.allNodesArray[row][col];
          var currentNodeElement = document.getElementById("".concat(row, "-").concat(col));

          if ("".concat(row, "-").concat(col) === start) {
            currentNodeElement.className = "start";
            currentNode.status = "start";
          } else if ("".concat(row, "-").concat(col) === target) {
            currentNodeElement.className = "target";
            currentNode.status = "target";
          } else {
            currentNodeElement.className = "unvisited";
            currentNode.status = "unvisited";
          }

          _this2.weight = 0;
          _this2.previousNode = null;
          _this2.direction = null;
          _this2.distance = Infinity;
          _this2.totalDistance = Infinity;
          _this2.heuristicDistance = null;
          _this2.path = null;
          _this2.direction = null;
        }
      }

      _this2.wallsAnimationArray = [];
      _this2.algoComplete = false;
      _this2.start = start;
      _this2.target = target;
      _this2.nodesToAnimate = [];
      _this2.pressedNodeStatus = "normal";
      _this2.mouseDown = false;
      _this2.keyDown = false;
      _this2.shortestPathNodesToAnimate = [];
      _this2.previouslyPressedNodeStatus = null;
      _this2.previouslySwitchedNode = null;
      _this2.previouslySwitchedNodeWeight = 0;
    }
  });
  clearWallsAndWeights.addEventListener("click", function (e) {
    if (_this2.buttonsActivated) {
      _this2.clearWallsAndWeights();
    }
  });
  clearPath.addEventListener("click", function (e) {
    if (_this2.buttonsActivated) {
      _this2.clearPath();
    }
  });
  speeds.forEach(function (speed) {
    speed.addEventListener("click", function (e) {
      if (_this2.buttonsActivated) {
        _this2.speed = e.currentTarget.id;
      }
    });
  });
}; //----------------MAKING BOARD OBJECT-------------


var contentHeight = mainContentContainer.offsetHeight;
var docHeight = document.documentElement.scrollHeight;
var docWidth = document.documentElement.scrollWidth;
var height = Math.floor((docHeight - contentHeight - navHeight) / 24);
var width = Math.floor(docWidth / 23);
var board = new Board(width, height);
board.initialize(); // ------------EVENT LISTENERS-------------------

window.addEventListener("keydown", function (e) {
  if (board.keyDown) {
    board.keyDown = false;
  } else {
    board.keyDown = e.keyCode;
  }
});
var _default = board.getNode;
exports.default = _default;
},{"../browser/Node.js":"browser/Node.js","../browser/animations/mazeGenerator.js":"browser/animations/mazeGenerator.js","../browser/mazeAlgorithms/randomMaze.js":"browser/mazeAlgorithms/randomMaze.js","../browser/mazeAlgorithms/verticalSkewMaze.js":"browser/mazeAlgorithms/verticalSkewMaze.js","../browser/mazeAlgorithms/horizontalSkewMaze.js":"browser/mazeAlgorithms/horizontalSkewMaze.js","../browser/mazeAlgorithms/stairMaze.js":"browser/mazeAlgorithms/stairMaze.js","../browser/searchAlgorithms/unweightedAlgorithms.js":"browser/searchAlgorithms/unweightedAlgorithms.js","../browser/animations/launchAnimations.js":"browser/animations/launchAnimations.js","../browser/searchAlgorithms/weightedAlgorithms.js":"browser/searchAlgorithms/weightedAlgorithms.js","../browser/animations/launchInstantAnimations.js":"browser/animations/launchInstantAnimations.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50092" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","browser/index.js"], null)
//# sourceMappingURL=/browser.d51ab39d.js.map