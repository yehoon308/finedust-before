// import { useState, useEffect } from 'react';
import {
  useQuery,
  //   useMutation,
  //   useQueryClient,
  //   QueryClient,
  //   QueryClientProvider,
} from '@tanstack/react-query';

export default function useProducts({ reqDate, isClick }) {
  const API_AIR_KEY = process.env.REACT_APP_API_AIR_KEY;

  async function postData(url = '') {
    const startTime = performance.now();
    console.log('🚀 API 호출 시작:', new Date().toLocaleTimeString());
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const text = await response.text();
      
      if (text.includes('<html>')) {
        throw new Error('API 서버 오류: HTML 응답을 받았습니다.');
      }
      
      if (text.includes('OpenAPI_ServiceResponse')) {
        const errorMsg = text.match(/<returnAuthMsg>(.*?)<\/returnAuthMsg>/)?.[1];
        const errDetailMsg = text.match(/<errMsg>(.*?)<\/errMsg>/)?.[1];
        throw new Error(`API 오류: ${errorMsg || ''} - ${errDetailMsg || ''}`);
      }

      const result = JSON.parse(text);
      const endTime = performance.now();
      console.log('✅ API 호출 완료:', new Date().toLocaleTimeString());
      console.log(`⏱️ API 호출 소요 시간: ${((endTime - startTime) / 1000).toFixed(2)}초`);
      return result;
    } catch (error) {
      const endTime = performance.now();
      console.error('❌ API 호출 실패:', new Date().toLocaleTimeString());
      console.error(`⏱️ API 호출 소요 시간: ${((endTime - startTime) / 1000).toFixed(2)}초`);
      console.error('오류 내용:', error.message);
      throw error;
    }
  }
  const {
    isLoading,
    error,
    data: fineDust,
    // refetch,
  } = useQuery(
    ['dust', reqDate], // isClick 대신 reqDate만 의존성으로 사용
    async () => {
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8080/'
        : 'https://your-deployed-cors-proxy.com/';
      const url = `${baseUrl}https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${API_AIR_KEY}&returnType=json&numOfRows=100&pageNo=1&searchDate=${reqDate}&InformCode=PM25`;
      return postData(url);
    },
    {
      enabled: !!reqDate, // reqDate가 있을 때만 쿼리 실행
      refetchOnMount: false, // 마운트 시 리패치하지 않도록 설정
      refetchOnReconnect: false, // 재연결 시 리패치하지 않도록 설정
    }
  );

  return [isLoading, error, fineDust];
}
