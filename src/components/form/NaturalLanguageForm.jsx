import React, { useState } from 'react';
import FormGroup from './FormGroup';
import Button from '../common/Button';
import VoiceInput from './VoiceInput';
import { NaturalLanguageParser } from '../../utils/NaturalLanguageParser';
import styles from './NaturalLanguageForm.module.css';

export default function NaturalLanguageForm({ nlInput, setNlInput, onSubmit }) {
  const [error, setError] = useState('');
  const parser = new NaturalLanguageParser();

  const handleVoiceResult = async (transcript) => {
    await parser.initPromise;
    try {
      const result = await parser.parseInput(transcript);
      setNlInput(`${result.title} ${result.startTime} ${result.endTime} ${result.category} ${result.mood} ${result.weather} ${result.description}`);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const validateInput = async (input) => {
    try {
      await parser.initPromise;
      await parser.parseInput(input);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <VoiceInput onResult={handleVoiceResult} />
      <FormGroup label="자연어 기록 입력" id="nlInput">
        <div className={styles.inputContainer}>
          <div className={styles.textareaWrapper}>
            <textarea
              id="nlInput"
              value={nlInput}
              onChange={(e) => {
                setNlInput(e.target.value);
                validateInput(e.target.value);
              }}
              placeholder="예: 아침,운동,오전 7시,오후 8시,운동,상쾌,맑음"
              required
            />
            <small className={styles.formText}>
              형식: 제목,시작시간,[종료시간],카테고리,감정,날씨, (설명 선택)
            </small>
            {error && <span className={styles.error}>{error}</span>}
          </div>
        </div>
      </FormGroup>
      <Button onClick={onSubmit} disabled={!!error}>추가</Button>
    </>
  );
}