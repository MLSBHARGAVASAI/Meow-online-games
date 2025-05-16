/**
 * Generates a maze using the Recursive Backtracking algorithm
 * @param {number} rows - Number of rows in the maze
 * @param {number} cols - Number of columns in the maze
 * @returns {Object} The generated maze grid, start and end positions
 */
export const generateMaze = (rows, cols) => {
  // Initialize grid with all walls
  const grid = Array(rows).fill().map(() => 
    Array(cols).fill().map(() => ({
      visited: false,
      walls: {
        top: true,
        right: true,
        bottom: true,
        left: true
      }
    }))
  )
  
  // Random start position (always on top edge)
  const startPosition = { row: 0, col: Math.floor(Math.random() * cols) }
  
  // Mark start cell as visited
  grid[startPosition.row][startPosition.col].visited = true
  
  // Create stack for backtracking and add start position
  const stack = [startPosition]
  
  // Directions to check for neighbors
  const directions = [
    { row: -1, col: 0, opposite: 'bottom', wall: 'top' },    // Up
    { row: 0, col: 1, opposite: 'left', wall: 'right' },     // Right
    { row: 1, col: 0, opposite: 'top', wall: 'bottom' },     // Down
    { row: 0, col: -1, opposite: 'right', wall: 'left' }     // Left
  ]
  
  // Recursive backtracking algorithm
  while (stack.length > 0) {
    const current = stack[stack.length - 1]
    
    // Get unvisited neighbors
    const neighbors = []
    
    for (const dir of directions) {
      const newRow = current.row + dir.row
      const newCol = current.col + dir.col
      
      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        !grid[newRow][newCol].visited
      ) {
        neighbors.push({
          row: newRow,
          col: newCol,
          direction: dir
        })
      }
    }
    
    if (neighbors.length > 0) {
      // Choose random neighbor
      const randomIndex = Math.floor(Math.random() * neighbors.length)
      const next = neighbors[randomIndex]
      
      // Remove walls between current and next cell
      grid[current.row][current.col].walls[next.direction.wall] = false
      grid[next.row][next.col].walls[next.direction.opposite] = false
      
      // Mark next cell as visited
      grid[next.row][next.col].visited = true
      
      // Add next cell to stack
      stack.push({ row: next.row, col: next.col })
    } else {
      // Backtrack if no unvisited neighbors
      stack.pop()
    }
  }
  
  // Set end position to bottom row
  let endPosition = { row: rows - 1, col: Math.floor(Math.random() * cols) }
  
  // Ensure there's a path to the end position
  const ensurePathToEnd = () => {
    const above = { row: endPosition.row - 1, col: endPosition.col }
    if (above.row >= 0) {
      grid[above.row][above.col].walls.bottom = false
      grid[endPosition.row][endPosition.col].walls.top = false
    }
  }
  
  ensurePathToEnd()
  
  return {
    grid,
    start: startPosition,
    end: endPosition
  }
}