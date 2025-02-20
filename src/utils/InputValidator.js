import { ErrorMessages } from '../constants/ErrorMessages';
import { findCategory, findMood, findWeather } from '../constants/KeywordMappings';

export class InputValidator {
  static validateInput(parts, timeMatches) {
    if (parts.length < 1 || timeMatches.length < 1) {
      throw new Error(`${ErrorMessages.INVALID_FORMAT}: 제목과 최소 하나의 시간이 필요합니다`);
    }
    const description = parts.slice(1).join(' ');
    if (!findCategory(description) || !findMood(description) || !findWeather(description)) {
      throw new Error(`${ErrorMessages.INVALID_KEYWORDS}: 카테고리, 감정, 날씨 중 하나 이상이 필요합니다`);
    }
  }

  static validateTimeOrder(startTime, endTime) {
    if (!endTime) return; // 종료 시간이 없으면 검증 생략
    if (new Date(endTime) <= new Date(startTime)) {
      throw new Error(ErrorMessages.INVALID_TIME_ORDER);
    }
  }
}