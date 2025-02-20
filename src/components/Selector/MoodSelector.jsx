import React from 'react';
import { 
  Smile, 
  Meh, 
  Frown, 
  Heart, 
  Angry, 
  Laugh, 
  Annoyed, 
  Coffee, 
  PartyPopper, 
  BatteryWarning, 
  Pill, 
  Snail, 
  Headphones, 
  Moon,
  PersonStanding,
  EyeClosed,   // 우울
  Sparkles,    // 희망
  AlertCircle, // 불안
  Siren,        // 혼란
  HeartHandshake,          // 따뜻함
} from 'lucide-react';
import styles from './MoodSelector.module.css';

const DEFAULT_ICON_SIZE = 16;

const createMoods = (iconSize = DEFAULT_ICON_SIZE) => [
  { value: 'joy', label: '기쁨', icon: <Smile size={iconSize} /> },
  { value: 'neutral', label: '보통', icon: <Meh size={iconSize} /> },
  { value: 'sad', label: '슬픔', icon: <Frown size={iconSize} /> },
  { value: 'love', label: '사랑', icon: <Heart size={iconSize} /> },
  { value: 'angry', label: '분노', icon: <Angry size={iconSize} /> },
  { value: 'laugh', label: '웃음', icon: <Laugh size={iconSize} /> },
  { value: 'annoyed', label: '짜증', icon: <Annoyed size={iconSize} /> },
  { value: 'tired', label: '피곤', icon: <BatteryWarning size={iconSize} /> },
  { value: 'excited', label: '신남', icon: <PartyPopper size={iconSize} /> },
  { value: 'sick', label: '아픔', icon: <Pill size={iconSize} /> },
  { value: 'chill', label: '여유', icon: <Coffee size={iconSize} /> },
  { value: 'thinking', label: '생각', icon: <Snail size={iconSize} /> },
  { value: 'flutter', label: '설렘', icon: <Headphones size={iconSize} /> },
  { value: 'sleepy', label: '졸림', icon: <Moon size={iconSize} /> },
  // 추가된 감정
  { value: 'depressed', label: '우울', icon: <EyeClosed size={iconSize} /> },
  { value: 'hopeful', label: '희망', icon: <Sparkles size={iconSize} /> },
  { value: 'anxious', label: '불안', icon: <AlertCircle size={iconSize} /> },
  { value: 'confused', label: '혼란', icon: <Siren size={iconSize} /> },
  { value: 'warm', label: '따뜻함', icon: <HeartHandshake size={iconSize} /> },
  { value: 'energetic', label: '활기', icon: <PersonStanding size={iconSize} /> },
];

export default function MoodSelector({ value, onChange, iconSize = DEFAULT_ICON_SIZE }) {
  const moods = createMoods(iconSize);
  
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