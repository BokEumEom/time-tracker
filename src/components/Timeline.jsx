import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Timeline.module.css';
import { format } from 'date-fns';
import Modal from './Modal';
import { categoryIcons, moodIcons, weatherIcons, DefaultIcon } from '../constants/TimelineIcons';

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

  // 시작 시간 기준으로 정렬하되, 유효한 날짜만 처리
  const sortedEvents = [...events]
    .filter(event => {
      const startDate = new Date(event.startTime);
      const endDate = new Date(event.endTime);
      return !isNaN(startDate) && !isNaN(endDate);
    })
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <>
      <motion.div className={styles.timelineContainer}>
        <div className={styles.timelineLine}></div>
        {sortedEvents.map((event) => {
          // 날짜가 유효한지 확인
          const startDate = new Date(event.startTime);
          const endDate = new Date(event.endTime);
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              className={styles.timelineItem}
              onClick={() => setSelectedEvent(event)}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedEvent(event)}
              tabIndex={0}
            >
              <motion.div className={styles.content}>
                <div className={styles.mainLine}>
                  <div className={styles.time}>
                    {format(startDate, 'HH:mm')} - 
                    {format(endDate, 'HH:mm')}
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
                  {event.weather && (
                    <div className={styles.weather}>
                      {weatherIcons[event.weather] ? 
                        React.createElement(weatherIcons[event.weather], { size: 18, 'aria-label': event.weather }) : 
                        <DefaultIcon aria-label="Unknown Weather" />}
                    </div>
                  )}
                </div>
                {event.description && (
                  <div 
                    className={`${styles.description} ${expandedIds.has(event.id) ? styles.expanded : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트 버블링 방지
                      toggleDescription(event.id);
                    }}
                  >
                    {event.description}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
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