import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Modal.module.css';
import { format } from 'date-fns';
import { categoryIcons, moodIcons, DefaultIcon } from '../constants/TimelineIcons';

// 부드러운 오픈 애니메이션을 위한 변수
const modalVariants = {
  initial: { 
    scale: 0.9, 
    opacity: 0, 
    y: '100%' 
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: '100%',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }
  }
};

const itemVariants = {
  initial: { 
    transform: 'translateZ(-100px)' 
  },
  animate: {
    transform: 'translateZ(0px)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }
  },
};

const Modal = ({ event, onClose, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <motion.div
        initial={{ 
          scale: 0.7,
          opacity: 0,
          y: position?.y || 0,
          x: position?.x || 0,
          rotateX: 15,
          perspective: 1000
        }}
        animate={{ 
          scale: 1,
          opacity: 1,
          y: 0,
          x: 0,
          rotateX: 0,
          perspective: 1000
        }}
        exit={{ 
          scale: 0.7,
          opacity: 0,
          y: position?.y || 0,
          x: position?.x || 0,
          rotateX: -15,
          perspective: 1000
        }}
        transition={{ 
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
          duration: 0.5
        }}
        className={styles.modalContent}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className={styles.modalTime}
          >
            {format(new Date(event.startTime), 'HH:mm')} - 
            {format(new Date(event.endTime), 'HH:mm')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {event.title}
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </motion.button>
        </div>
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          className={styles.modalBody}
        >
          {event.description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {event.description}
            </motion.p>
          )}
          <div className={styles.modalIcons}>
            {event.category && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
                className={styles.iconWrapper}
              >
                {React.createElement(categoryIcons[event.category] || DefaultIcon, { size: 24 })}
                <span>{event.category}</span>
              </motion.div>
            )}
            {event.mood && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
                className={styles.iconWrapper}
              >
                {React.createElement(moodIcons[event.mood] || DefaultIcon, { size: 24 })}
                <span>{event.mood}</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;