// src/components/Timeline.jsx
import React from 'react';
import styles from './Timeline.module.css';
// CategorySelector에서 사용하는 아이콘들 import
import { 
  Dumbbell, UtensilsCrossed, Briefcase, GraduationCap, Gamepad2, 
  Users, Coffee, Palette, ShoppingBag, Home, Heart, Book, Music, 
  Camera, Plane, Car, Phone, Baby, Film, Shirt, Trash2,
  // MoodSelector에서 사용하는 아이콘들
  Smile, Meh, Frown, Angry, Laugh, Annoyed, PartyPopper, 
  BatteryWarning, Pill, Snail, Headphones, Moon
} from 'lucide-react';

// 카테고리 아이콘 매핑
const categoryIcons = {
  exercise: Dumbbell,
  meal: UtensilsCrossed,
  work: Briefcase,
  study: GraduationCap,
  leisure: Gamepad2,
  social: Users,
  rest: Coffee,
  hobby: Palette,
  shopping: ShoppingBag,
  housework: Home,
  health: Heart,
  reading: Book,
  music: Music,
  photo: Camera,
  travel: Plane,
  transport: Car,
  call: Phone,
  parenting: Baby,
  movie: Film,
  fashion: Shirt,
  cleaning: Trash2,
};

// 감정 아이콘 매핑
const moodIcons = {
  joy: Smile,
  neutral: Meh,
  sad: Frown,
  love: Heart,
  angry: Angry,
  laugh: Laugh,
  annoyed: Annoyed,
  tired: BatteryWarning,
  excited: PartyPopper,
  sick: Pill,
  chill: Coffee,
  thinking: Snail,
  flutter: Headphones,
  sleepy: Moon,
};

export default function Timeline({ events }) {
  // 시작 시간 기준으로 정렬
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <div className={styles.timelineContainer}>
      {/* 수직 타임라인 선 */}
      <div className={styles.timelineLine}></div>
      {sortedEvents.map((event) => (
        <div key={event.id} className={styles.timelineItem}>
          <div className={styles.content}>
            <div className={styles.mainLine}>
              <div className={styles.time}>
                {new Date(event.startTime).toLocaleTimeString()} -{' '}
                {new Date(event.endTime).toLocaleTimeString()}
              </div>
              <div className={styles.title}>{event.title}</div>
              <div className={styles.category}>
                {event.category && categoryIcons[event.category] && 
                  React.createElement(categoryIcons[event.category], { size: 18 })}
              </div>
              {event.mood && (
                <div className={styles.mood}>
                  {moodIcons[event.mood] && 
                    React.createElement(moodIcons[event.mood], { size: 18 })}
                </div>
              )}
            </div>
            {event.description && (
              <div className={styles.description}>{event.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
