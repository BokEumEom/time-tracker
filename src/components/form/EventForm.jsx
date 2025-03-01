// src/components/form/EventForm.jsx (일부)
import React, { useMemo, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FormGroup from './FormGroup';
import NaturalLanguageForm from './NaturalLanguageForm';
import StandardForm from './StandardForm';
import { NaturalLanguageParser } from '../../utils/NaturalLanguageParser';
import { useEventForm } from '../../hooks/useEventForm';
import styles from './EventForm.module.css';

export default function EventForm({ addEvent }) {
  const {
    isNLMode,
    nlInput,
    setNlInput,
    toggleMode,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    registerFields,
  } = useEventForm(addEvent);

  // isNLMode가 true일 때만 NLP 초기화를 수행하도록 useMemo를 사용
  const parser = useMemo(() => {
    return isNLMode ? new NaturalLanguageParser(true) : null;
  }, [isNLMode]);

  useEffect(() => {
    registerFields();
    if (isNLMode && parser) {
      parser.initPromise.catch(err => console.error('NLP 초기화 실패:', err));
    }
  }, [registerFields, isNLMode, parser]);

  const onSubmit = (data) => {
    addEvent({ id: Date.now(), ...data });
    reset();
    alert('이벤트가 성공적으로 추가되었습니다!');
  };

  const handleNLSubmit = async () => {
    if (!parser) return;
    try {
      await parser.initPromise; // NLP 초기화 대기
      const newEvent = await parser.parseInput(nlInput);
      console.log('Parsed Event:', newEvent);
      addEvent({ id: Date.now(), ...newEvent });
      setNlInput('');
      alert('이벤트가 성공적으로 추가되었습니다!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVoiceResult = (transcript) => {
    setNlInput(transcript);
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
      <AnimatePresence mode="wait">
        <motion.div
          key={isNLMode ? 'nl' : 'normal'}
          initial={{ opacity: 0, height: 0, scale: isNLMode ? 0.95 : 1 }}
          animate={{ opacity: 1, height: "auto", scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: isNLMode ? 1 : 0.95 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut",
            height: { duration: 0.3 }
          }}
          className={styles.formContent}
        >
          {isNLMode ? (
            <NaturalLanguageForm
              nlInput={nlInput}
              setNlInput={setNlInput}
              onSubmit={handleNLSubmit}
              onVoiceResult={handleVoiceResult}
            />
          ) : (
            <StandardForm
              inputFields={inputFields}
              renderFormField={renderFormField}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </form>
  );
}
