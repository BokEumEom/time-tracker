import { useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  title: '',
  category: '',
  startTime: '',
  endTime: '',
  description: '',
  mood: '',
};

export const useEventForm = (addEvent) => {
  const [isNLMode, setIsNLMode] = useState(false);
  const [nlInput, setNlInput] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    watch, 
    formState: { errors } 
  } = useForm({ defaultValues });

  const registerFields = () => {
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
  };

  return {
    isNLMode,
    nlInput,
    setNlInput,
    toggleMode: () => setIsNLMode(prev => !prev),
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    registerFields
  };
}; 