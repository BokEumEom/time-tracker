// src/pages/Stats.jsx
import React, { useState, useEffect } from 'react';
import styles from './Stats.module.css';
import SummaryCards from '../components/stats/SummaryCards';
import ChartSection from '../components/stats/ChartSection';
import Breakdown from '../components/stats/Breakdown';
import BreakdownSection from '../components/stats/BreakdownSection';

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
      <SummaryCards totalEvents={totalEvents} hours={hours} minutes={minutes} />
      <ChartSection events={events} />
      <BreakdownSection>
        <Breakdown 
          title="카테고리별 기록" 
          items={categoryCounts} 
          emptyMessage="카테고리별 기록이 없습니다." 
        />
        <Breakdown 
          title="감정별 기록" 
          items={moodCounts} 
          emptyMessage="감정별 기록이 없습니다." 
        />
      </BreakdownSection>
    </div>
  );
}

export default Stats;
