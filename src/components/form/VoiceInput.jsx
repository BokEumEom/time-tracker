// src/components/VoiceInput.jsx
import React, { useState, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import styles from './VoiceInput.module.css';

const VoiceInput = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // 음성 인식 시작
  const startListening = () => {
    // 브라우저가 SpeechRecognition API를 지원하는지 확인
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }
    // 인스턴스 생성 및 설정
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'ko-KR'; // 한국어 설정
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    // 인식 결과 이벤트 핸들러
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };

    recognitionRef.current.start();
    setListening(true);
  };

  // 음성 인식 중지
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div className={styles.voiceInput}>
      <button
        onClick={listening ? stopListening : startListening}
        className={styles.microphoneButton}
        aria-label={listening ? '음성 입력 중지' : '음성 입력 시작'}
      >
        {listening ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
    </div>
  );
};

export default VoiceInput;
