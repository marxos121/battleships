const Player = require("./player");
const Gameboard = require("./gameboard");
const Ship = require("./ship");
import "./styles.css";

const shipLengths = [5, 4, 3, 3, 2];
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", play);

const BOARD_SIZE = 8;
const player = new Player();
const ai = new Player("Computer");
const { playerBoardDOM, aiBoardDOM, orientationButton } = prepareGameboards();

let playerBoard, aiBoard;

play();

function play() {
  document.querySelector(".announcements").textContent =
    "Place your ships, Admiral!";

  clearBoard(playerBoardDOM);
  clearBoard(aiBoardDOM);

  playerBoard = new Gameboard(BOARD_SIZE);
  aiBoard = new Gameboard(BOARD_SIZE);

  initAi();
  initPlayer();
}

function prepareGameboards() {
  function drawBoard() {
    const boardDOM = document.createElement("div");
    boardDOM.className = "gameboard";
    for (let i = 0; i < BOARD_SIZE; ++i) {
      for (let j = 0; j < BOARD_SIZE; ++j) {
        let cellDOM = document.createElement("span");
        cellDOM.classList.add("cell");
        cellDOM.setAttribute("data-row", i.toString());
        cellDOM.setAttribute("data-column", j.toString());
        boardDOM.appendChild(cellDOM);
      }
    }

    return boardDOM;
  }

  const boardsSection = document.querySelector(".boards");

  const orientationButton = document.createElement("p");
  orientationButton.classList = "orientation";
  orientationButton.textContent = "Vertical";
  orientationButton.addEventListener("click", () => {
    orientationButton.textContent =
      orientationButton.textContent === "Vertical" ? "Horizontal" : "Vertical";
  });
  const playerBoardDOM = drawBoard();
  const playerHeader = document.createElement("h2");
  playerHeader.textContent = player.name;
  const playerSpan = document.createElement("span");
  playerSpan.className = "player-data";

  playerSpan.append(playerHeader, playerBoardDOM, orientationButton);
  boardsSection.appendChild(playerSpan);

  const aiBoardDOM = drawBoard();
  const aiHeader = document.createElement("h2");
  aiHeader.textContent = ai.name;
  const aiSpan = document.createElement("span");
  aiSpan.className = "player-data enemy";
  aiSpan.append(aiHeader, aiBoardDOM);
  boardsSection.appendChild(aiSpan);

  return { playerBoardDOM, aiBoardDOM, orientationButton };
}

function standoff() {
  document.querySelector(".announcements").textContent =
    "Admiral, give us coordinates to attack!";
  for (let i = 0; i < aiBoardDOM.children.length; ++i) {
    aiBoardDOM.children[i].addEventListener("click", playRound, { once: true });
  }
}

