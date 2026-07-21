# Sullivan QR (심플 & 모던 QR 코드 생성기)

본 문서는 `07. QRCode` 프로젝트(Sullivan QR)의 전체 개발 내용과 주요 기능, 그리고 기술적 특징을 상세히 정리한 문서입니다.

## 1. 프로젝트 개요
- **목적**: 사용자가 입력한 웹 주소(URL)나 텍스트를 즉석에서 스마트폰으로 스캔 가능한 고화질 흑백 QR 코드로 변환해 주고, 이를 PNG 이미지 파일로 쉽게 다운로드할 수 있는 경량 웹 애플리케이션.
- **기술 스택**: HTML, CSS, Vanilla JavaScript, Vite
- **핵심 라이브러리**: `qrcode` (외부 API 통신 없이 브라우저 단에서 즉시 QR 생성)
- **배포**: GitHub Pages + GitHub Actions (`https://github.com/kjwtuat/sullivanQR`)

## 2. 주요 구현 기능 및 특징

### 2.1. 사용자 인터페이스 (UI/UX)
- **디자인 테마 (Glassmorphism)**: 이전에 진행한 TourAgent 프로젝트와의 시각적 통일성을 위해, 다크 모드 기반에 반투명 유리 질감을 덧입힌 고급스럽고 현대적인 UI를 채택.
- **Micro Animations**: 버튼 호버 시 그림자(Shadow)와 버튼이 미세하게 떠오르는(TranslateY) 애니메이션을 부여해 조작감을 높임.
- **결과 패널 슬라이드**: QR 코드가 생성되었을 때 결과 창이 아래에서 위로 부드럽게 나타나는(`slideUp`) 애니메이션 구현.

### 2.2. QR 코드 초고속 생성 (클라이언트 사이드 렌더링)
- 외부 서버로 데이터를 전송하지 않기 때문에 로딩 시간과 개인정보 유출 위험이 없으며 오프라인 환경(로컬)에서도 즉각적으로 동작.
- URL 입력 후 엔터(Enter) 키 또는 [생성하기] 버튼을 누르면 0.1초 만에 최적화된 흑백(전경색: 검정, 배경색: 흰색) QR 코드를 Data URL 포맷으로 렌더링.

### 2.3. 편의 기능: 이미지 다운로드
- 사용자가 생성한 QR 코드를 블로그에 올리거나 인쇄할 수 있도록 **이미지 다운로드 버튼** 탑재.
- 생성된 QR 코드 데이터를 바탕으로, 보이지 않는 임시 다운로드 링크(`<a>` 태그)를 자바스크립트로 생성한 뒤 강제로 클릭 이벤트를 발생시켜 파일(`PNG`)을 저장하는 트릭 사용.
- **파일 이름 자동 포맷팅**: 사용자가 입력한 URL에서 특수기호를 제거하고 `QR_google_com.png` 형식으로 자동 변환하여 저장 효율성 확보.

## 3. GitHub Pages 배포 관련 핵심 설정
Vite 프로젝트를 GitHub Pages에 정상 배포하기 위한 핵심 파이프라인.
1. **`vite.config.js` 설정**: `base: '/sullivanQR/'` 를 명시하여 서버 최상위 경로가 아닌 리포지토리 이름 폴더를 기준(Root)으로 에셋(JS, CSS)을 불러오도록 경로 보정.
2. **`.github/workflows/deploy.yml` 작성**:
   - `main` 브랜치에 코드가 푸시(Push)되면 트리거 발생.
   - `npm ci` ➔ `npm run build` 스크립트를 통해 자동으로 `/dist` 폴더 결과물을 생성.
   - GitHub Pages 전용 Actions(`upload-pages-artifact`, `deploy-pages`)를 활용해 퍼블릭 호스팅에 게시.
3. 최초 배포 시, GitHub 저장소 설정(`Settings > Pages > Source`)에서 반드시 **[GitHub Actions]**를 선택하여야 워크플로우가 정상 적용됨.

## 4. 로컬 환경 실행 가이드
- **의존성 설치**: `npm install`
- **로컬 개발 서버 실행**: `npm run dev` (실행 시 실시간 Hot Reload 지원)
- **빌드**: `npm run build`
