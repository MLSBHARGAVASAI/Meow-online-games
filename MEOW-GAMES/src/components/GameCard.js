import React from 'react';
import './Menu.css';

const GameCard = ({ title, logo }) => {
  return (
    <div className="game-card">
      <img src={logo} alt={`${title} logo`} className="game-logo" />
      <h3>{title}</h3>
    </div>
  );
};

export default GameCard;