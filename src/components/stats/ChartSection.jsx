import React, { useMemo } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
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
  ArcElement,
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

  // 감정 분포 계산
  const moodCounts = useMemo(() => {
    const counts = {};
    events.forEach(event => {
      if (event.mood) {
        counts[event.mood] = (counts[event.mood] || 0) + 1;
      }
    });
    return counts;
  }, [events]);

  const barData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}시`),
    datasets: [
      {
        label: '시간대별 활동',
        data: hourlyDistribution,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const barOptions = {
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

  const pieData = {
    labels: Object.keys(categoryDuration),
    datasets: [
      {
        data: Object.values(categoryDuration),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: '카테고리별 시간 투자',
      },
    },
  };

  const moodData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        data: Object.values(moodCounts),
        backgroundColor: ['#90EE90', '#FF6347', '#4169E1', '#FFD700', '#DDA0DD'],
      },
    ],
  };

  const moodOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: '감정 분포',
      },
    },
  };

  return (
    <div className={styles.chartSection}>
      <div className={styles.chartColumn}>
        <div className={styles.chart}>
          <Bar data={barData} options={barOptions} aria-label="Hourly Activity Distribution" />
        </div>
      </div>
      <div className={styles.chartColumn}>
        <div className={styles.pieChartsContainer}>
          <div className={styles.chart}>
            <Pie data={pieData} options={pieOptions} aria-label="Category Time Investment" />
          </div>
          <div className={styles.chart}>
            <Pie data={moodData} options={moodOptions} aria-label="Mood Distribution" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartSection;
