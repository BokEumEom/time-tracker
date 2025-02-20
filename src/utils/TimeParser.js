import { format, add, set } from 'date-fns';

export class TimeParser {
  static TIME_KEYWORDS = {
    '오전': (hour) => hour,
    '오후': (hour) => hour + 12,
    '아침': () => 8,
    '점심': () => 12,
    '저녁': () => 18,
    '밤': () => 20,
    '새벽': () => 5,
  };

  static RELATIVE_TIME_PATTERNS = {
    '내일': (date) => add(date, { days: 1 }),
    '모레': (date) => add(date, { days: 2 }),
    '다음주': (date) => add(date, { weeks: 1 }),
    '다음달': (date) => add(date, { months: 1 }),
  };

  static DURATION_PATTERNS = {
    '시간': (hours) => ({ hours: parseInt(hours, 10) }),
    '분': (minutes) => ({ minutes: parseInt(minutes, 10) }),
    '일': (days) => ({ days: parseInt(days, 10) }),
  };

  static parse(timeStr, defaultTime = format(new Date(), "yyyy-MM-dd'T'HH:mm")) {
    const baseDate = new Date();
    
    if (timeStr.includes('T')) return timeStr;

    const parsers = [
      this.parseRelativeTime,
      this.parseTime, // 통합된 시간 파싱
      this.parseDurationTime
    ];

    for (const parser of parsers) {
      const result = parser.call(this, timeStr, baseDate);
      if (result) return result;
    }
    return defaultTime; // 기본값 반환
  }

  static parseTime(timeStr, baseDate) {
    const timeMatch = timeStr.match(/(오전|오후|아침|점심|저녁|밤|새벽)?\s*(\d{1,2})(?::(\d{2}))?(?:\s*(오전|오후))?/i);
    if (timeMatch) {
      const [_, prefix, hour, minute = '00', postfix] = timeMatch;
      let parsedHour = parseInt(hour, 10);
      const parsedMinute = parseInt(minute, 10);

      if (this.TIME_KEYWORDS[prefix]) parsedHour = this.TIME_KEYWORDS[prefix](parsedHour);
      if (postfix === '오후' && parsedHour < 12) parsedHour += 12;
      if (postfix === '오전' && parsedHour === 12) parsedHour = 0;

      return format(
        set(baseDate, { hours: parsedHour, minutes: parsedMinute, seconds: 0, milliseconds: 0 }),
        "yyyy-MM-dd'T'HH:mm"
      );
    }
    return null;
  }

  static parseRelativeTime(timeStr, baseDate) {
    for (const [pattern, modifier] of Object.entries(this.RELATIVE_TIME_PATTERNS)) {
      if (timeStr.includes(pattern)) {
        return format(modifier(baseDate), "yyyy-MM-dd'T'HH:mm");
      }
    }
    return null;
  }

  static parseDurationTime(timeStr, baseDate) {
    const durationMatch = timeStr.match(/(\d+)(시간|분|일)/);
    if (durationMatch) {
      const [, amount, unit] = durationMatch;
      return format(add(baseDate, this.DURATION_PATTERNS[unit](amount)), "yyyy-MM-dd'T'HH:mm");
    }
    return null;
  }
}