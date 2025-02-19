import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import styles from './SummaryCards.module.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function SummaryCards({ 
  totalEvents = 0, 
  hours = 0, 
  minutes = 0, 
  weeklyData = [0, 0, 0, 0, 0, 0, 0], 
  categoryData = [],
  moodData = []  // 새로운 prop 추가
}) {
  const doughnutOptions = {  // 공통 Doughnut 차트 옵션
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const eventsData = {
    datasets: [{
      data: [totalEvents, Math.max(100 - totalEvents, 0)],
      backgroundColor: ['#0088FE', '#00C49F'],
      borderWidth: 0
    }]
  };

  const timeData = {
    datasets: [{
      data: [hours, minutes / 60],
      backgroundColor: ['#0088FE', '#00C49F'],
      borderWidth: 0
    }]
  };

  const weeklyChartData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [{
      label: '일별 활동',
      data: weeklyData,
      backgroundColor: '#0088FE',
      borderColor: '#0088FE',
    }]
  };

  const categoryChartData = {
    labels: categoryData?.map(item => item.name) || [],
    datasets: [{
      data: categoryData?.map(item => item.value) || [],
      backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    }]
  };

  const moodChartData = {
    labels: moodData?.map(item => item.name) || [],
    datasets: [{
      data: moodData?.map(item => item.value) || [],
      backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    }]
  };

  return (
    <div className={styles.summaryCards}>
      <div className={styles.mainCards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>총 기록 수</h3>
          <div className={styles.chartContainer}>
            <Doughnut data={eventsData} options={doughnutOptions} />
            <p className={styles.cardValue}>{totalEvents}</p>
          </div>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>총 활동 시간</h3>
          <div className={styles.chartContainer}>
            <Doughnut data={timeData} options={doughnutOptions} />
            <p className={styles.cardValue}>
              {hours}시간 {minutes}분
            </p>
          </div>
        </div>
      </div>
      <div className={styles.chartCards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>주간 활동 추이</h3>
          <div className={styles.chartContainer}>
            <Line 
              data={weeklyChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards; 