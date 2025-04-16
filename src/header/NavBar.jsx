import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun } from 'react-icons/fa';
import styled, { css } from 'styled-components';

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 110px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(252, 255, 161, 0.54) 0%, rgba(0,0,0,0) 100%);
  ${(props) =>
    props.dark &&
    css`
      background-color: black;
    `}
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color:rgb(255, 232, 102);
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 2.25rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  transition: all 0.3s ease;
  &:hover {
    color:rgb(255, 163, 163);
  }
`;

const NavLink = styled(Link)`
  color:rgb(255, 255, 255);
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  transition: all 0.3s ease;
  &:hover {
    color:rgb(255, 232, 102);
    transform: scale(1.1);
    transform-origin: center;
  }
`;

export default function NavBar() {
  return (
    <NavWrapper>
      <div className="mt-3 h-2/3 flex flex-row justify-center" style={{ 
        // marginTop: '12px', 
        // height: 'calc(100% * 2 / 3)', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center' 
      }}>
        <IconWrapper className="text-5xl" style={{ 
          // display: 'flex', 
          alignItems: 'center', 
          color: 'rgb(255, 232, 102)', 
          fontSize: '3rem' 
        }}>
          <FaSun />
        </IconWrapper>
        <LinkWrapper style={{ 
          // display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          transition: 'all 0.3s ease' 
        }}>
          <StyledLink to="/fineDustCheck" style={{ 
            // color: 'white', 
            fontSize: '2.25rem', 
            fontWeight: '600', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
            transition: 'all 0.3s ease' 
          }}>
            공공 API 대기질 확인
          </StyledLink>
        </LinkWrapper>
        <IconWrapper className="text-5xl" style={{ 
          // display: 'flex', 
          alignItems: 'center', 
          color: 'rgb(255, 232, 102)', 
          fontSize: '3rem' 
        }}>
          <FaSun />
        </IconWrapper>
      </div>
      <nav className="h-1/3 w-full flex flex-row items-center justify-start space-x-10 p-4" style={{ 
        // height: 'calc(100% * 1 / 3)', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        gap: '40px', 
        padding: '16px 0 16px 50px' 
      }}>
        <NavLink to="/fineDustCheck/dust-info" style={{ 
          // color: 'rgb(255, 255, 255)', 
          fontWeight: '600', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
          transition: 'all 0.3s ease' 
        }}>
          미세먼지란?
        </NavLink>
        <NavLink to="/fineDustCheck/fineDust" style={{ 
          // color: 'rgb(255, 255, 255)', 
          fontWeight: '600', 
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
          transition: 'all 0.3s ease' 
        }}>
          기상센터
        </NavLink>
      </nav>
    </NavWrapper>
  );
}
