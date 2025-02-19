import React from 'react';
import styles from './SummaryCards.module.css';

function SummaryCards({ totalEvents, hours, minutes }) {
  return (
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
  );
}

export default SummaryCards;