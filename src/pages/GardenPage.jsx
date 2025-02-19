// src/pages/GardenPage.jsx
import React from 'react';
import Garden from '../components/Garden';
import styles from './GardenPage.module.css';

function GardenPage() {
  return (
    <div className={styles.gardenPage}>
      <h2 className={styles.heading}>나의 가상 정원</h2>
      <Garden />
    </div>
  );
}

export default GardenPage;
