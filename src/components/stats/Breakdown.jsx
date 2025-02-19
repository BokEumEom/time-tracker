import React from 'react';
import styles from './Breakdown.module.css';

function Breakdown({ title, items, emptyMessage }) {
  return (
    <div className={styles.breakdown}>
      <h3 className={styles.breakdownTitle}>{title}</h3>
      {Object.keys(items).length > 0 ? (
        <ul className={styles.list}>
          {Object.entries(items).map(([key, count]) => (
            <li key={key} className={styles.listItem}>
              {key}: {count}건
            </li>
          ))}
        </ul>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </div>
  );
}

export default Breakdown; 