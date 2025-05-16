import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Styling for the Menu component


const Menu = ({ nickname, setCurrentGame }) => {
  return (
    <div className="menu-background container text-center text-white d-flex flex-column justify-content-center align-items-center">
    <h1
  className="mb-4"
  style={{
    fontFamily: "'Freckle Face', cursive", // Playful cartoon font
    fontSize: '2.2rem',
    color: 'white', // white text color
    textShadow: '2px 2px 6px #FF6F00, 4px 4px 12px #FFA500', // orange glowing shadow
    textAlign: 'center',
    marginTop: '40px',
    userSelect: 'none',
  }}
>
  Hey {nickname}! Let the Meowgic Begin! 🎮
</h1>


      <div className="game-cards">
        <div className="game-card" onClick={() => setCurrentGame('tictactoe')}>
          <img
            src="/IMAGES/1.png"
            alt="Tic Tac Toe"
            className="game-logo"
          />
          <h3>Tic Tac Toe</h3>
        </div>
        <div className="game-card" onClick={() => setCurrentGame('rps')}>
          <img
            src="/IMAGES/2.png"
            alt="Rock Paper Scissors"
            className="game-logo"
          />
          <h3>Rock Paper Scissors</h3>
        </div>
        <div className="game-card" onClick={() => setCurrentGame('guess')}>
          <img
            src="/IMAGES/3.png"
            alt="Maths Game"
            className="game-logo"
          />
          <h3>Maths Game</h3>
        </div>
        <div className="game-card" onClick={() => setCurrentGame('hangman')}>
          <img
            src="/IMAGES/4.png"
            alt="Word Guess"
            className="game-logo"
          />
          <h3>Word Guess</h3>
        </div>
        <div className="game-card" onClick={() => setCurrentGame('memory')}>
          <img
            src="/IMAGES/5.png"
            alt="Memory Game"
            className="game-logo"
          />
          <h3>Memory Game</h3>
        </div>
        <div className="game-card" onClick={() => setCurrentGame('maze')}>
          <img
            src="/IMAGES/6.png"
            alt="Maze Runner"
            className="game-logo"
          />
          <h3>Maze Runner</h3>
        </div>
        <div className="game-card" onClick={() => setCurrentGame('snake')}>
          <img
            src="/IMAGES/7.png"
            alt="Snake Crawl"
            className="game-logo"
          />
          <h3>Snake Crawl</h3>
        </div>
        <div className="game-card" onClick={() => setCurrentGame('typingtest')}>
          <img
            src="/IMAGES/8.png"
            alt="Typing Test"
            className="game-logo"
          />
          <h3>Typing Test</h3>
        </div>
       
        <div className="game-card" onClick={() => setCurrentGame('connect')}>
          <img
            src="/IMAGES/9.png"
            alt="Connect 4 Lines"
            className="game-logo"
          />
          <h3>Connect 4 Lines</h3>
        </div>
        {/* Added Coloring Game */}
        <div className="game-card" onClick={() => setCurrentGame('coloringgame')}>
          <img
            src="/IMAGES/10.png"  // Replace with an actual logo for the Coloring Game
            alt="Coloring Game"
            className="game-logo"
          />
          <h3>Coloring Game</h3>
        </div>
      </div>
    </div>
  );
};

export default Menu;
