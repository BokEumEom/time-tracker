import React from 'react';
import styles from './Timeline.module.css';
import { 
  Dumbbell, UtensilsCrossed, Briefcase, GraduationCap, Gamepad2, 
  Users, Coffee, Palette, ShoppingBag, Home, Heart, Book, Music, 
  Camera, Plane, Car, Phone, Baby, Film, Shirt, Trash2,
  Smile, Meh, Frown, Angry, Laugh, Annoyed, PartyPopper, 
  BatteryWarning, Pill, Snail, Headphones, Moon
} from 'lucide-react';
import { format } from 'date-fns';

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

// 기본 아이콘
const DefaultIcon = () => <div className={styles.defaultIcon}>❓</div>;

export default function Timeline({ events }) {
  // 설명 토글 상태 관리
  const [expandedIds, setExpandedIds] = React.useState(new Set());

  // 설명 토글 핸들러
  const toggleDescription = (id) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 시작 시간 기준으로 정렬
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <div className={styles.timelineContainer}>
      {/* 수직 타임라인 선 */}
      <div className={styles.timelineLine}></div>
      {sortedEvents.map((event) => (
        <div 
          key={event.id} 
          className={styles.timelineItem}
          onClick={() => toggleDescription(event.id)}
        >
          <div className={`${styles.content} ${expandedIds.has(event.id) ? styles.expanded : ''}`}>
            <div className={styles.mainLine}>
              <div className={styles.time}>
                {format(new Date(event.startTime), 'HH:mm')} - 
                {format(new Date(event.endTime), 'HH:mm')}
              </div>
              <div className={styles.title}>{event.title}</div>
              <div className={styles.category}>
                {event.category && 
                  (categoryIcons[event.category] ? 
                    React.createElement(categoryIcons[event.category], { size: 18, 'aria-label': event.category }) : 
                    <DefaultIcon aria-label="Unknown Category" />)}
              </div>
              {event.mood && (
                <div className={styles.mood}>
                  {moodIcons[event.mood] ? 
                    React.createElement(moodIcons[event.mood], { size: 18, 'aria-label': event.mood }) : 
                    <DefaultIcon aria-label="Unknown Mood" />}
                </div>
              )}
            </div>
            {event.description && (
              <div className={`${styles.description} ${expandedIds.has(event.id) ? styles.expanded : ''}`}>
                {event.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}