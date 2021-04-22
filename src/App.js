import './App.css';
import $ from 'jquery';

window.board = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
];

window.id = 0;
window.generateKey = () => {
  window.id += 1;
  return window.id;
};

window.startGame = () => {
  $("button").hide();
}

const Block = ({number, row, column}) => {
  return (
    <div key={window.generateKey()} className={"block row-" + row + " column-" + column + (number === 0 ? " empty" : "")}>
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
  console.log("INIT");

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
