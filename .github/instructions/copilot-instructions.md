---
applyTo: '**'
---

## 프로젝트 개요

보건복지부 의료혁신 자료실 정적 웹사이트. 다중 페이지 정보 사이트로 `medicalReform/` 디렉토리에 집중된 구조. 정부 웹사이트 표준화와 W3C 유효성이 핵심 요구사항.

## 아키텍처 & 파일 구조

- **HTML**: `medicalReform/html/` - 페이지별 문서. 라우팅은 `mid` 쿼리 파라미터 기반 (예: `a50101000000` = 추진배경)
- **CSS/SCSS**: `medicalReform/css/scss/` - 컴포넌트 기반 구조
  - `_var.scss`: CSS 변수 (색상, 크기, 반응형 중단점)
  - `_mixin.scss`: 재사용 가능한 스타일 유틸리티 (flex, grid, media, bullet, icon 등)
  - `component/`: 19개 컴포넌트 모듈 (`_button.scss`, `_form.scss`, `_table.scss` 등)
  - `layout.scss`: 헤더, 푸터, 네비게이션 전역 레이아웃
- **JavaScript**: 
  - `medicalReform/js/common.js`: 인증 로직, 암호화 (CryptoJS SHA256)
  - `medicalReform/js/func.js`: 공통 함수 (메뉴, 줌, 접근성, 드롭다운)
  - `medicalReform/js/sub.js`: 서브페이지 초기화 (탭, SNB, 인페이지 네비)
  - `ease_src/js/board.js`: 레거시 게시판 유틸리티

## 핵심 개발 패턴

### 반응형 설계
`_mixin.scss`의 `@include media()` 사용. 중단점: 웹 1200px → 태블릿 1025px → 모바일 768px → 소형 321px
```scss
@include media($pad) { /* 태블릿 & 모바일 */ }
@include media($mobile) { /* 모바일만 */ }
```

### Flexbox & Grid 믹스인
`@include flex($gap, $align-items, $justify-content, $direction)` / `@include grid()`로 레이아웃 구성.
`$fd:column|row|inline`으로 방향 지정.

### 네비게이션 & 접근성
`func.js`의 `gnb()`, `snb()`, `listOpen()` 함수가 메뉴 상호작용 처리.
- `aria-expanded`, `aria-current`, `role="listbox"` 필수
- `.active` 클래스가 활성 상태 표시

### 컴포넌트 네이밍
- `.inner`: 콘텐츠 최대 너비 (1200px 또는 100% - 3.2rem)
- `.btn`, `.btn-txt`, `.btn-ico`: 버튼 타입
- `.sr-only`: 화면 리더용 숨김 텍스트 (`@include sr-only` 믹스인)
- 색상 클래스: `.text-primary`, `.bg-secondary` (CSS 변수 기반)

### 페이지 구조
```html
<header id="header"><!-- 공통 헤더 --></header>
<main id="container">
  <nav class="breadcrumb-wrap"><!-- 경로표시 --></nav>
  <div class="inner">
    <div id="snb" class="left-menu"><!-- 좌측 서브 메뉴 --></div>
    <section id="contents"><!-- 메인 컨텐츠 --></section>
  </div>
</main>
<footer id="footer"><!-- 공통 푸터 --></footer>
```

## 필수 요구사항

- **W3C HTML5 유효성 검사 필수** - 모든 마크업이 통과해야 함
- **언어**: 한국어 (`lang="ko"`)
- **메타 태그**: charset UTF-8, viewport, 오픈그래프 지원
- **접근성**: WCAG 레벨 AA (ARIA 속성, `sr-only`, 대체 텍스트)
- **이미지 경로**: `/medicalReform/img/` 기준 (절대 경로)
- **폰트**: PretendardGOV (GOV 버전 사용), remixicon (아이콘)

## 일반적 개발 워크플로우

1. HTML 마크업 추가 시 시맨틱 태그 (`<section>`, `<nav>`, `<h2>`-`<h3>` 계층) 준수
2. 스타일은 SCSS 파일에서 작성 (`.css` 수동 편집 금지 - SCSS 컴파일 필요)
3. 새 컴포넌트는 `component/_name.scss` 파일 생성 후 `layout.scss` 등에서 import
4. 자바스크립트 함수는 `func.js`에 추가 (전역 사용) 또는 `sub.js`에 페이지별 로직
5. 모든 변경 후 W3C 유효성 검사 통과 확인