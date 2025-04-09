# 🧰 json-maker-wijmo

Wijmo Grid용 Vue 컴포넌트를 시각적으로 빠르게 생성할 수 있는 **GUI 기반 스캐폴딩 툴**입니다.

---

## ✨ 주요 기능

- ✅ 줄바꿈/콤마로 구분된 컬럼명 입력
- ✅ camelCase 자동 변환 기능
- ✅ 컬럼별 속성 설정 (데이터 타입, 너비, 읽기 전용, 헤더)
- ✅ 실시간 Vue 파일 미리보기 (Notion 스타일 사이드 패널)
- ✅ 복사 및 `.vue` 다운로드 기능 제공

---

## 📂 프로젝트 구조

src/  
├── views/ │   
├── EditorView.vue # 입력 및 컬럼 속성 설정 UI  
│ └── VueCodeDrawer.vue # Vue 코드 미리보기 + 다운로드 패널   
├── utils/   
│ └── generateGridCode.ts # JSON → Vue 코드 변환 + 유틸 함수  
  
---  
  
## 🚀 실행 방법

```bash
# 1. 패키지 설치
npm install
yarn install
pnpm install


# 2. 개발 서버 실행
npm run dev
yarn run dev
pnpm run dev
🛠 사용 예시

입력:
product_name, price
stock_quantity

→ 🪄 camelCase 변환 클릭 →
productName, price, stockQuantity

→ 각 컬럼 옵션 설정 (타입, 읽기 전용, width 등)

→ 📄 Vue 파일 생성 →
  → 미리보기, 복사, 다운로드 가능
🧱 기술 스택
Vue 3 + Composition API (<script setup>)

Vite

Tailwind CSS v4

TypeScript

Wijmo Vue2 Grid

📄 라이선스
MIT
```
