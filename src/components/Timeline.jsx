// src/components/Timeline.jsx
import React from 'react';
import { Clock } from 'lucide-react';
import styles from './Timeline.module.css';

export default function Timeline({ events }) {
  // 시작 시간 기준으로 정렬
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <div className={styles.timeline}>
      <h2>기록 타임라인</h2>
      {sortedEvents.length === 0 ? (
        <p>기록이 없습니다. 새 기록을 추가해보세요.</p>
      ) : (
        <ul className={styles.eventList}>
          {sortedEvents.map((event) => (
            <li key={event.id} className={styles.eventItem}>
              <div className={styles.eventHeader}>
                <strong>{event.title}</strong>
                {event.mood && <span className={styles.eventMood}>{event.mood}</span>}
              </div>
              <small>{event.category}</small>
              <br />
              <span className={styles.eventTime}>
                <Clock size={16} className={styles.clockIcon} />{' '}
                {new Date(event.startTime).toLocaleTimeString()} ~{' '}
                {new Date(event.endTime).toLocaleTimeString()}
              </span>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
