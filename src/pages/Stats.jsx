// src/pages/Stats.jsx
import React, { useState, useEffect } from 'react';
import styles from './Stats.module.css';

function Stats() {
  const [events, setEvents] = useState([]);

  // 로컬 스토리지에서 이벤트 데이터 불러오기
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  // 총 기록 수
  const totalEvents = events.length;

  // 총 활동 시간 (분 단위)
  let totalDuration = 0;
  events.forEach(event => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    totalDuration += (end - start) / (1000 * 60); // 분 단위
  });
  const hours = Math.floor(totalDuration / 60);
  const minutes = Math.round(totalDuration % 60);

  // 카테고리별 기록 집계
  const categoryCounts = events.reduce((acc, event) => {
    if (event.category) {
      acc[event.category] = (acc[event.category] || 0) + 1;
    }
    return acc;
  }, {});

  // 감정별 기록 집계
  const moodCounts = events.reduce((acc, event) => {
    if (event.mood) {
      acc[event.mood] = (acc[event.mood] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className={styles.statsContainer}>
      
      {/* 요약 카드 대시보드 */}
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>총 기록 수</h3>
          <p className={styles.cardValue}>{totalEvents}</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>총 활동 시간</h3>
          <p className={styles.cardValue}>
            {hours}시간 {minutes}분
          </p>
        </div>
      </div>
      
      {/* 차트 영역 (Placeholder) */}
      <div className={styles.chartSection}>
        <h3 className={styles.chartHeading}>활동 분포 차트</h3>
        <div className={styles.chartPlaceholder}>
          차트 영역 (Placeholder)
        </div>
      </div>
      
      {/* 상세 데이터 목록 */}
      <div className={styles.breakdownSection}>
        <div className={styles.breakdown}>
          <h3 className={styles.breakdownTitle}>카테고리별 기록</h3>
          {Object.keys(categoryCounts).length > 0 ? (
            <ul className={styles.list}>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <li key={category} className={styles.listItem}>
                  {category}: {count}건
                </li>
              ))}
            </ul>
          ) : (
            <p>카테고리별 기록이 없습니다.</p>
          )}
        </div>
        <div className={styles.breakdown}>
          <h3 className={styles.breakdownTitle}>감정별 기록</h3>
          {Object.keys(moodCounts).length > 0 ? (
            <ul className={styles.list}>
              {Object.entries(moodCounts).map(([mood, count]) => (
                <li key={mood} className={styles.listItem}>
                  {mood}: {count}건
                </li>
              ))}
            </ul>
          ) : (
            <p>감정별 기록이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stats;
