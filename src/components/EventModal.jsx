// src/components/EventModal.jsx
import React, { useEffect } from 'react';
import { CircleX } from 'lucide-react';
import styles from './EventModal.module.css';
import EventForm from './form/EventForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventModal({ isOpen, onClose, addEvent }) {
  useEffect(() => {
    if (isOpen) {
      // 모달이 열렸을 때 첫 번째 입력 요소에 포커스
      const firstFocusableElement = document.querySelector('.modalContent input, .modalContent textarea, .modalContent button');
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }, [isOpen]);

  // 포커스 트랩 함수 (간단한 버전)
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      const focusableElements = document.querySelectorAll('.modalContent input, .modalContent textarea, .modalContent button');
      if (focusableElements.length > 0) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: '0vh', opacity: 1 }}
            exit={{ y: '100vh', opacity: 0 }}
            transition={{ 
              type: "tween", 
              ease: "easeOut",
              duration: 0.3,
              stiffness: 100,
              damping: 20
            }}
            onClick={(e) => e.stopPropagation()} // 내부 클릭은 닫지 않도록
            onKeyDown={handleKeyDown} // 포커스 트랩
            tabIndex="0" // 포커스 가능하게
          >
            <button 
              className={styles.closeButton} 
              onClick={onClose}
              aria-label="Close modal"
            >
              <CircleX size={24} />
            </button>
            <EventForm addEvent={addEvent} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}