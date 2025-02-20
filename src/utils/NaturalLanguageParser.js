// src/utils/NaturalLanguageParser.js
import { containerBootstrap } from '@nlpjs/core';
import { Nlp } from '@nlpjs/nlp';
import { LangKo } from '@nlpjs/lang-ko';
import { TimeParser } from './TimeParser';
import { InputValidator } from './InputValidator';
import { 
  categoryKeywords, 
  moodKeywords, 
  weatherKeywords, 
  findCategory, 
  findMood, 
  findWeather 
} from '../constants/KeywordMappings';

export class NaturalLanguageParser {
  constructor(shouldInitialize = false) {
    this.nlp = null;
    this.isInitialized = false;
    // 초기화가 필요한 경우에만 NLP 초기화 실행
    if (shouldInitialize) {
      this.initPromise = this.initialize();
    }
  }

  async initialize() {
    console.log('1. Starting initialization');
    const container = await containerBootstrap();
    console.log('2. Container initialized:', container);

    container.use(Nlp);
    container.use(LangKo);
    console.log('3. Modules registered (Nlp, LangKo)');

    this.nlp = container.get('nlp');
    console.log('4. NLP instance created:', this.nlp);

    // 한국어 도메인 추가 (이 부분이 중요)
    this.nlp.addLanguage('ko');
    console.log('5. Korean language registered');

    this.nlp.settings = {
      language: 'ko',
      languages: ['ko'],
      forceNER: true,
    };
    console.log('6. NLP settings applied:', this.nlp.settings);
    console.log('7. Korean language support enabled');

    this.addTrainingData();
    console.log('8. Training data added');

    await this.nlp.train();
    console.log('9. NLP training completed');

    this.isInitialized = true;
    console.log('10. Initialization finished, isInitialized:', this.isInitialized);
  }

  addTrainingData() {
    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      keywords.forEach(keyword => this.nlp.addDocument('ko', keyword, category));
    });
    Object.entries(moodKeywords).forEach(([mood, keywords]) => {
      keywords.forEach(keyword => this.nlp.addDocument('ko', keyword, `mood_${mood}`));
    });
    Object.entries(weatherKeywords).forEach(([weather, keywords]) => {
      keywords.forEach(keyword => this.nlp.addDocument('ko', keyword, `weather_${weather}`));
    });
    // 추가 예제 문장
    this.nlp.addDocument('ko', '운동을 해서 기분이 좋아', 'exercise');
    this.nlp.addDocument('ko', '비오는 날 우울하다', 'mood_sad');
    this.nlp.addDocument('ko', '맑은 날에 산책', 'weather_sunny');
    this.nlp.addDocument('ko', '공부하고 피곤하다', 'study');
    this.nlp.addDocument('ko', '친구와 만나서 행복', 'social');
  }

  async parseInput(input) {
    if (!this.isInitialized) await this.initPromise;

    // 입력을 정리하고 쉼표(,)를 기준으로 분리한 후, 각 부분의 앞뒤 공백 제거
    const cleanedInput = input.replace(/\s+/g, ' ').trim();
    const parts = cleanedInput.split(',').map(part => part.trim());

    // 최소 필드 수 확인
    if (parts.length < 6) {
      throw new Error('형식이 올바르지 않습니다. (최소: 제목, 시작시간, 종료시간(또는 기간), 카테고리, 감정, 날씨)');
    }

    // 각 필드를 추출
    const [title, startTimeStr, endTimeStr, category, mood, weather, ...descParts] = parts;
    const description = descParts.join(', ');

    // NLP를 이용하여 나머지 문장을 처리 (필요에 따라)
    const result = await this.nlp.process('ko', description);

    // 시간 파싱
    const startTime = TimeParser.parse(startTimeStr || '오전 9시');

    // 종료 시간이 기간(duration) 형식인지 확인 (예: "1시간", "30분", "2일" 등)
    const durationRegex = /(\d+)(시간|분|일)/;
    let endTime;
    if (endTimeStr && durationRegex.test(endTimeStr)) {
      const baseDate = new Date(startTime);
      endTime = TimeParser.parseDurationTime(endTimeStr, baseDate);
      if (!endTime) {
        throw new Error('올바르지 않은 기간 형식입니다.');
      }
    } else if (endTimeStr) {
      endTime = TimeParser.parse(endTimeStr);
    } else {
      endTime = TimeParser.parse(`${startTimeStr} 1시간`);
    }

    // 시간 순서 검증
    InputValidator.validateTimeOrder(startTime, endTime);

    // 카테고리, 감정, 날씨 매핑 (매핑되지 않으면 에러 발생)
    const normalizedCategory = findCategory(category);
    if (!normalizedCategory) {
      throw new Error(`올바르지 않은 카테고리입니다: ${category}`);
    }
    const normalizedMood = findMood(mood);
    if (!normalizedMood) {
      throw new Error(`올바르지 않은 감정입니다: ${mood}`);
    }
    const normalizedWeather = findWeather(weather);
    if (!normalizedWeather) {
      throw new Error(`올바르지 않은 날씨입니다: ${weather}`);
    }

    return {
      title: title || '활동',
      startTime,
      endTime,
      category: normalizedCategory,
      mood: normalizedMood,
      weather: normalizedWeather,
      description
    };
  }

  extractCategory(result) {
    const categoryIntent = result.classifications.find(c => !c.intent.startsWith('mood_') && !c.intent.startsWith('weather_'));
    return categoryIntent?.score > 0.6 ? categoryIntent.intent : findCategory(result.utterance);
  }

  extractMood(result) {
    const moodIntent = result.classifications.find(c => c.intent.startsWith('mood_'));
    return moodIntent?.score > 0.6 ? moodIntent.intent.replace('mood_', '') : findMood(result.utterance);
  }

  extractWeather(result) {
    const weatherIntent = result.classifications.find(c => c.intent.startsWith('weather_'));
    return weatherIntent?.score > 0.6 ? weatherIntent.intent.replace('weather_', '') : findWeather(result.utterance);
  }
}
