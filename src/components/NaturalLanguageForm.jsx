import React from 'react';
import FormGroup from './FormGroup';
import Button from './Button';

export default function NaturalLanguageForm({ nlInput, setNlInput, onSubmit }) {
  return (
    <>
      <FormGroup label="자연어 기록 입력" id="nlInput">
        <textarea
          id="nlInput"
          value={nlInput}
          onChange={(e) => setNlInput(e.target.value)}
          placeholder="예: 아침 운동, 오전 7시, 1시간, 운동, 상쾌, 공원에서 조깅하기"
          required
        />
        <small className="form-text text-muted">
          형식: 제목, 시작시간, 종료시간(또는 기간), 카테고리, 감정, 설명(선택사항)
        </small>
      </FormGroup>
      <Button onClick={onSubmit}>추가</Button>
    </>
  );
} 