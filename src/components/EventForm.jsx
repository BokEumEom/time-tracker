// src/components/EventForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil } from 'lucide-react';
import FormGroup from './FormGroup';
import MoodSelector from './MoodSelector';
import CategorySelector from './CategorySelector';
import styles from './EventForm.module.css';
import { parseNaturalLanguageInput } from '../utils/naturalLanguageParser';

export default function EventForm({ addEvent }) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    watch, 
    formState: { errors } 
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

  useEffect(() => {
    register('mood', { required: '감정을 선택하세요.' });
    register('category', { required: '카테고리를 선택하세요.' });
    register('startTime', {
      required: '시작 시간을 입력하세요.',
      validate: (value) => {
        const endTime = watch('endTime');
        return endTime && new Date(value) < new Date(endTime) || '시작 시간이 종료 시간보다 앞서야 합니다.';
      }
    });
    register('endTime', {
      required: '종료 시간을 입력하세요.',
      validate: (value) => {
        const startTime = watch('startTime');
        return startTime && new Date(value) > new Date(startTime) || '종료 시간이 시작 시간보다 뒤에 있어야 합니다.';
      }
    });
  }, [register, watch]);

  const toggleMode = () => setIsNLMode((prev) => !prev);

  const onSubmit = (data) => {
    addEvent({ id: Date.now(), ...data });
    reset();
    alert('이벤트가 성공적으로 추가되었습니다!'); // Example of user feedback
  };

  const handleNLSubmit = () => {
    try {
      const newEvent = parseNaturalLanguageInput(nlInput);
      addEvent({ id: Date.now(), ...newEvent });
      setNlInput('');
      alert('이벤트가 성공적으로 추가되었습니다!');
    } catch (error) {
      alert(error.message);
    }
  };

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
          aria-invalid={errors[id] ? "true" : "false"}
          aria-describedby={`${id}-error`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...register(id, required && { required: `${label}을(를) 입력하세요.` })}
          aria-invalid={errors[id] ? "true" : "false"}
          aria-describedby={`${id}-error`}
          placeholder={placeholder}
        />
      )}
      {errors[id] && <span id={`${id}-error`} className={styles.error}>{errors[id].message}</span>}
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
            {errors.category && <span id="category-error" className={styles.error}>{errors.category.message}</span>}
          </FormGroup>
          <FormGroup label="감정 선택">
            <MoodSelector
              value={watch('mood')}
              onChange={(value) => setValue('mood', value, { shouldValidate: true })}
            />
            {errors.mood && <span id="mood-error" className={styles.error}>{errors.mood.message}</span>}
          </FormGroup>
          <button type="submit" className={styles.submitButton}>
            추가
          </button>
        </>
      )}
    </form>
  );
}