// src/components/EventModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import styles from './EventModal.module.css';
import EventForm from './EventForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventModal({ isOpen, onClose, addEvent }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ 
              type: "tween", 
              ease: "easeOut",
              duration: 0.3
            }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <X size={24} />
            </button>
            <EventForm addEvent={addEvent} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}