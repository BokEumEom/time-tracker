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
    <div className={styles.timelineContainer}>
      {/* 수직 타임라인 선 */}
      <div className={styles.timelineLine}></div>
      {sortedEvents.map((event) => (
        <div key={event.id} className={styles.timelineItem}>
          <div className={styles.iconWrapper}>
            <Clock size={18} />
          </div>
          <div className={styles.content}>
            <div className={styles.time}>
              {new Date(event.startTime).toLocaleTimeString()} -{' '}
              {new Date(event.endTime).toLocaleTimeString()}
            </div>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.category}>{event.category}</div>
            {event.description && (
              <div className={styles.description}>{event.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
