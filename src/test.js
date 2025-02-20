import { NaturalLanguageParser } from './utils/NaturalLanguageParser';

async function test() {
  console.log('Starting test...');
  const parser = new NaturalLanguageParser();
  await parser.initPromise; // 초기화 대기
  console.log('Parser initialized');
  
  const input = "운동 오전 10시 행복 맑음";
  const result = await parser.parseInput(input);
  console.log('Parsed result:', result);
}

test().catch(err => console.error('Test failed:', err));