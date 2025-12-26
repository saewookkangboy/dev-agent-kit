# 아키텍처 문서

## 시스템 개요

Dev Agent Kit은 통합 개발 에이전트 패키지로, 다음 주요 기능을 제공합니다:

1. **Spec-kit 통합**: 사양 문서 관리
2. **To-do 관리**: 작업 추적 및 마일스톤 관리
3. **Agent Role 시스템**: 역할 기반 개발 지원
4. **AI 강화학습**: Agent Lightning 통합
5. **Claude Skills**: Claude AI 스킬 통합
6. **Agent Skills**: 에이전트 스킬 프레임워크 통합

## 모듈 구조

```
src/
├── index.js                 # 메인 진입점
├── modules/
│   ├── spec-kit/            # Spec-kit 모듈
│   │   └── index.js
│   ├── todo/                # To-do 관리 모듈
│   │   └── index.js
│   ├── roles/               # Agent Role 모듈
│   │   └── index.js
│   ├── lightning/           # Agent Lightning 모듈
│   │   └── index.js
│   ├── claude-skills/       # Claude Skills 모듈
│   │   └── index.js
│   └── agent-skills/        # Agent Skills 모듈
│       └── index.js
├── utils/                   # 유틸리티 함수
└── config/                  # 설정 파일
```

## 데이터 저장 구조

### Spec-kit 데이터

- 위치: `.spec-kit/`
- 형식: YAML
- 구조:
  ```yaml
  name: 사양명
  version: 버전
  requirements: []
  acceptance_criteria: []
  status: draft|approved
  ```

### To-do 데이터

- 위치: `.project-data/todos.json`
- 구조:
  ```json
  {
    "todos": [
      {
        "id": "고유ID",
        "description": "작업 설명",
        "status": "pending|in-progress|completed",
        "priority": "high|medium|low",
        "milestone": "마일스톤명",
        "created_at": "ISO 날짜",
        "updated_at": "ISO 날짜"
      }
    ],
    "milestones": []
  }
  ```

### Role 설정

- 위치: `.project-data/role-config.json`
- 구조:
  ```json
  {
    "currentRole": "role-key",
    "roleData": { ... },
    "setAt": "ISO 날짜"
  }
  ```

## 모듈 상세

### Spec-kit 모듈

**책임:**
- 사양 문서 생성 및 관리
- 사양 문서 검증
- 버전 관리

**주요 메서드:**
- `create(specName)`: 새 사양 문서 생성
- `validate()`: 모든 사양 문서 검증
- `list()`: 사양 문서 목록 조회

### To-do 모듈

**책임:**
- 작업 항목 생성 및 관리
- 마일스톤 추적
- 진행 상황 통계

**주요 메서드:**
- `add(description, options)`: To-do 추가
- `list(options)`: To-do 목록 조회
- `complete(id)`: To-do 완료 처리

### Roles 모듈

**책임:**
- 역할 정의 및 관리
- 역할별 권한 및 책임 관리
- 현재 역할 상태 관리

**주요 메서드:**
- `setRole(roleKey)`: 역할 설정
- `list()`: 사용 가능한 역할 목록
- `info()`: 현재 역할 정보 조회

### Lightning 모듈

**책임:**
- AI 강화학습 실행
- 학습 데이터 관리
- 에이전트 성능 추적

**주요 메서드:**
- `train(options)`: 학습 시작
- `listAgents()`: 에이전트 목록 조회

### Claude Skills 모듈

**책임:**
- Claude Skills 목록 관리
- Skill 활성화/비활성화
- Skill 카테고리 관리

**주요 메서드:**
- `list()`: Skills 목록 조회
- `activate(skillName)`: Skill 활성화
- `deactivate(skillName)`: Skill 비활성화

### Agent Skills 모듈

**책임:**
- Agent Skills 목록 관리
- Skill 활성화/비활성화
- Skill 카테고리 관리

**주요 메서드:**
- `list()`: Skills 목록 조회
- `activate(skillName)`: Skill 활성화
- `deactivate(skillName)`: Skill 비활성화

## CLI 구조

CLI는 Commander.js를 사용하여 구현되었습니다.

**명령어 구조:**
```
dev-agent
├── todo
│   ├── add
│   ├── list
│   └── complete
├── role
│   ├── set
│   ├── list
│   └── info
├── spec
│   ├── create
│   ├── validate
│   └── list
├── train
├── skills
│   ├── list
│   └── activate
└── init
```

## 확장성

### 새로운 모듈 추가

1. `src/modules/` 디렉토리에 새 모듈 디렉토리 생성
2. `index.js` 파일에 모듈 클래스 구현
3. `bin/cli.js`에 CLI 명령어 추가

### 새로운 Role 추가

`src/modules/roles/index.js`의 `roles` 객체에 새 역할 추가:

```javascript
newRole: {
  name: 'Role Name',
  description: 'Description',
  responsibilities: [...],
  tools: [...],
  permissions: [...]
}
```

### 새로운 Skill 추가

**Claude Skills:**
`src/modules/claude-skills/index.js`의 `skills` 객체에 추가

**Agent Skills:**
`src/modules/agent-skills/index.js`의 `skills` 객체에 추가

## 통합 포인트

### Spec-kit 통합
- GitHub Spec-kit 형식 준수
- YAML 기반 문서 관리

### Agent Lightning 통합
- 학습 데이터 저장 구조 준비
- 실제 라이브러리 통합 준비 완료

### Claude Skills 통합
- ComposioHQ awesome-claude-skills 구조 참고
- 확장 가능한 스킬 시스템

### Agent Skills 통합
- agentskills 프레임워크 구조 참고
- 모듈화된 스킬 시스템

## 보안 고려사항

- 민감한 데이터는 `.gitignore`에 포함
- 환경 변수 사용 권장
- 권한 기반 접근 제어 (향후 구현)

## 성능 고려사항

- 파일 I/O 최소화
- 대용량 데이터 처리 시 스트리밍 고려
- 캐싱 전략 (향후 구현)

