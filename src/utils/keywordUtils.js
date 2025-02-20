// 단어 경계를 고려한 정규식 생성 함수
export function createKeywordRegex(keywords) {
  return new RegExp(`(^|\\s)(${keywords.join('|')})(\\s|$)`, 'i');
}

// 유사도 계산을 위한 레벤슈타인 거리 함수
export function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // 삽입
        matrix[j - 1][i] + 1, // 삭제
        matrix[j - 1][i - 1] + indicator // 치환
      );
    }
  }

  return matrix[b.length][a.length];
}

// 유사한 키워드 찾기
export function findSimilarKeywords(input, keywordMap, maxSuggestions = 3) {
  if (!input) return [];

  const allKeywords = Object.entries(keywordMap).flatMap(([category, keywords]) =>
    keywords.map(keyword => ({ category, keyword }))
  );

  const suggestions = allKeywords
    .map(item => ({
      ...item,
      distance: levenshteinDistance(input.toLowerCase(), item.keyword.toLowerCase())
    }))
    .filter(item =>
      item.distance <= 3 ||
      item.keyword.toLowerCase().includes(input.toLowerCase()) ||
      input.toLowerCase().includes(item.keyword.toLowerCase())
    )
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxSuggestions);

  return suggestions;
}

// 공통 매핑 함수
export function findMatch(text, keywordMap, type) {
  if (!text) {
    throw new Error(`${type}을(를) 입력해주세요`);
  }

  const match = Object.entries(keywordMap).find(([_, keywords]) =>
    createKeywordRegex(keywords).test(text)
  );

  if (match) return match[0];

  const suggestions = findSimilarKeywords(text, keywordMap);
  const suggestionText = suggestions.length > 0
    ? `추천 키워드: ${suggestions.map(s => `'${s.keyword}'`).join(', ')}`
    : '추천 키워드 없음';

  throw new Error(`입력한 ${type} '${text}'이(가) 올바르지 않습니다.\n${suggestionText}`);
}