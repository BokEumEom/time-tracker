// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Timeline from '../components/Timeline';
import EventModal from '../components/EventModal';
import { Plus } from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 이벤트 불러오기
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  // 이벤트가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className={styles.homeContainer}>
      <Timeline events={events} />
      <button className={styles.fab} onClick={() => setIsModalOpen(true)}>
        <Plus size={24} />
      </button>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addEvent={addEvent}
      />
    </div>
  );
}
