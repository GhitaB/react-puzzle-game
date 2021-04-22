import './App.css';
import $ from 'jquery';

window.board = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
];
window.currentRow = 3;
window.currentColumn = 3;
window.getMovableBlocks = () => {
  let x = window.currentRow;
  let y = window.currentColumn;

                     //     top        right      bottom       left
  let possibleMoves = [[x - 1 , y], [x, y + 1], [x + 1, y], [x, y - 1]];

  return possibleMoves.map((move, index) => {
    return (
      ".block.row-" + move[0] + ".column-" + move[1]
    );
  });
}

window.id = 0;
window.generateKey = () => {
  window.id += 1;
  return window.id;
};

window.startGame = () => {
  const disableNotMovableBlocks = () => {
    $(".block").addClass("disabled");
    window.getMovableBlocks().forEach((selector) => {
      $(selector).removeClass("disabled");
    });
  }

  $("button.start-game").hide();
  disableNotMovableBlocks();
}

const Block = ({number, row, column}) => {
  return (
    <div key={window.generateKey()} className={"block disabled row-" + row + " column-" + column + (number === 0 ? " empty" : "")}>
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
