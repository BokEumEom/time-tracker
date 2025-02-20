// src/pages/CalendarHeatmapPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import CalendarHeatmap from '../components/CalendarHeatmap';
import styles from './CalendarHeatmapPage.module.css';

function CalendarHeatmapPage() {
  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <CalendarHeatmap />
    </motion.div>
  );
}

export default CalendarHeatmapPage;
