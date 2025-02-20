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
  Trash2,
  Utensils,
  Landmark,
  PenSquare, // 글쓰기
  Brush,     // 미술
  Headphones,// 오디오북/팟캐스트
  Sprout,    // 정원 가꾸기
  Laptop,    // 코딩
  Calendar,  // 일정 관리
  Map,       // 탐험
  Gift,      // 선물 준비
  Wrench     // 수리
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
  { value: 'cooking', label: '요리', icon: Utensils },
  { value: 'finance', label: '재테크', icon: Landmark },
  // 추가된 카테고리
  { value: 'writing', label: '글쓰기', icon: PenSquare },
  { value: 'art', label: '미술', icon: Brush },
  { value: 'listening', label: '오디오북', icon: Headphones },
  { value: 'gardening', label: '정원', icon: Sprout },
  { value: 'coding', label: '코딩', icon: Laptop },
  { value: 'planning', label: '일정관리', icon: Calendar },
  { value: 'exploring', label: '탐험', icon: Map },
  { value: 'gifting', label: '선물준비', icon: Gift },
  { value: 'repair', label: '수리', icon: Wrench },
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