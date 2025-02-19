// src/pages/CalendarHeatmapPage.jsx
import React from 'react';
import CalendarHeatmap from '../components/CalendarHeatmap';
import styles from './CalendarHeatmapPage.module.css';

function CalendarHeatmapPage() {
  return (
    <div className={styles.pageContainer}>
      <CalendarHeatmap />
    </div>
  );
}

export default CalendarHeatmapPage;
