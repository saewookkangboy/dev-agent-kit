# Dev Agent Kit

통합 개발 에이전트 패키지 - Spec-kit, To-do 관리, Agent Roles, AI 강화학습, Claude Skills를 통합한 종합 개발 도구

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **오픈소스 프로젝트**: 이 프로젝트는 누구나 자유롭게 사용, 수정 및 배포할 수 있는 오픈소스 프로젝트입니다.  
> **Open Source Project**: This is an open-source project that anyone can use, modify, and distribute freely.

## 주요 기능

### 1. Spec-kit 통합
- GitHub Spec-kit 기반 사양 문서 관리
- 요구사항 문서화 및 버전 관리
- 사양 검증 및 테스트

### 2. To-do List 및 단계별 업무 진행
- 작업 항목 생성 및 관리
- 마일스톤 기반 진행 상황 추적
- 우선순위 및 의존성 관리

### 3. Agent Role 시스템
다양한 개발 역할을 지원하는 에이전트 시스템:
- **PM (Project Manager)**: 프로젝트 관리 및 조율
- **Frontend Developer**: 프론트엔드 개발
- **Backend Developer**: 백엔드 개발
- **Server/DB Developer**: 서버 및 데이터베이스 관리
- **Security Manager**: 보안 관리 및 감사
- **UI/UX Designer**: 사용자 인터페이스 및 경험 설계
- **AI Marketing Researcher**: AI 기반 시장 리서치

### 4. AI 강화학습 (Agent Lightning)
- Microsoft Agent Lightning 기반 강화학습 통합
- 에이전트 성능 최적화
- 학습 데이터 관리

### 5. Claude Skills 통합
- ComposioHQ awesome-claude-skills 통합
- 다양한 Claude AI 스킬 활용
- 커스텀 스킬 개발 지원

### 6. Agent Skills 통합
- agentskills 프레임워크 통합
- 에이전트 스킬 관리 및 확장

### 7. SEO 최적화
- 검색 엔진 최적화 분석
- 메타 태그 및 키워드 분석
- Sitemap 및 Robots.txt 생성
- 구조화된 데이터 검증

### 8. AI SEO 최적화
- AI 기반 키워드 리서치
- 콘텐츠 자동 최적화
- 키워드 밀도 및 가독성 분석
- 경쟁사 키워드 분석

### 9. GEO 최적화
- 지리적 위치 기반 최적화
- 지역 비즈니스 스키마 생성
- Hreflang 다국어 태그 생성
- 지역별 키워드 및 콘텐츠 최적화

### 10. AIO (All-In-One) 최적화
- SEO, AI SEO, GEO 종합 분석
- 성능, 접근성, 보안 분석
- 소셜 미디어 최적화
- 자동 최적화 및 리포트 생성

## 설치

### 기본 설치

```bash
# 저장소 클론
git clone https://github.com/saewookkangboy/dev-agent-kit.git
cd dev-agent-kit

# 의존성 설치
npm install

# 설정
npm run setup
```

### 전역 설치 (선택사항)

```bash
npm link
# 또는
npm install -g .
```

설치 후 `dev-agent` 명령어를 어디서나 사용할 수 있습니다.

## 사용 방법

### 프로젝트 초기화

```bash
npm run init
# 또는
dev-agent init
```

### CLI 사용

#### To-do 리스트 관리

```bash
# To-do 추가 (우선순위 및 마일스톤 지정 가능)
dev-agent todo add "작업 내용" -p high -m "Phase 1"
dev-agent todo add "API 연동" -p medium

# To-do 목록 조회
dev-agent todo list
dev-agent todo list -s pending  # 상태별 필터링

# To-do 완료 처리
dev-agent todo complete <id>
```

#### Agent Role 설정

```bash
# 역할 설정
dev-agent role set --role frontend
dev-agent role set --role backend
dev-agent role set --role pm

# 사용 가능한 역할 목록
dev-agent role list

# 현재 역할 정보 조회
dev-agent role info
```

#### Spec-kit 관리

```bash
# 사양 문서 생성
dev-agent spec create "사용자 인증 시스템"
dev-agent spec create "API 설계"

# 사양 문서 목록 조회
dev-agent spec list

# 사양 문서 검증
dev-agent spec validate
```

#### AI 강화학습

```bash
# 강화학습 시작
dev-agent train --agent my-agent --episodes 100
```

#### Skills 관리

```bash
# Claude Skills 목록 조회
dev-agent skills list --type claude

# Agent Skills 목록 조회
dev-agent skills list --type agent

# Skill 활성화
dev-agent skills activate spec-kit --type claude
dev-agent skills activate web-search --type agent
```

#### SEO 최적화

```bash
# SEO 분석
dev-agent seo analyze https://example.com

# Sitemap 생성
dev-agent seo sitemap -u https://example.com https://example.com/about

# Robots.txt 생성
dev-agent seo robots
```

#### AI SEO 최적화

```bash
# AI 키워드 리서치
dev-agent ai-seo keywords "웹 개발"

# 콘텐츠 최적화
dev-agent ai-seo optimize "콘텐츠 내용" -k "키워드1" "키워드2"

# 경쟁사 분석
dev-agent ai-seo competitors example.com -c competitor1.com
```

#### GEO 최적화

```bash
# 위치 분석
dev-agent geo analyze "서울시 강남구"

# 지역 비즈니스 스키마 생성
dev-agent geo schema -n "비즈니스명" -p "02-1234-5678" -a "주소"

# Hreflang 태그 생성
dev-agent geo hreflang -l ko en -u https://example.com
```

#### AIO 종합 최적화

