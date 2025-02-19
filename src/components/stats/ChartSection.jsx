import React, { useMemo } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import styles from './ChartSection.module.css';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
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

  // 카테고리 데이터
  const categoryData = useMemo(() => {
    const counts = {};
    events.forEach(event => {
      if (event.category) {
        counts[event.category] = (counts[event.category] || 0) + 1;
      }
    });
    return {
      labels: Object.keys(counts),
      datasets: [{
        label: '카테고리별 분포',
        data: Object.values(counts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    };
  }, [events]);

  // 감정 데이터
  const moodData = useMemo(() => {
    const counts = {};
    events.forEach(event => {
      if (event.mood) {
        counts[event.mood] = (counts[event.mood] || 0) + 1;
      }
    });
    return {
      labels: Object.keys(counts),
      datasets: [{
        label: '감정별 분포',
        data: Object.values(counts),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }]
    };
  }, [events]);

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className={styles.chartSection}>
      <div className={styles.chart}>
        <Bar data={data} options={options} />
      </div>
      <div className={styles.radarCharts}>
        <div className={styles.radarChart}>
          <h3>카테고리 분포</h3>
          <Radar data={categoryData} options={radarOptions} />
        </div>
        <div className={styles.radarChart}>
          <h3>감정 분포</h3>
          <Radar data={moodData} options={radarOptions} />
        </div>
      </div>
    </div>
  );
}

export default ChartSection; 