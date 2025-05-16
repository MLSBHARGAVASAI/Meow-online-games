import React, { useState } from "react";
import "./RockPaperScissors.css"; // Make sure to have this CSS file

const RockPaperScissors = ({ nickname }) => {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [shuffling, setShuffling] = useState(false);

  const choices = {
    Rock: "✊",
    Paper: "✋",
    Scissors: "✌️",
  };

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    shuffleChoices(choice);
  };

  const shuffleChoices = (userChoice) => {
    setShuffling(true);
    const shuffledChoices = ["Rock", "Paper", "Scissors"];

    let currentChoiceIndex = 0;
    const shuffleInterval = setInterval(() => {
      currentChoiceIndex = (currentChoiceIndex + 1) % 3;
      setComputerChoice(shuffledChoices[currentChoiceIndex]);
    }, 100);

    setTimeout(() => {
      clearInterval(shuffleInterval);
      const computerRandomChoice = shuffledChoices[Math.floor(Math.random() * 3)];
      setComputerChoice(computerRandomChoice);
      determineWinner(userChoice, computerRandomChoice);
      setShuffling(false);
    }, 2000);
  };

  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      setResult("It's a Draw!");
    } else if (
      (userChoice === "Rock" && computerChoice === "Scissors") ||
      (userChoice === "Paper" && computerChoice === "Rock") ||
      (userChoice === "Scissors" && computerChoice === "Paper")
    ) {
      setResult("You Win!");
    } else {
      setResult("You Lose!");
    }
  };

  const getNicknameResult = (result) => {
    if (result === "You Win!") {
      return `🏆 Victory, ${nickname}!`;
    } else if (result === "You Lose!") {
      return `😢 Oops, better luck next time, ${nickname}!`;
    } else if (result === "It's a Draw!") {
      return `🤝 It's a draw, ${nickname}!`;
    }
    return "";
  };

  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setShuffling(false);
  };

  return (
    <div className="game-container">
      <h2 style={{
        textAlign: 'center',
        fontSize: '40px',
        color: '#ff6347', // Bright color to make it stand out
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        
        marginBottom: '20px'
      }}>
        Rock Paper Scissors Game
      </h2>

      <div className="box user-box">
        <h3 style={{ color: '#fff' }}>Your Choice:</h3>

        <div className="choices">
          {Object.keys(choices).map((choice, index) => (
            <button
              key={index}
              onClick={() => handleUserChoice(choice)}
              className="choice-btn"
              disabled={shuffling}
            >
              {choices[choice]}
            </button>
          ))}
        </div>
      </div>

      {shuffling && <div className="shuffle-animation">Shuffling...</div>}

      <div className="box computer-box">
        <h3 style={{ color: '#fff' }}>Computer's Choice:</h3>

       <h2 style={{ color: '#00aaff' }}>
  {computerChoice ? choices[computerChoice] : "Waiting..."}
</h2>

      </div>

      {result && (
        <div className="result-section">
          <h2 className="result-text">{result}</h2>
          <p className="nickname">{getNicknameResult(result)}</p>
          <button className="reset-btn" onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
