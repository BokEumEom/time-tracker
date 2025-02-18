// src/components/EventModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import styles from './EventModal.module.css';
import EventForm from './EventForm';

export default function EventModal({ isOpen, onClose, addEvent }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <EventForm addEvent={addEvent} />
      </div>
    </div>
  );
}
