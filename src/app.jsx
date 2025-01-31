import { useState, useEffect, useRef } from 'react';
                    import './style.css';

                    const WIDTH = 1024;
                    const HEIGHT = 800;
                    const SCALE = 3.5;
                    const MIDDLE_X = WIDTH / 2;
                    const MIDDLE_Y = HEIGHT / 2;

                    const App = () => {
                        const [showCopied, setShowCopied] = useState(false);
                        const [currentColor, setCurrentColor] = useState(null);
                        const canvasRef = useRef(null);

                        const hslToRgb = (h, s, l) => {
                            h /= 360;
                            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                            const p = 2 * l - q;

                            return {
                                r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
                                g: Math.round(hue2rgb(p, q, h) * 255),
                                b: Math.round(hue2rgb(p, q, h - 1/3) * 255)
                            };
                        };

                        const hue2rgb = (p, q, t) => {
                            if(t < 0) t += 1;
                            if(t > 1) t -= 1;
                            if(t < 1/6) return p + (q - p) * 6 * t;
                            if(t < 1/2) return q;
                            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                            return p;
                        };

                        const getColorAtPosition = (x, y) => {
                            const dx = x - MIDDLE_X;
                            const dy = y - MIDDLE_Y;
                            const distance = Math.sqrt(dx*dx + dy*dy);
                            const maxRadius = 100 * SCALE;

                            if(distance > maxRadius) return null;

                            const hue = ((Math.atan2(dy, dx) * 180 / Math.PI) + 360) % 360;
                            const saturation = (distance / maxRadius) * 100;

                            return {
                                x: Math.round(x),
                                y: Math.round(y),
                                h: Math.round(hue),
                                s: Math.round(saturation),
                                l: 50,
                                rgb: hslToRgb(hue, saturation/100, 0.5),
                                hex: rgbToHex(hslToRgb(hue, saturation/100, 0.5))
                            };
                        };

                        const rgbToHex = ({r, g, b}) =>
                            `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()}`;

                        useEffect(() => {
                            const canvas = canvasRef.current;
                            const ctx = canvas.getContext('2d');

                            for(let angle = 0; angle < 360; angle++) {
                                for(let radius = 0; radius < 100; radius++) {
                                    ctx.beginPath();
                                    ctx.fillStyle = `hsl(${angle}, ${radius}%, 50%)`;
                                    ctx.arc(
                                        MIDDLE_X + Math.cos(angle * Math.PI/180) * radius * SCALE,
                                        MIDDLE_Y + Math.sin(angle * Math.PI/180) * radius * SCALE,
                                        SCALE,
                                        0,
                                        2 * Math.PI
                                    );
                                    ctx.fill();
                                }
                            }

                            const handleMouseMove = (e) => {
                                const rect = canvas.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                setCurrentColor(getColorAtPosition(x, y));
                            };

                            const handleClick = () => {
                                if (currentColor) {
                                    navigator.clipboard.writeText(currentColor.hex).then(() => {
                                        setShowCopied(true);
                                        setTimeout(() => setShowCopied(false), 2000);
                                    }).catch(err => console.error('Failed to copy: ', err));
                                }
                            };

                            canvas.addEventListener('mousemove', handleMouseMove);
                            canvas.addEventListener('click', handleClick);

                            return () => {
                                canvas.removeEventListener('mousemove', handleMouseMove);
                                canvas.removeEventListener('click', handleClick);
                            };
                        }, [currentColor, getColorAtPosition]);

                        return (
                            <div>
                                <div className="instructions">
                                    Hover over any color or tap anywhere on the wheel
                                </div>
                                <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
                                {currentColor && (
                                    <div className="color-info">
                                        <div
                                            className="color-preview"
                                            style={{ backgroundColor: currentColor.hex }}
                                        ></div>
                                        <div className="color-details">
                                            <div className="coordinates">
                                                X: {currentColor.x} Y: {currentColor.y}
                                            </div>
                                            <div className="hsl">
                                                H: {currentColor.h}° S: {currentColor.s}% L: 50%
                                            </div>
                                            <div className="rgb">
                                                R: {currentColor.rgb.r} G: {currentColor.rgb.g} B: {currentColor.rgb.b}
                                            </div>
                                            <div className="hex">{currentColor.hex}</div>
                                        </div>
                                    </div>
                                )}
                                {showCopied && <div className="copied-notice">Copied to clipboard!</div>}
                                <footer className="footer">
                                    &copy; Made by <a href="https://github.com/Prarambha369">MrBashyal</a>
                                </footer>
                            </div>
                        );
                    };

                    export default App;