function initPlayer() {
  let currentShipLength = 0;

  for (let cell of playerBoardDOM.children) {
    cell.addEventListener("mouseover", onHover);
  }

  function onHover(e) {
    const cellIndex =
      +e.target.getAttribute("data-row") * BOARD_SIZE +
      +e.target.getAttribute("data-column");

    if (orientationButton.textContent === "Vertical") {
      let canPlace =
        +e.target.getAttribute("data-row") +
          (shipLengths[currentShipLength] - 1) <
        BOARD_SIZE;

      for (let i = 0; canPlace && i < shipLengths[currentShipLength]; ++i) {
        if (
          playerBoard.board[+e.target.getAttribute("data-row") + i][
            +e.target.getAttribute("data-column")
          ] instanceof Ship
        ) {
          canPlace = false;
        }
      }
      if (canPlace) {
        e.target.addEventListener("click", onClick);
        for (let i = 0; i < shipLengths[currentShipLength]; ++i) {
          playerBoardDOM.children[cellIndex + i * BOARD_SIZE].classList.add(
            "can-place"
          );
        }
      } else {
        for (let i = 0; i < shipLengths[currentShipLength]; ++i) {
          if (cellIndex + BOARD_SIZE * i >= BOARD_SIZE * BOARD_SIZE) {
            break;
          }
          playerBoardDOM.children[cellIndex + i * BOARD_SIZE].classList.add(
            "cannot-place"
          );
        }
      }

      e.target.addEventListener("mouseout", onMouseOutVertical);
    }
    //If horizontal
    else {
      let canPlace =
        +e.target.getAttribute("data-column") +
          (shipLengths[currentShipLength] - 1) <
        BOARD_SIZE;

      for (let i = 0; canPlace && i < shipLengths[currentShipLength]; ++i) {
        if (
          playerBoard.board[+e.target.getAttribute("data-row")][
            +e.target.getAttribute("data-column") + i
          ] instanceof Ship
        ) {
          canPlace = false;
        }
      }
      if (canPlace) {
        playerBoardDOM.children[cellIndex].addEventListener("click", onClick);

        for (let i = 0; i < shipLengths[currentShipLength]; ++i) {
          playerBoardDOM.children[cellIndex + i].classList.add("can-place");
        }
      } else {
        for (
          let i = 0;
          i < shipLengths[currentShipLength] &&
          Math.floor(cellIndex / 8) === Math.floor((cellIndex + i) / 8);
          ++i
        ) {
          playerBoardDOM.children[cellIndex + i].classList.add("cannot-place");
        }
      }

      e.target.addEventListener("mouseout", onMouseOutHorizontal);
    }
  }

  function onClick(e) {
    const vertical = orientationButton.textContent === "Vertical";
    const success = playerBoard.placeShip(
      shipLengths[currentShipLength],
      +e.target.getAttribute("data-row"),
      +e.target.getAttribute("data-column"),
      vertical
    );

    if (success) {
      const cellIndex =
        +e.target.getAttribute("data-row") * BOARD_SIZE +
        +e.target.getAttribute("data-column");
      if (vertical) {
        for (let j = 0; j < shipLengths[currentShipLength]; ++j) {
          playerBoardDOM.children[cellIndex + j * BOARD_SIZE].classList.remove(
            "can-place"
          );
          playerBoardDOM.children[cellIndex + j * BOARD_SIZE].classList.add(
            "ship"
          );
        }
      } else {
        for (let j = 0; j < shipLengths[currentShipLength]; ++j) {
          playerBoardDOM.children[cellIndex + j].classList.remove("can-place");
          playerBoardDOM.children[cellIndex + j].classList.add("ship");
        }
      }

      currentShipLength++;
      if (currentShipLength >= shipLengths.length) {
        for (let cell of playerBoardDOM.children) {
          cell.removeEventListener("mouseover", onHover);
          cell.removeEventListener("click", onClick);
        }
        orientationButton.remove();
        standoff();
      }
    }
  }

  function onMouseOutVertical(e) {
    const cellIndex =
      +e.target.getAttribute("data-row") * BOARD_SIZE +
      +e.target.getAttribute("data-column");

    for (let i = 0; i < shipLengths[currentShipLength]; ++i) {
      if (cellIndex + BOARD_SIZE * i >= BOARD_SIZE * BOARD_SIZE) {
        break;
      }
      playerBoardDOM.children[cellIndex + i * BOARD_SIZE].classList.remove(
        "cannot-place"
      );
      playerBoardDOM.children[cellIndex + i * BOARD_SIZE].classList.remove(
        "can-place"
      );
    }

    e.target.removeEventListener("mouseout", onMouseOutVertical);
  }

  function onMouseOutHorizontal(e) {
    const cellIndex =
      +e.target.getAttribute("data-row") * BOARD_SIZE +
      +e.target.getAttribute("data-column");

    for (let i = 0; i < shipLengths[currentShipLength]; ++i) {
      if ((cellIndex % BOARD_SIZE) + i >= BOARD_SIZE) {
        break;
      }
      playerBoardDOM.children[cellIndex + i].classList.remove("can-place");
      playerBoardDOM.children[cellIndex + i].classList.remove("cannot-place");
    }

    e.target.removeEventListener("mouseout", onMouseOutHorizontal);
  }
}

function initAi() {
  for (let ship of shipLengths) {
    let current = ai.putShip(ship, aiBoard.board);
    aiBoard.placeShip(ship, current.row, current.column, current.vertical);
  }
}

function playRound(e) {
  //Player's attack
  const result = aiBoard.attack(
    e.target.getAttribute("data-row"),
    e.target.getAttribute("data-column")
  );
  if (result === "hit") {
    const pin = document.createElement("span");
    pin.classList.add("hit");
    e.target.appendChild(pin);
    if (aiBoard.allSunk) {
      document.querySelector(
        ".announcements"
      ).textContent = `${player.name} wins!`;
      for (let cell of aiBoardDOM.children) {
        cell.removeEventListener("click", playRound);
      }
      return;
    }
  } else if (result === "nohit") {
    const pin = document.createElement("span");
    pin.classList.add("nohit");
    e.target.appendChild(pin);
  }

  //AI's attack
  const attackCoords = ai.attack(playerBoard.board);
  const aiResult = playerBoard.attack(attackCoords[0], attackCoords[1]);
  const pin = document.createElement("span");
  if (aiResult === "nohit") {
    pin.classList.add("nohit");
  } else if (aiResult === "hit") {
    pin.classList.add("hit");

    if (playerBoard.allSunk) {
      document.querySelector(".announcements").textContent = `${ai.name} wins!`;
      for (let cell of aiBoardDOM.children) {
        cell.removeEventListener("click", playRound);
      }
    }
  }
  playerBoardDOM.children[
    attackCoords[0] * BOARD_SIZE + attackCoords[1]
  ].appendChild(pin);
}

function clearBoard(board) {
  for (let cell of board.children) {
    cell.classList.remove("ship");
    cell.innerHTML = "";
  }
}
