
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ColorWheel = ({ onColorSelect }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;


    for (let angle = 0; angle < 360; angle++) {
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(
          radius, radius, radius,
          (angle * Math.PI) / 180,
          ((angle + 1) * Math.PI) / 180
      );
      ctx.closePath();
      ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
      ctx.fill();
    }

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pixel = ctx.getImageData(x, y, 1, 1).data;

      const color = {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
        hex: `#${pixel.slice(0,3).map(v =>
            v.toString(16).padStart(2, '0')
        ).join('').toUpperCase()}`
      };

      onColorSelect(color);
    };

    canvas.addEventListener('click', handleClick);
    return () => canvas.removeEventListener('click', handleClick);
  }, [onColorSelect]);

  return <canvas ref={canvasRef} width={300} height={300} />;
};

ColorWheel.propTypes = {
  onColorSelect: PropTypes.func.isRequired
};

export default ColorWheel;