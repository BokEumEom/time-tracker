// 카테고리와 감정에 대한 키워드 매핑
const categoryKeywords = {
  exercise: ['운동', '조깅', '헬스', '요가', '수영', '러닝', '체육', '스포츠', '운동하기'],
  meal: ['식사', '밥', '먹기', '식당', '외식', '요리', '음식', '식사하기', '점심', '저녁', '아침'],
  work: ['업무', '일', '회의', '미팅', '프로젝트', '작업', '근무', '일하기'],
  study: ['공부', '학습', '강의', '수업', '독서', '공부하기', '학원', '과외'],
  leisure: ['여가', '게임', '놀기', '취미', '오락', '휴식'],
  social: ['사교', '만남', '약속', '모임', '데이트', '친구', '미팅'],
  rest: ['휴식', '쉬기', '낮잠', '휴식하기', '휴식시간'],
  hobby: ['취미', '그림', '악기', '공예', '만들기'],
  shopping: ['쇼핑', '구매', '장보기', '마트', '백화점', '쇼핑하기'],
  housework: ['가사', '집안일', '설거지', '빨래', '청소'],
  health: ['건강', '병원', '치료', '검진', '운동'],
  reading: ['독서', '책', '읽기', '도서', '독서하기'],
  music: ['음악', '노래', '연주', '공연', '콘서트'],
  photo: ['사진', '촬영', '카메라', '사진찍기'],
  travel: ['여행', '관광', '투어', '여행가기', '구경'],
  transport: ['이동', '교통', '운전', '통근', '통학'],
  call: ['통화', '전화', '콜', '연락'],
  parenting: ['육아', '아이', '돌봄', '양육'],
  movie: ['영화', '영화보기', '극장', '시네마'],
  fashion: ['패션', '옷', '쇼핑', '코디'],
  cleaning: ['청소', '정리', '정돈', '쓰레기', '분리수거']
};

const moodKeywords = {
  joy: ['기쁨', '기분좋음', '행복', '좋음', '기뻐', '신나'],
  neutral: ['보통', '평범', '그냥', '무난'],
  sad: ['슬픔', '우울', '슬퍼', '속상', '마음아픔'],
  love: ['사랑', '행복', '설렘', '좋아'],
  angry: ['분노', '화남', '짜증', '열받음', '화가남'],
  laugh: ['웃음', '재미', '즐거움', '유쾌'],
  annoyed: ['짜증', '귀찮음', '짜증남', '귀찮'],
  tired: ['피곤', '지침', '힘듦', '피곤함'],
  excited: ['신남', '설렘', '기대', '들뜸'],
  sick: ['아픔', '몸살', '질병', '아프다'],
  chill: ['여유', '평화', '편안', '느긋'],
  thinking: ['생각', '고민', '사색', '궁금'],
  flutter: ['설렘', '두근', '기대'],
  sleepy: ['졸림', '졸려', '잠오는', '나른']
};

export function findCategory(text) {
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }
  return null;
}

export function findMood(text) {
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return mood;
    }
  }
  return null;
} 