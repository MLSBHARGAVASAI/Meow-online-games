import React, { useState, useRef } from 'react';
import './ColoringGame.css'; // Link to specific CSS for this game

const ColoringGame = () => {
  const [color, setColor] = useState('#FF0000'); // Default color is Red
  const [drawing, setDrawing] = useState(false); // Whether the user is clicking to color
  const [penSize, setPenSize] = useState(5); // Default pen size
  const canvasRef = useRef(null);

  // Array of colors to choose from
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

  // Function to handle color change
  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  // Function to handle pen size change
  const handlePenSizeChange = (size) => {
    setPenSize(size);
  };

  // Function to handle the mouse down event
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setDrawing(true);

    // Correct mouse coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Start drawing at the mouse position
    ctx.beginPath();
    ctx.moveTo(x, y);
    e.preventDefault(); // Prevents dragging UI elements
  };

  // Function to handle the mouse move event and color the canvas
  const handleMouseMove = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Get the mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Draw a line to the new mouse position
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = penSize; // Line width for the pen
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
    e.preventDefault(); // Prevents dragging UI elements
  };

  // Function to handle the mouse up event
  const handleMouseUp = (e) => {
    setDrawing(false);
    e.preventDefault(); // Prevents dragging UI elements
  };

  // Function to clear the canvas
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="coloring-game-container" id="coloring-game-container">
      <h1 id="coloring-game-title">Coloring Game</h1>

      {/* Color Picker */}
      <div className="color-palette" id="color-palette">
        {colors.map((color, index) => (
          <button
            key={index}
            className="color-btn"
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
            id={`color-btn-${color}`}
          />
        ))}
      </div>

      {/* Pen Size Controls */}
      <div className="pen-size-controls" id="pen-size-controls">
        <label htmlFor="pen-size" id="pen-size-label">
          Pen Size:
        </label>
        <input
          type="range"
          id="pen-size"
          min="1"
          max="20"
          value={penSize}
          onChange={(e) => handlePenSizeChange(e.target.value)}
          className="pen-size-slider"
        />
        <span id="pen-size-value">{penSize}</span>
      </div>

      {/* Canvas to color */}
      <div className="canvas-container" id="canvas-container">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
          id="coloring-canvas"
        />
      </div>

      {/* Clear Canvas Button */}
      <button className="clear-btn" onClick={handleClearCanvas} id="clear-canvas-btn">
        Clear Canvas
      </button>
    </div>
  );
};

export default ColoringGame;
