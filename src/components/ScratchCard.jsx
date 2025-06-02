import React, { useRef, useEffect, useState } from "react";
import "../css/ScratchCard.css";

const ScratchCard = ({ width = 450, height = 270, onScratchComplete, children }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [scratched, setScratched] = useState(false);

  const handleStart = (e) => {
    isDrawing.current = true;
    draw(e);
  };

  const handleMove = (e) => {
    if (!isDrawing.current || scratched) return;
    draw(e);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    checkScratchPercent();
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkScratchPercent = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const total = imageData.data.length / 4;
    let transparentPixels = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) transparentPixels++;
    }

    const percent = (transparentPixels / total) * 100;
    if (percent > 30) {
      setScratched(true);
      onScratchComplete?.();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#bdf1ff");
    gradient.addColorStop(1, "#fcdcf0");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  return (
    <div className="scratch-card-container" style={{ width, height }}>
      {!scratched && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="scratch-card-canvas"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      )}
      <div className="scratch-card-content">{children}</div>
    </div>
  );
};

export default ScratchCard;
