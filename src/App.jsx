import React, { useState, useEffect } from 'react';
import TicTacToe from './games/TicTacToe';
import RockPaperScissors from './games/RockPaperScissors';
import MaxGame from './games/MaxGame';
import Hangman from './games/Hangman';
import MemoryGame from './games/MemoryGame';
import MazeRunner from './games/MazeRunner';
import SnakeCrawl from './games/SnakeCrawl';
import ConnectLines from './games/ConnectLines';
import TypingTest from './games/TypingTest';
import PacManGame from './games/PacManGame';
import ColoringGame from './games/ColoringGame';
import Menu from './Menu';
import './App.css';

export default function App() {
  const [nickname, setNickname] = useState('');
  const [currentGame, setCurrentGame] = useState('');

  const handleStart = () => {
    if (nickname.trim() !== '') {
      setCurrentGame('menu');
    }
  };

  const handleGameSelect = (game) => {
    if (game) {
      setCurrentGame(game);
    }
  };

  const handleEditNickname = () => {
    setNickname('');
    setCurrentGame('');
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    if (currentGame && currentGame !== 'menu') {
      const capitalizedGame = currentGame.charAt(0).toUpperCase() + currentGame.slice(1);
      document.title = `Playing ${capitalizedGame}`;
    } else {
      document.title = 'Games Menu';
    }
  }, [currentGame]);

  // Nickname input screen
  if (!nickname || currentGame === '') {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleStart();
      }
    };

const rainbowTextStyle = {
  position: 'fixed',
  top: -70,
  left: 0,
  width: '100%',
  fontFamily: "'Luckiest Guy', cursive",
  fontSize: '4rem',
  textAlign: 'center',
  padding: '15px 0',
  color: 'orange',               // Fill color orange
  WebkitTextStroke: '2px white', // White outline for WebKit browsers
  textStroke: '2px white',        // Fallback (limited support)
  textShadow: `
    0 0 5px white,
    0 0 10px white,
    0 0 15px orange,
    0 0 20px orange
  `,                             // Glowing shadow effect
  zIndex: 1000,
};


    return (
      <div className="container text-center bg-dark text-white vh-100 d-flex flex-column justify-content-center align-items-center">
        <pre style={rainbowTextStyle}>     Welcome to Meow Games!</pre>
       <h1
  className="mb-4"
  style={{
    marginTop: '80px',
    fontFamily: "'Luckiest Guy', cursive",  // fun cartoon font
    fontSize: '2rem',
    color: '#FF6F00',  // warm coral/orange color
    
    userSelect: 'none',
  }}
>
  Your Meow Name, Please..
</h1>
  
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-control w-50 mb-3 text-center"
          placeholder="Nickname"
        />
        <button onClick={handleStart} className="btn btn-primary">
          Start
        </button>
      </div>
    );
  }

  // Menu screen
  if (currentGame === 'menu') {
    return (
      <div className="position-relative">
        {/* Top Centered Edit Nickname Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <button className="btn btn-warning" onClick={handleEditNickname}>
            Edit Nickname
          </button>
        </div>

        <Menu nickname={nickname} setCurrentGame={handleGameSelect} />
      </div>
    );
  }

  // Game components
  const gameComponents = {
    tictactoe: <TicTacToe key="tictactoe" nickname={nickname} />,
    rps: <RockPaperScissors key="rps" nickname={nickname} />,
    guess: <MaxGame key="guess" nickname={nickname} />,
    hangman: <Hangman key="hangman" nickname={nickname} />,
    memory: <MemoryGame key="memory" nickname={nickname} />,
    maze: <MazeRunner key="maze" nickname={nickname} />,
    snake: <SnakeCrawl key="snake" nickname={nickname} />,
    connect: <ConnectLines key="connect" nickname={nickname} />,
    pacman: <PacManGame key="pacman" nickname={nickname} />,
    typingtest: <TypingTest key="typingtest" nickname={nickname} />,
    coloringgame: <ColoringGame key="coloringgame" nickname={nickname} />,
  };

  const capitalizedGame = currentGame.charAt(0).toUpperCase() + currentGame.slice(1);

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          onClick={() => setCurrentGame('menu')}
          className="btn btn-outline-primary"
        >
          Back to Menu
        </button>
      </div>

      {gameComponents[currentGame] || (
        <div className="alert alert-warning">
          <strong>{capitalizedGame}</strong> not found. Please go back to the menu.
        </div>
      )}
    </div>
  );
}
