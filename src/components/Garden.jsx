// src/components/Garden.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Garden.module.css';

function Garden() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 캔버스 초기화
    ctx.clearRect(0, 0, width, height);

    // 로컬스토리지에서 이벤트 데이터 불러오기 (없으면 빈 배열)
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const now = Date.now();

    // 각 이벤트의 나이에 따라 성장 단계 결정
    // - 0 ~ 1일: seed
    // - 1 ~ 3일: sprout
    // - 3 ~ 7일: young
    // - 7일 이상: mature
    const plants = events.map((event) => {
      const ageDays = (now - event.id) / (1000 * 60 * 60 * 24);
      let stage = 'seed';
      if (ageDays < 1) stage = 'seed';
      else if (ageDays < 3) stage = 'sprout';
      else if (ageDays < 7) stage = 'young';
      else stage = 'mature';
      return { stage };
    });

    // 식물들을 그릴 그리드 구성 (예: 4열)
    const columns = 4;
    const cellWidth = width / columns;
    const cellHeight = cellWidth; // 정사각형 셀
    plants.forEach((plant, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const centerX = col * cellWidth + cellWidth / 2;
      const centerY = row * cellHeight + cellHeight / 2;
      // 식물 크기는 셀의 30%로 설정
      drawPlant(ctx, centerX, centerY, cellWidth * 0.3, plant.stage);
    });
  }, []);

  // drawPlant 함수: (x, y)는 중심 좌표, size는 크기, stage는 성장 단계
  function drawPlant(ctx, x, y, size, stage) {
    ctx.save();
    switch (stage) {
      case 'seed':
        ctx.fillStyle = '#555';
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case 'sprout':
        ctx.fillStyle = '#6b8e23';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#6b8e23';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - size * 1.5);
        ctx.stroke();
        break;
      case 'young':
        ctx.fillStyle = '#3cb371';
        ctx.beginPath();
        ctx.arc(x, y, size * 1.2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#2e8b57';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, y - size);
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y - size);
        ctx.stroke();
        break;
      case 'mature':
        ctx.fillStyle = '#32cd32';
        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, 2 * Math.PI);
        ctx.fill();
        // 꽃 모양의 페탈 그리기
        ctx.fillStyle = '#ff69b4';
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const petalX = x + Math.cos(angle) * size * 1.8;
          const petalY = y + Math.sin(angle) * size * 1.8;
          ctx.beginPath();
          ctx.arc(petalX, petalY, size * 0.5, 0, 2 * Math.PI);
          ctx.fill();
        }
        break;
      default:
        break;
    }
    ctx.restore();
  }

  return <canvas ref={canvasRef} className={styles.gardenCanvas} width={800} height={600} />;
}

export default Garden;
