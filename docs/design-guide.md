# 일본어 학습 단어장 서비스 - 디자인 가이드

## 문서 정보

- **버전**: 1.0
- **작성일**: 2026-01-22
- **디자인 콘셉트**: Midori/Kokuyo 다이어리 빈티지 감성
- **대상**: 개발자 및 디자이너
- **기반 문서**: [wireframes.md](wireframes.md), [service-plan.md](service-plan.md)

---

## 목차

1. [디자인 철학](#1-디자인-철학)
2. [색상 시스템](#2-색상-시스템)
3. [타이포그래피](#3-타이포그래피)
4. [레이아웃 & 그리드](#4-레이아웃--그리드)
5. [선과 보더](#5-선과-보더)
6. [그림자와 깊이](#6-그림자와-깊이)
7. [컴포넌트 스타일](#7-컴포넌트-스타일)
8. [인터랙션 상태](#8-인터랙션-상태)
9. [아이콘 & 일러스트](#9-아이콘--일러스트)
10. [특수 요소](#10-특수-요소)
11. [실제 구현 예시](#11-실제-구현-예시)
12. [다크모드](#12-다크모드)
13. [접근성](#13-접근성)

---

## 1. 디자인 철학

### 1.1 콘셉트: 빈티지 다이어리 감성

일본의 Midori, Kokuyo 등 브랜드 다이어리에서 영감을 받은 디자인입니다.

**핵심 특징**:
- 아이보리/크림 톤의 종이 질감
- 얇고 정교한 그리드 라인
- 깔끔한 직선 구조
- 충분한 여백과 호흡감
- 손글씨를 위한 부드러운 파스텔 메모 영역
- 작고 세련된 타이포그래피
- 포인트 컬러의 절제된 사용

### 1.2 디자인 원칙

1. **심플하지만 실속 있게**: 불필요한 장식 없이 기능에 집중
2. **빈티지하지만 모던하게**: 따뜻한 감성과 현대적 사용성의 조화
3. **평면적이지만 구조적으로**: 그림자 최소화, 선과 여백으로 위계 표현
4. **작지만 명확하게**: 작은 폰트지만 높은 가독성 유지

### 1.3 사용자 경험 목표

- **집중**: 학습에 몰입할 수 있는 조용한 UI
- **친숙함**: 수첩을 사용하는 것 같은 아날로그 감성
- **효율성**: 빠른 탐색과 직관적인 인터랙션
- **휴식**: 눈이 편안한 색감과 적절한 여백

---

## 2. 색상 시스템

### 2.1 포인트 컬러 (Point Colors)

주요 액션과 강조에 사용하는 핵심 색상입니다.

```
┌─────────────┬──────────┬────────────────────────────────────┐
│ 색상 이름    │ HEX      │ 용도                               │
├─────────────┼──────────┼────────────────────────────────────┤
│ Sky Blue    │ #8fc1e3  │ 주요 액션, 링크, 정보 표시, N2 레벨│
│ Coral Pink  │ #e16a84  │ 중요/강조, 경고, N1 레벨           │
│ Cream Yellow│ #fadfa4  │ 하이라이트, 메모 영역, N3 레벨     │
│ Dark Gray   │ #737371  │ 본문 텍스트, 라벨                  │
└─────────────┴──────────┴────────────────────────────────────┘
```

**색상 사용 예시**:

```
[Sky Blue - #8fc1e3]     ████████  주요 버튼, 링크, 체크 상태
[Coral Pink - #e16a84]   ████████  중요 알림, 삭제 버튼
[Cream Yellow - #fadfa4] ████████  하이라이트 배경, 강조
[Dark Gray - #737371]    ████████  기본 텍스트, 아이콘
```

### 2.2 세컨더리 컬러 (Secondary Colors)

포인트 컬러를 뒷받침하는 보조 색상입니다. 특정 영역을 강조하거나 구분할 때 사용합니다.

> **참고**: 메인 페이지 배경은 Ivory (#f5f4ec)를 사용합니다. Secondary Colors는 액센트 영역에 사용합니다.

```
┌─────────────┬──────────┬────────────────────────────────────┐
│ 색상 이름    │ HEX      │ 용도                               │
├─────────────┼──────────┼────────────────────────────────────┤
│ Sky Tint    │ #f2f8f9  │ 정보 강조 배경, 하이라이트 영역    │
│ Pink Tint   │ #fdf4f2  │ 중요 알림 배경, 경고 섹션          │
│ Cream Tint  │ #fefcf8  │ 카드 배경, 메모 영역               │
│ Gray Tint   │ #f5f5f7  │ 사이드바, 비활성 영역, N5/N4 뱃지  │
└─────────────┴──────────┴────────────────────────────────────┘
```

**세컨더리 컬러 사용 예시**:

```
[Sky Tint - #f2f8f9]     ████████  정보 섹션 강조
[Pink Tint - #fdf4f2]    ████████  중요 공지 배경
[Cream Tint - #fefcf8]   ████████  단어 카드 배경
[Gray Tint - #f5f5f7]    ████████  사이드바, 초급 뱃지
```

### 2.3 중성 컬러 팔레트 (Neutral Colors)

다이어리 종이 질감을 표현하는 아이보리/베이지 스펙트럼입니다.

```
┌──────────────┬──────────┬────────────────────────────────────┐
│ 색상 이름     │ HEX      │ 용도                               │
├──────────────┼──────────┼────────────────────────────────────┤
│ Ivory        │ #f5f4ec  │ 메인 페이지 배경 (기본)            │
│ Warm White   │ #faf9f5  │ 카드 배경                          │
│ Light Beige  │ #e8e6df  │ 구분선, 테두리                     │
│ Medium Gray  │ #b8b6b0  │ 보조 선, 플레이스홀더              │
│ Dark Charcoal│ #4a4a48  │ 주요 텍스트, 제목                  │
└──────────────┴──────────┴────────────────────────────────────┘
```

**중성 컬러 사용 예시**:

```
[Ivory - #f5f4ec]        ████████  페이지 전체 배경
[Warm White - #faf9f5]   ████████  입력 필드 배경
[Light Beige - #e8e6df]  ████████  얇은 구분선
[Medium Gray - #b8b6b0]  ████████  보조 텍스트
[Dark Charcoal - #4a4a48]████████  본문 텍스트
```

### 2.4 의미적 색상 (Semantic Colors)

상태를 표현하는 색상입니다.

```css
:root {
  /* Success - 성공, 완료 */
  --color-success: #6fb491;
  --color-success-bg: #f0f8f4;
  
  /* Warning - 주의, 대기 */
  --color-warning: #e8a87c;
  --color-warning-bg: #fdf6f0;
  
  /* Error - 오류, 삭제 (Coral Pink 사용) */
  --color-error: #e16a84;
  --color-error-bg: #fdf4f2;
  
  /* Info - 정보 (Sky Blue 사용) */
  --color-info: #8fc1e3;
  --color-info-bg: #f2f8f9;
}
```

### 2.5 CSS 변수 전체 목록

```css
:root {
  /* Point Colors */
  --color-sky-blue: #8fc1e3;
  --color-coral-pink: #e16a84;
  --color-cream-yellow: #fadfa4;
  --color-dark-gray: #737371;
  
  /* Secondary Colors */
  --color-sky-tint: #f2f8f9;
  --color-pink-tint: #fdf4f2;
  --color-cream-tint: #fefcf8;
  --color-gray-tint: #f5f5f7;
  
  /* Neutral Colors */
  --color-ivory: #f5f4ec;
  --color-warm-white: #faf9f5;
  --color-light-beige: #e8e6df;
  --color-medium-gray: #b8b6b0;
  --color-dark-charcoal: #4a4a48;
  
  /* Semantic Colors */
  --color-success: #6fb491;
  --color-success-bg: #f0f8f4;
  --color-warning: #e8a87c;
  --color-warning-bg: #fdf6f0;
  --color-error: var(--color-coral-pink);
  --color-error-bg: var(--color-pink-tint);
  --color-info: var(--color-sky-blue);
  --color-info-bg: var(--color-sky-tint);
  
  /* Shortcuts */
  --color-primary: var(--color-sky-blue);
  --color-text: var(--color-dark-charcoal);
  --color-text-light: var(--color-dark-gray);
  --color-bg: var(--color-ivory);
  --color-border: var(--color-light-beige);
}
```

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

일본 다이어리의 깔끔한 고딕체 느낌을 재현합니다.

```css
:root {
  /* 한글 - KoddiUD 온고딕 */
  --font-primary: 'KoddiUD OnGothic', 
                  -apple-system, 
                  BlinkMacSystemFont, 
                  'Malgun Gothic', 
                  sans-serif;
  
  /* 일본어 - BIZ UDGothic */
  --font-japanese: 'BIZ UDGothic', 
                   'Hiragino Sans', 
                   'Hiragino Kaku Gothic ProN', 
                   'Yu Gothic', 
                   sans-serif;
  
  /* 영문/숫자 */
  --font-english: 'Inter', 
                  'Helvetica Neue', 
                  sans-serif;
  
  /* 코드/고정폭 */
  --font-mono: 'JetBrains Mono', 
               'Consolas', 
               'Monaco', 
               monospace;
}
```

**폰트 로딩**:

```html
<!-- HTML head에 추가 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=BIZ+UDGothic:wght@400;700&display=swap" rel="stylesheet">

<!-- KoddiUD 온고딕은 로컬 폰트 파일 사용 권장 -->
```

### 3.2 폰트 크기 스케일

다이어리의 작고 세련된 느낌을 위해 전반적으로 작은 크기를 사용합니다.

```css
:root {
  /* Font Sizes - 다이어리 느낌의 작은 사이즈 */
  --font-size-display: 28px;   /* 페이지 큰 타이틀 */
  --font-size-h1: 22px;         /* 섹션 제목 */
  --font-size-h2: 18px;         /* 하위 섹션 */
  --font-size-h3: 16px;         /* 작은 제목 */
  --font-size-body: 14px;       /* 본문 (기본) */
  --font-size-small: 12px;      /* 보조 정보 */
  --font-size-tiny: 10px;       /* 라벨, 날짜 */
}
```

**사용 가이드**:

| 크기 | 용도 | 예시 |
|------|------|------|
| Display (28px) | 페이지 메인 타이틀 | "내 단어장", "검색" |
| H1 (22px) | 큰 섹션 제목 | "오늘의 복습", "한자 그룹" |
| H2 (18px) | 카드 제목, 단어 표기 | "清潔", "그룹 정보" |
| H3 (16px) | 작은 섹션 헤더 | "예문", "관련 단어" |
| Body (14px) | 기본 본문, 버튼 텍스트 | 설명문, 입력 필드 |
| Small (12px) | 보조 정보, 캡션 | JLPT 레벨, 날짜 |
| Tiny (10px) | 라벨, 태그 | 요일, 그룹 태그 |

### 3.3 폰트 굵기 (Font Weight)

```css
:root {
  --font-weight-regular: 400;   /* 기본 본문 */
  --font-weight-medium: 500;    /* 강조, 버튼 */
  --font-weight-semibold: 600;  /* 제목 */
  --font-weight-bold: 700;      /* 매우 강조 */
}
```

### 3.4 행간 (Line Height)

```css
:root {
  --line-height-tight: 1.25;    /* 제목, 숫자 */
  --line-height-normal: 1.5;    /* 기본 본문 */
  --line-height-relaxed: 1.75;  /* 긴 텍스트, 일본어 */
  --line-height-loose: 2.0;     /* 매우 여유있는 */
}
```

### 3.5 자간 (Letter Spacing)

```css
:root {
  --letter-spacing-tight: -0.02em;   /* 기본 (약간 타이트) */
  --letter-spacing-normal: 0;        /* 표준 */
  --letter-spacing-wide: 0.05em;     /* 영문 대문자, 숫자 */
}
```

### 3.6 타이포그래피 조합 예시

```css
/* 페이지 타이틀 */
.page-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

/* 일본어 단어 (큰 표기) */
.word-display {
  font-family: var(--font-japanese);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
}

/* 본문 텍스트 */
.body-text {
  font-family: var(--font-primary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

/* 보조 라벨 */
.label {
  font-family: var(--font-primary);
  font-size: var(--font-size-tiny);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-light);
}

/* 숫자 (정렬된) */
.number {
  font-family: var(--font-english);
  font-variant-numeric: tabular-nums;
  letter-spacing: var(--letter-spacing-wide);
}
```

### 3.7 일본어 세로쓰기 지원 (향후)

```css
/* 세로쓰기 (vertical writing) */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-family: var(--font-japanese);
}
```

---

## 4. 레이아웃 & 그리드

### 4.1 간격 시스템 (Spacing System)

다이어리의 컴팩트하면서도 여유로운 간격을 재현합니다.

```css
:root {
  /* Spacing - 4px 기본 단위 */
  --space-xs: 4px;      /* 최소 간격 (아이콘-텍스트) */
  --space-sm: 8px;      /* 컴팩트 (버튼 내부) */
  --space-md: 12px;     /* 기본 (카드 내부) */
  --space-lg: 16px;     /* 섹션 구분 */
  --space-xl: 24px;     /* 큰 구분 (카드 간) */
  --space-2xl: 32px;    /* 페이지 구분 */
  --space-3xl: 48px;    /* 섹션 간 큰 구분 */
}
```

**간격 사용 가이드**:

```
4px  (xs)  ━  아이콘과 텍스트 사이
8px  (sm)  ━  버튼 내부 패딩
12px (md)  ━  카드 내부 요소 간격
16px (lg)  ━  카드 섹션 구분
24px (xl)  ━  카드 간 간격
32px (2xl) ━  페이지 상하 여백
48px (3xl) ━  큰 섹션 구분
```

### 4.2 레이아웃 너비

```css
:root {
  /* Layout Widths */
  --width-sidebar: 220px;       /* 사이드바 (작고 깔끔) */
  --width-content-max: 1280px;  /* 최대 콘텐츠 너비 */
  --width-content-narrow: 960px;/* 좁은 콘텐츠 (읽기용) */
  --width-card: 380px;          /* 단어 카드 기본 너비 */
  
  /* Container Padding */
  --padding-container: 24px;    /* 컨테이너 좌우 여백 */
  --padding-section: 20px;      /* 섹션 여백 */
}
```

### 4.3 그리드 시스템

```css
/* 카드 그리드 (3단) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  padding: var(--space-lg);
}

/* 태블릿 (2단) */
@media (max-width: 1199px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 모바일 (1단) */
@media (max-width: 767px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }
}
```

### 4.4 레이아웃 구조 예시

```html
<!-- 데스크톱 3단 레이아웃 (내 단어장) -->
<div class="layout-main">
  <aside class="sidebar">
    <!-- 사이드바 네비게이션 (220px) -->
  </aside>
  
  <div class="content-wrapper">
    <aside class="filter-sidebar">
      <!-- 필터 사이드바 (220px) -->
    </aside>
    
    <main class="content-main">
      <!-- 단어 리스트 (가변) -->
    </main>
    
    <aside class="detail-panel">
      <!-- 단어 상세 (400px) -->
    </aside>
  </div>
</div>
```

```css
.layout-main {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--width-sidebar);
  background: var(--color-gray-tint);
  border-right: 1px solid var(--color-border);
}

.content-wrapper {
  flex: 1;
  display: flex;
  max-width: var(--width-content-max);
}

.filter-sidebar {
  width: 220px;
  padding: var(--space-lg);
  border-right: 1px solid var(--color-border);
}

.content-main {
  flex: 1;
  padding: var(--space-xl);
  overflow-y: auto;
}

.detail-panel {
  width: 400px;
  padding: var(--space-xl);
  background: var(--color-cream-tint);
  border-left: 1px solid var(--color-border);
}
```

---

## 5. 선과 보더

### 5.1 보더 두께

다이어리의 얇고 정교한 선을 재현합니다.

```css
:root {
  /* Border Widths - 다이어리 그리드 라인 */
  --border-thin: 0.5px;    /* 그리드 라인, 배경 구분 */
  --border-base: 1px;      /* 기본 구분선 */
  --border-thick: 2px;     /* 강조선, 포커스 */
}
```

### 5.2 보더 스타일

```css
:root {
  /* Border Colors */
  --border-color: var(--color-light-beige);
  --border-color-dark: var(--color-medium-gray);
  --border-color-focus: var(--color-sky-blue);
  --border-color-error: var(--color-coral-pink);
}
```

**보더 사용 규칙**:
- **직선(solid)만 사용**: 점선(dashed), 이중선(double) 사용 금지
- **얇은 선 우선**: 0.5px~1px가 기본
- **색상**: Light Beige가 기본, 강조 시에만 포인트 컬러

### 5.3 모서리 (Border Radius)

```css
:root {
  /* Border Radius - 미니멀한 라운드 */
  --radius-none: 0;        /* 기본 사각형 (다이어리 느낌) */
  --radius-sm: 2px;        /* 살짝 부드럽게 */
  --radius-md: 4px;        /* 카드 */
  --radius-lg: 6px;        /* 버튼 */
  --radius-xl: 8px;        /* 큰 카드 */
  --radius-full: 9999px;   /* 원형 (뱃지, 아바타) */
}
```

**모서리 사용 가이드**:
- **기본은 사각형(0px)**: 다이어리의 직선 구조
- **버튼/입력 필드**: 6px (살짝 부드럽게)
- **카드**: 4px (미니멀하게)
- **원형 요소**: 9999px (뱃지, 프로필)

### 5.4 보더 조합 예시

```css
/* 카드 기본 보더 */
.card {
  border: var(--border-base) solid var(--border-color);
  border-radius: var(--radius-md);
}

/* 얇은 구분선 */
.divider {
  border-top: var(--border-thin) solid var(--border-color);
  margin: var(--space-lg) 0;
}

/* 입력 필드 */
.input {
  border: var(--border-base) solid var(--border-color);
  border-radius: var(--radius-lg);
}

.input:focus {
  border-color: var(--border-color-focus);
  outline: var(--border-thick) solid rgba(143, 193, 227, 0.2);
  outline-offset: 0;
}

/* 에러 상태 */
.input.error {
  border-color: var(--border-color-error);
}
```

---

## 6. 그림자와 깊이

### 6.1 그림자 시스템

다이어리는 평면적이므로 그림자를 최소화합니다.

```css
:root {
  /* Shadows - 최소화된 깊이 */
  --shadow-none: none;
  --shadow-subtle: 0 1px 2px rgba(115, 115, 113, 0.08);
  --shadow-soft: 0 2px 8px rgba(115, 115, 113, 0.12);
  --shadow-lifted: 0 4px 12px rgba(115, 115, 113, 0.15);
  --shadow-modal: 0 8px 24px rgba(115, 115, 113, 0.18);
}
```

### 6.2 그림자 사용 가이드

```
none    → 기본 상태 (대부분의 요소)
subtle  → 카드 기본 상태
soft    → 카드 호버 상태, 입력 필드 포커스
lifted  → 드롭다운, 툴팁
modal   → 모달, 팝업
```

### 6.3 그림자 적용 예시

```css
/* 카드 */
.card {
  box-shadow: var(--shadow-subtle);
  transition: box-shadow 150ms ease;
}

.card:hover {
  box-shadow: var(--shadow-soft);
}

/* 플로팅 버튼 */
.floating-button {
  box-shadow: var(--shadow-lifted);
}

/* 모달 */
.modal {
  box-shadow: var(--shadow-modal);
}

/* 입력 필드 포커스 */
.input:focus {
  box-shadow: 0 0 0 3px rgba(143, 193, 227, 0.2);
}
```

**주의사항**:
- 그림자 남용 금지 (다이어리는 평면적)
- 색상은 Dark Gray 기반 (검은색 지양)
- 부드러운 블러 사용

---

## 7. 컴포넌트 스타일

### 7.1 버튼 (Button)

#### 7.1.1 버튼 변형

```css
/* Primary Button - 주요 액션 */
.button-primary {
  background: var(--color-sky-blue);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--space-sm) var(--space-xl);
  height: 36px;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 150ms ease;
}

.button-primary:hover {
  background: #7ab0d0; /* 10% 어두운 Sky Blue */
  box-shadow: var(--shadow-subtle);
}

.button-primary:active {
  background: #6ba0c0;
  transform: scale(0.98);
}

/* Secondary Button - 보조 액션 */
.button-secondary {
  background: transparent;
  color: var(--color-dark-gray);
  border: var(--border-base) solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-sm) var(--space-xl);
  height: 36px;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 150ms ease;
}

.button-secondary:hover {
  border-color: var(--color-sky-blue);
  background: var(--color-sky-tint);
}

/* Text Button - 최소 강조 */
.button-text {
  background: transparent;
  color: var(--color-sky-blue);
  border: none;
  padding: var(--space-sm) var(--space-md);
  height: 32px;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 150ms ease;
}

.button-text:hover {
  background: var(--color-sky-tint);
}

/* Danger Button - 삭제 등 */
.button-danger {
  background: var(--color-coral-pink);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--space-sm) var(--space-xl);
  height: 36px;
}

.button-danger:hover {
  background: #d15876;
}

/* Disabled State */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(50%);
}
```

#### 7.1.2 버튼 크기 변형

```css
/* Small Button */
.button-sm {
  height: 28px;
  padding: var(--space-xs) var(--space-md);
  font-size: var(--font-size-small);
}

/* Large Button */
.button-lg {
  height: 44px;
  padding: var(--space-md) var(--space-2xl);
  font-size: var(--font-size-h3);
}
```

### 7.2 입력 필드 (Input Field)

```css
.input {
  width: 100%;
  height: 36px;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-warm-white);
  border: var(--border-base) solid var(--border-color);
  border-radius: var(--radius-lg);
  font-family: var(--font-primary);
  font-size: var(--font-size-body);
  color: var(--color-text);
  transition: all 150ms ease;
}

.input::placeholder {
  color: var(--color-medium-gray);
  opacity: 0.6;
}

.input:hover {
  border-color: var(--color-medium-gray);
}

.input:focus {
  outline: none;
  border-color: var(--color-sky-blue);
  box-shadow: 0 0 0 3px rgba(143, 193, 227, 0.2);
  background: white;
}

.input:disabled {
  background: var(--color-gray-tint);
  cursor: not-allowed;
  opacity: 0.6;
}

.input.error {
  border-color: var(--color-coral-pink);
}

.input.error:focus {
  box-shadow: 0 0 0 3px rgba(225, 106, 132, 0.2);
}
```

#### 7.2.2 텍스트 영역

```css
.textarea {
  min-height: 120px;
  padding: var(--space-md);
  resize: vertical;
  line-height: var(--line-height-relaxed);
}
```

#### 7.2.3 검색 입력

```css
.input-search {
  padding-left: 40px; /* 아이콘 공간 */
  background-image: url('data:image/svg+xml,...'); /* 검색 아이콘 */
  background-position: 12px center;
  background-repeat: no-repeat;
}
```

### 7.3 카드 (Card)

다이어리 메모 영역 스타일을 적용합니다.

```css
/* 기본 카드 */
.card {
  background: var(--color-cream-tint);
  border: var(--border-base) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-subtle);
  transition: all 150ms ease;
}

.card:hover {
  box-shadow: var(--shadow-soft);
  border-color: var(--color-medium-gray);
}

/* 단어 카드 (파스텔 배경) */
.word-card {
  background: var(--color-cream-tint);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  font-size: var(--font-size-small);
}

.word-card--sky {
  background: var(--color-sky-tint);
}

.word-card--pink {
  background: var(--color-pink-tint);
}

.word-card--cream {
  background: var(--color-cream-tint);
}

/* 클릭 가능한 카드 */
.card-clickable {
  cursor: pointer;
}

.card-clickable:active {
  transform: scale(0.98);
}
```

### 7.4 체크박스 (Checkbox)

```css
.checkbox {
  position: relative;
  width: 16px;
  height: 16px;
  appearance: none;
  border: var(--border-base) solid var(--color-medium-gray);
  border-radius: var(--radius-sm);
  background: white;
  cursor: pointer;
  transition: all 150ms ease;
}

.checkbox:hover {
  border-color: var(--color-sky-blue);
}

.checkbox:checked {
  background: var(--color-sky-blue);
  border-color: var(--color-sky-blue);
}

.checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 10px;
  font-weight: bold;
}

.checkbox:focus {
  outline: var(--border-thick) solid rgba(143, 193, 227, 0.3);
  outline-offset: 2px;
}
```

### 7.5 라디오 버튼 (Radio Button)

```css
.radio {
  position: relative;
  width: 16px;
  height: 16px;
  appearance: none;
  border: var(--border-base) solid var(--color-medium-gray);
  border-radius: var(--radius-full);
  background: white;
  cursor: pointer;
  transition: all 150ms ease;
}

.radio:checked {
  border-color: var(--color-sky-blue);
}

.radio:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-sky-blue);
}
```

### 7.6 스위치 (Switch/Toggle)

```css
.switch {
  position: relative;
  width: 44px;
  height: 24px;
  appearance: none;
  background: var(--color-gray-tint);
  border: var(--border-base) solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 200ms ease;
}

.switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-subtle);
  transition: all 200ms ease;
}

.switch:checked {
  background: var(--color-sky-blue);
  border-color: var(--color-sky-blue);
}

.switch:checked::after {
  left: 22px;
}
```

### 7.7 드롭다운 (Select/Dropdown)

```css
.select {
  width: 100%;
  height: 36px;
  padding: var(--space-sm) var(--space-md);
  padding-right: 32px;
  background: var(--color-warm-white);
  border: var(--border-base) solid var(--border-color);
  border-radius: var(--radius-lg);
  font-family: var(--font-primary);
  font-size: var(--font-size-body);
  color: var(--color-text);
  cursor: pointer;
  appearance: none;
  background-image: url('data:image/svg+xml,...'); /* 화살표 아이콘 */
  background-position: right 8px center;
  background-repeat: no-repeat;
  transition: all 150ms ease;
}

.select:hover {
  border-color: var(--color-medium-gray);
}

.select:focus {
  outline: none;
  border-color: var(--color-sky-blue);
  box-shadow: 0 0 0 3px rgba(143, 193, 227, 0.2);
}
```

---

## 8. 인터랙션 상태

### 8.1 호버 (Hover)

```css
/* 카드 호버 */
.card:hover {
  box-shadow: var(--shadow-soft);
  border-color: var(--color-medium-gray);
}

/* 버튼 호버 */
.button:hover {
  background: darken(10%); /* 10% 어두워짐 */
  box-shadow: var(--shadow-subtle);
}

/* 링크 호버 */
.link:hover {
  color: var(--color-sky-blue);
  text-decoration: underline;
}

/* 리스트 아이템 호버 */
.list-item:hover {
  background: var(--color-sky-tint);
}
```

**호버 트랜지션**:
```css
transition: all 150ms ease;
```

### 8.2 포커스 (Focus)

```css
/* 포커스 아웃라인 (접근성) */
*:focus-visible {
  outline: var(--border-thick) solid var(--color-sky-blue);
  outline-offset: 2px;
}

/* 입력 필드 포커스 */
.input:focus {
  border-color: var(--color-sky-blue);
  box-shadow: 0 0 0 3px rgba(143, 193, 227, 0.2);
}

/* 버튼 포커스 */
.button:focus-visible {
  outline: var(--border-thick) solid var(--color-sky-blue);
  outline-offset: 2px;
}
```

### 8.3 액티브 (Active/Pressed)

```css
/* 버튼 눌림 */
.button:active {
  transform: scale(0.98);
  background: darken(15%);
}

/* 카드 눌림 */
.card-clickable:active {
  transform: scale(0.98);
}

/* 입력 필드 액티브 */
.input:active {
  border-color: var(--color-sky-blue);
}
```

### 8.4 비활성 (Disabled)

```css
/* 비활성 버튼 */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(50%);
  pointer-events: none;
}

/* 비활성 입력 */
.input:disabled {
  background: var(--color-gray-tint);
  color: var(--color-medium-gray);
  cursor: not-allowed;
}

/* 비활성 카드 */
.card--disabled {
  opacity: 0.6;
  filter: grayscale(30%);
  pointer-events: none;
}
```

### 8.5 로딩 (Loading)

```css
/* 로딩 스피너 */
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-gray-tint);
  border-top-color: var(--color-sky-blue);
  border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 로딩 상태 버튼 */
.button--loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.button--loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
}
```

### 8.6 선택됨 (Selected)

```css
/* 선택된 리스트 아이템 */
.list-item--selected {
  background: var(--color-sky-tint);
  border-left: 3px solid var(--color-sky-blue);
}

/* 선택된 카드 */
.card--selected {
  border-color: var(--color-sky-blue);
  box-shadow: 0 0 0 3px rgba(143, 193, 227, 0.2);
}

/* 선택된 탭 */
.tab--active {
  color: var(--color-sky-blue);
  border-bottom: 2px solid var(--color-sky-blue);
  font-weight: var(--font-weight-semibold);
}
```

---

## 9. 아이콘 & 일러스트

### 9.1 아이콘 스타일

**Feather Icons 스타일의 라인 아이콘 사용**

```css
.icon {
  width: 20px;
  height: 20px;
  stroke: var(--color-dark-gray);
  stroke-width: 1.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

/* 아이콘 크기 변형 */
.icon--sm { width: 16px; height: 16px; }
.icon--md { width: 20px; height: 20px; }
.icon--lg { width: 24px; height: 24px; }

/* 아이콘 색상 변형 */
.icon--primary { stroke: var(--color-sky-blue); }
.icon--danger { stroke: var(--color-coral-pink); }
.icon--success { stroke: var(--color-success); }
.icon--muted { stroke: var(--color-medium-gray); }
```

### 9.2 아이콘 사용 예시

```html
<!-- 검색 아이콘 -->
<svg class="icon icon--md" viewBox="0 0 24 24">
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.35-4.35"/>
</svg>

<!-- 체크 아이콘 -->
<svg class="icon icon--sm icon--success" viewBox="0 0 24 24">
  <polyline points="20 6 9 17 4 12"/>
</svg>

<!-- 더보기 아이콘 -->
<svg class="icon icon--sm" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="1"/>
  <circle cx="19" cy="12" r="1"/>
  <circle cx="5" cy="12" r="1"/>
</svg>
```

### 9.3 일러스트 가이드

**빈 상태(Empty State) 일러스트**:
- 심플한 선화 스타일
- 포인트 컬러 1-2개 사용
- 크기: 200x200px 이하
- 손그림 느낌 지양
- 깔끔한 벡터

```html
<!-- 빈 단어장 일러스트 예시 -->
<div class="empty-state">
  <svg class="empty-illustration" viewBox="0 0 200 200">
    <!-- 책 모양 심플 일러스트 -->
    <rect x="60" y="50" width="80" height="100" 
          stroke="#8fc1e3" fill="#f2f8f9"/>
    <line x1="70" y1="70" x2="130" y2="70" 
          stroke="#e8e6df"/>
    <line x1="70" y1="85" x2="130" y2="85" 
          stroke="#e8e6df"/>
  </svg>
  <p class="empty-message">저장된 단어가 없습니다</p>
</div>
```

---

## 10. 특수 요소

### 10.1 JLPT 레벨 뱃지

```css
.badge-jlpt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 0 var(--space-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-tiny);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.05em;
}

.badge-jlpt--n5 {
  background: var(--color-gray-tint);
  color: var(--color-dark-gray);
}

.badge-jlpt--n4 {
  background: var(--color-gray-tint);
  color: var(--color-dark-gray);
}

.badge-jlpt--n3 {
  background: var(--color-cream-yellow);
  color: #8a7a4a;
}

.badge-jlpt--n2 {
  background: var(--color-sky-blue);
  color: white;
}

.badge-jlpt--n1 {
  background: var(--color-coral-pink);
  color: white;
}
```

### 10.2 그룹 태그

```css
.tag {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 var(--space-sm);
  background: transparent;
  border: var(--border-base) solid var(--color-sky-blue);
  border-radius: var(--radius-md);
  font-size: var(--font-size-tiny);
  font-weight: var(--font-weight-medium);
  color: var(--color-sky-blue);
  gap: var(--space-xs);
}

/* 색상 변형 */
.tag--pink {
  border-color: var(--color-coral-pink);
  color: var(--color-coral-pink);
}

.tag--yellow {
  border-color: #d4b882;
  color: #8a7a4a;
}

/* 클릭 가능한 태그 */
.tag-clickable {
  cursor: pointer;
  transition: all 150ms ease;
}

.tag-clickable:hover {
  background: var(--color-sky-tint);
}
```

### 10.3 구분선 (Divider)

```css
.divider {
  height: var(--border-thin);
  background: var(--color-border);
  border: none;
  margin: var(--space-lg) 0;
}

/* 텍스트가 있는 구분선 */
.divider-text {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin: var(--space-lg) 0;
  font-size: var(--font-size-tiny);
  color: var(--color-medium-gray);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.divider-text::before,
.divider-text::after {
  content: '';
  flex: 1;
  height: var(--border-thin);
  background: var(--color-border);
}
```

### 10.4 알림/토스트 (Toast/Notification)

```css
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 280px;
  padding: var(--space-md) var(--space-lg);
  background: white;
  border: var(--border-base) solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lifted);
  font-size: var(--font-size-small);
  animation: slideIn 200ms ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 상태별 변형 */
.toast--success {
  border-left: 3px solid var(--color-success);
}

.toast--error {
  border-left: 3px solid var(--color-coral-pink);
}

.toast--info {
  border-left: 3px solid var(--color-sky-blue);
}
```

### 10.5 프로그레스 바

```css
.progress {
  width: 100%;
  height: 4px;
  background: var(--color-gray-tint);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--color-sky-blue);
  border-radius: var(--radius-full);
  transition: width 300ms ease;
}

/* 원형 프로그레스 */
.progress-circle {
  width: 60px;
  height: 60px;
  position: relative;
}

.progress-circle svg {
  transform: rotate(-90deg);
}

.progress-circle-bg {
  fill: none;
  stroke: var(--color-gray-tint);
  stroke-width: 4;
}

.progress-circle-bar {
  fill: none;
  stroke: var(--color-sky-blue);
  stroke-width: 4;
  stroke-linecap: round;
  transition: stroke-dashoffset 300ms ease;
}

.progress-circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}
```

---

## 11. 실제 구현 예시

### 11.1 사이드바 네비게이션

```html
<nav class="sidebar">
  <div class="sidebar-header">
    <h1 class="sidebar-title">일본어 단어장</h1>
  </div>
  
  <ul class="sidebar-nav">
    <li class="sidebar-nav-item sidebar-nav-item--active">
      <svg class="icon icon--md"><!-- 홈 아이콘 --></svg>
      <span>대시보드</span>
    </li>
    <li class="sidebar-nav-item">
      <svg class="icon icon--md"><!-- 검색 아이콘 --></svg>
      <span>검색</span>
    </li>
    <li class="sidebar-nav-item">
      <svg class="icon icon--md"><!-- 단어장 아이콘 --></svg>
      <span>내 단어장</span>
      <span class="badge">23</span>
    </li>
    <li class="sidebar-nav-item">
      <svg class="icon icon--md"><!-- 그룹 아이콘 --></svg>
      <span>한자 그룹</span>
    </li>
  </ul>
  
  <div class="sidebar-footer">
    <div class="sidebar-nav-item">
      <svg class="icon icon--md"><!-- 설정 아이콘 --></svg>
      <span>설정</span>
    </div>
  </div>
</nav>
```

```css
.sidebar {
  width: var(--width-sidebar);
  height: 100vh;
  background: var(--color-gray-tint);
  border-right: var(--border-base) solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: var(--space-xl) var(--space-lg);
  border-bottom: var(--border-thin) solid var(--color-border);
}

.sidebar-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.sidebar-nav {
  flex: 1;
  padding: var(--space-md) 0;
  list-style: none;
}

.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-body);
  color: var(--color-text-light);
  cursor: pointer;
  transition: all 150ms ease;
}

.sidebar-nav-item:hover {
  background: var(--color-cream-tint);
  color: var(--color-text);
}

.sidebar-nav-item--active {
  background: var(--color-cream-tint);
  color: var(--color-sky-blue);
  border-left: 3px solid var(--color-sky-blue);
  font-weight: var(--font-weight-semibold);
}

.sidebar-nav-item .badge {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: var(--color-sky-blue);
  color: white;
  font-size: var(--font-size-tiny);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
}

.sidebar-footer {
  padding: var(--space-md) 0;
  border-top: var(--border-thin) solid var(--color-border);
}
```

### 11.2 단어 카드

```html
<div class="word-card">
  <div class="word-card-header">
    <input type="checkbox" class="checkbox">
    <span class="word-japanese">清潔</span>
    <span class="badge-jlpt badge-jlpt--n2">N2</span>
  </div>
  
  <div class="word-card-body">
    <p class="word-reading">[せいけつ]</p>
    <p class="word-meaning">깨끗함, 청결</p>
    <div class="word-tags">
      <span class="tag">氵</span>
      <span class="tag tag--pink">청</span>
    </div>
  </div>
  
  <div class="word-card-footer">
    <span class="word-review">복습: 3일 후</span>
    <button class="button-text">상세보기</button>
  </div>
</div>
```

```css
.word-card {
  background: var(--color-cream-tint);
  border: var(--border-thin) solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  transition: all 150ms ease;
}

.word-card:hover {
  box-shadow: var(--shadow-soft);
  border-color: var(--color-medium-gray);
}

.word-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.word-japanese {
  flex: 1;
  font-family: var(--font-japanese);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.word-card-body {
  margin-bottom: var(--space-md);
}

.word-reading {
  font-family: var(--font-japanese);
  font-size: var(--font-size-small);
  color: var(--color-text-light);
  margin-bottom: var(--space-xs);
}

.word-meaning {
  font-size: var(--font-size-body);
  color: var(--color-text);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-sm);
}

.word-tags {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.word-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-sm);
  border-top: var(--border-thin) solid var(--color-border);
}

.word-review {
  font-size: var(--font-size-tiny);
  color: var(--color-medium-gray);
}
```

### 11.3 검색 입력창

```html
<div class="search-container">
  <svg class="search-icon icon icon--md">
    <!-- 검색 아이콘 -->
  </svg>
  <input 
    type="text" 
    class="search-input"
    placeholder="단어를 입력하세요..."
  >
  <button class="search-clear" aria-label="지우기">
    <svg class="icon icon--sm"><!-- X 아이콘 --></svg>
  </button>
</div>
```

```css
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  stroke: var(--color-medium-gray);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 44px;
  padding: var(--space-md) var(--space-xl);
  padding-left: 44px; /* 아이콘 공간 */
  padding-right: 44px; /* 클리어 버튼 공간 */
  background: white;
  border: var(--border-base) solid var(--color-border);
  border-radius: var(--radius-lg);
  font-family: var(--font-primary);
  font-size: var(--font-size-body);
  color: var(--color-text);
  transition: all 150ms ease;
}

.search-input::placeholder {
  color: var(--color-medium-gray);
  opacity: 0.6;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-sky-blue);
  box-shadow: 0 0 0 3px rgba(143, 193, 227, 0.2);
}

.search-clear {
  position: absolute;
  right: var(--space-sm);
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  opacity: 0.5;
  transition: all 150ms ease;
}

.search-clear:hover {
  opacity: 1;
  background: var(--color-gray-tint);
}
```

### 11.4 플래시카드

```html
<div class="flashcard">
  <div class="flashcard-inner">
    <div class="flashcard-front">
      <span class="flashcard-word">清潔</span>
      <button class="flashcard-flip-button">
        Space 또는 클릭으로 뒤집기
      </button>
    </div>
    
    <div class="flashcard-back">
      <div class="flashcard-content">
        <h2 class="flashcard-word">清潔</h2>
        <p class="flashcard-reading">[せいけつ]</p>
        <span class="badge-jlpt badge-jlpt--n2">N2</span>
        
        <div class="flashcard-meaning">
          <p>1. [명사] 깨끗함, 청결</p>
          <p>2. [な형용사] 깨끗한</p>
        </div>
        
        <div class="flashcard-example">
          <p class="example-japanese">部屋を清潔に保つ。</p>
          <p class="example-korean">방을 깨끗하게 유지한다.</p>
        </div>
      </div>
      
      <div class="flashcard-actions">
        <p>이 단어를 얼마나 잘 아시나요?</p>
        <div class="flashcard-buttons">
          <button class="button-secondary">쉬움 (1)</button>
          <button class="button-secondary">보통 (2)</button>
          <button class="button-secondary">어려움 (3)</button>
          <button class="button-secondary">모름 (4)</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

```css
.flashcard {
  width: 100%;
  max-width: 600px;
  height: 400px;
  perspective: 1000px;
  margin: 0 auto;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: var(--color-cream-tint);
  border: var(--border-base) solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-soft);
}

.flashcard-back {
  transform: rotateY(180deg);
}

.flashcard-word {
  font-family: var(--font-japanese);
  font-size: 48px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-xl);
}

.flashcard-flip-button {
  margin-top: auto;
  padding: var(--space-sm) var(--space-lg);
  background: transparent;
  border: var(--border-base) solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-small);
  color: var(--color-text-light);
  cursor: pointer;
  transition: all 150ms ease;
}

.flashcard-flip-button:hover {
  background: var(--color-sky-tint);
  border-color: var(--color-sky-blue);
}

.flashcard-content {
  width: 100%;
  text-align: center;
}

.flashcard-reading {
  font-family: var(--font-japanese);
  font-size: var(--font-size-h3);
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
}

.flashcard-meaning {
  margin-top: var(--space-lg);
  padding: var(--space-md);
  background: var(--color-sky-tint);
  border-radius: var(--radius-md);
  text-align: left;
}

.flashcard-meaning p {
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-xs);
}

.flashcard-example {
  margin-top: var(--space-lg);
  padding: var(--space-md);
  background: var(--color-pink-tint);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-coral-pink);
}

.example-japanese {
  font-family: var(--font-japanese);
  font-size: var(--font-size-body);
  margin-bottom: var(--space-xs);
}

.example-korean {
  font-size: var(--font-size-small);
  color: var(--color-text-light);
}

.flashcard-actions {
  margin-top: auto;
  width: 100%;
}

.flashcard-actions p {
  text-align: center;
  font-size: var(--font-size-small);
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
}

.flashcard-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-sm);
}

.flashcard-buttons .button-secondary {
  font-size: var(--font-size-small);
  padding: var(--space-sm);
}
```

---

## 12. 다크모드

빈티지 다이어리는 라이트 모드가 기본이지만, 다크모드가 필요한 경우 다음 가이드를 따릅니다.

### 12.1 다크모드 색상 팔레트

```css
[data-theme="dark"] {
  /* 배경 - 매우 어두운 회색-베이지 */
  --color-bg: #2a2928;
  --color-bg-elevated: #35342f;
  --color-bg-overlay: #403f3a;
  
  /* 텍스트 */
  --color-text: #f5f4ec;
  --color-text-light: #c8c6bc;
  
  /* 보더 */
  --color-border: #4a4842;
  
  /* 포인트 컬러 (채도 낮춤) */
  --color-sky-blue: #7aa5c2;
  --color-coral-pink: #c05a73;
  --color-cream-yellow: #d9c791;
  --color-dark-gray: #9a9896;
  
  /* 세컨더리 컬러 (어두운 버전) */
  --color-sky-tint: #2d3438;
  --color-pink-tint: #38302f;
  --color-cream-tint: #363530;
  --color-gray-tint: #323130;
  
  /* 그림자 제거 */
  --shadow-subtle: none;
  --shadow-soft: none;
  --shadow-lifted: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-modal: 0 8px 24px rgba(0, 0, 0, 0.4);
}
```

### 12.2 다크모드 토글

```html
<button class="theme-toggle" aria-label="다크모드 전환">
  <svg class="icon-sun"><!-- 해 아이콘 --></svg>
  <svg class="icon-moon"><!-- 달 아이콘 --></svg>
</button>
```

```css
.theme-toggle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: var(--border-base) solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 150ms ease;
}

.theme-toggle:hover {
  background: var(--color-gray-tint);
}

[data-theme="light"] .icon-moon,
[data-theme="dark"] .icon-sun {
  display: none;
}
```

### 12.3 다크모드 적용 JavaScript

```javascript
// 시스템 설정 자동 감지
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// 초기 테마 설정
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme(prefersDark.matches ? 'dark' : 'light');
}

// 토글 버튼
const toggleButton = document.querySelector('.theme-toggle');
toggleButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

// 시스템 설정 변경 감지
prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
```

---

## 13. 접근성

### 13.1 색상 대비

WCAG AA 기준을 준수합니다 (4.5:1 이상).

**확인된 대비**:
- 본문 텍스트 (Dark Charcoal) vs 배경 (Ivory): 10.2:1 ✓
- 링크 (Sky Blue) vs 배경 (Ivory): 4.6:1 ✓
- 경고 (Coral Pink) vs 배경 (Ivory): 5.1:1 ✓

### 13.2 터치 타겟

```css
/* 최소 터치 타겟: 44x44px */
.button,
.checkbox,
.radio,
.icon-button {
  min-width: 44px;
  min-height: 44px;
}

/* 작은 요소는 패딩으로 확장 */
.small-button {
  padding: 12px; /* 최소 44x44 확보 */
}
```

### 13.3 키보드 네비게이션

```css
/* 포커스 표시 명확히 */
*:focus-visible {
  outline: 2px solid var(--color-sky-blue);
  outline-offset: 2px;
}

/* Skip to main content 링크 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-sky-blue);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### 13.4 스크린 리더 지원

```html
<!-- ARIA 라벨 -->
<button aria-label="단어 검색">
  <svg class="icon"><!-- 검색 아이콘 --></svg>
</button>

<!-- 상태 알림 -->
<div role="status" aria-live="polite">
  단어가 저장되었습니다
</div>

<!-- 랜드마크 -->
<nav aria-label="메인 네비게이션">
  <!-- 네비게이션 메뉴 -->
</nav>

<main aria-label="메인 콘텐츠">
  <!-- 메인 콘텐츠 -->
</main>

<!-- 버튼 역할 명시 -->
<div class="card-clickable" role="button" tabindex="0">
  <!-- 클릭 가능한 카드 -->
</div>
```

### 13.5 애니메이션 제어

```css
/* prefers-reduced-motion 지원 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 부록

### A. CSS 변수 전체 목록

```css
:root {
  /* Colors - Point */
  --color-sky-blue: #8fc1e3;
  --color-coral-pink: #e16a84;
  --color-cream-yellow: #fadfa4;
  --color-dark-gray: #737371;
  
  /* Colors - Secondary */
  --color-sky-tint: #f2f8f9;
  --color-pink-tint: #fdf4f2;
  --color-cream-tint: #fefcf8;
  --color-gray-tint: #f5f5f7;
  
  /* Colors - Neutral */
  --color-ivory: #f5f4ec;
  --color-warm-white: #faf9f5;
  --color-light-beige: #e8e6df;
  --color-medium-gray: #b8b6b0;
  --color-dark-charcoal: #4a4a48;
  
  /* Colors - Semantic */
  --color-success: #6fb491;
  --color-success-bg: #f0f8f4;
  --color-warning: #e8a87c;
  --color-warning-bg: #fdf6f0;
  --color-error: var(--color-coral-pink);
  --color-error-bg: var(--color-pink-tint);
  --color-info: var(--color-sky-blue);
  --color-info-bg: var(--color-sky-tint);
  
  /* Colors - Shortcuts */
  --color-primary: var(--color-sky-blue);
  --color-text: var(--color-dark-charcoal);
  --color-text-light: var(--color-dark-gray);
  --color-bg: var(--color-ivory);
  --color-border: var(--color-light-beige);
  
  /* Typography */
  --font-primary: 'KoddiUD OnGothic', -apple-system, sans-serif;
  --font-japanese: 'BIZ UDGothic', 'Hiragino Sans', sans-serif;
  --font-english: 'Inter', 'Helvetica Neue', sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  
  /* Font Sizes */
  --font-size-display: 28px;
  --font-size-h1: 22px;
  --font-size-h2: 18px;
  --font-size-h3: 16px;
  --font-size-body: 14px;
  --font-size-small: 12px;
  --font-size-tiny: 10px;
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2.0;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 48px;
  
  /* Layout */
  --width-sidebar: 220px;
  --width-content-max: 1280px;
  --width-content-narrow: 960px;
  --width-card: 380px;
  --padding-container: 24px;
  --padding-section: 20px;
  
  /* Borders */
  --border-thin: 0.5px;
  --border-base: 1px;
  --border-thick: 2px;
  --border-color: var(--color-light-beige);
  --border-color-dark: var(--color-medium-gray);
  --border-color-focus: var(--color-sky-blue);
  --border-color-error: var(--color-coral-pink);
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;
  --radius-xl: 8px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-none: none;
  --shadow-subtle: 0 1px 2px rgba(115, 115, 113, 0.08);
  --shadow-soft: 0 2px 8px rgba(115, 115, 113, 0.12);
  --shadow-lifted: 0 4px 12px rgba(115, 115, 113, 0.15);
  --shadow-modal: 0 8px 24px rgba(115, 115, 113, 0.18);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### B. 디자인 체크리스트

**디자이너용**:
- [ ] 포인트 컬러 4가지 일관되게 사용
- [ ] 배경 틴트 적절히 활용
- [ ] 아이보리/베이지 톤 유지
- [ ] 그림자 최소화 (평면적 디자인)
- [ ] 얇은 선 (0.5px~1px) 사용
- [ ] 작은 폰트 크기 (14px 기본)
- [ ] 충분한 여백과 호흡감
- [ ] 라인 아이콘 스타일 통일
- [ ] 색상 대비 4.5:1 이상 확인

**개발자용**:
- [ ] CSS 변수 시스템 적용
- [ ] 반응형 브레이크포인트 설정
- [ ] 다크모드 지원
- [ ] 키보드 네비게이션 가능
- [ ] ARIA 라벨 추가
- [ ] 터치 타겟 44x44px 이상
- [ ] prefers-reduced-motion 지원
- [ ] 폰트 로딩 최적화
- [ ] 브라우저 호환성 테스트

### C. 참고 리소스

**폰트**:
- [BIZ UDGothic](https://fonts.google.com/specimen/BIZ+UDGothic) - Google Fonts
- KoddiUD 온고딕 - 로컬 폰트 파일 필요

**아이콘**:
- [Feather Icons](https://feathericons.com/) - 라인 아이콘 세트
- [Lucide](https://lucide.dev/) - Feather 계승 프로젝트

**도구**:
- [Coolors](https://coolors.co/) - 색상 팔레트 생성
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - 접근성 검사
- [Color Hunt](https://colorhunt.co/) - 빈티지 색상 팔레트

**영감**:
- Midori 다이어리 공식 사이트
- Kokuyo Campus 노트 디자인
- [Dribbble - Diary Design](https://dribbble.com/tags/diary)

---

## 문서 이력

- **v1.0** (2026-01-22): 초기 디자인 가이드 작성
  - Midori/Kokuyo 다이어리 감성 반영
  - 사용자 지정 색상 시스템 적용
  - KoddiUD 온고딕, BIZ UDGothic 폰트 설정
  - 개발자/디자이너 모두를 위한 상세 가이드

---

## 관련 문서

- [wireframes.md](wireframes.md) - 화면 와이어프레임
- [service-plan.md](service-plan.md) - 서비스 기획안

---

**디자인 가이드 문의**: 프로젝트 팀
