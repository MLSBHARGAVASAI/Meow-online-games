import { useEffect } from 'react'
import './Mazestatus.css'

const GameStatus = ({ moves, timer, setTimer, isPlaying, isVictory }) => {
  useEffect(() => {
    let interval
    
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, setTimer])
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="game-status">
      <div className="status-item">
        <span className="status-label">Moves:</span>
        <span className="status-value">{moves}</span>
      </div>
      <div className="status-item">
        <span className="status-label">Time:</span>
        <span className="status-value">{formatTime(timer)}</span>
      </div>
      <div className="status-message">
        {isVictory ? 'Maze Completed!' : isPlaying ? 'Find the exit!' : 'Press New Maze to start'}
      </div>
    </div>
  )
}

export default GameStatus