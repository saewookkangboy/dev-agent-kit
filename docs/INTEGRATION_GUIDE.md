# 패키지 통합 가이드

추천 패키지들을 `dev-agent-kit`에 통합하는 방법을 안내합니다.

## 빠른 시작

### 1단계: 필수 패키지 설치

```bash
# 필수 패키지 설치
npm install --save-dev eslint prettier eslint-config-prettier
npm install --save-dev vitest @vitest/ui @vitest/coverage-v8
npm install --save-dev husky lint-staged
npm install --save-dev npm-check-updates standard-version
npm install dotenv winston debug
```

### 2단계: 설정 파일 복사

```bash
# package.json.recommended를 참고하여 package.json 업데이트
# .prettierrc.json, .eslintrc.json, vitest.config.js 파일 사용
```

### 3단계: Git 훅 설정

```bash
# Husky 초기화
npx husky install

# pre-commit 훅 추가
npx husky add .husky/pre-commit "npx lint-staged"
```

## 통합 모듈 예시

### 환경 변수 관리 (dotenv)

```javascript
// src/utils/env.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(process.cwd(), '.env') });

export const config = {
  projectName: process.env.PROJECT_NAME || 'dev-agent-kit',
  logLevel: process.env.LOG_LEVEL || 'info',
  debug: process.env.DEBUG || '',
};
```

### 로깅 시스템 (winston)

```javascript
// src/utils/logger.js
import winston from 'winston';
import { config } from './env.js';

export const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### CLI 명령어 확장 예시

```javascript
// bin/cli.js에 추가할 명령어들

// 코드 품질 검사
program
  .command('quality')
  .description('코드 품질 검사')
  .option('--fix', '자동 수정')
  .action(async (options) => {
    const { execSync } = await import('child_process');
    if (options.fix) {
      execSync('npm run lint:fix && npm run format', { stdio: 'inherit' });
    } else {
      execSync('npm run lint && npm run format:check', { stdio: 'inherit' });
    }
  });

// 의존성 확인
program
  .command('deps')
  .description('의존성 관리')
  .option('--check', '업데이트 확인')
  .option('--update', '자동 업데이트')
  .action(async (options) => {
    const { execSync } = await import('child_process');
    if (options.update) {
      execSync('npm run deps:update', { stdio: 'inherit' });
    } else {
      execSync('npm run deps:check', { stdio: 'inherit' });
    }
  });

// 보안 검사
program
  .command('security')
  .description('보안 검사')
  .option('--audit', 'npm audit 실행')
  .option('--snyk', 'Snyk 스캔 실행')
  .action(async (options) => {
    const { execSync } = await import('child_process');
    if (options.snyk) {
      execSync('npm run security:snyk', { stdio: 'inherit' });
    } else {
      execSync('npm run security:audit', { stdio: 'inherit' });
    }
  });
```

## GitHub Actions 통합

### .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Lint
      run: npm run lint
    
    - name: Format check
      run: npm run format:check
    
    - name: Test
      run: npm run test:coverage
    
    - name: Security audit
      run: npm run security:audit
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/coverage-final.json
```

## 단계별 통합 계획

### Phase 1: 기본 도구 (1주)
- [x] dotenv 통합
- [ ] ESLint + Prettier 설정
- [ ] Vitest 마이그레이션
- [ ] Husky + lint-staged 설정

### Phase 2: 품질 관리 (2주)
- [ ] Snyk 통합
- [ ] npm-check-updates 통합
- [ ] 코드 커버리지 설정
- [ ] GitHub Actions CI/CD

### Phase 3: 문서화 (1주)
- [ ] TypeDoc 통합
- [ ] API 문서 자동 생성
- [ ] 사용 가이드 업데이트

### Phase 4: 고급 기능 (2주)
- [ ] Playwright E2E 테스트
- [ ] 성능 프로파일링 도구
- [ ] LangChain 통합

## 문제 해결

### ESLint 오류
```bash
# 캐시 클리어
rm -rf node_modules/.cache
npm run lint:fix
```

### Vitest 실행 오류
```bash
# 설정 확인
cat vitest.config.js
# 테스트 파일 확인
npm run test -- --reporter=verbose
```

### Husky 훅이 작동하지 않음
```bash
# 재설치
rm -rf .husky
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

## 참고 자료

- [ESLint 문서](https://eslint.org/docs/latest/)
- [Prettier 문서](https://prettier.io/docs/en/)
- [Vitest 문서](https://vitest.dev/)
- [Husky 문서](https://typicode.github.io/husky/)
- [standard-version 문서](https://github.com/conventional-changelog/standard-version)