```bash
# 종합 분석
dev-agent aio analyze https://example.com

# 자동 최적화
dev-agent aio optimize https://example.com

# 리포트 생성
dev-agent aio report -f markdown
```

#### 프로젝트 초기화

```bash
# 새 프로젝트 초기화
dev-agent init
```

## 프로젝트 구조

```
dev-agent-kit/
├── src/
│   ├── index.js              # 메인 진입점
│   ├── modules/
│   │   ├── spec-kit/         # Spec-kit 모듈
│   │   ├── todo/             # To-do 관리 모듈
│   │   ├── roles/            # Agent Role 모듈
│   │   ├── lightning/        # Agent Lightning 모듈
│   │   ├── claude-skills/    # Claude Skills 모듈
│   │   ├── agent-skills/     # Agent Skills 모듈
│   │   ├── seo/              # SEO 최적화 모듈
│   │   ├── ai-seo/           # AI SEO 최적화 모듈
│   │   ├── geo/              # GEO 최적화 모듈
│   │   └── aio/              # AIO 종합 최적화 모듈
│   ├── utils/                # 유틸리티 함수
│   └── config/               # 설정 파일
├── bin/
│   └── cli.js                # CLI 진입점
├── scripts/                  # 스크립트
│   ├── init-project.js       # 프로젝트 초기화
│   └── setup.js              # 설정 스크립트
├── docs/                     # 문서
│   ├── USAGE.md              # 사용 가이드
│   ├── ARCHITECTURE.md       # 아키텍처 문서
│   ├── RECOMMENDED_PACKAGES.md # 추천 패키지
│   ├── INTEGRATION_GUIDE.md  # 통합 가이드
│   └── SEO_GUIDE.md          # SEO/AI SEO/GEO/AIO 가이드
├── .spec-kit/                # Spec-kit 문서 저장소
├── .project-data/            # 프로젝트 데이터
│   ├── todos.json            # To-do 데이터
│   ├── role-config.json      # Role 설정
│   └── config.json           # 프로젝트 설정
├── .env.example              # 환경 변수 예시
├── .eslintrc.json            # ESLint 설정
├── .prettierrc.json          # Prettier 설정
├── vitest.config.js          # Vitest 설정
└── package.json.recommended  # 확장 패키지 예시
```

## 확장 및 통합

### 추천 패키지

프로젝트에 추가하면 유용한 패키지들을 추천합니다:

- **코드 품질**: ESLint, Prettier, SonarJS
- **테스트**: Vitest, Playwright, Cypress
- **문서화**: TypeDoc, JSDoc
- **의존성 관리**: npm-check-updates, Snyk
- **CI/CD**: GitHub Actions, Husky
- **로깅**: Winston, Debug
- **보안**: Snyk, audit-ci

자세한 내용은 [추천 패키지 문서](docs/RECOMMENDED_PACKAGES.md)를 참고하세요.

### 통합 가이드

다른 도구들과 통합하는 방법은 [통합 가이드](docs/INTEGRATION_GUIDE.md)를 참고하세요.

## 문서

- [사용 가이드](docs/USAGE.md) - 상세한 사용 방법
- [아키텍처 문서](docs/ARCHITECTURE.md) - 시스템 구조 및 설계
- [추천 패키지](docs/RECOMMENDED_PACKAGES.md) - 추가 패키지 추천
- [통합 가이드](docs/INTEGRATION_GUIDE.md) - 도구 통합 방법
- [SEO/AI SEO/GEO/AIO 가이드](docs/SEO_GUIDE.md) - 웹 최적화 가이드
- [기여 가이드](CONTRIBUTING.md) - 프로젝트 기여 방법

## 개발 워크플로우 예시

```bash
# 1. 프로젝트 초기화
dev-agent init

# 2. 역할 설정
dev-agent role set --role frontend

# 3. 초기 사양 문서 생성
dev-agent spec create "프로젝트 개요"

# 4. 작업 추가
dev-agent todo add "컴포넌트 설계" -p high -m "Phase 1"
dev-agent todo add "API 연동" -p medium -m "Phase 1"

# 5. Skills 활성화
dev-agent skills activate code-reviewer --type claude
dev-agent skills activate git-operations --type agent

# 6. 진행 상황 확인
dev-agent todo list
dev-agent spec list
```

## 기여하기

프로젝트에 기여하고 싶으시다면 [기여 가이드](CONTRIBUTING.md)를 참고해주세요.

버그 리포트, 기능 제안, Pull Request를 환영합니다!

## 라이선스

MIT License

Copyright (c) 2025 Park chunghyo

이 프로젝트는 누구나 자유롭게 사용, 수정 및 배포할 수 있는 오픈소스 프로젝트입니다.  
This is an open-source project that anyone can use, modify, and distribute freely.

자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 참고 리소스

### 핵심 통합 리소스

- [Spec-kit](https://github.com/github/spec-kit) - 사양 문서 관리
- [Agent Lightning](https://github.com/microsoft/agent-lightning) - AI 강화학습
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills) - Claude Skills
- [Agent Skills](https://github.com/agentskills/agentskills) - Agent Skills 프레임워크

### 관련 도구

- [ESLint](https://eslint.org/) - 코드 린팅
- [Prettier](https://prettier.io/) - 코드 포맷팅
- [Vitest](https://vitest.dev/) - 테스트 프레임워크
- [Husky](https://typicode.github.io/husky/) - Git 훅
- [standard-version](https://github.com/conventional-changelog/standard-version) - 버전 관리

## 작성자

**Park chunghyo**

- GitHub: [@saewookkangboy](https://github.com/saewookkangboy)

## 스타

이 프로젝트가 도움이 되셨다면 ⭐를 눌러주세요!

