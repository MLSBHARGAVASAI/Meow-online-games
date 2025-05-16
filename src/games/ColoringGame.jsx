import React, { useState, useRef } from 'react';
import './ColoringGame.css'; // Make sure this CSS file is present

const ColoringGame = () => {
  const [color, setColor] = useState('#FF0000'); // Default red
  const [drawing, setDrawing] = useState(false);
  const [penSize, setPenSize] = useState(5);
  const canvasRef = useRef(null);

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handlePenSizeChange = (size) => {
    setPenSize(size);
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoordinates(e);
    setDrawing(true);

    ctx.beginPath();
    ctx.moveTo(x, y);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoordinates(e);

    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = penSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
    e.preventDefault();
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Touch handlers call mouse handlers with touch coords
  const handleTouchStart = (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleMouseDown(e.touches[0]);
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleMouseMove(e.touches[0]);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleMouseUp(e);
  };

  return (
    <div className="coloring-game-container" id="coloring-game-container">
      <h1 id="coloring-game-title">Coloring Game</h1>

      {/* Color Picker */}
      <div className="color-palette" id="color-palette">
        {colors.map((c, index) => (
          <button
            key={index}
            className="color-btn"
            style={{ backgroundColor: c }}
            onClick={() => handleColorChange(c)}
            id={`color-btn-${c}`}
            aria-label={`Select color ${c}`}
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          id="coloring-canvas"
        />
      </div>

      {/* Clear Canvas Button */}
      <button
        className="clear-btn"
        onClick={handleClearCanvas}
        id="clear-canvas-btn"
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default ColoringGame;
