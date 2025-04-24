// import { useState, useEffect } from 'react';
import {
  useQuery,
  //   useMutation,
  //   useQueryClient,
  //   QueryClient,
  //   QueryClientProvider,
} from '@tanstack/react-query';

export default function useProducts({ reqDate, isClick, codeGbn }) {
  const API_AIR_KEY = process.env.REACT_APP_API_AIR_KEY;

  async function postData(url = '') {
    console.log('API 요청 URL:', url);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
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
      console.log('파싱된 API 응답:', result);
      
      if (!result.response?.body?.items) {
        console.error('API 응답에 데이터가 없습니다:', result);
        throw new Error('데이터를 찾을 수 없습니다.');
      }
      
      return result;
    } catch (error) {
      console.error('API 호출 실패:', error);
      throw error;
    }
  }

  // 현재 날짜를 YYYY-MM-DD 형식으로 변환
  const today = new Date();
  const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const {
    isLoading,
    error,
    data: fineDust,
  } = useQuery(
    ['dust', reqDate, codeGbn], // codeGbn을 캐시 키에 추가
    async () => {
      const searchDate = reqDate || defaultDate;
      const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${API_AIR_KEY}&returnType=json&numOfRows=100&pageNo=1&searchDate=${searchDate}&informCode=${codeGbn}`;
      const result = await postData(url);
      
      // 데이터가 없는 경우 사용자 친화적인 에러 메시지
      if (result.response.body.totalCount === 0) {
        const messages = {
          PM25: '미세먼지',
          PM10: '초미세먼지',
          O3: '오존'
        };
        throw new Error(`${searchDate} 날짜의 ${messages[codeGbn]} 데이터가 없습니다.`);
      }
      
      return result;
    },
    {
      enabled: !!API_AIR_KEY && !!codeGbn,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 2,
      onError: (error) => {
        console.error('쿼리 에러:', error);
      }
    }
  );

  console.log('useProducts 훅 결과:', { isLoading, error, fineDust, reqDate, codeGbn });

  return [isLoading, error, fineDust];
}
