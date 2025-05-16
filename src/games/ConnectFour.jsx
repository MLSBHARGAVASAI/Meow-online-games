import React, { useState } from 'react';
import './ConnectFour.css';

const ROWS = 6;
const COLS = 7;

const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export default function ConnectFour() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = board[r][c];
        if (!cell) continue;
        for (let [dr, dc] of directions) {
          let count = 1;
          for (let i = 1; i < 4; i++) {
            const nr = r + dr * i;
            const nc = c + dc * i;
            if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) break;
            if (board[nr][nc] === cell) count++;
            else break;
          }
          if (count === 4) return cell;
        }
      }
    }
    return null;
  };

  const handleClick = (col) => {
    if (winner) return;

    const newBoard = board.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        break;
      }
    }

    const newWinner = checkWinner(newBoard);
    setBoard(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    }
  };

  const handleReset = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('red');
    setWinner(null);
  };

  return (
    <div id="game-container">
      <h2>Connect Four</h2>
      <div id="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => handleClick(colIndex)}
              >
                {cell && <div className={`disc ${cell}`}></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
      {winner && <p id="winner">{winner.toUpperCase()} Wins!</p>}
      <button id="reset-btn" onClick={handleReset}>Restart</button>
    </div>
  );
}
