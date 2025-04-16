import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useProducts from '../hook/use-products';

// 큰 데이터셋 생성
const createDataSet = () => {
  return Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    value: Math.random().toString(36).substring(7)
  }));
};

const DustInfo = () => {
  const location = useLocation();
  const { codeGbn } = location.state || { codeGbn: 'PM10' };
  const [renderComplete, setRenderComplete] = useState(false);

  useEffect(() => {
    if (!renderComplete) {
      const checkImagesLoaded = () => {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;
        const totalCount = images.length;

        if (totalCount === 0) {
          setRenderComplete(true);
          return;
        }

        const imageLoadHandler = () => {
          loadedCount++;
          if (loadedCount === totalCount && !renderComplete) {
            setRenderComplete(true);
          }
        };

        images.forEach(img => {
          if (img.complete) {
            loadedCount++;
          } else {
            img.addEventListener('load', imageLoadHandler);
          }
        });

        if (loadedCount === totalCount && !renderComplete) {
          setRenderComplete(true);
        }

        return () => {
          images.forEach(img => {
            img.removeEventListener('load', imageLoadHandler);
          });
        };
      };

      checkImagesLoaded();
    }
  }, [renderComplete]);

  return (
    <div style={{
      paddingTop: '110px',
      minHeight: '100vh',
      backgroundColor: 'rgb(183, 198, 226)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#1e40af'
        }}>대기오염물질 정보</h1>
        
        {/* 미세먼지 섹션 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#1e40af'
          }}>미세먼지 (PM10)</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <p style={{
              marginBottom: '1rem',
              color: '#374151'
            }}>
              미세먼지는 지름이 10㎛(마이크로미터) 이하인 먼지를 말합니다. 주로 도로나 건설 현장 등에서 발생하는
              흙먼지, 공장·발전소 등에서 발생하는 매연 등이 있습니다.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '1rem 0'
            }}>
              <img 
                style={{
                  width: '1000px',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
                }}
                src={`${process.env.PUBLIC_URL}/micro1.jpg`}
                alt="미세먼지 크기 비교"
              />
            </div>
            <div style={{
              backgroundColor: '#eff6ff',
              padding: '1rem',
              borderRadius: '0.5rem'
            }}>
              <h3 style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#1e40af'
              }}>인체 영향</h3>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '1.25rem',
                color: '#1e3a8a'
              }}>
                <li style={{ marginBottom: '0.25rem' }}>호흡기 질환 유발</li>
                <li style={{ marginBottom: '0.25rem' }}>천식 및 기관지염 악화</li>
                <li style={{ marginBottom: '0.25rem' }}>심혈관 질환 위험 증가</li>
                <li style={{ marginBottom: '0.25rem' }}>눈과 피부 자극</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 초미세먼지 섹션 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#dc2626'
          }}>초미세먼지 (PM2.5)</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <p style={{
              marginBottom: '1rem',
              color: '#374151'
            }}>
              초미세먼지는 지름이 2.5㎛ 이하인 매우 작은 먼지입니다. 담배연기, 자동차 배기가스, 
              공장에서 배출되는 매연 등에서 발생합니다. 미세먼지보다 더 작아 인체에 더 위험합니다.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '1rem 0'
            }}>
              <img 
                style={{
                  width: '1000px',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
                }}
                src={`${process.env.PUBLIC_URL}/micro2.jpg`}
                alt="초미세먼지 크기 비교"
              />
            </div>
            <div style={{
              backgroundColor: '#fef2f2',
              padding: '1rem',
              borderRadius: '0.5rem'
            }}>
              <h3 style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#dc2626'
              }}>인체 영향</h3>
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '1.25rem',
                color: '#991b1b'
              }}>
                <li style={{ marginBottom: '0.25rem' }}>폐 깊숙이 침투하여 폐 기능 저하</li>
                <li style={{ marginBottom: '0.25rem' }}>혈관을 통해 전신 순환 가능</li>
                <li style={{ marginBottom: '0.25rem' }}>뇌혈관 질환 및 치매 위험 증가</li>
                <li style={{ marginBottom: '0.25rem' }}>조기 사망률 증가</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 오존 섹션 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#7c3aed'
          }}>오존 (O₃)</h2>
          <p style={{
            marginBottom: '1rem',
            color: '#374151'
          }}>
            오존은 자동차 배기가스나 공장 매연 등에 포함된 질소산화물이 강한 자외선과 반응하여 
            생성되는 물질입니다. 특히 햇빛이 강한 여름철 낮 시간에 농도가 높아집니다.
          </p>
          <div style={{
            backgroundColor: '#f5f3ff',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <h3 style={{
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#7c3aed'
            }}>인체 영향</h3>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '1.25rem',
              color: '#5b21b6'
            }}>
              <li style={{ marginBottom: '0.25rem' }}>기침, 가래, 목 통증 등 호흡기 자극</li>
              <li style={{ marginBottom: '0.25rem' }}>폐 기능 저하 및 천식 악화</li>
              <li style={{ marginBottom: '0.25rem' }}>눈 자극 및 시력 저하</li>
              <li style={{ marginBottom: '0.25rem' }}>어린이, 노약자, 호흡기 질환자에게 특히 위험</li>
            </ul>
          </div>
        </div>

        {/* 예방 수칙 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#047857'
          }}>대기오염 예방 수칙</h2>
          <div style={{
            backgroundColor: '#ecfdf5',
            padding: '1rem',
            borderRadius: '0.5rem'
          }}>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '1.25rem',
              color: '#065f46'
            }}>
              <li style={{ marginBottom: '0.25rem' }}>미세먼지 농도가 높은 날은 외출 자제</li>
              <li style={{ marginBottom: '0.25rem' }}>외출 시 보건용 마스크 착용</li>
              <li style={{ marginBottom: '0.25rem' }}>충분한 수분 섭취</li>
              <li style={{ marginBottom: '0.25rem' }}>귀가 후 손과 얼굴 깨끗이 씻기</li>
              <li style={{ marginBottom: '0.25rem' }}>실내 공기 질 관리 (환기, 청소, 공기청정기 사용)</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 숨겨진 데이터 처리 */}
      <div style={{ display: 'none' }}>
        {createDataSet().map(item => (
          <span key={item.id}>{item.value}</span>
        ))}
      </div>
    </div>
  );
};

export default DustInfo; 