import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Timeline.module.css';
import { format } from 'date-fns';
import Modal from './Modal';
import { categoryIcons, moodIcons, DefaultIcon } from '../constants/TimelineIcons';

export default function Timeline({ events }) {
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [expandedIds, setExpandedIds] = React.useState(new Set());
  
  // 설명 토글 핸들러
  const toggleDescription = (id) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // 시작 시간 기준으로 정렬
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  return (
    <>
      <motion.div className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>
        {sortedEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className={styles.timelineItem}
            onClick={() => setSelectedEvent(event)}
            // 추가적인 접근성을 위해 onKeyDown 이벤트를 추가할 수 있습니다.
            onKeyDown={(e) => e.key === 'Enter' && setSelectedEvent(event)}
            tabIndex={0} // focus 가능하게 설정
          >
            <motion.div className={styles.content}>
              <div className={styles.mainLine}>
                <div className={styles.time}>
                  {format(new Date(event.startTime), 'HH:mm')} - 
                  {format(new Date(event.endTime), 'HH:mm')}
                </div>
                <div className={styles.title}>{event.title}</div>
                <div className={styles.category}>
                  {event.category && 
                    (categoryIcons[event.category] ? 
                      React.createElement(categoryIcons[event.category], { size: 18, 'aria-label': event.category }) : 
                      <DefaultIcon aria-label="Unknown Category" />)}
                </div>
                {event.mood && (
                  <div className={styles.mood}>
                    {moodIcons[event.mood] ? 
                      React.createElement(moodIcons[event.mood], { size: 18, 'aria-label': event.mood }) : 
                      <DefaultIcon aria-label="Unknown Mood" />}
                  </div>
                )}
              </div>
              {event.description && (
                <div className={`${styles.description} ${expandedIds.has(event.id) ? styles.expanded : ''}`}>
                  {event.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedEvent && (
          <Modal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
            isOpen={true} // 모달이 열려있는 상태를 명시적으로 전달
          />
        )}
      </AnimatePresence>
    </>
  );
}