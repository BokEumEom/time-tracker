// src/components/NaturalLanguageForm.jsx
import React from 'react';
import FormGroup from './FormGroup';
import Button from '../common/Button';
import VoiceInput from './VoiceInput';
import styles from './NaturalLanguageForm.module.css';

export default function NaturalLanguageForm({ nlInput, setNlInput, onSubmit }) {
  const handleVoiceResult = (transcript) => {
    setNlInput(prevInput => prevInput ? `${prevInput}, ${transcript}` : transcript);
  };

  return (
    <>
      <VoiceInput 
        onResult={handleVoiceResult}
      />
      <FormGroup label="자연어 기록 입력" id="nlInput">
        <div className={styles.inputContainer}>
          <div className={styles.textareaWrapper}>
            <textarea
              id="nlInput"
              value={nlInput}
              onChange={(e) => setNlInput(e.target.value)}
              placeholder="예: 아침 운동, 오전 7시, 1시간, 운동, 상쾌, 공원에서 조깅하기"
              required
            />
            <small className={styles.formText}>
              형식: 제목, 시작시간, 종료시간(또는 기간), 카테고리, 감정, 설명(선택사항)
            </small>
          </div>
        </div>
      </FormGroup>
      <Button onClick={onSubmit}>추가</Button>
    </>
  );
}