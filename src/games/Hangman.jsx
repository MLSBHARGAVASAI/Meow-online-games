import React, { useState } from "react";
import "./Hangman.css"; // Ensure this path is correct

const Hangman = ({ nickname }) => {
  const words = [
    'react', 'javascript', 'hangman', 'developer', 
    'programming', 'frontend', 'backend', nickname.toLowerCase(),
    'algorithm', 'typescript', 'machinelearning', 'cloud', 
    'database', 'api', 'webdev', 'angular', 
    'nodejs', 'express', 'mongodb', 'python', 'django', 
    'flask', 'vue', 'swift', 'kotlin', 'ruby', 
    'flutter', 'graphql', 'testing'
  ];

  function getWordWithRandomLetter() {
    const word = words[Math.floor(Math.random() * words.length)];
    const indexToShow = Math.floor(Math.random() * word.length);
    const wordWithHiddenLetters = Array(word.length).fill('_');
    wordWithHiddenLetters[indexToShow] = word[indexToShow];
    return {
      word: word,
      display: wordWithHiddenLetters.join(' ')
    };
  }

  const [wordData, setWordData] = useState(getWordWithRandomLetter());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrong = 6;

  const displayWord = wordData.display;

  const guessLetter = (letter) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);

    if (wordData.word.includes(letter)) {
      const updatedDisplay = wordData.word
        .split('')
        .map((char) => guessedLetters.includes(char) || char === letter ? char : '_')
        .join(' ');
      setWordData(prev => ({ ...prev, display: updatedDisplay }));
    } else {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const isGameOver = wrongGuesses >= maxWrong;
  const isWinner = displayWord.indexOf('_') === -1;

  const getNicknameResult = () => {
    if (isWinner) {
      return `🎉 Congratulations, ${nickname}! You guessed the word!`;
    } else if (isGameOver) {
      return `😞 Oops, ${nickname}. You lost! The word was: ${wordData.word}`;
    }
    return "";
  };

  const resetGame = () => {
    setWordData(getWordWithRandomLetter());
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  return (
    <div className="hangman-container">
      <h2>Word Guess🤔</h2>

      <div className="word-display">
        <h3>Word: {displayWord}</h3>
      </div>

      <div className="wrong-guesses">
        <p style={{ color: wrongGuesses > 0 ? "red" : "black" }}>
          Wrong Guesses: {wrongGuesses} / {maxWrong}
        </p>
      </div>

      <div className="letters">
        {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => guessLetter(letter)}
            className="letter-btn"
            disabled={guessedLetters.includes(letter) || isGameOver || isWinner}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="result">
        {getNicknameResult() && <h3>{getNicknameResult()}</h3>}
      </div>

      {(isGameOver || isWinner) && (
        <div className="game-over">
          <button onClick={resetGame} className="play-again-btn">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Hangman;
