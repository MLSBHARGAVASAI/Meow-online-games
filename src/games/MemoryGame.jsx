import React, { useState, useEffect } from 'react';
import './MemoryGame.css'; // Make sure this file exists

export default function MemoryGame({ nickname }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const symbols = ['🍎','🍌','🍇','🍒','🍉','🥝'];
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
  };

  const handleClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const isGameWon = matched.length === cards.length;

  return (
    <div className="memory-game-container">
      <h2>Memory Game</h2>

      <div className="memory-game-grid">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={`memory-game-card ${flipped.includes(idx) || matched.includes(idx) ? 'flipped' : ''}`}
            onClick={() => handleClick(idx)}
          >
            {flipped.includes(idx) || matched.includes(idx) ? card.symbol : '❓'}
          </div>
        ))}
      </div>

      {isGameWon && (
        <div className="memory-game-win-message">
          <p>🎉 Well done, {nickname}! You matched all pairs! 🎉</p>
          <button className="memory-game-play-again-btn" onClick={initializeGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
