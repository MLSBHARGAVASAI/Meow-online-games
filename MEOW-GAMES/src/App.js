import React from 'react';
import './Menu.css';
import GameCard from './components/GameCard';

function App() {
  const games = [
    { id: 1, title: 'Game 1', logo: 'path/to/logo1.png' },
    { id: 2, title: 'Game 2', logo: 'path/to/logo2.png' },
    { id: 3, title: 'Game 3', logo: 'path/to/logo3.png' },
    { id: 4, title: 'Game 4', logo: 'path/to/logo4.png' },
    { id: 5, title: 'Game 5', logo: 'path/to/logo5.png' },
  ];

  return (
    <div className="container">
      <h1>MEOW GAMES</h1>
      <div className="game-cards">
        {games.map(game => (
          <GameCard key={game.id} title={game.title} logo={game.logo} />
        ))}
      </div>
    </div>
  );
}

export default App;