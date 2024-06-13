/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleships/./src/styles.css?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\n\r\nclass Gameboard {\r\n  #board;\r\n  #ships = [];\r\n\r\n  constructor(size) {\r\n    this.#board = new Array(size);\r\n    for (let i = 0; i < size; ++i) {\r\n      this.#board[i] = new Array(size).fill(null);\r\n    }\r\n  }\r\n\r\n  #validateCoords(row, col) {\r\n    return !(\r\n      row < 0 ||\r\n      row >= this.#board.length ||\r\n      col < 0 ||\r\n      col >= this.#board[0].length\r\n    );\r\n  }\r\n\r\n  #placeVertically(length, startRow, startCol) {\r\n    if (startRow + length > this.#board.length) {\r\n      return false;\r\n    }\r\n    for (let i = 0; i < length; ++i) {\r\n      if (this.#board[startRow + i][startCol] !== null) {\r\n        return false;\r\n      }\r\n    }\r\n\r\n    const ship = new Ship(length);\r\n    for (let i = 0; i < length; ++i) {\r\n      this.#board[startRow + i][startCol] = ship;\r\n    }\r\n    this.#ships.push(ship);\r\n    return true;\r\n  }\r\n\r\n  #placeHorizontally(length, startRow, startCol) {\r\n    if (startCol + length > this.#board[0].length) {\r\n      return false;\r\n    }\r\n\r\n    for (let i = 0; i < length; ++i) {\r\n      if (this.#board[startRow][startCol + i] !== null) {\r\n        return false;\r\n      }\r\n    }\r\n\r\n    const ship = new Ship(length);\r\n    for (let i = 0; i < length; ++i) {\r\n      this.#board[startRow][startCol + i] = ship;\r\n    }\r\n\r\n    this.#ships.push(ship);\r\n    return true;\r\n  }\r\n\r\n  /**\r\n   * @param {Number} length - length of the ship\r\n   * @param {Number} startRow\r\n   * @param {Number} startCol\r\n   * @param {Boolean} vertical - true will try to place the ship vertically; false horizontally\r\n   * @returns Returns true if succeeded in placing the ship, false otherwise.\r\n   */\r\n  placeShip(length, startRow, startCol, vertical = true) {\r\n    if (!this.#validateCoords(startRow, startCol) || length < 1) {\r\n      return false;\r\n    }\r\n    if (vertical) {\r\n      return this.#placeVertically(length, startRow, startCol);\r\n    }\r\n    return this.#placeHorizontally(length, startRow, startCol);\r\n  }\r\n\r\n  attack(row, col) {\r\n    if (!this.#validateCoords(row, col) || this.#board[row][col] === \"hit\") {\r\n      return \"invalid\";\r\n    }\r\n    if (this.#board[row][col] === null) {\r\n      this.#board[row][col] = \"nohit\";\r\n      return \"nohit\";\r\n    }\r\n    if (this.#board[row][col] instanceof Ship) {\r\n      this.#board[row][col].hit();\r\n      this.#board[row][col] = \"hit\";\r\n      return \"hit\";\r\n    }\r\n  }\r\n\r\n  get allSunk() {\r\n    for (let ship of this.#ships) {\r\n      if (!ship.isSunk) {\r\n        return false;\r\n      }\r\n    }\r\n    return true;\r\n  }\r\n\r\n  get ships() {\r\n    return this.#ships.slice();\r\n  }\r\n\r\n  get board() {\r\n    return this.#board.map((row) => [...row]);\r\n  }\r\n}\r\n\r\nmodule.exports = Gameboard;\r\n\n\n//# sourceURL=webpack://battleships/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\r\nconst Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\r\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\n\r\n\r\nconst shipLengths = [5, 4, 3, 3, 2];\r\nconst restartButton = document.querySelector(\".restart\");\r\nrestartButton.addEventListener(\"click\", play);\r\n\r\nconst BOARD_SIZE = 8;\r\nconst player = new Player();\r\nconst ai = new Player(\"Computer\");\r\nconst { playerBoardDOM, aiBoardDOM, orientationButton } = prepareGameboards();\r\n\r\nlet playerBoard, aiBoard;\r\n\r\nplay();\r\n\r\nfunction play() {\r\n  document.querySelector(\".announcements\").textContent =\r\n    \"Place your ships, Admiral!\";\r\n\r\n  clearBoard(playerBoardDOM);\r\n  clearBoard(aiBoardDOM);\r\n\r\n  playerBoard = new Gameboard(BOARD_SIZE);\r\n  aiBoard = new Gameboard(BOARD_SIZE);\r\n\r\n  initAi();\r\n  initPlayer();\r\n}\r\n\r\nfunction prepareGameboards() {\r\n  function drawBoard() {\r\n    const boardDOM = document.createElement(\"div\");\r\n    boardDOM.className = \"gameboard\";\r\n    for (let i = 0; i < BOARD_SIZE; ++i) {\r\n      for (let j = 0; j < BOARD_SIZE; ++j) {\r\n        let cellDOM = document.createElement(\"span\");\r\n        cellDOM.classList.add(\"cell\");\r\n        cellDOM.setAttribute(\"data-row\", i.toString());\r\n        cellDOM.setAttribute(\"data-column\", j.toString());\r\n        boardDOM.appendChild(cellDOM);\r\n      }\r\n    }\r\n\r\n    return boardDOM;\r\n  }\r\n\r\n  const boardsSection = document.querySelector(\".boards\");\r\n\r\n  const orientationButton = document.createElement(\"p\");\r\n  orientationButton.classList = \"orientation\";\r\n  orientationButton.textContent = \"Vertical\";\r\n  orientationButton.addEventListener(\"click\", () => {\r\n    orientationButton.textContent =\r\n      orientationButton.textContent === \"Vertical\" ? \"Horizontal\" : \"Vertical\";\r\n  });\r\n  const playerBoardDOM = drawBoard();\r\n  const playerHeader = document.createElement(\"h2\");\r\n  playerHeader.textContent = player.name;\r\n  const playerSpan = document.createElement(\"span\");\r\n  playerSpan.className = \"player-data\";\r\n\r\n  playerSpan.append(playerHeader, playerBoardDOM, orientationButton);\r\n  boardsSection.appendChild(playerSpan);\r\n\r\n  const aiBoardDOM = drawBoard();\r\n  const aiHeader = document.createElement(\"h2\");\r\n  aiHeader.textContent = ai.name;\r\n  const aiSpan = document.createElement(\"span\");\r\n  aiSpan.className = \"player-data enemy\";\r\n  aiSpan.append(aiHeader, aiBoardDOM);\r\n  boardsSection.appendChild(aiSpan);\r\n\r\n  return { playerBoardDOM, aiBoardDOM, orientationButton };\r\n}\r\n\r\nfunction standoff() {\r\n  document.querySelector(\".announcements\").textContent =\r\n    \"Admiral, give us coordinates to attack!\";\r\n  for (let i = 0; i < aiBoardDOM.children.length; ++i) {\r\n    aiBoardDOM.children[i].addEventListener(\"click\", playRound, { once: true });\r\n  }\r\n}\r\n\r\nfunction initPlayer() {\r\n  let currentShipLength = 0;\r\n\r\n  for (let cell of playerBoardDOM.children) {\r\n    cell.addEventListener(\"mouseover\", onHover);\r\n  }\r\n\r\n  function onHover(e) {\r\n    const cellIndex =\r\n      +e.target.getAttribute(\"data-row\") * BOARD_SIZE +\r\n      +e.target.getAttribute(\"data-column\");\r\n\r\n    if (orientationButton.textContent === \"Vertical\") {\r\n      let canPlace =\r\n        +e.target.getAttribute(\"data-row\") +\r\n          (shipLengths[currentShipLength] - 1) <\r\n        BOARD_SIZE;\r\n\r\n      for (let i = 0; canPlace && i < shipLengths[currentShipLength]; ++i) {\r\n        if (\r\n          playerBoard.board[+e.target.getAttribute(\"data-row\") + i][\r\n            +e.target.getAttribute(\"data-column\")\r\n          ] instanceof Ship\r\n        ) {\r\n          canPlace = false;\r\n        }\r\n      }\r\n      if (canPlace) {\r\n        e.target.addEventListener(\"click\", onClick);\r\n        for (let i = 0; i < shipLengths[currentShipLength]; ++i) {\r\n          playerBoardDOM.children[cellIndex + i * BOARD_SIZE].classList.add(\r\n            \"can-place\"\r\n          );\r\n        }\r\n      } else {\r\n        for (let i = 0; i < shipLengths[currentShipLength]; ++i) {\r\n          if (cellIndex + BOARD_SIZE * i >= BOARD_SIZE * BOARD_SIZE) {\r\n            break;\r\n          }\r\n          playerBoardDOM.children[cellIndex + i * BOARD_SIZE].classList.add(\r\n            \"cannot-place\"\r\n          );\r\n        }\r\n      }\r\n\r\n      e.target.addEventListener(\"mouseout\", onMouseOutVertical);\r\n    }\r\n    //If horizontal\r\n    else {\r\n      let canPlace =\r\n        +e.target.getAttribute(\"data-column\") +\r\n          (shipLengths[currentShipLength] - 1) <\r\n        BOARD_SIZE;\r\n\r\n      for (let i = 0; canPlace && i < shipLengths[currentShipLength]; ++i) {\r\n        if (\r\n          playerBoard.board[+e.target.getAttribute(\"data-row\")][\r\n            +e.target.getAttribute(\"data-column\") + i\r\n          ] instanceof Ship\r\n        ) {\r\n          canPlace = false;\r\n        }\r\n      }\r\n      if (canPlace) {\r\n        playerBoardDOM.children[cellIndex].addEventListener(\"click\", onClick);\r\n\r\n        for (let i = 0; i < shipLengths[currentShipLength]; ++i) {\r\n          playerBoardDOM.children[cellIndex + i].classList.add(\"can-place\");\r\n        }\r\n      } else {\r\n        for (\r\n          let i = 0;\r\n          i < shipLengths[currentShipLength] &&\r\n          Math.floor(cellIndex / 8) === Math.floor((cellIndex + i) / 8);\r\n          ++i\r\n        ) {\r\n          playerBoardDOM.children[cellIndex + i].classList.add(\"cannot-place\");\r\n        }\r\n      }\r\n\r\n      e.target.addEventListener(\"mouseout\", onMouseOutHorizontal);\r\n    }\r\n  }\r\n\r\n  function onClick(e) {\r\n    const vertical = orientationButton.textContent === \"Vertical\";\r\n    const success = playerBoard.placeShip(\r\n      shipLengths[currentShipLength],\r\n      +e.target.getAttribute(\"data-row\"),\r\n      +e.target.getAttribute(\"data-column\"),\r\n      vertical\r\n    );\r\n\r\n    if (success) {\r\n      const cellIndex =\r\n        +e.target.getAttribute(\"data-row\") * BOARD_SIZE +\r\n        +e.target.getAttribute(\"data-column\");\r\n      if (vertical) {\r\n        for (let j = 0; j < shipLengths[currentShipLength]; ++j) {\r\n          playerBoardDOM.children[cellIndex + j * BOARD_SIZE].classList.remove(\r\n            \"can-place\"\r\n          );\r\n          playerBoardDOM.children[cellIndex + j * BOARD_SIZE].classList.add(\r\n            \"ship\"\r\n          );\r\n        }\r\n      } else {\r\n        for (let j = 0; j < shipLengths[currentShipLength]; ++j) {\r\n          playerBoardDOM.children[cellIndex + j].classList.remove(\"can-place\");\r\n          playerBoardDOM.children[cellIndex + j].classList.add(\"ship\");\r\n        }\r\n      }\r\n\r\n      currentShipLength++;\r\n      if (currentShipLength >= shipLengths.length) {\r\n        for (let cell of playerBoardDOM.children) {\r\n          cell.removeEventListener(\"mouseover\", onHover);\r\n          cell.removeEventListener(\"click\", onClick);\r\n        }\r\n        orientationButton.remove();\r\n        standoff();\r\n      }\r\n    }\r\n  }\r\n\r\n  function onMouseOutVertical(e) {\r\n    const cellIndex =\r\n      +e.target.getAttribute(\"data-row\") * BOARD_SIZE +\r\n      +e.target.getAttribute(\"data-column\");\r\n\r\n    for (let i = 0; i < shipLengths[currentShipLength]; ++i) {\r\n      if (cellIndex + BOARD_SIZE * i >= BOARD_SIZE * BOARD_SIZE) {\r\n        break;\r\n      }\r\n      playerBoardDOM.children[cellIndex + i * BOARD_SIZE].classList.remove(\r\n        \"cannot-place\"\r\n      );\r\n      playerBoardDOM.children[cellIndex + i * BOARD_SIZE].classList.remove(\r\n        \"can-place\"\r\n      );\r\n    }\r\n\r\n    e.target.removeEventListener(\"mouseout\", onMouseOutVertical);\r\n  }\r\n\r\n  function onMouseOutHorizontal(e) {\r\n    const cellIndex =\r\n      +e.target.getAttribute(\"data-row\") * BOARD_SIZE +\r\n      +e.target.getAttribute(\"data-column\");\r\n\r\n    for (let i = 0; i < shipLengths[currentShipLength]; ++i) {\r\n      if ((cellIndex % BOARD_SIZE) + i >= BOARD_SIZE) {\r\n        break;\r\n      }\r\n      playerBoardDOM.children[cellIndex + i].classList.remove(\"can-place\");\r\n      playerBoardDOM.children[cellIndex + i].classList.remove(\"cannot-place\");\r\n    }\r\n\r\n    e.target.removeEventListener(\"mouseout\", onMouseOutHorizontal);\r\n  }\r\n}\r\n\r\nfunction initAi() {\r\n  for (let ship of shipLengths) {\r\n    let current = ai.putShip(ship, aiBoard.board);\r\n    aiBoard.placeShip(ship, current.row, current.column, current.vertical);\r\n  }\r\n}\r\n\r\nfunction playRound(e) {\r\n  //Player's attack\r\n  const result = aiBoard.attack(\r\n    e.target.getAttribute(\"data-row\"),\r\n    e.target.getAttribute(\"data-column\")\r\n  );\r\n  if (result === \"hit\") {\r\n    const pin = document.createElement(\"span\");\r\n    pin.classList.add(\"hit\");\r\n    e.target.appendChild(pin);\r\n    if (aiBoard.allSunk) {\r\n      document.querySelector(\r\n        \".announcements\"\r\n      ).textContent = `${player.name} wins!`;\r\n      for (let cell of aiBoardDOM.children) {\r\n        cell.removeEventListener(\"click\", playRound);\r\n      }\r\n      return;\r\n    }\r\n  } else if (result === \"nohit\") {\r\n    const pin = document.createElement(\"span\");\r\n    pin.classList.add(\"nohit\");\r\n    e.target.appendChild(pin);\r\n  }\r\n\r\n  //AI's attack\r\n  const attackCoords = ai.attack(playerBoard.board);\r\n  const aiResult = playerBoard.attack(attackCoords[0], attackCoords[1]);\r\n  const pin = document.createElement(\"span\");\r\n  if (aiResult === \"nohit\") {\r\n    pin.classList.add(\"nohit\");\r\n  } else if (aiResult === \"hit\") {\r\n    pin.classList.add(\"hit\");\r\n\r\n    if (playerBoard.allSunk) {\r\n      document.querySelector(\".announcements\").textContent = `${ai.name} wins!`;\r\n      for (let cell of aiBoardDOM.children) {\r\n        cell.removeEventListener(\"click\", playRound);\r\n      }\r\n    }\r\n  }\r\n  playerBoardDOM.children[\r\n    attackCoords[0] * BOARD_SIZE + attackCoords[1]\r\n  ].appendChild(pin);\r\n}\r\n\r\nfunction clearBoard(board) {\r\n  for (let cell of board.children) {\r\n    cell.classList.remove(\"ship\");\r\n    cell.innerHTML = \"\";\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://battleships/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module) => {

eval("class Player {\r\n  #name;\r\n\r\n  constructor(name = \"Player\") {\r\n    this.#name = name;\r\n  }\r\n\r\n  set name(name) {\r\n    this.#name = name;\r\n  }\r\n  get name() {\r\n    return this.#name;\r\n  }\r\n}\r\n\r\nclass AIPlayer extends Player {\r\n  attack(board) {\r\n    let validMoves = [];\r\n    for (let i = 0; i < board.length; ++i) {\r\n      for (let j = 0; j < board[0].length; ++j) {\r\n        if (board[i][j] !== \"hit\" && board[i][j] !== \"nohit\") {\r\n          validMoves.push([i, j]);\r\n        }\r\n      }\r\n    }\r\n    return validMoves[Math.floor(Math.random() * validMoves.length)];\r\n  }\r\n\r\n  putShip(shipLength, board) {\r\n    let row, column, vertical;\r\n    let validMove = true;\r\n\r\n    do {\r\n      validMove = true;\r\n      vertical = Math.random() < 0.5;\r\n      if (vertical) {\r\n        row = Math.floor(Math.random() * (board.length - shipLength + 1));\r\n        column = Math.floor(Math.random() * board[0].length);\r\n\r\n        for (let i = 0; i < shipLength; ++i) {\r\n          if (board[row + i][column] !== null) {\r\n            validMove = false;\r\n            break;\r\n          }\r\n        }\r\n      } else {\r\n        row = Math.floor(Math.random() * board.length);\r\n        column = Math.floor(Math.random() * (board[0].length - shipLength + 1));\r\n\r\n        for (let i = 0; i < shipLength; ++i) {\r\n          if (board[row][column + i] !== null) {\r\n            validMove = false;\r\n            break;\r\n          }\r\n        }\r\n      }\r\n    } while (!validMove);\r\n\r\n    return { row, column, vertical };\r\n  }\r\n}\r\n\r\nmodule.exports = AIPlayer;\r\n\n\n//# sourceURL=webpack://battleships/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("class Ship {\r\n  #length;\r\n  #hitpoints;\r\n\r\n  constructor(length) {\r\n    this.#length = this.#hitpoints = length;\r\n  }\r\n\r\n  hit() {\r\n    this.#hitpoints = this.#hitpoints > 0 ? this.#hitpoints - 1 : 0;\r\n  }\r\n\r\n  get length() {\r\n    return this.#length;\r\n  }\r\n\r\n  get hitpoints() {\r\n    return this.#hitpoints;\r\n  }\r\n\r\n  get isSunk() {\r\n    return this.#hitpoints <= 0;\r\n  }\r\n}\r\n\r\n//export default Ship;\r\nmodule.exports = Ship;\r\n\n\n//# sourceURL=webpack://battleships/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;