import React, { useState, useEffect } from 'react';
import './SnakeCrawl.css';

const cellSize = 25; // Size of each cell in pixels
const gridSize = 15; // 15x15 grid

const SnakeCrawl = ({ nickname }) => {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    } else if (!isPlaying && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  // Move snake based on direction
  const moveSnake = () => {
    const head = snake[0];
    let newHead;

    switch (direction) {
      case 'UP': newHead = { x: head.x, y: head.y - 1 }; break;
      case 'DOWN': newHead = { x: head.x, y: head.y + 1 }; break;
      case 'LEFT': newHead = { x: head.x - 1, y: head.y }; break;
      case 'RIGHT': newHead = { x: head.x + 1, y: head.y }; break;
      default: return;
    }

    // Check for collisions with walls or self
    if (
      newHead.x < 0 || newHead.y < 0 ||
      newHead.x >= gridSize || newHead.y >= gridSize ||
      snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    let newSnake = [newHead, ...snake];

    // Check if snake eats food
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(score + 1);
      // Generate new food location, ensure it does not appear on snake
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        };
      } while (newSnake.some(s => s.x === newFood.x && s.y === newFood.y));
      setFood(newFood);
    } else {
      newSnake.pop(); // Remove tail if no food eaten
    }

    setSnake(newSnake);
  };

  // Game loop interval
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      moveSnake();
    }, 150); // speed

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, snake, direction]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = e => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  // Mobile controls handler
  const changeDirection = (newDir) => {
    if (
      (newDir === 'UP' && direction !== 'DOWN') ||
      (newDir === 'DOWN' && direction !== 'UP') ||
      (newDir === 'LEFT' && direction !== 'RIGHT') ||
      (newDir === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(newDir);
    }
  };

  // Start / restart game
  const startGame = () => {
    setSnake([{ x: 2, y: 2 }]);
    setFood({ x: 5, y: 5 });
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setTimer(0);
    setIsPlaying(true);
  };

  return (
    <div className="snake-game" style={{ width: gridSize * cellSize, margin: '20px auto', userSelect: 'none' }}>
      <div className="game-info" style={{ color: 'white', marginBottom: 10 }}>
        <h2 style={{ color: 'white' }}>Welcome, {nickname}!</h2>

        <p>Score: {score}</p>
        <p>Time: {timer} sec</p>
        <button className="start-btn" onClick={startGame}>Start New Game</button>
      </div>

      <div
        className="snake-board"
        style={{
          position: 'relative',
          width: gridSize * cellSize,
          height: gridSize * cellSize,
          backgroundColor: '#222',
          border: '2px solid white',
          marginBottom: 15,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`snake-cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
              style={{
                position: 'absolute',
                width: cellSize - 2,
                height: cellSize - 2,
                left: x * cellSize,
                top: y * cellSize,
                boxSizing: 'border-box',
                border: '1px solid #555',
                backgroundColor: isSnake ? 'limegreen' : isFood ? 'red' : '#111',
                borderRadius: 4,
              }}
            />
          );
        })}

        {gameOver && (
  <div
    className="game-over-message"
    style={{
      position: 'absolute',
      top: 140,
      left: 190,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 24,
      zIndex: 10,
      borderRadius: 8,  // optional, matches board's border-radius
      userSelect: 'none',
      pointerEvents: 'auto',
      padding: 20,
      textAlign: 'center',
    }}
  >
    <h2>Game Over, {nickname}!</h2>
    <p>Your final score: {score}</p>
    <button className="start-btn" onClick={startGame} style={{ marginTop: 10, padding: '10px 20px', fontSize: 18 }}>
      Play Again
    </button>
  </div>
)}

      </div>

      {/* Mobile Controls */}
      <div
        className="mobile-controls"
        style={{ textAlign: 'center', userSelect: 'none' }}
      >
        <button
          onClick={() => changeDirection('UP')}
          style={buttonStyle}
          aria-label="Move Up"
        >
          ↑
        </button>
        <div>
          <button
            onClick={() => changeDirection('LEFT')}
            style={buttonStyle}
            aria-label="Move Left"
          >
            ←
          </button>
          <button
            onClick={() => changeDirection('DOWN')}
            style={buttonStyle}
            aria-label="Move Down"
          >
            ↓
          </button>
          <button
            onClick={() => changeDirection('RIGHT')}
            style={buttonStyle}
            aria-label="Move Right"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

// Button style for mobile controls
const buttonStyle = {
  fontSize: 30,
  width: 60,
  height: 60,
  margin: 5,
  borderRadius: 8,
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
  userSelect: 'none',
};

export default SnakeCrawl;
