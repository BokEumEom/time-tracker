// src/components/EventForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MessageSquare } from 'lucide-react';
import FormGroup from './FormGroup';
import MoodSelector from './MoodSelector';
import styles from './EventForm.module.css';

export default function EventForm({ addEvent }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      category: '',
      startTime: '',
      endTime: '',
      description: '',
      mood: '',
    },
  });
  const [isNLMode, setIsNLMode] = useState(false);
  const [nlInput, setNlInput] = useState('');

  // 커스텀 컴포넌트(MoodSelector)를 위해 mood 필드를 react-hook-form에 등록
  useEffect(() => {
    register('mood', { required: '감정을 선택하세요.' });
  }, [register]);

  const toggleMode = () => setIsNLMode((prev) => !prev);

  const onSubmit = (data) => {
    const newEvent = { id: Date.now(), ...data };
    addEvent(newEvent);
    reset();
  };

  const handleNLSubmit = () => {
    const parts = nlInput.split(',').map((p) => p.trim());
    if (parts.length < 5) {
      alert('형식이 올바르지 않습니다. (최소: 제목, 시작시간, 종료시간, 카테고리, 감정)');
      return;
    }
    const newEvent = {
      id: Date.now(),
      title: parts[0],
      startTime: parts[1],
      endTime: parts[2],
      category: parts[3],
      mood: parts[4],
      description: parts[5] || '',
    };
    addEvent(newEvent);
    setNlInput('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.eventForm}>
      <div className={styles.toggleContainer}>
        <button type="button" onClick={toggleMode} className={styles.toggleButton}>
          <MessageSquare size={16} style={{ marginRight: '0.5rem' }} />
          {isNLMode ? '일반 입력 모드' : '자연어 입력 모드'}
        </button>
      </div>
      {isNLMode ? (
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
          <button type="button" onClick={handleNLSubmit} className={styles.submitButton}>
            추가
          </button>
        </>
      ) : (
        <>
          <FormGroup label="제목" id="title">
            <input
              id="title"
              type="text"
              {...register('title', { required: '제목을 입력하세요.' })}
              placeholder="제목을 입력하세요"
            />
            {errors.title && <span className={styles.error}>{errors.title.message}</span>}
          </FormGroup>
          <FormGroup label="카테고리" id="category">
            <input
              id="category"
              type="text"
              {...register('category', { required: '카테고리를 입력하세요.' })}
              placeholder="예: 운동, 식사 등"
            />
            {errors.category && <span className={styles.error}>{errors.category.message}</span>}
          </FormGroup>
          <FormGroup label="시작 시간" id="startTime">
            <input
              id="startTime"
              type="datetime-local"
              {...register('startTime', { required: '시작 시간을 입력하세요.' })}
            />
            {errors.startTime && <span className={styles.error}>{errors.startTime.message}</span>}
          </FormGroup>
          <FormGroup label="종료 시간" id="endTime">
            <input
              id="endTime"
              type="datetime-local"
              {...register('endTime', { required: '종료 시간을 입력하세요.' })}
            />
            {errors.endTime && <span className={styles.error}>{errors.endTime.message}</span>}
          </FormGroup>
          <FormGroup label="설명" id="description">
            <textarea
              id="description"
              {...register('description')}
              placeholder="선택 사항: 자세한 설명을 입력하세요"
            />
          </FormGroup>
          <FormGroup label="감정 선택">
            <MoodSelector
              value={watch('mood')}
              onChange={(value) => setValue('mood', value, { shouldValidate: true })}
            />
            {errors.mood && <span className={styles.error}>{errors.mood.message}</span>}
          </FormGroup>
          <button type="submit" className={styles.submitButton}>
            추가
          </button>
        </>
      )}
    </form>
  );
}
