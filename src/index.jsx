// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-datepicker/dist/react-datepicker.css';
import { createRoot } from 'react-dom/client'; // createRoot 임포트

// 앱 시작 시간 기록
const appStartTime = performance.now();
console.log('🚀 애플리케이션 시작 시간:', new Date().toLocaleTimeString());

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

const container = document.getElementById('root');
const root = createRoot(container); // createRoot 사용
root.render(<App />); // render 메서드 호출

// 앱 로드 완료 시간 측정
window.onload = () => {
  const appLoadTime = performance.now();
  const totalLoadTime = ((appLoadTime - appStartTime) / 1000).toFixed(2);
  console.log('----------------------------------------');
  console.log('✅ 애플리케이션 로드 완료 시간:', new Date().toLocaleTimeString());
  console.log(`⏱️ 총 로딩 시간: ${totalLoadTime}초`);
  console.log('----------------------------------------');
};