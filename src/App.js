import './App.css';


window.board = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
];


const BlocksRow = ({items, rowIndex}) => {
  const blocksListing = items.map(function(block, index) {
    return (
      <div className={"block row-" + rowIndex + " column-" + index + (block === 0 ? " empty" : "")}>
        {block}
      </div>
    );
  });
  return(blocksListing)
}

const GameBoard = () => {
  const rowsListing = window.board.map(function(row, index) {
    return (<BlocksRow items={row} rowIndex={index} />);
  });

  const createBoard = () => {
    return rowsListing;
  }

  return (
    <div className="game-board">
      {createBoard()}
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
