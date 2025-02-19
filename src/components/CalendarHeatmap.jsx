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
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCount, setSelectedCount] = useState(0);

  // 1. 로컬스토리지에서 이벤트 데이터를 불러와 날짜별 집계
  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const counts = {};
    events.forEach((event) => {
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
    const startDate = startOfWeek(monthStart);
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

  // 3. 기록 수에 따른 배경색 결정
  function getColorForCount(count) {
    if (!count || count === 0) return '#ebedf0';
    if (count < 3) return '#c6e48b';
    if (count < 6) return '#7bc96f';
    if (count < 10) return '#239a3b';
    return '#196127';
  }

  // 날짜 셀 클릭 시 호출되는 핸들러
  function handleDayClick(day) {
    const dateStr = format(day, 'yyyy-MM-dd');
    const count = eventCounts[dateStr] || 0;
    setSelectedDate(dateStr);
    setSelectedCount(count);
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
            const dateStr = format(day, 'yyyy-MM-dd');
            const count = eventCounts[dateStr] || 0;
            return (
              <div
                key={j}
                className={styles.dayCell}
                style={{ backgroundColor: getColorForCount(count) }}
                title={`${dateStr}: ${count} event(s)`}
                onClick={() => handleDayClick(day)}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      ))}

      {/* 선택된 날짜의 상세 정보 표시 */}
      {selectedDate && (
        <div className={styles.detailPanel}>
          <h4>{selectedDate}</h4>
          <p>{selectedCount} event(s)</p>
        </div>
      )}
    </div>
  );
}

export default CalendarHeatmap;
