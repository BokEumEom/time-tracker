import React from 'react';
import FormGroup from './FormGroup';
import CategorySelector from '../Selector/CategorySelector';
import MoodSelector from '../Selector/MoodSelector';
import styles from './StandardForm.module.css';
import Button from '../common/Button';
import WeatherSelector from '../Selector/WeatherSelector';

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
      <FormGroup label="날씨 선택">
        <WeatherSelector
          value={watch('weather')}
          onChange={(value) => setValue('weather', value, { shouldValidate: true })}
        />
        {errors.weather && <span className={styles.error}>{errors.weather.message}</span>}
      </FormGroup>
      <Button type="submit">추가</Button>
    </>
  );
} 