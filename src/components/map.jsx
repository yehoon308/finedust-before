import { SimpleSouthKoreaMapChart } from 'react-simple-south-korea-map-chart';

// const data = [
//   { locale: '부산광역시', count: 1500 },
//   { locale: '대구광역시', count: 3000 },
//   { locale: '대전광역시', count: 400 },
//   { locale: '강원도', count: 2500 },
//   { locale: '광주광역시', count: 1000 },
//   { locale: '경기도', count: 4000 },
//   { locale: '인천광역시', count: 2200 },
//   { locale: '제주특별자치도', count: 100 },
//   { locale: '충청북도', count: 49 },
//   { locale: '경상북도', count: 2000 },
//   { locale: '전라북도', count: 3300 },
//   { locale: '세종특별자치시', count: 110 },
//   { locale: '충청남도', count: 10 },
//   { locale: '경상남도', count: 0 },
//   { locale: '전라남도', count: 250 },
//   { locale: '울산광역시', count: 100 },
//   { locale: '서울특별시', count: 10000 },
// ];

function Map({ informGrade }) {
  const data = [];

  informGrade.split(',').forEach((item) => {
    const [nameState, condition] = item.split(' : ');
    const name = nameState.trim();
    const state = condition.trim();
    let locale = '';
    let count = 0;

    switch (name) {
      case '부산':
        locale = '부산광역시';
        break;
      case '대구':
        locale = '대구광역시';
        break;
      case '영동':
        locale = '강원도';
        break;
      case '광주':
        locale = '광주광역시';
        break;
      case '경기남부':
        locale = '경기도';
        break;
      case '인천':
        locale = '인천광역시';
        break;
      case '제주':
        locale = '제주특별자치도';
        break;
      case '충북':
        locale = '충청북도';
        break;
      case '경북':
        locale = '경상북도';
        break;
      case '전북':
        locale = '전라북도';
        break;
      case '세종':
        locale = '세종특별자치시';
        break;
      case '충남':
        locale = '충청남도';
        break;
      case '경남':
        locale = '경상남도';
        break;
      case '전남':
        locale = '전라남도';
        break;
      case '울산':
        locale = '울산광역시';
        break;
      case '서울':
        locale = '서울특별시';
        break;
      default:
        break;
    }

    switch (state) {
      case '좋음':
        count = 100;
        break;
      case '보통':
        count = 5000;
        break;
      case '나쁨':
        count = 10000;
        break;
      default:
        break;
    }

    data.push({ name, state, locale, count });
  });

  const setColorByCount = (count) => {
    if (count < 101) return '#5a9ae8';
    if (count >= 5000 && count < 10000) return '#e5e158';
    if (count >= 10000) return '#e96149';
    else return '#ebfffd';
  };
  return (
    <SimpleSouthKoreaMapChart
      setColorByCount={setColorByCount}
      data={data}
      unit="ug/m3"
    />
  );
}
export default Map;
