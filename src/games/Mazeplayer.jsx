import { useEffect, useRef } from 'react'
import './Mazeplayer.css'

const Player = ({ position, gridSize }) => {
  const playerRef = useRef(null)
  
  useEffect(() => {
    if (playerRef.current) {
      // Calculate cell size based on grid
      const cellWidth = 100 / gridSize.cols
      const cellHeight = 100 / gridSize.rows
      
      // Position player with CSS custom properties
      playerRef.current.style.setProperty('--row', position.row)
      playerRef.current.style.setProperty('--col', position.col)
      playerRef.current.style.setProperty('--cell-width', `${cellWidth}%`)
      playerRef.current.style.setProperty('--cell-height', `${cellHeight}%`)
    }
  }, [position, gridSize])
  
  return <div className="player" ref={playerRef}></div>
}

export default Player