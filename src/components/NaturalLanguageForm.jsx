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
          placeholder="예: 운동, 2025-02-20T07:00, 2025-02-20T08:00, 운동, joy, 아침 조깅"
          required
        />
      </FormGroup>
      <Button onClick={onSubmit}>추가</Button>
    </>
  );
} 