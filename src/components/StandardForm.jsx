import React from 'react';
import FormGroup from './FormGroup';
import CategorySelector from './CategorySelector';
import MoodSelector from './MoodSelector';
import styles from './StandardForm.module.css';
import Button from './Button';

export default function StandardForm({ inputFields, renderFormField, watch, setValue, errors }) {
  return (
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
      <Button type="submit">추가</Button>
    </>
  );
} 