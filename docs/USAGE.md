# 사용 가이드

## 시작하기

### 1. 설치

```bash
npm install
npm run setup
```

### 2. 프로젝트 초기화

```bash
npm run init
# 또는
dev-agent init
```

## 주요 기능 사용법

### Spec-kit 관리

사양 문서를 생성하고 관리합니다.

```bash
# 사양 문서 생성
dev-agent spec create "사용자 인증 시스템"

# 사양 문서 목록 조회
dev-agent spec list

# 사양 문서 검증
dev-agent spec validate
```

생성된 사양 문서는 `.spec-kit/` 디렉토리에 YAML 형식으로 저장됩니다.

### To-do 관리

작업 항목을 생성하고 진행 상황을 추적합니다.

```bash
# To-do 추가
dev-agent todo add "로그인 기능 구현" -p high -m "인증 마일스톤"

# To-do 목록 조회
dev-agent todo list

# 특정 상태 필터링
dev-agent todo list -s pending

# To-do 완료 처리
dev-agent todo complete <id>
```

### Agent Role 설정

개발 역할에 맞는 에이전트를 설정합니다.

```bash
# 역할 설정
dev-agent role set --role frontend

# 사용 가능한 역할 목록
dev-agent role list

# 현재 역할 정보 조회
dev-agent role info
```

**사용 가능한 역할:**
- `pm`: Project Manager
- `frontend`: Frontend Developer
- `backend`: Backend Developer
- `server-db`: Server/DB Developer
- `security`: Security Manager
- `ui-ux`: UI/UX Designer
- `marketing`: AI Marketing Researcher

### AI 강화학습

Agent Lightning을 사용한 강화학습을 실행합니다.

```bash
# 학습 시작
dev-agent train --agent my-agent --episodes 100

# 에이전트 목록 조회 (구현 예정)
# dev-agent agents list
```

### Claude Skills 관리

Claude AI 스킬을 활성화하고 관리합니다.

```bash
# 사용 가능한 Skills 목록
dev-agent skills list --type claude

# Skill 활성화
dev-agent skills activate spec-kit --type claude
```

### Agent Skills 관리

에이전트 스킬을 활성화하고 관리합니다.

```bash
# 사용 가능한 Skills 목록
dev-agent skills list --type agent

# Skill 활성화
dev-agent skills activate web-search --type agent
```

## 프로젝트 구조

```
프로젝트/
├── .project-data/          # 프로젝트 데이터
│   ├── todos.json          # To-do 데이터
│   ├── role-config.json    # Role 설정
│   ├── config.json         # 프로젝트 설정
│   ├── lightning/          # 강화학습 데이터
│   ├── claude-skills/      # Claude Skills 설정
│   └── agent-skills/       # Agent Skills 설정
├── .spec-kit/              # Spec-kit 문서
│   └── *.yaml              # 사양 문서들
└── ...
```

## 통합 워크플로우 예시

### 1. 프로젝트 시작

```bash
# 프로젝트 초기화
dev-agent init

# 역할 설정
dev-agent role set --role frontend

# 초기 사양 문서 생성
dev-agent spec create "프로젝트 개요"
```

### 2. 작업 관리

```bash
# 작업 추가
dev-agent todo add "컴포넌트 설계" -p high -m "Phase 1"
dev-agent todo add "API 연동" -p medium -m "Phase 1"

# 진행 상황 확인
dev-agent todo list
```

### 3. Skills 활용

```bash
# 필요한 Skills 활성화
dev-agent skills activate code-reviewer --type claude
dev-agent skills activate git-operations --type agent
```

### 4. 학습 및 최적화

```bash
# 에이전트 학습
dev-agent train --agent frontend-agent --episodes 50
```

## 고급 사용법

### 커스텀 Role 추가

`.project-data/role-config.json` 파일을 수정하여 커스텀 역할을 추가할 수 있습니다.

### Spec-kit 템플릿 커스터마이징

`.spec-kit/` 디렉토리의 템플릿을 수정하여 사양 문서 형식을 커스터마이징할 수 있습니다.

### Skills 확장

`src/modules/claude-skills/index.js`와 `src/modules/agent-skills/index.js`에 새로운 스킬을 추가할 수 있습니다.

## 문제 해결

### CLI 명령어가 작동하지 않는 경우

```bash
# 실행 권한 확인 및 설정
chmod +x bin/cli.js

# npm link로 전역 설치
npm link
```

### 데이터 파일 손상 시

`.project-data/` 디렉토리의 백업을 복원하거나, 해당 파일을 삭제하여 초기화할 수 있습니다.

## 추가 리소스

- [Spec-kit 문서](https://github.com/github/spec-kit)
- [Agent Lightning](https://github.com/microsoft/agent-lightning)
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills)
- [Agent Skills](https://github.com/agentskills/agentskills)

