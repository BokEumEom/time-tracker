// src/components/VoiceInput.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import styles from './VoiceInput.module.css';

const VoiceInput = ({ onResult, onListeningChange }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // listening 상태가 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    onListeningChange?.(listening);
  }, [listening, onListeningChange]);

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
    recognitionRef.current.continuous = true; // 연속 인식 활성화
    recognitionRef.current.interimResults = false; // 중간 결과 비활성화 (필요에 따라 true로 변경 가능)

    // 인식 결과 이벤트 핸들러
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onResult(transcript);
    };

    // 인식이 끝난 후
    recognitionRef.current.onend = () => {
      setListening(false);
    };

    // 인식 중 오류 발생 시
    recognitionRef.current.onerror = (event) => {
      console.error('음성 인식 오류:', event.error);
      setListening(false);
      alert('음성 인식 중 오류가 발생했습니다.');
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

  // 컴포넌트 언마운트 시 리소스 정리
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <button
      onClick={listening ? stopListening : startListening}
      className={styles.microphoneButton}
      aria-label={listening ? '음성 입력 중지' : '음성 입력 시작'}
    >
      {listening ? <MicOff size={24} /> : <Mic size={24} />}
    </button>
  );  
};

export default VoiceInput;