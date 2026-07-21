import './style.css';
import QRCode from 'qrcode';

const urlInput = document.getElementById('url-input');
const generateBtn = document.getElementById('generate-btn');
const resultBox = document.getElementById('result-box');
const qrImage = document.getElementById('qr-image');
const qrTextDisplay = document.getElementById('qr-text-display');
const downloadBtn = document.getElementById('download-btn');

let currentUrl = '';

// QR 코드 생성 함수
async function generateQR() {
  const text = urlInput.value.trim();
  
  if (!text) {
    alert('URL 주소나 텍스트를 입력해주세요.');
    urlInput.focus();
    return;
  }
  
  try {
    currentUrl = text;
    
    // 심플한 흑백 QR 코드를 Data URL로 생성
    const qrDataUrl = await QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',  // 흑백 (전경색)
        light: '#ffffff'  // 흑백 (배경색)
      }
    });
    
    // 이미지 소스 업데이트 및 결과 영역 표시
    qrImage.src = qrDataUrl;
    qrTextDisplay.textContent = text;
    resultBox.style.display = 'flex';
    
    // 시각적 피드백: 버튼 텍스트 변경
    const originalBtnText = generateBtn.textContent;
    generateBtn.textContent = '생성 완료!';
    setTimeout(() => {
      generateBtn.textContent = originalBtnText;
    }, 1500);
    
  } catch (err) {
    console.error('QR 코드 생성 오류:', err);
    alert('QR 코드를 생성하는 중 오류가 발생했습니다.');
  }
}

// 이벤트 리스너: 버튼 클릭 시
generateBtn.addEventListener('click', generateQR);

// 이벤트 리스너: 엔터키 입력 시
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateQR();
  }
});

// 다운로드 기능
downloadBtn.addEventListener('click', () => {
  if (!qrImage.src) return;
  
  // 파일명 안전하게 변환 (특수문자 제거 후 짧게)
  const safeName = currentUrl.replace(/[^a-z0-9]/gi, '_').substring(0, 20);
  const fileName = `QR_${safeName || 'code'}.png`;
  
  const link = document.createElement('a');
  link.href = qrImage.src;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
