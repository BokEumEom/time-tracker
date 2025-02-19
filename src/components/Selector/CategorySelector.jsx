import React from 'react';
import styles from './CategorySelector.module.css';
import { 
  Dumbbell, 
  UtensilsCrossed, 
  Briefcase, 
  GraduationCap, 
  Gamepad2, 
  Users, 
  Coffee,
  Palette,
  ShoppingBag,
  Home,
  Heart,
  Book,
  Music,
  Camera,
  Plane,
  Car,
  Phone,
  Baby,
  Film,
  Shirt,
  Trash2
} from 'lucide-react';

const categories = [
  { value: 'exercise', label: '운동', icon: Dumbbell },
  { value: 'meal', label: '식사', icon: UtensilsCrossed },
  { value: 'work', label: '업무', icon: Briefcase },
  { value: 'study', label: '공부', icon: GraduationCap },
  { value: 'leisure', label: '여가', icon: Gamepad2 },
  { value: 'social', label: '사교', icon: Users },
  { value: 'rest', label: '휴식', icon: Coffee },
  { value: 'hobby', label: '취미', icon: Palette },
  { value: 'shopping', label: '쇼핑', icon: ShoppingBag },
  { value: 'housework', label: '가사', icon: Home },
  { value: 'health', label: '건강', icon: Heart },
  { value: 'reading', label: '독서', icon: Book },
  { value: 'music', label: '음악', icon: Music },
  { value: 'photo', label: '사진', icon: Camera },
  { value: 'travel', label: '여행', icon: Plane },
  { value: 'transport', label: '이동', icon: Car },
  { value: 'call', label: '통화', icon: Phone },
  { value: 'parenting', label: '육아', icon: Baby },
  { value: 'movie', label: '영화', icon: Film },
  { value: 'fashion', label: '패션', icon: Shirt },
  { value: 'cleaning', label: '청소', icon: Trash2 },
];

export default function CategorySelector({ value, onChange }) {
  return (
    <div className={styles.categorySelector}>
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          className={`${styles.categoryButton} ${value === category.value ? styles.selected : ''}`}
          onClick={() => onChange(category.value)}
          title={category.label}
        >
          {React.createElement(category.icon, { size: 16 })}
          <span className={styles.categoryLabel}>{category.label}</span>
        </button>
      ))}
    </div>
  );
} 