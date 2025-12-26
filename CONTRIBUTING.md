# 기여 가이드

## 개발 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd dev-agent-kit

# 의존성 설치
npm install

# 개발 모드 설정
npm run setup
```

## 프로젝트 구조

```
dev-agent-kit/
├── bin/              # CLI 진입점
├── src/              # 소스 코드
│   └── modules/      # 기능 모듈들
├── scripts/          # 유틸리티 스크립트
├── docs/             # 문서
└── tests/            # 테스트 (향후 추가)
```

## 코딩 스타일

- ES6+ 모듈 사용
- async/await 사용
- 에러 처리 필수
- 주석 작성 권장

## 새 기능 추가

1. 기능 브랜치 생성: `git checkout -b feature/new-feature`
2. 모듈 구현: `src/modules/` 디렉토리에 추가
3. CLI 명령어 추가: `bin/cli.js` 수정
4. 문서 업데이트: `docs/` 디렉토리 업데이트
5. 테스트 작성 (향후)
6. Pull Request 생성

## 커밋 메시지 규칙

```
타입: 간단한 설명

상세 설명 (선택사항)

예:
feat: 새로운 Role 추가
fix: To-do 완료 처리 버그 수정
docs: 사용 가이드 업데이트
```

## Pull Request 프로세스

1. 최신 main 브랜치와 동기화
2. 테스트 통과 확인
3. 문서 업데이트 확인
4. PR 설명 작성

