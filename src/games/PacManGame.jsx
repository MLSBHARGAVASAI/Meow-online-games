// games/PacManGame.jsx
import React, { useState, useEffect } from 'react';
import './PacManGame.css';

export default function PacManGame({ nickname }) {
  const gridSize = 15;
  const initialPellets = Array.from({ length: gridSize }, (_, row) =>
    Array.from({ length: gridSize }, (_, col) => (row === 1 && col === 1 ? false : true))
  );

  const [pacManPos, setPacManPos] = useState({ row: 1, col: 1 });
  const [pellets, setPellets] = useState(initialPellets);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const ghostPositions = [
    { row: 5, col: 5 },
    { row: 10, col: 10 },
  ];

  const movePacMan = (key) => {
    if (gameOver) return;

    let { row, col } = pacManPos;
    if (key === 'ArrowUp' && row > 0) row--;
    if (key === 'ArrowDown' && row < gridSize - 1) row++;
    if (key === 'ArrowLeft' && col > 0) col--;
    if (key === 'ArrowRight' && col < gridSize - 1) col++;

    // Check collision with ghost
    if (ghostPositions.some(g => g.row === row && g.col === col)) {
      setGameOver(true);
      return;
    }

    // Collect pellet
    if (pellets[row][col]) {
      const newPellets = [...pellets];
      newPellets[row][col] = false;
      setPellets(newPellets);
      setScore(prev => prev + 10);
    }

    setPacManPos({ row, col });
  };

  useEffect(() => {
    const handleKey = (e) => movePacMan(e.key);
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [pacManPos, pellets, gameOver]);

  const renderCell = (r, c) => {
    const isPacMan = pacManPos.row === r && pacManPos.col === c;
    const isGhost = ghostPositions.some(g => g.row === r && g.col === c);
    const hasPellet = pellets[r][c];

    let className = 'cell';
    if (isPacMan) className += ' pacman';
    else if (isGhost) className += ' ghost';
    else if (hasPellet) className += ' pellet';

    return <div key={`${r}-${c}`} className={className}></div>;
  };

  const restartGame = () => {
    setPacManPos({ row: 1, col: 1 });
    setPellets(initialPellets);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="pacman-container">
      <h2>Pac-Man</h2>
      <p>Player: {nickname} | Score: {score}</p>
      <div className="grid">
        {Array.from({ length: gridSize }, (_, row) =>
          <div className="row" key={row}>
            {Array.from({ length: gridSize }, (_, col) => renderCell(row, col))}
          </div>
        )}
      </div>
      {gameOver && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}
