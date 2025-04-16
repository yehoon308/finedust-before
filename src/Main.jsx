import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-image: url('${process.env.PUBLIC_URL}/main_image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const StyledTextBox = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 35px;
  font-weight: bold;
  color: white;
  text-align: center;
  max-width: 80%;
  margin-top: 20px;
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Main = () => {
  return (
    <MainContainer>
      <StyledTextBox>
        공공 API를 통해 지역별 대기질 정보를 공유합니다.
        <br />
        기상센터로 이동하여 미세먼지, 초미세먼지, 오존의 수치 등 
        <br />
        더 많은 정보를 확인하세요.
      </StyledTextBox>
    </MainContainer>
  );
};

export default Main;
