// src/components/FormGroup.jsx
import React from 'react';
import styles from './FormGroup.module.css';

const FormGroup = ({ label, id, children }) => {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        {children}
      </div>
    </div>
  );
};

export default FormGroup;
