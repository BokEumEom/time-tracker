import React, { useState } from 'react';
import FormGroup from './FormGroup';
import Button from '../common/Button';
import VoiceInput from '../components/VoiceInput'; // VoiceInput 컴포넌트 경로에 맞게 수정
import styles from './NaturalLanguageForm.module.css';

export default function NaturalLanguageForm({ nlInput, setNlInput, onSubmit }) {
  // 음성 인식 결과를 텍스트 입력란에 추가하기 위한 상태 관리
  const [isListening, setIsListening] = useState(false);

  // 음성 인식 결과를 처리하는 함수
  const handleVoiceResult = (transcript) => {
    setNlInput(prevInput => prevInput ? `${prevInput}, ${transcript}` : transcript);
  };

  return (
    <>
      <FormGroup label="자연어 기록 입력" id="nlInput">
        <div className={styles.inputContainer}>
          <div className={styles.toolbar}>
            <VoiceInput 
              onResult={handleVoiceResult}
              onListeningChange={setIsListening}
            />
          </div>
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