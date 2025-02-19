// src/components/CalendarHeatmap.jsx
import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  endOfWeek,
} from 'date-fns';
import styles from './CalendarHeatmap.module.css';

function CalendarHeatmap() {
  const [calendarData, setCalendarData] = useState([]);
  const [eventCounts, setEventCounts] = useState({});

  // 1. 로컬스토리지에서 이벤트 데이터를 불러와 날짜별 집계
  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const counts = {};
    events.forEach((event) => {
      // startTime은 이미 ISO 문자열 형태로 저장되어 있으므로, 
      // 단순히 날짜 부분만 추출하여 사용
      const dateStr = event.startTime.split('T')[0];
      counts[dateStr] = (counts[dateStr] || 0) + 1;
    });
    setEventCounts(counts);
  }, []);

  // 2. 현재 달의 캘린더 그리드를 생성 (날짜별 배열)
  useEffect(() => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    // 달의 시작 주의 일요일을 구합니다
    const startDate = startOfWeek(monthStart);
    // 달의 마지막 날이 포함된 주의 토요일을 구합니다
    const endDate = endOfWeek(monthEnd);

    let day = startDate;
    const calendar = [];
    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(day));
        day = addDays(day, 1);
      }
      calendar.push(week);
    }
    setCalendarData(calendar);
  }, []);

  // 3. 기록 수에 따른 배경색 결정 (GitHub 기여도 그래프 스타일)
  function getColorForCount(count) {
    if (!count || count === 0) return '#ebedf0';
    if (count < 3) return '#c6e48b';
    if (count < 6) return '#7bc96f';
    if (count < 10) return '#239a3b';
    return '#196127';
  }

  return (
    <div className={styles.calendarHeatmap}>
      {/* 요일 헤더 */}
      <div className={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>
      {/* 캘린더 그리드 */}
      {calendarData.map((week, i) => (
        <div key={i} className={styles.weekRow}>
          {week.map((day, j) => {
            // 날짜를 YYYY-MM-DD 형식으로 통일
            const dateStr = format(day, 'yyyy-MM-dd');
            const count = eventCounts[dateStr] || 0;
            return (
              <div
                key={j}
                className={styles.dayCell}
                style={{ backgroundColor: getColorForCount(count) }}
                title={`${dateStr}: ${count} event(s)`}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CalendarHeatmap;
