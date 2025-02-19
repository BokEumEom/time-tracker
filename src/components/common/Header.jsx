// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CassetteTape, PieChart, CalendarDays } from 'lucide-react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>시간 기록 타임라인</h1>
        <div className={styles.timelineIndicator}>
          <div className={styles.timelineDot} />
          <div className={styles.timelineLine} />
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            <CassetteTape size={20} className={styles.navIcon} />
            <span>오늘 기록</span>
          </Link>
          <Link to="/stats" className={styles.navLink}>
            <PieChart size={20} className={styles.navIcon} />
            <span>통계</span>
          </Link>
          <Link to="/calendar" className={styles.navLink}>
            <CalendarDays size={20} className={styles.navIcon} />
            <span>히트맵</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
