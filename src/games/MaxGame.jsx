import React, { useState, useEffect } from 'react';
import './MaxGame.css'; // Make sure you have your CSS file

const MaxGame = ({ nickname }) => {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const generateQuestion = () => {
    let num1, num2, result;
    const operations = ['+', '-', '*', '/'];

    if (level === 1) {
      num1 = Math.floor(Math.random() * 20);
      num2 = Math.floor(Math.random() * 20);
      const op = operations[Math.floor(Math.random() * 2)];
      result = eval(`${num1} ${op} ${num2}`);
      setQuestion(`${num1} ${op} ${num2}`);
    } else if (level === 2) {
      num1 = Math.floor(Math.random() * 50);
      num2 = Math.floor(Math.random() * 20) + 1;
      const op = operations[Math.floor(Math.random() * 2) + 2];
      result = op === '/' ? parseFloat((num1 / num2).toFixed(2)) : eval(`${num1} ${op} ${num2}`);
      setQuestion(`${num1} ${op} ${num2}`);
    } else {
      const op1 = operations[Math.floor(Math.random() * 4)];
      const op2 = operations[Math.floor(Math.random() * 4)];
      const n1 = Math.floor(Math.random() * 100);
      const n2 = Math.floor(Math.random() * 50) + 1;
      const n3 = Math.floor(Math.random() * 30) + 1;
      const expr = `(${n1} ${op1} ${n2}) ${op2} ${n3}`;
      result = eval(expr);
      if (op1 === '/' || op2 === '/') result = parseFloat(result.toFixed(2));
      setQuestion(expr);
    }

    setCorrectAnswer(result);
  };

  useEffect(() => {
    generateQuestion();
  }, [level]);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, gameOver]);

  const handleAnswerSubmit = () => {
    const parsedAnswer = parseFloat(answer);
    if (parsedAnswer === correctAnswer) {
      setScore((prev) => prev + 10);
      setLevel((prev) => prev + 1);
      setAnswer('');
      setTimer(30);
      generateQuestion();
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setLevel(1);
    setTimer(30);
    setGameOver(false);
    setAnswer('');
    generateQuestion();
  };

  return (
    <div className="game-container">
      <pre>All the Best- {nickname}!</pre>
      {!gameOver ? (
        <>
          <div className="question-box">
            <p>Question: {question}</p>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="input-field"
              placeholder={`Enter your answer, ${nickname}`}
            />
            <button onClick={handleAnswerSubmit} className="submit-btn">
              Submit
            </button>
          </div>
          <p className="score">Score: {score}</p>
          <p className="level">Level: {level}</p>
          <p className="timer">Time Left: {timer}s</p>
        </>
      ) : (
        <div className="game-over">
          <p>Game Over, {nickname}! Your Score: {score}</p>
          <button className="restart-btn" onClick={handleRestart}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MaxGame;
