import React, { useState, useEffect } from 'react';

const ReactionTimer = () => {
  const [reactionTime, setReactionTime] = useState(null);
  const [color, setColor] = useState('red');
  const [isGameActive, setIsGameActive] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.getItem('reactionHighScore') || Infinity);
  
  let timer;

  const startGame = () => {
    setReactionTime(null);
    setColor('red');
    setIsGameActive(true);
    const randomDelay = Math.floor(Math.random() * 3000) + 1000; // Delay between 1 and 4 seconds
    timer = setTimeout(() => {
      setColor('green');
      const startTime = Date.now();
      const handleClick = () => {
        const endTime = Date.now();
        const time = endTime - startTime;
        setReactionTime(time);
        setIsGameActive(false);
        if (time < highScore) {
          setHighScore(time);
          localStorage.setItem('reactionHighScore', time);
        }
      };
      window.addEventListener('click', handleClick);
    }, randomDelay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="game-container">
      <h2>Reaction Timer</h2>
      <div
        style={{
          backgroundColor: color,
          width: '200px',
          height: '200px',
          margin: '20px auto',
        }}
      ></div>
      {isGameActive ? (
        <p>Wait for the color to turn green, then click!</p>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}
      {reactionTime && <div>Your reaction time: {reactionTime} ms</div>}
      <div>High Score: {highScore} ms</div>
    </div>
  );
};

export default ReactionTimer;
