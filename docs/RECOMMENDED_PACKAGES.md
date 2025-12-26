# 추천 패키지 및 확장 기능

현재 `dev-agent-kit` 패키지에 추가하면 유용한 패키지와 기능들을 추천합니다.

## 1. 코드 품질 및 린팅

### ESLint / Prettier
```bash
npm install --save-dev eslint prettier eslint-config-prettier
```
**이유**: 코드 스타일 일관성 유지, 자동 포맷팅
**통합 방법**: Role별로 다른 린팅 규칙 적용 가능

### SonarJS
```bash
npm install --save-dev sonarjs
```
**이유**: 코드 품질 분석, 버그 및 보안 취약점 탐지
**통합 방법**: `dev-agent quality check` 명령어 추가

## 2. 테스트 프레임워크

### Vitest (현재 Jest 대신)
```bash
npm install --save-dev vitest @vitest/ui
```
**이유**: 더 빠른 실행 속도, ESM 네이티브 지원
**통합 방법**: `dev-agent test` 명령어 개선

### Playwright / Cypress
```bash
npm install --save-dev @playwright/test
# 또는
npm install --save-dev cypress
```
**이유**: E2E 테스트 자동화
**통합 방법**: `dev-agent test e2e` 명령어 추가

## 3. 문서 생성

### TypeDoc
```bash
npm install --save-dev typedoc
```
**이유**: TypeScript/JavaScript 코드에서 자동 문서 생성
**통합 방법**: `dev-agent docs generate` 명령어 추가

### JSDoc
```bash
npm install --save-dev jsdoc
```
**이유**: 코드 주석 기반 API 문서 생성
**통합 방법**: Spec-kit과 연동하여 문서 자동화

## 4. 의존성 관리

### npm-check-updates
```bash
npm install --save-dev npm-check-updates
```
**이유**: 의존성 패키지 업데이트 확인 및 자동 업데이트
**통합 방법**: `dev-agent deps check` 명령어 추가

### Snyk
```bash
npm install --save-dev snyk
```
**이유**: 보안 취약점 스캔
**통합 방법**: Security Manager Role과 통합

## 5. CI/CD 통합

### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
```
**이유**: 자동화된 테스트 및 배포
**통합 방법**: `dev-agent ci setup` 명령어로 워크플로우 생성

### Husky + lint-staged
```bash
npm install --save-dev husky lint-staged
```
**이유**: Git 커밋 전 자동 검사
**통합 방법**: `dev-agent git setup-hooks` 명령어 추가

## 6. 환경 변수 관리

### dotenv
```bash
npm install dotenv
```
**이유**: 환경 변수 관리 및 보안
**통합 방법**: 프로젝트 초기화 시 자동 설정

### dotenv-cli
```bash
npm install --save-dev dotenv-cli
```
**이유**: 환경별 설정 파일 관리
**통합 방법**: Role별 환경 설정 지원

## 7. 로깅 및 모니터링

### Winston / Pino
```bash
npm install winston
# 또는
npm install pino
```
**이유**: 구조화된 로깅
**통합 방법**: 모든 모듈에 통합 로깅 시스템

### Debug
```bash
npm install debug
```
**이유**: 개발 중 디버깅 용이
**통합 방법**: `DEBUG=dev-agent:*` 환경 변수 지원

## 8. 데이터베이스 마이그레이션

### Knex.js / Prisma
```bash
npm install knex
# 또는
npm install prisma
```
**이유**: 데이터베이스 스키마 관리
**통합 방법**: Server/DB Developer Role과 통합

## 9. API 문서화

### Swagger / OpenAPI
```bash
npm install swagger-jsdoc swagger-ui-express
```
**이유**: API 문서 자동 생성
**통합 방법**: Backend Developer Role과 통합

## 10. 성능 분석

### Clinic.js
```bash
npm install --save-dev clinic
```
**이유**: 성능 프로파일링
**통합 방법**: `dev-agent profile` 명령어 추가

### Lighthouse CI
```bash
npm install --save-dev @lhci/cli
```
**이유**: 웹 성능 및 접근성 분석
**통합 방법**: Frontend Developer Role과 통합

## 11. 버전 관리 도구

### standard-version / semantic-release
```bash
npm install --save-dev standard-version
# 또는
npm install --save-dev semantic-release
```
**이유**: 자동 버전 관리 및 CHANGELOG 생성
**통합 방법**: `dev-agent version` 명령어 추가

## 12. 보안 도구

### npm audit / audit-ci
```bash
npm install --save-dev audit-ci
```
**이유**: 보안 취약점 자동 검사
**통합 방법**: Security Manager Role과 통합

### Snyk (재언급)
**이유**: 종합 보안 스캔
**통합 방법**: CI/CD 파이프라인에 통합

## 13. 코드 커버리지

### c8 / nyc
```bash
npm install --save-dev c8
```
**이유**: 테스트 커버리지 측정
**통합 방법**: `dev-agent test --coverage` 옵션 추가

## 14. 번들러 및 빌드 도구

### Vite / Rollup
```bash
npm install --save-dev vite
```
**이유**: 빠른 빌드 및 개발 서버
**통합 방법**: Frontend Developer Role과 통합

### esbuild
```bash
npm install --save-dev esbuild
```
**이유**: 초고속 번들링
**통합 방법**: 빌드 최적화

## 15. AI/ML 관련 추가 패키지

### LangChain.js
```bash
npm install langchain
```
**이유**: LLM 애플리케이션 개발 프레임워크
**통합 방법**: Claude Skills와 통합

### OpenAI SDK
```bash
npm install openai
```
**이유**: 다양한 AI 모델 활용
**통합 방법**: Agent Skills 확장

## 통합 우선순위

### 높은 우선순위 (즉시 통합 권장)
1. **dotenv** - 환경 변수 관리 (필수)
2. **ESLint + Prettier** - 코드 품질 (필수)
3. **Husky + lint-staged** - Git 훅 (권장)
4. **standard-version** - 버전 관리 (권장)
5. **npm-check-updates** - 의존성 관리 (권장)

### 중간 우선순위 (단계적 통합)
6. **Vitest** - 테스트 개선
7. **TypeDoc** - 문서 자동화
8. **Snyk** - 보안 스캔
9. **Winston** - 로깅 시스템
10. **GitHub Actions** - CI/CD

### 낮은 우선순위 (선택적 통합)
11. **Playwright** - E2E 테스트
12. **Clinic.js** - 성능 분석
13. **LangChain** - AI 확장
14. **Prisma** - 데이터베이스 ORM

## 통합 예시 스크립트

### package.json에 추가할 스크립트 예시

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "test:coverage": "vitest --coverage",
    "deps:check": "ncu",
    "deps:update": "ncu -u",
    "security:audit": "npm audit",
    "security:snyk": "snyk test",
    "docs:generate": "typedoc",
    "version:release": "standard-version",
    "ci:setup": "node scripts/setup-ci.js"
  }
}
```

## 다음 단계

1. **즉시 추가**: dotenv, ESLint, Prettier
2. **CLI 확장**: 각 패키지에 대한 명령어 추가
3. **Role 통합**: 각 Role에 맞는 도구 자동 설정
4. **문서 업데이트**: 통합된 도구 사용법 문서화

