import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import useProducts from './hook/use-products';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import Map from './components/map';
import SelectBox from './components/SelectBox';
import { Row, Col } from 'react-bootstrap';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const BackgroundWrapper = styled.div`
  background-color:rgb(183, 198, 226);
  min-height: 100vh;
  width: 100%;
`;

const PageWrapper = styled.div`
  padding-top: 110px; 
  height: calc(100vh - 110px);
  color: rgb(0, 0, 0);
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  margin-right: 10px;

  .date-picker-input {
    border: solid 3px;
    border-radius: 5px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    margin: 10px;
    padding: 3px;
  }
`;
// export const TableWrapper = styled.table`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   margin: 1px;
//   width: 100%;
// `;
export const StyledTable = styled.div`
  padding: 0 2rem 2rem;
  border-radius: 1rem;
  background: linear-gradient(90deg, #dbe7fc 0%, #f2f2f2 50%, #dbe7fc 100%);
  overflow-x: auto;
`;

export const StyledTableRow = styled.div`
  display: flex;
`;

export const StyledTh = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: ${(props) => props.num || 1};
  background-color: #b8d0fa;
  font-weight: 600;
  border: 1px solid;
  margin: 0 auto;
  padding: 1rem;
`;

export const StyledTd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex: ${(props) => props.num || 1};
  border: 1px solid;
  margin: 0 auto;
`;

export const SelectBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 4rem;
  width: 100vw;
`;
export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
  margin: 0.7rem;
`;

export default function FineDust() {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const timeInSeconds = ((endTime - startTime) / 1000).toFixed(2);
      console.log('----------------------------------------');
      console.log('🚀 페이지 렌더링 시작 시간:', new Date(performance.timeOrigin + startTime).toLocaleTimeString());
      console.log('✅ 페이지 렌더링 완료 시간:', new Date(performance.timeOrigin + endTime).toLocaleTimeString());
      console.log(`⏱️ 총 소요 시간: ${timeInSeconds}초`);
      console.log('----------------------------------------');
    };
  }, []);

  /**
   * ReactDatePicker에서 받은 값을
   * 파라미터로 넣을 string 형식으로
   * 포맷을 변경하는 함수
   */
  const changeFormat = (in_date) => {
    const year = in_date.getFullYear();
    const month = String(in_date.getMonth() + 1).padStart(2, '0');
    const day = String(in_date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  // Date 형식의 오늘 날짜
  const today = new Date();
  // ReactDatePicker의 value값을 useState로 저장
  const [selectDate, setSelectDate] = useState(today);
  const [isClick, setIsClick] = useState(0);
  const [codeGbn, setCodeGbn] = useState('PM25');
  /**
   * ReactDatePicker에서 선택한 값을
   * changeFormat 함수를 이용해 'YYYY-MM-DD' 형태로 변경
   */
  const [reqDate, setReqDate] = useState(changeFormat(today));
  // 커스텀 훅을 통한 API 호출
  const [isLoading, error, fineDust] = useProducts({
    reqDate,
    isClick,
    codeGbn,
  });
  // const client = useQueryClient();

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = (codeGbn) => {
    setStartTime(performance.now());
    navigate('/dust-info', { state: { codeGbn } });
  };

  const itemCount = fineDust?.response.body.totalCount;
  const itemList = fineDust?.response.body.items;

  const pm25Data = itemList?.filter((item) => item.informCode === codeGbn);

  console.log(pm25Data, itemList, codeGbn, 'itemInfo');
  const handleChange = (in_date) => {
    const date = changeFormat(in_date);
    setSelectDate(in_date);
    setReqDate(date);
    setIsClick(prev => prev + 1); // 날짜 변경 시 자동으로 데이터 갱신
  };

  return (
    <BackgroundWrapper>
      <PageWrapper>
        <Row>
          <SelectBoxWrapper>
            <SelectBox codeGbn={codeGbn} setCodeGbn={setCodeGbn} memo="구분 :" />

            <DatePickerWrapper>
              <ReactDatePicker
                className="date-picker-input"
                locale={ko}
                dateFormat="yyyy-MM-dd"
                selected={selectDate}
                onChange={(date) => handleChange(date)}
              />
            </DatePickerWrapper>
          </SelectBoxWrapper>
        </Row>

        <StyledTable>
          <Row>
            <InfoTextBox>🟧나쁨 🟨보통 🟦좋음</InfoTextBox>
          </Row>
          <StyledTableRow>
            <StyledTh num={1}>시 일</StyledTh>
            <StyledTh num={3}>전국 시황</StyledTh>
            <StyledTh num={1}>설 명</StyledTh>
          </StyledTableRow>
          {pm25Data &&
            pm25Data?.map((item, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTd num={1}>
                    {`발표일: ${item.dataTime}`}
                    <br />
                    {`예측일자: ${item.informData}`}
                  </StyledTd>
                  <StyledTd num={3}>
                    <Map informGrade={item.informGrade} />
                  </StyledTd>
                  <StyledTd num={1}>{item.informOverall}</StyledTd>
                </StyledTableRow>
              );
            })}
        </StyledTable>
      </PageWrapper>
    </BackgroundWrapper>
  );
}
