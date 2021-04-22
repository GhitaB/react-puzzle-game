import './App.css';
import $ from 'jquery';

window.board = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
];
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

  if (asText === true) {
    return possibleMoves.map((move, index) => {
      return (
        ".block.row-" + move[0] + ".column-" + move[1]
      );
    });
  } else {
    return possibleMoves;
  }
}

window.disableNotMovableBlocks = () => {
  $(".block").addClass("disabled");
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

window.id = 0;
window.generateKey = () => {
  window.id += 1;
  return window.id;
};

window.startGame = () => {

  $("button.start-game").hide();
  window.disableNotMovableBlocks();

  $(".block").on("click", (ev) => {
    let $block = $(ev.target);

      let col = $block.attr("data-col");
      let row = $block.attr("data-row");

    if (!$block.hasClass("disabled")) {
      let col = parseInt($block.attr("data-col"));
      let row = parseInt($block.attr("data-row"));
      window.moveBlock(row, col);
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
    <div className="game-board">
      {createBoard()}
      <button className="start-game" onClick={startGame}>Start</button>
    </div>
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
