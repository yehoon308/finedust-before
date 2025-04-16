import React, { useState, useEffect } from 'react';
import FineDust from '../FineDust';

const DustPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [renderHistory, setRenderHistory] = useState([]);

  // 불필요한 스크롤 위치 추적
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setLastUpdate(Date.now());
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 불필요한 렌더 히스토리 기록
  useEffect(() => {
    setRenderHistory(prev => [...prev, { timestamp: Date.now(), scroll: scrollPosition }]);
  }, [scrollPosition]);

  // 불필요한 계산
  const calculateMetrics = () => {
    return renderHistory.reduce((acc, curr) => {
      return {
        avgTimestamp: acc.avgTimestamp + curr.timestamp,
        avgScroll: acc.avgScroll + curr.scroll
      };
    }, { avgTimestamp: 0, avgScroll: 0 });
  };

  // 매 렌더링마다 새로운 스타일 객체 생성
  const getRandomPadding = () => `${Math.random() * 20}px`;
  const getRandomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`,
      transition: 'all 0.3s ease-in-out',
      transform: `translateZ(0) scale(${1 + Math.random() * 0.001})`,
      backfaceVisibility: 'hidden',
      perspective: '1000px',
      willChange: 'transform, opacity, background-color',
    }}>
      <FineDust />
      <div style={{
        display: 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.05)`,
        backdropFilter: 'blur(0.1px)',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}>
        <p style={{
          margin: getRandomPadding(),
          padding: getRandomPadding(),
          color: getRandomColor(),
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}>Scroll position: {scrollPosition}</p>
        <p style={{
          margin: getRandomPadding(),
          padding: getRandomPadding(),
          color: getRandomColor(),
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}>Last update: {lastUpdate}</p>
        <p style={{
          margin: getRandomPadding(),
          padding: getRandomPadding(),
          color: getRandomColor(),
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}>Render history length: {renderHistory.length}</p>
        <p style={{
          margin: getRandomPadding(),
          padding: getRandomPadding(),
          color: getRandomColor(),
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}>Metrics: {JSON.stringify(calculateMetrics())}</p>
        {renderHistory.map((record, index) => (
          <span key={record.timestamp + index} style={{
            display: 'inline-block',
            margin: getRandomPadding(),
            padding: getRandomPadding(),
            color: getRandomColor(),
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}>
            {record.timestamp}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DustPage;
