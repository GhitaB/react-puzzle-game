import './App.css';
import $ from 'jquery';

window.setStatus = (text) => {
  $(".status").text(text);
}

window.level = 1;
window.numberMoves = 0;

window.board = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
];


window.correctBoard = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
];

window.goodBlocks = () => {
  let goodBlocks = 0;
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      if(window.board[row][col] === window.correctBoard[row][col]) {
        goodBlocks += 1;
      }
    }
  }

  return goodBlocks;
}

window.currentRow = 3;
window.currentCol = 3;
window.getMovableBlocks = (asText) => {
  let x = window.currentRow;
  let y = window.currentCol;


  let possibleMoves = [
    [x - 1 , y],   // top
    [x, y + 1],    // right
    [x + 1, y],    // bottom
    [x, y - 1]     // left
  ];

  let validMoves = [];

  for (var move = 0; move < 4; move++) {
    let thisMove = possibleMoves[move];
    if (thisMove[0] > -1 && thisMove[0] < 4 && thisMove[1] > -1 && thisMove[1] < 4) {
      validMoves.push(thisMove);
    }
  }
  if (asText === true) {
    return validMoves.map((move, index) => {
      return (
        ".block.row-" + move[0] + ".column-" + move[1]
      );
    });
  } else {
    return validMoves;
  }
}

window.disableAllBlocks = () => {
  $(".block").addClass("disabled");
}

window.disableNotMovableBlocks = () => {
  window.disableAllBlocks();
  window.getMovableBlocks(true).forEach((selector) => {
    $(selector).removeClass("disabled");
  });
}

window.refreshBoard = () => {
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      $(".block.row-" + row + ".column-" + col).text(window.board[row][col]);
    }
  }
  window.disableNotMovableBlocks();
}

window.moveBlock = (row, col) => {
  let x = window.currentRow;
  let y = window.currentCol;
  let number = window.board[row][col];
  window.board[x][y] = number;
  window.currentRow = row;
  window.currentCol = col;
  window.board[row][col] = 0;
  let $oldEmptyBlock = $(".block.row-" + x + ".column-" + y);
  let $newEmptyBlock = $(".block.row-" + row + ".column-" + col);

  $oldEmptyBlock.removeClass("empty");
  $newEmptyBlock.addClass("empty");

  window.refreshBoard();
};

window.randomBetween = (min, max) => {
  // return a random number between min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.randomMove = () => {
  let moves = window.getMovableBlocks(false);
  let randomPosition = window.randomBetween(0, moves.length - 1);
  let randomMove = moves[randomPosition];

  window.moveBlock(randomMove[0], randomMove[1]);
}

window.id = 0;
window.generateKey = () => {
  window.id += 1;
  return window.id;
};

window.startGame = async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  $("button.start-game").hide();
  window.disableNotMovableBlocks();

  let wait = 300;
  window.numberMoves = window.level * 4;

  for (var move = 1; move <= window.numberMoves; move++) {
    window.setStatus("Wait... I prepare it for you. (" + (window.numberMoves - move).toString() + ")");
    await sleep(wait);
    window.randomMove();
    if (move < 470) {
      if (wait > 10) {
        wait -= 5;
      }
    } else {
      wait += 10;
    }

    if(window.goodBlocks() === 16) {
      window.randomMove();  // Make sure it's not already solved. Haha. :))
    }
  }

  window.numberMoves = 0;
  window.setStatus("Yeah! You can play now. Click the movable blocks.");

  $(".block").on("click", (ev) => {
    let $block = $(ev.target);

    if (!$block.hasClass("disabled")) {
      window.numberMoves += 1;
      let col = parseInt($block.attr("data-col"));
      let row = parseInt($block.attr("data-row"));
      window.moveBlock(row, col);

      let goodPositions = window.goodBlocks();
      window.setStatus("Moves: " + window.numberMoves + " Good: " + goodPositions + "/16");
      if (goodPositions === 16) {
        $("button.start-game").show();
        window.level += 1;
        window.setStatus("YEEEES! You are smart! :) Congrats! Moves: " + window.numberMoves + " New level: " + window.level);
        window.disableAllBlocks();
      }
    }
  });
}

const Block = ({number, row, column}) => {
  return (
    <div key={window.generateKey()}
         className={"block disabled row-" + row + " column-" + column + (number === 0 ? " empty" : "")}
         data-col={column} data-row={row}>
      {number}
    </div>
  );
}


const BlocksRow = ({items, rowIndex}) => {
  const blocksListing = items.map(function(block, index) {
    return (
      <span key={window.generateKey()}>
        <Block number={block} row={rowIndex} column={index} />
      </span>
    );
  });
  return(blocksListing)
}


const GameBoard = () => {
  const rowsListing = window.board.map(function(row, index) {
    return (<span key={window.generateKey()}><BlocksRow items={row} rowIndex={index} /></span>);
  });

  const createBoard = () => {
    return rowsListing;
  }

  const startGame = () => {
    window.startGame();
  }

  return (
    <>
      <div className="game-board">
        {createBoard()}
        <button className="start-game" onClick={startGame}>Start</button>
      </div>
      <p className="status">Press Start to start the game.</p>
    </>
  );
}


const Game = () => {
  return (
    <div className="container">
      <GameBoard />
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
