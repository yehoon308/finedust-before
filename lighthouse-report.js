const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 측정 대상 URL (로컬 서버 주소)
const targetUrl = 'http://localhost:3000';

// 출력 파일명
const reportJsonPath = path.resolve(__dirname, 'lighthouse-report.json');
const outputCsvPath = path.resolve(__dirname, 'lighthouse-summary.csv');

// Lighthouse 실행
exec(`lighthouse ${targetUrl} --output=json --output-path=${reportJsonPath} --chrome-flags="--headless"`, (err, stdout, stderr) => {
  if (err) {
    console.error('Lighthouse 실행 중 오류 발생:', err);
    return;
  }

  // JSON 파일 읽기
  const data = JSON.parse(fs.readFileSync(reportJsonPath, 'utf-8'));

  const categories = data.categories;
  const performanceAudit = data.audits;

  // 카테고리 점수 요약
  const summary = [
    ['항목', '점수'],
    ['성능', categories.performance.score * 100],
    ['접근성', categories.accessibility.score * 100],
    ['Best Practices', categories['best-practices'].score * 100],
    ['SEO', categories.seo.score * 100],
  ];

  // 세부 지표
  const details = [
    [],
    ['지표', '값'],
    ['First Contentful Paint (FCP)', performanceAudit['first-contentful-paint'].displayValue],
    ['Largest Contentful Paint (LCP)', performanceAudit['largest-contentful-paint'].displayValue],
    ['Total Blocking Time (TBT)', performanceAudit['total-blocking-time'].displayValue],
    ['Time to Interactive (TTI)', performanceAudit['interactive'].displayValue],
    ['Speed Index', performanceAudit['speed-index'].displayValue],
  ];

  // CSV 통합 생성 (BOM 포함)
  const combinedCsv = summary.concat(details).map(row => row.join(',')).join('\n');
  fs.writeFileSync(outputCsvPath, '\uFEFF' + combinedCsv, 'utf-8');

  console.log('✅ Lighthouse 측정 완료. CSV 요약 저장됨:', outputCsvPath);
});
