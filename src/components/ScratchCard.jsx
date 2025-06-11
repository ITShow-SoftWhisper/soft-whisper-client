import React, { useRef, useEffect, useState } from "react";
import "../css/ScratchCard.css";

const ScratchCard = ({
  width = 550,
  height = 300,
  onScratchComplete,  // 긁기 완료 시 실행되는 콜백
  children, // 긁힌 뒤에 보일 내용
}) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);  // 마우스/터치가 눌린 상태 여부
  const [scratched, setScratched] = useState(false);

  const handleStart = (e) => {
    isDrawing.current = true;
    draw(e);
  };

  const handleMove = (e) => {
    if (!isDrawing.current || scratched) return;  // 긁기 끝났으면 무시
    draw(e);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    checkScratchPercent();  // 긁힌 비율 계산
  };

  // 마우스 또는 터치 위치 기준으로 원형 긁기
  const draw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    // 마우스 또는 터치 위치 구하기
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

  // 긁힌 픽셀 비율 계산
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
      setScratched(true); // 긁기 완료 처리
      onScratchComplete?.();  // 콜백 호출
    }
  };

  // 최초 렌더링 시 → 복권 배경 그리기
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
      {/* 긁기 완료 전까지만 canvas 표시 */}
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
      {/* 항상 보여지는 긁힌 뒤 콘텐츠 */}
      <div className="scratch-card-content">{children}</div>
    </div>
  );
};

export default ScratchCard;