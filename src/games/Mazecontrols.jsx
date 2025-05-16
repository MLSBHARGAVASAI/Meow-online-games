import './Mazecontrols.css'

const Controls = ({ onRestart, onSizeChange, currentSize }) => {
  return (
    <div className="controls">
      <div className="size-controls">
        <label htmlFor="maze-size">Maze Size:</label>
        <div className="button-group">
          <button
            className={currentSize === 'small' ? 'active' : ''}
            onClick={() => onSizeChange('small')}
          >
            Small
          </button>
          <button
            className={currentSize === 'medium' ? 'active' : ''}
            onClick={() => onSizeChange('medium')}
          >
            Medium
          </button>
          <button
            className={currentSize === 'large' ? 'active' : ''}
            onClick={() => onSizeChange('large')}
          >
            Large
          </button>
        </div>
      </div>
      
      <button className="restart-button" onClick={onRestart}>
        New Maze
      </button>
      
      <div className="instructions">
        <h3>How to Play</h3>
        <p>Use arrow keys or WASD to navigate from the green start to the red end.</p>
      </div>
    </div>
  )
}

export default Controls