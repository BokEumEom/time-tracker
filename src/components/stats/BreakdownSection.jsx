import React from 'react';
import styles from './BreakdownSection.module.css';

function BreakdownSection({ children }) {
  return <div className={styles.breakdownSection}>{children}</div>;
}

export default BreakdownSection; 