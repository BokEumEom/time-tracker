import { parseISO, format, add, set } from 'date-fns';

const TIME_KEYWORDS = {
  '오전': (hour) => hour,
  '오후': (hour) => hour + 12,
  '아침': () => 8,
  '점심': () => 12,
  '저녁': () => 18,
  '밤': () => 20,
  '새벽': () => 5,
};

const RELATIVE_TIME_PATTERNS = {
  '내일': (date) => add(date, { days: 1 }),
  '모레': (date) => add(date, { days: 2 }),
  '다음주': (date) => add(date, { weeks: 1 }),
  '다음달': (date) => add(date, { months: 1 }),
};

const DURATION_PATTERNS = {
  '시간': (hours) => ({ hours: parseInt(hours, 10) }),
  '분': (minutes) => ({ minutes: parseInt(minutes, 10) }),
  '일': (days) => ({ days: parseInt(days, 10) }),
};

function parseKeywordTime(timeStr, baseDate) {
  for (const [keyword, converter] of Object.entries(TIME_KEYWORDS)) {
    const match = timeStr.match(new RegExp(`${keyword}\\s*(\\d+)(?:시)?`));
    if (match) {
      const [, hour] = match;
      return format(
        set(baseDate, { 
          hours: converter(parseInt(hour, 10)), 
          minutes: 0,
          seconds: 0,
          milliseconds: 0 
        }),
        "yyyy-MM-dd'T'HH:mm"
      );
    }
  }
  return null;
}

function parseRelativeTime(timeStr, baseDate) {
  for (const [pattern, modifier] of Object.entries(RELATIVE_TIME_PATTERNS)) {
    if (timeStr.includes(pattern)) {
      return format(modifier(baseDate), "yyyy-MM-dd'T'HH:mm");
    }
  }
  return null;
}

function parseDurationTime(timeStr, baseDate) {
  const durationMatch = timeStr.match(/(\d+)(시간|분|일)/);
  if (durationMatch) {
    const [, amount, unit] = durationMatch;
    return format(add(baseDate, DURATION_PATTERNS[unit](amount)), "yyyy-MM-dd'T'HH:mm");
  }
  return null;
}

function parseNumericTime(timeStr, baseDate) {
  const timeMatch = timeStr.match(/(\d{1,2}):?(\d{2})?/);
  if (timeMatch) {
    const [, hour, minute = '00'] = timeMatch;
    const parsedHour = parseInt(hour, 10);
    const parsedMinute = parseInt(minute, 10);
    
    // 24시간 형식 지원 및 오전/오후 자동 변환
    const adjustedHour = parsedHour < 24 ? 
      (parsedHour <= 12 ? 
        (timeStr.includes('오후') ? parsedHour + 12 : parsedHour) : 
        parsedHour) : 
      0;

    return format(
      set(baseDate, { 
        hours: adjustedHour,
        minutes: parsedMinute,
        seconds: 0,
        milliseconds: 0
      }),
      "yyyy-MM-dd'T'HH:mm"
    );
  }
  return null;
}

function parseTime(timeStr) {
  let baseDate = new Date();

  // ISO 형식 체크
  if (timeStr.includes('T')) {
    return timeStr;
  }

  // 상대적 날짜 처리
  let time = parseRelativeTime(timeStr, baseDate);
  if (time) return time;

  // 시간 키워드 처리
  time = parseKeywordTime(timeStr, baseDate);
  if (time) return time;

  // 숫자 시간 처리
  time = parseNumericTime(timeStr, baseDate);
  if (time) return time;

  // 기간 패턴 처리
  time = parseDurationTime(timeStr, baseDate);
  if (time) return time;

  throw new Error(`시간 형식이 올바르지 않습니다: ${timeStr}`);
}

export function parseNaturalLanguageInput(input) {
  const parts = input.split(',').map(p => p.trim());
  if (parts.length < 5) {
    throw new Error('형식이 올바르지 않습니다. (최소: 제목, 시작시간, 종료시간, 카테고리, 감정)');
  }

  const [title, startTimeStr, endTimeStr, category, mood, description = ''] = parts;

  const startTime = parseTime(startTimeStr);
  let endTime;

  // 종료 시간이 duration 형식인 경우
  const isDuration = Object.keys(DURATION_PATTERNS).some(pattern => endTimeStr.includes(pattern));
  if (isDuration) {
    const baseDate = parseISO(startTime);
    endTime = parseDurationTime(endTimeStr, baseDate);
    if (!endTime) {
      throw new Error('올바르지 않은 기간 형식입니다.');
    }
  } else {
    endTime = parseTime(endTimeStr);
  }

  // 시간 순서 검사
  if (new Date(endTime) < new Date(startTime)) {
    throw new Error('종료 시간은 시작 시간 이후여야 합니다.');
  }

  return {
    title,
    startTime,
    endTime,
    category,
    mood,
    description
  };
}