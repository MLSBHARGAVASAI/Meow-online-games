import React, { useState, useEffect } from 'react';
import './ConnectLines.css';

export default function ConnectFour({ nickname }) {
  const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(null))); // 6 rows, 7 columns
  const [isRedNext, setIsRedNext] = useState(true); // Red starts
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('menu'); // 'menu', 'pvp', 'cpu'

  const handleCellClick = (colIndex) => {
    if (winner) return; // No moves after the game is won

    // Drop the disc to the lowest available row in the clicked column
    for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
      if (!board[rowIndex][colIndex]) {
        const newBoard = board.map((row, index) => (index === rowIndex ? [...row] : row));
        newBoard[rowIndex][colIndex] = isRedNext ? 'Red' : 'Yellow';
        setBoard(newBoard);
        setIsRedNext(!isRedNext);
        checkWinner(newBoard);
        break;
      }
    }
  };

  const checkWinner = (board) => {
    // Check horizontal, vertical, and diagonal for a win
    const directions = [
      { r: 0, c: 1 }, // Horizontal
      { r: 1, c: 0 }, // Vertical
      { r: 1, c: 1 }, // Diagonal /
      { r: 1, c: -1 }, // Diagonal \
    ];

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col]) {
          const player = board[row][col];

          for (let { r, c } of directions) {
            let count = 0;
            for (let i = 0; i < 4; i++) {
              const newRow = row + i * r;
              const newCol = col + i * c;

              if (newRow >= 0 && newRow < 6 && newCol >= 0 && newCol < 7 && board[newRow][newCol] === player) {
                count++;
              }
            }

            if (count === 4) {
              setWinner(player);
              return;
            }
          }
        }
      }
    }

    // Check for tie
    if (board.every(row => row.every(cell => cell))) {
      setWinner('Tie');
    }
  };

  const resetGame = () => {
    setBoard(Array(6).fill().map(() => Array(7).fill(null)));
    setIsRedNext(true);
    setWinner(null);
  };

  const changeMode = (mode) => {
    setGameMode(mode);
  };

  const cpuMove = () => {
    if (isRedNext) return; // Wait for player to move

    // Simple AI: randomly choose a column to drop the disc
    const availableColumns = [];
    for (let col = 0; col < 7; col++) {
      if (!board[0][col]) availableColumns.push(col);
    }
    const randomCol = availableColumns[Math.floor(Math.random() * availableColumns.length)];

    handleCellClick(randomCol);
  };

  useEffect(() => {
    if (gameMode === 'cpu' && !isRedNext && !winner) {
      const timeout = setTimeout(() => cpuMove(), 500); // Delay CPU move to simulate thinking
      return () => clearTimeout(timeout);
    }
  }, [isRedNext, board, gameMode, winner]);

  if (gameMode === 'menu') {
    return (
      <div className="connect-four-menu">
        <h2>Connect Four</h2>
        <p>Hello, {nickname}! Choose mode:</p>
        <button className="connect-four-btn" onClick={() => changeMode('pvp')}>2 Players</button>
        <button className="connect-four-btn" onClick={() => changeMode('cpu')}>Play vs Computer</button>
      </div>
    );
  }

  return (
    <div className="connect-four-container">
      <h2 className="connect-four-title">
  Connect Four - {gameMode === 'pvp' ? '2 Players' : 'vs Computer'}
</h2>

      {winner ? (
  <h3 className="connect-four-winner">
    {winner === 'Tie' ? "It's a tie!" : `${winner} wins!`}
  </h3>
) : (
  <h4 className="connect-four-turn">
    Turn: {isRedNext ? 'Red' : 'Yellow'}
  </h4>
)}
      <div className="connect-four-grid">
        {Array(7).fill().map((_, colIndex) => (
          <div
            key={colIndex}
            className="connect-four-column"
            onClick={() => handleCellClick(colIndex)}
          >
            {board.map((row, rowIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`connect-four-cell ${row[colIndex]}`}
              >
                {row[colIndex] ? <span className={`disc ${row[colIndex]}`}></span> : null}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="connect-four-btn" onClick={resetGame}>Reset Game</button>
      <button className="connect-four-btn" onClick={() => changeMode('menu')}>Change Mode</button>
    </div>
  );
}
