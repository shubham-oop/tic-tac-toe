import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from './components/GameOver.jsx';
import { useState } from "react";
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') currentPlayer = 'O';
  return currentPlayer;
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveWinner(gameBoard, players) {
  let winner=null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  const winner = deriveWinner(gameBoard, players);
  function handleSelectSqare(rowIndex, columnIndex) {
    const currentPlayer = deriveActivePlayer(gameTurns);
    setGameTurns((previousTurns) => {
      let currentPlayer = 'X';
      if (previousTurns.length > 0 && previousTurns[0].player === 'X') currentPlayer = 'O';
      const updateTurns = [{ square: { row: rowIndex, col: columnIndex }, player: currentPlayer }, ...previousTurns];
      return updateTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(previousPlayers=>{
      return {
        ...previousPlayers,
        [symbol]: newName
      };
    });
  }
  return <main>
    <div id='game-container'>
      <ol id='players' className='highlight-player'>
        <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange} />
        <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
      </ol>
      {(winner || gameTurns.length === 9) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelect={handleSelectSqare} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>;
}

export default App
