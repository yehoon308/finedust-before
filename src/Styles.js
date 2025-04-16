import styled from 'styled-components';

/** 로딩바 */
export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;

export const CampWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(70, 104, 232);
  background: linear-gradient(
    90deg,
    rgba(70, 104, 232, 1) 20%,
    rgba(120, 199, 224, 1) 80%
  );
`;

export const ItemWrapper = styled.div`
  width: 100%;
  height: 60%;
  max-width: 500px;
  background-color: var(--color-bg-dark);
  overflow: hidden;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 13px 14px 11px 8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 13px 14px 11px 8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 13px 14px 11px 8px rgba(0, 0, 0, 0.75);
`;
