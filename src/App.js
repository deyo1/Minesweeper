import { useState } from "react";
import './App.css';
import Board from "./Board";


function App() {

  const [height, setHeight] = useState(20)
  const [width, setWidth] = useState(30)
  const [numOfMines, setMines] = useState(60)
  const [board, setBoard] = useState(createGame(20, 30, 60));
  const [change, setChange] = useState(false);




  function createGame(height, width, numOfMines) {

    if (height < 1) height = 1;
    if (width < 1) width = 1;
    if (numOfMines > height * width) numOfMines = height * width ;

    let board = []

    for (let i = 0; i < height; i++) {
      let row = []
      for (let j = 0; j < width; j++) {
        row.push({
          isMine: false,
          isOpen: false,
          isMarked: false
        });
      }
      board.push(row);
    }
    let mines = new Set();
    while (mines.size < numOfMines) {
      let x = Math.floor(Math.random() * height);
      let y = Math.floor(Math.random() * width);
      mines.add(x + ',' + y);
      board[x][y].isMine = true;
    }
    return board;
  }

  return (
    <div className="App" >
      <span>Width </span><input onChange={(event) => setWidth(event.target.value)} type="number" value={width} />
      <span> height </span><input onChange={(event) => setHeight(event.target.value)} type="number" value={height} />
      <span> and number of mines </span><input onChange={(event) => setMines(event.target.value)} type="number" value={numOfMines} />
      <span>.  </span><button onClick={() => setBoard(createGame(height, width, numOfMines))}>New game</button>
      <button onClick={() => {
        setWidth(30);
        setHeight(20);
        setMines(60);
        setBoard(createGame(20, 30, 60));
      }
      }>Reset</button>
      <Board onClick={() => setChange(!change)} onContextMenu={(event) => {setChange(!change)}} board={board} />
    </div>
  );
}

export default App;
