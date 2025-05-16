import React, { useState, useEffect } from 'react';
import './TypingTest.css';

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "The only way to do great work is to love what you do.",
  "Success comes to those who never give up.",
  "Patience and persistence are key to growth.",
  "A little progress each day adds up to big results.",
  "Learning new skills can change your future.",
  "Confidence comes from preparation and practice.",
  "A positive attitude creates positive outcomes.",
  "Creativity thrives when you challenge yourself.",
  "Great achievements start with small steps.",
  "Focus on the present, not just the goal.",
  "Every challenge is an opportunity to improve.",
  "Believe in yourself even when no one else does, because your determination shapes your success.",
  "Challenges are not obstacles but opportunities to prove how much you want to achieve your dreams.",
  "The only way to do great work is to love what you do and give it your very best effort every day.",
  "When you embrace failure as part of the journey, you unlock the courage to try again and succeed.",
  "Success is not final, and failure is not fatal; it’s the courage to continue that truly counts."
];

export default function TypingTest() {
  const [sentence, setSentence] = useState('');
  const [inputText, setInputText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setSentence(randomSentence);

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    if (value === sentence) {
      setScore(score + 1);
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
      setSentence(randomSentence);
      setInputText('');
    }
  };

  const getLetterClass = (letter, index) => {
    if (inputText.length <= index) return '';
    if (inputText[index] === letter) return 'correct';
    return 'incorrect';
  };

  const handleStartGame = () => {
    setHasStarted(true);
    setTimeRemaining(60);
    setScore(0);
    setInputText('');
    setIsGameOver(false);
  };

  return (
    <div className="typingtest-card">
      <h2>Typing Speed Test</h2>

      {!hasStarted ? (
        <div className="typingtest-start">
          <p>Click the button below to start the game!</p>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : !isGameOver ? (
        <>
          <div className="typingtest-info">
            <span>Time: {timeRemaining}s</span>
            <span>Score: {score}</span>
          </div>
          <div className="typingtest-sentence">
            {sentence.split('').map((letter, index) => (
              <span key={index} className={getLetterClass(letter, index)}>
                {letter}
              </span>
            ))}
          </div>
          <input
            type="text"
            className="typingtest-input"
            value={inputText}
            onChange={handleInputChange}
            disabled={isGameOver}
            autoFocus
          />
        </>
      ) : (
        <div className="typingtest-result">
          <h3>Game Over!</h3>
          <p>Your score: {score}</p>
          <button onClick={handleStartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
