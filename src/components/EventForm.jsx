// src/components/EventForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import FormGroup from './FormGroup';
import MoodSelector from './MoodSelector';
import CategorySelector from './CategorySelector';
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

  // 커스텀 컴포넌트들을 위한 등록
  useEffect(() => {
    register('mood', { required: '감정을 선택하세요.' });
    register('category', { required: '카테고리를 선택하세요.' });
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

  // 공통 입력 필드 설정
  const inputFields = [
    { id: 'title', label: '제목', type: 'text', placeholder: '제목을 입력하세요' },
    { id: 'startTime', label: '시작 시간', type: 'datetime-local' },
    { id: 'endTime', label: '종료 시간', type: 'datetime-local' },
    { id: 'description', label: '설명', type: 'textarea', placeholder: '선택 사항: 자세한 설명을 입력하세요', required: false },
  ];

  const renderFormField = ({ id, label, type, placeholder, required = true }) => (
    <FormGroup key={id} label={label} id={id}>
      {type === 'textarea' ? (
        <textarea
          id={id}
          {...register(id, required && { required: `${label}을(를) 입력하세요.` })}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...register(id, required && { required: `${label}을(를) 입력하세요.` })}
          placeholder={placeholder}
        />
      )}
      {errors[id] && <span className={styles.error}>{errors[id].message}</span>}
    </FormGroup>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.eventForm}>
      <div className={styles.toggleContainer}>
        <button type="button" onClick={toggleMode} className={styles.toggleButton}>
          <Pencil size={16} style={{ marginRight: '0.5rem' }} />
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
          {inputFields.map(renderFormField)}
          <FormGroup label="카테고리">
            <CategorySelector
              value={watch('category')}
              onChange={(value) => setValue('category', value, { shouldValidate: true })}
            />
            {errors.category && <span className={styles.error}>{errors.category.message}</span>}
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
