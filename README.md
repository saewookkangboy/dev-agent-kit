# Dev Agent Kit

통합 개발 에이전트 패키지 - Spec-kit, To-do 관리, Agent Roles, AI 강화학습, Claude Skills를 통합한 종합 개발 도구

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

## 설치

```bash
npm install
npm run setup
```

## 사용 방법

### 프로젝트 초기화

```bash
npm run init
# 또는
dev-agent init
```

### CLI 사용

```bash
# To-do 리스트 관리
dev-agent todo add "작업 내용"
dev-agent todo list
dev-agent todo complete <id>

# Agent Role 설정
dev-agent role set --role frontend
dev-agent role list

# Spec-kit 관리
dev-agent spec create "사양명"
dev-agent spec validate

# AI 강화학습 시작
dev-agent train --agent <agent-name>

# Claude Skills 관리
dev-agent skills list
dev-agent skills activate <skill-name>
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
│   │   └── agent-skills/     # Agent Skills 모듈
│   ├── utils/                # 유틸리티 함수
│   └── config/               # 설정 파일
├── bin/
│   └── cli.js                # CLI 진입점
├── scripts/                  # 스크립트
├── templates/                # 템플릿 파일
└── docs/                     # 문서
```

## 라이선스

MIT

## 참고 리소스

- [Spec-kit](https://github.com/github/spec-kit)
- [Agent Lightning](https://github.com/microsoft/agent-lightning)
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills)
- [Agent Skills](https://github.com/agentskills/agentskills)

