// src/games/TicTacToe.jsx
import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

export default function TicTacToe({ nickname }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [mode, setMode] = useState('menu'); // 'menu', 'pvp', 'cpu'

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const checkWinner = (b) => {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diags
    ];
    for (let [a,b1,c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    if (b.every(cell => cell)) return 'Tie';
    return null;
  };

  const computerMove = () => {
    const emptyIndices = board.map((val, i) => val ? null : i).filter(i => i !== null);
    if (emptyIndices.length === 0) return;
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    handleClick(randomIndex);
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) setWinner(result);
    else if (mode === 'cpu' && !xIsNext && !winner) {
      const timeout = setTimeout(() => computerMove(), 500);
      return () => clearTimeout(timeout);
    }
  }, [board, xIsNext, winner, mode]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  if (mode === 'menu') {
    return (
      <div className="tictactoe-card">
        <h2>Tic Tac Toe</h2>
        <p>Hello, {nickname}! Choose mode:</p>
        <button className="tictactoe-btn" onClick={() => setMode('pvp')}>2 Players</button>
        <button className="tictactoe-btn" onClick={() => setMode('cpu')}>Play vs Computer</button>
      </div>
    );
  }

  return (
    <div className="tictactoe-card">
      <h2>Tic Tac Toe - {mode === 'pvp' ? '2 Players' : 'vs Computer'}</h2>
      {winner ? (
        <h3>{winner === 'Tie' ? "It's a tie!" : `${winner} wins!`}</h3>
      ) : (
        <h4>Turn: {xIsNext ? 'X' : 'O'}</h4>
      )}
      <div className="tictactoe-grid">
        {board.map((cell, i) => (
          <div
            key={i}
            className={`tictactoe-cell ${board[i] || winner ? 'disabled' : ''}`}
            onClick={() => (mode === 'cpu' && !xIsNext) ? null : handleClick(i)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button className="tictactoe-btn" onClick={resetGame}>Reset Game</button>
      <button className="tictactoe-btn" onClick={() => setMode('menu')}>Change Mode</button>
    </div>
  );
}
