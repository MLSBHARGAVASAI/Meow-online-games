import './Mazecell.css'

const Cell = ({ cell, isStart, isEnd }) => {
  const { walls, visited } = cell
  
  const cellClassName = `cell ${visited ? 'visited' : ''} ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''}`
  
  return (
    <div className={cellClassName}>
      <div className={`wall top ${walls.top ? 'active' : ''}`}></div>
      <div className={`wall right ${walls.right ? 'active' : ''}`}></div>
      <div className={`wall bottom ${walls.bottom ? 'active' : ''}`}></div>
      <div className={`wall left ${walls.left ? 'active' : ''}`}></div>
    </div>
  )
}

export default Cell