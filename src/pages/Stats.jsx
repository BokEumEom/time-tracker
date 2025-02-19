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

  // 기본 통계 계산
  const totalEvents = events.length;
  let totalDuration = 0;
  events.forEach(event => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    totalDuration += (end - start) / (1000 * 60);
  });
  const hours = Math.floor(totalDuration / 60);
  const minutes = Math.round(totalDuration % 60);

  // 주간 활동 데이터 계산
  const weeklyData = Array(7).fill(0);
  events.forEach(event => {
    const day = new Date(event.startTime).getDay();
    const adjustedDay = day === 0 ? 6 : day - 1; // 월요일부터 시작하도록 조정
    weeklyData[adjustedDay]++;
  });

  // 카테고리 데이터 포맷팅
  const categoryCounts = events.reduce((acc, event) => {
    if (event.category) {
      acc[event.category] = (acc[event.category] || 0) + 1;
    }
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value
  }));

  // 감정별 기록 집계
  const moodCounts = events.reduce((acc, event) => {
    if (event.mood) {
      acc[event.mood] = (acc[event.mood] || 0) + 1;
    }
    return acc;
  }, {});

  // 감정별 기록 데이터 포맷팅
  const moodData = Object.entries(moodCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className={styles.statsContainer}>
      <SummaryCards 
        totalEvents={totalEvents} 
        hours={hours} 
        minutes={minutes}
        weeklyData={weeklyData}
        categoryData={categoryData}
        moodData={moodData}
      />
      <div className={styles.chartBreakdownContainer}>
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
    </div>
  );
}

export default Stats;
