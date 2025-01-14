/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { setContext, drawColorWheel, drawInstructions, drawMousePosition, drawPickedColor } from './script';

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    drawColorWheel();
    drawInstructions();

    const handleMouseMove = (event) => {
      drawMousePosition(event.offsetX, event.offsetY);
      drawPickedColor(event.offsetX, event.offsetY);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h1>Color wheel</h1>
      <canvas id="canvas" ref={canvasRef} width="1024" height="800"></canvas>
    </div>
  );
};

export default App;