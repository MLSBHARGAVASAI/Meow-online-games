import React, { useState, useEffect } from 'react';
import './SnakeCrawl.css';

const SnakeCrawl = ({ nickname }) => {
  const gridSize = 15;

  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Snake Movement Logic
  const moveSnake = () => {
    const head = snake[0];
    let newHead;

    switch (direction) {
      case 'UP':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'DOWN':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case 'LEFT':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'RIGHT':
        newHead = { x: head.x + 1, y: head.y };
        break;
      default:
        return;
    }

    const newSnake = [newHead, ...snake.slice(0, snake.length - 1)];

    // Check for collision
    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= gridSize ||
      newHead.y >= gridSize ||
      snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    setSnake(newSnake);
  };

  // Food Collision Logic
  const checkFoodCollision = () => {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      });
      setSnake(prevSnake => [...prevSnake, {}]);
      setScore(prevScore => prevScore + 1);  // Increase score
    }
  };

  // Keyboard Input Handling
  const handleKeyPress = (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
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

  // Game Loop & Event Listener
  useEffect(() => {
    if (gameOver) return;

    const gameInterval = setInterval(() => {
      moveSnake();
      checkFoodCollision();
    }, 150);

    return () => clearInterval(gameInterval);
  }, [snake, direction, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  // Start / Restart Game
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
    <div className="snake-game">
  

      <div className="game-info">
        <h2>Welcome, {nickname}!</h2>
        <p>Score: {score}</p>
        <p>Time: {timer} sec</p>
        <button className="start-btn" onClick={startGame}>Start New Game</button>
      </div>

      <div className="snake-board">
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={index}
              className={`snake-cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
              style={{
                left: `${x * 25}px`,  // Cell size
                top: `${y * 25}px`,
              }}
            />
          );
        })}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="game-over-message">
            <h2>Game Over, {nickname}!</h2>
            <p>Your final score: {score}</p>
            <button className="start-btn" onClick={startGame}>Play Again</button>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="mobile-controls">
        <button onClick={() => setDirection('UP')}>⬆️</button>
        <div>
          <button onClick={() => setDirection('LEFT')}>⬅️</button>
          <button onClick={() => setDirection('DOWN')}>⬇️</button>
          <button onClick={() => setDirection('RIGHT')}>➡️</button>
        </div>
      </div>
    </div>
  );
};

export default SnakeCrawl;
