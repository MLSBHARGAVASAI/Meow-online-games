import React, { useState } from "react";
import "./Hangman.css"; // Ensure you have the correct CSS file

const Hangman = ({ nickname }) => {
  // List of words
  const words = [
    'react', 'javascript', 'hangman', 'developer', 
    'programming', 'frontend', 'backend', nickname.toLowerCase(),
    'algorithm', 'typescript', 'machinelearning', 'cloud', 
    'database', 'api', 'webdev', 'angular', 
    'nodejs', 'express', 'mongodb', 'python', 'django', 
    'flask', 'vue', 'swift', 'kotlin', 'ruby', 
    'flutter', 'graphql', 'testing'
  ];

  // Function to generate a word with one random letter visible and others hidden
  function getWordWithRandomLetter() {
    const word = words[Math.floor(Math.random() * words.length)];
    const indexToShow = Math.floor(Math.random() * word.length); // Randomly choose an index to show
    const wordWithHiddenLetters = Array(word.length).fill('_'); // Initially hide all letters with '_'
    wordWithHiddenLetters[indexToShow] = word[indexToShow]; // Show one letter

    return {
      word: word,
      display: wordWithHiddenLetters.join(' ') // Join letters with space for better visual formatting
    };
  }

  // Initialize state
  const [wordData, setWordData] = useState(getWordWithRandomLetter());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [result, setResult] = useState("");
  const maxWrong = 6;

  // Display the word with the hidden letters
  const displayWord = wordData.display;

  // Handle user guessing a letter
  const guessLetter = (letter) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);

    // If the guessed letter is correct, update the display
    if (wordData.word.includes(letter)) {
      const updatedDisplay = wordData.word.split('').map((char, index) => {
        return guessedLetters.includes(char) || char === letter ? char : '_';
      }).join(' ');
      setWordData(prev => ({ ...prev, display: updatedDisplay }));
    } else {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  // Determine if the game is over or the user won
  const isGameOver = wrongGuesses >= maxWrong;
  const isWinner = displayWord.indexOf('_') === -1;

  // Get result message based on the game's outcome
  const getNicknameResult = () => {
    if (isWinner) {
      return `🎉 Congratulations, ${nickname}! You guessed the word!`;
    } else if (isGameOver) {
      return `😞 Oops, ${nickname}. You lost! The word was: ${wordData.word}`;
    }
    return "";
  };

  // Reset game for a new round
  const resetGame = () => {
    setWordData(getWordWithRandomLetter());
    setGuessedLetters([]);
    setWrongGuesses(0);
    setResult("");
  };

  return (
    <div className="hangman-container">
      <h2>Word Guess🤔</h2>

      <div className="word-display">
        <h3>Word: {displayWord}</h3>
      </div>

      <div className="wrong-guesses">
        <p style={{ color: wrongGuesses > 0 ? "red" : "white" }}>
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

      {isGameOver || isWinner ? (
        <div className="game-over">
          <button onClick={resetGame} className="play-again-btn">
            Play Again
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Hangman;
