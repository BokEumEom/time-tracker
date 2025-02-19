import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './ChartSection.module.css';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartSection({ events }) {
  // 시간대별 활동 분포 계산
  const hourlyDistribution = useMemo(() => {
    const distribution = new Array(24).fill(0);
    events.forEach(event => {
      const hour = new Date(event.startTime).getHours();
      distribution[hour]++;
    });
    return distribution;
  }, [events]);

  // 카테고리별 시간 투자 계산
  const categoryDuration = useMemo(() => {
    const duration = {};
    events.forEach(event => {
      if (event.category) {
        const start = new Date(event.startTime);
        const end = new Date(event.endTime);
        const minutes = (end - start) / (1000 * 60);
        duration[event.category] = (duration[event.category] || 0) + minutes;
      }
    });
    return duration;
  }, [events]);

  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}시`),
    datasets: [
      {
        label: '시간대별 활동',
        data: hourlyDistribution,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '시간대별 활동 분포',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '활동 수',
        },
      },
    },
  };

  return (
    <div className={styles.chartSection}>
      <h3 className={styles.chartHeading}>활동 분포 차트</h3>
      <div className={styles.chart}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartSection; 