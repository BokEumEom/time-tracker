// src/components/MoodSelector.jsx
import React from 'react';
import { Smile, Laugh, Frown } from 'lucide-react';
import styles from './MoodSelector.module.css';

const moods = [
  { value: 'joy', label: '기쁨', icon: <Smile size={24} /> },
  { value: 'neutral', label: '보통', icon: <Laugh size={24} /> },
  { value: 'sad', label: '슬픔', icon: <Frown size={24} /> },
];

export default function MoodSelector({ value, onChange }) {
  return (
    <div className={styles.moodSelector}>
      {moods.map((mood) => (
        <label key={mood.value} className={styles.moodOption} title={mood.label}>
          <input
            type="radio"
            name="mood"
            value={mood.value}
            checked={value === mood.value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.radioInput}
            aria-label={mood.label}
          />
          <div className={styles.iconWrapper}>
            {mood.icon}
          </div>
          <span className={styles.label}>{mood.label}</span>
        </label>
      ))}
    </div>
  );
}
