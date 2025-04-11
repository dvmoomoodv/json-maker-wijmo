# 🧰 json-maker-wijmo

`.ustra` DSL 파일을 기반으로 아래 코드들을 **자동 생성**하는 Vue 기반 스캐폴딩 도구입니다.

---

## ✨ 주요 기능

- ✅ `.ustra` DSL → Vue + TypeScript + API + Swagger 자동 생성
- ✅ GUI 기반 컬럼 생성기 (`JsonColumnBuilder.vue`)
- ✅ 실시간 Wijmo Grid 미리보기 (`WijmoPreview.vue`)
- ✅ `.ustra` 파일 파싱 → 아래 코드 자동 생성:
  - TypeScript interface (`.ts`)
  - Wijmo Grid Vue 컴포넌트 (`.vue`)
  - API 서비스 코드 (`Service.ts`)
  - OpenAPI 스키마 (`.openapi.json`)
- ✅ 모든 생성 결과를 `generated.zip`으로 압축 출력

---

## 📂 디렉토리 구조

json-maker-wijmo/ ├── models/ # 입력 DSL 파일 (\*.ustra) │ └── user.ustra ├── cli/ # CLI 유틸 │ ├── generate.ts # 실행 진입점 │ ├── parseUstra.ts # DSL 파서 │ ├── generateModel.ts # TypeScript interface 생성기 │ ├── generateGrid.ts # Wijmo Grid 컴포넌트 생성기 │ ├── generateService.ts # API 서비스 생성기 │ ├── generateSchema.ts # OpenAPI 스키마 생성기 │ └── zipOutput.ts # ZIP 압축 도구 ├── src/generated/ # 자동 생성 파일 폴더 ├── dist/generated.zip # 생성 결과 압축본

yaml
Copy
Edit

---

## 🧾 .ustra 문법 설명

### 📄 기본 구조

```txt
model {
  필드명 타입
  필드명 타입
}
📌 지원 타입
.ustra 타입	변환된 TypeScript	설명
text	string	문자열
number	number	숫자
boolean	boolean	true/false
date	string + ISO	날짜 (ISO 포맷)
✅ 예시
txt
Copy
Edit
model {
  id number
  name text
  isActive boolean
  createdAt date
}
🚀 실행 방법
1. 설치
bash
Copy
Edit
pnpm install
2. 자동 생성 실행
bash
Copy
Edit
pnpm run generate
3. 결과
src/generated/ 내에 .ts, .vue, .service.ts, .openapi.json 생성됨

dist/generated.zip 으로 자동 압축됨

⚙️ CLI 옵션 (예정 지원 기능)
옵션	설명
--input	.ustra 파일 하나만 선택해서 실행
--outDir	출력 경로를 지정 (src/generated 외 경로)
--zip	압축 여부 설정 (--zip false로 끄기)
--filter=User	특정 모델만 처리
--dry-run	파일은 생성하지 않고 미리보기만 수행
👉 현재는 루트 models/ 안의 모든 .ustra 파일을 자동 처리합니다.

🧪 GUI 기능 (Vue 기반)
JsonColumnBuilder.vue: Textarea + 옵션 기반 컬럼 설계기

VueCodeDrawer.vue: Notion 스타일 사이드 Vue 코드 미리보기

WijmoPreview.vue: 실시간 Wijmo Grid 미리보기 + Faker 더미 데이터 자동 생성

🧱 사용 기술
Vue 3 + <script setup>

TypeScript

Tailwind CSS v4

Vite

Wijmo Vue2 Grid

@faker-js/faker

zip-a-folder

tsx (CLI 실행)

📄 라이선스
MIT
```
