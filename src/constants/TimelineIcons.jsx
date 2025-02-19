import { 
  Dumbbell, UtensilsCrossed, Briefcase, GraduationCap, Gamepad2, 
  Users, Coffee, Palette, ShoppingBag, Home, Heart, Book, Music, 
  Camera, Plane, Car, Phone, Baby, Film, Shirt, Trash2,
  Smile, Meh, Frown, Angry, Laugh, Annoyed, PartyPopper, 
  BatteryWarning, Pill, Snail, Headphones, Moon, CircleHelp
} from 'lucide-react';

// 카테고리 아이콘 매핑
export const categoryIcons = {
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
export const moodIcons = {
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
export const DefaultIcon = () => <CircleHelp size={18} />;