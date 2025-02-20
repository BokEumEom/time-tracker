// src/utils/KeywordUtils.js

/**
 * 단어 경계를 고려한 정규식 생성 함수
 * 한글도 포함하여 (^|\s)와 (\s|$)를 이용합니다.
 */
export function createKeywordRegex(keywords) {
  return new RegExp(`(^|\\s)(${keywords.join('|')})(\\s|$)`, 'i');
}

/**
 * 두 문자열 간의 Levenshtein 거리를 계산하는 함수
 */
export function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[b.length][a.length];
}

/**
 * 유사한 키워드를 찾아 최대 maxSuggestions 개 추천하는 함수
 */
export function findSimilarKeywords(input, keywordMap, maxSuggestions = 3) {
  if (!input) return [];
  const allKeywords = Object.entries(keywordMap).flatMap(([category, keywords]) =>
    keywords.map(keyword => ({ category, keyword }))
  );
  const inputLower = input.toLowerCase();

  const suggestions = allKeywords
    .map(item => {
      const keywordLower = item.keyword.toLowerCase();
      const distance = levenshteinDistance(inputLower, keywordLower);
      const exactMatch = keywordLower === inputLower;
      const startsWith =
        keywordLower.startsWith(inputLower) || inputLower.startsWith(keywordLower);
      const contains =
        keywordLower.includes(inputLower) || inputLower.includes(keywordLower);

      return {
        ...item,
        distance,
        score: exactMatch ? 0 : startsWith ? 1 : contains ? 2 : distance,
      };
    })
    .filter(item => item.score < 999)
    .sort(
      (a, b) =>
        a.score - b.score ||
        a.distance - b.distance ||
        a.keyword.length - b.keyword.length
    )
    .slice(0, maxSuggestions);

  return suggestions;
}

/**
 * 입력값과 가장 유사한 키워드를 찾아 반환하는 함수
 */
export function findMatch(input, keywordMap, type) {
  if (!input) return null;
  
  const inputLower = input.toLowerCase().trim();
  
  // 정확한 매칭 검사
  for (const [category, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => keyword.toLowerCase() === inputLower)) {
      return category;
    }
  }

  // 유사한 키워드 찾기
  const suggestions = findSimilarKeywords(input, keywordMap, 3);
  
  if (suggestions.length > 0) {
    const errorMsg = `올바르지 않은 ${type}입니다: ${input}\n추천: ${suggestions.map(s => s.keyword).join(', ')}`;
    const error = new Error(errorMsg);
    error.suggestions = suggestions;
    throw error;
  }

  const error = new Error(`올바르지 않은 ${type}입니다: ${input}\n유사한 ${type}를 찾을 수 없습니다.`);
  error.suggestions = [];
  throw error;
}
