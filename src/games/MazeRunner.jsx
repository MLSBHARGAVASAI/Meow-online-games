import React, { useState, useEffect, useRef } from 'react';
import { generateMaze } from '../utils/Mazegenerator';
import Cell from './Mazecell';
import Player from './Mazeplayer';
import './MazeRunner.css';

const Maze = ({ nickname }) => {
  const dimensions = {
    small: { rows: 10, cols: 10 },
    medium: { rows: 15, cols: 15 },
    large: { rows: 20, cols: 20 },
  };

  const [mazeSize, setMazeSize] = useState(null);
  const [maze, setMaze] = useState([]);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [endPos, setEndPos] = useState({ row: 14, col: 0 });
  const [isVictory, setIsVictory] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const mazeRef = useRef(null);

  const { rows, cols } = dimensions[mazeSize] || { rows: 15, cols: 15 };

  // Initialize maze when size is selected
  useEffect(() => {
    if (mazeSize === null) return;
    const { grid, start, end } = generateMaze(rows, cols);
    setMaze(grid);
    setPlayerPos(start);
    setEndPos(end);
    setIsVictory(false);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);
  }, [mazeSize, rows, cols]);

  // Timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard input
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e) => {
      const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'];
      if (!keys.includes(e.key)) return;

      e.preventDefault();
      e.stopPropagation();

      let direction = '';
      switch (e.key) {
        case 'ArrowUp':
        case 'w': direction = 'up'; break;
        case 'ArrowDown':
        case 's': direction = 'down'; break;
        case 'ArrowLeft':
        case 'a': direction = 'left'; break;
        case 'ArrowRight':
        case 'd': direction = 'right'; break;
        default: return;
      }
      movePlayer(direction);
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, maze, rows, cols, endPos, isPlaying]);

  // Move player function (shared for keyboard + buttons)
  const movePlayer = (direction) => {
    let newRow = playerPos.row;
    let newCol = playerPos.col;
    const currentCell = maze[playerPos.row][playerPos.col];

    switch (direction) {
      case 'up':
        if (!currentCell.walls.top) newRow--;
        break;
      case 'down':
        if (!currentCell.walls.bottom) newRow++;
        break;
      case 'left':
        if (!currentCell.walls.left) newCol--;
        break;
      case 'right':
        if (!currentCell.walls.right) newCol++;
        break;
      default:
        return;
    }

    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      setPlayerPos({ row: newRow, col: newCol });
      setMoves((prev) => prev + 1);

      if (newRow === endPos.row && newCol === endPos.col) {
        setIsVictory(true);
        setIsPlaying(false);
      }
    }
  };

  const handleSizeChange = (size) => {
    setMazeSize(size);
  };

  const restartGame = () => {
    const { grid, start, end } = generateMaze(rows, cols);
    setMaze(grid);
    setPlayerPos(start);
    setEndPos(end);
    setIsVictory(false);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);
  };

  return (
    <div className="game-maze-container">
    

      <div className="game-area">
        {mazeSize === null ? (
          <div className="size-selection">
            <h2 style={{ color: '#fff' }}>Select Maze Size {nickname}</h2>

            <button onClick={() => handleSizeChange('small')}>Small Maze</button>
            <button onClick={() => handleSizeChange('medium')}>Medium Maze</button>
            <button onClick={() => handleSizeChange('large')}>Large Maze</button>
          </div>
        ) : (
          <>
            <div className="game-status">
              <p>Moves: {moves}</p>
              <p>Time: {timer} sec</p>
            </div>

            <div
              className="maze"
              ref={mazeRef}
              tabIndex={0}
              style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
              }}
            >
              {maze.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    cell={cell}
                    isStart={rowIndex === playerPos.row && colIndex === playerPos.col}
                    isEnd={rowIndex === endPos.row && colIndex === endPos.col}
                  />
                ))
              )}
              <Player position={playerPos} gridSize={{ rows, cols }} />
            </div>

            {/* On-screen mobile controls */}
            <div className="mobile-controls">
              <button onClick={() => movePlayer('up')}>⬆️</button>
              <div>
                <button onClick={() => movePlayer('left')}>⬅️</button>
                <button onClick={() => movePlayer('down')}>⬇️</button>
                <button onClick={() => movePlayer('right')}>➡️</button>
              </div>
            </div>

            {/* Victory message overlay */}
            {isVictory && (
              <div className="victory-screen">
                <h2>🎉 Congratulations, {nickname}!</h2>
                <p>
                  You solved the maze in <strong>{moves} moves</strong> and <strong>{timer} seconds</strong>!
                </p>
                <button onClick={restartGame}>Play Again</button>
              </div>
            )}

           
          </>
        )}
      </div>
    </div>
  );
};

export default Maze;
