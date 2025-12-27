# API 가이드

## FastAPI 백엔드 서버

Dev Agent Kit은 FastAPI 기반의 최적화된 백엔드 API 서버를 제공합니다.

### 설치

```bash
# FastAPI 의존성 설치
dev-agent api:install

# 또는 직접 설치
cd api
pip install -r requirements.txt
```

### 서버 실행

```bash
# 기본 설정으로 서버 시작
dev-agent api:start

# 포트 및 호스트 지정
dev-agent api:start --port 8080 --host 127.0.0.1

# 개발 모드 (자동 리로드)
dev-agent api:start --reload
```

### 환경 변수 설정

`api/.env` 파일을 생성하고 다음 설정을 추가하세요:

```env
PORT=8000
HOST=0.0.0.0
API_KEY=your-api-key-here
VALID_API_KEYS=key1,key2,key3
ENVIRONMENT=development
```

## API 엔드포인트

### 인증

모든 API 엔드포인트는 API 키 인증이 필요합니다. 다음 방법 중 하나를 사용하세요:

1. **Authorization 헤더 (Bearer Token)**
   ```bash
   curl -H "Authorization: Bearer your-api-key" http://localhost:8000/api/todos
   ```

2. **X-API-Key 헤더**
   ```bash
   curl -H "X-API-Key: your-api-key" http://localhost:8000/api/todos
   ```

### 엔드포인트 목록

#### 헬스 체크
- `GET /health` - 서버 상태 확인
- `GET /` - API 정보

#### To-do 관리
- `POST /api/todos` - To-do 항목 생성
- `GET /api/todos` - To-do 리스트 조회
- `GET /api/todos/{todo_id}` - 특정 To-do 조회

#### SEO 분석
- `POST /api/seo/analyze` - SEO 분석
- `POST /api/ai-seo/analyze` - AI SEO 분석
- `POST /api/geo/analyze` - GEO (Generative Engine Optimization) 분석

#### 스트리밍
- `GET /api/stream` - 스트리밍 응답 예시

### API 문서

서버 실행 후 다음 URL에서 자동 생성된 API 문서를 확인할 수 있습니다:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API 키 토큰 최적화

API 키 관리 모듈은 다음과 같은 최적화 기능을 제공합니다:

### 주요 기능

1. **토큰 캐싱**
   - 인메모리 캐시를 통한 빠른 API 키 조회
   - 캐시 만료 시간 관리 (기본 1시간)
   - 자동 캐시 갱신

2. **보안**
   - API 키 암호화 저장
   - 환경 변수를 통한 암호화 키 관리
   - 안전한 키 검증

3. **사용량 추적**
   - API 키별 사용 횟수 추적
   - 캐시 히트율 모니터링
   - 사용 통계 제공

4. **다중 공급자 지원**
   - 여러 API 공급자 키 관리
   - 환경별 키 분리
   - 일괄 조회 지원

### CLI 명령어

#### API 키 저장
```bash
# 인터랙티브 모드
dev-agent api-key set openai

# 직접 지정
dev-agent api-key set openai -k "sk-..."
dev-agent api-key set claude -k "sk-ant-..." -e production
```

#### API 키 목록 조회
```bash
dev-agent api-key list
```

#### API 키 삭제
```bash
dev-agent api-key delete openai
```

#### 사용량 통계
```bash
dev-agent api-key stats
```

#### 캐시 관리
```bash
# 캐시 초기화
dev-agent api-key clear-cache
```

### 프로그래밍 방식 사용

```javascript
import apiKeyManager from './src/modules/api-key-manager/index.js';

// API 키 조회 (최적화된 캐싱 사용)
const openaiKey = await apiKeyManager.getAPIKey('openai');

// 여러 키 일괄 조회
const keys = await apiKeyManager.getMultipleAPIKeys(['openai', 'claude', 'google']);

// 사용량 통계
const stats = apiKeyManager.getUsageStats('openai');
console.log(`캐시 히트율: ${(stats.cacheHits / stats.totalRequests * 100).toFixed(1)}%`);

// 캐시 정리
await apiKeyManager.clearExpiredCache();
```

## 성능 최적화

### FastAPI 최적화 기능

1. **GZip 압축**
   - 1KB 이상의 응답 자동 압축
   - 네트워크 대역폭 절약

2. **비동기 처리**
   - asyncio 기반 비동기 I/O
   - 동시 요청 처리 최적화

3. **라이프사이클 관리**
   - 시작/종료 시 자동 초기화 및 정리
   - 리소스 관리 최적화

4. **요청 로깅**
   - 처리 시간 추적
   - 느린 요청 자동 감지

5. **스트리밍 응답**
   - 대용량 데이터 스트리밍 지원
   - 메모리 효율적 처리

### API 키 캐시 최적화

- **인메모리 캐싱**: 파일 I/O 최소화
- **자동 갱신**: 만료된 캐시 자동 제거
- **통계 추적**: 캐시 효율성 모니터링

## 보안 권장사항

1. **환경 변수 사용**
   - API 키를 코드에 하드코딩하지 마세요
   - `.env` 파일 사용 (`.gitignore`에 추가)

2. **암호화 키 관리**
   - `API_KEY_ENCRYPTION_KEY` 환경 변수 설정
   - 프로덕션에서는 강력한 키 사용

3. **API 키 로테이션**
   - 정기적으로 API 키 변경
   - 만료 시간 설정 활용

4. **접근 제한**
   - CORS 설정을 특정 도메인으로 제한
   - IP 화이트리스트 고려

## 문제 해결

### Python이 설치되지 않은 경우
```bash
# macOS
brew install python3

# Ubuntu/Debian
sudo apt-get install python3 python3-pip

# Windows
# Python 공식 사이트에서 다운로드
```

### FastAPI 설치 실패
```bash
# pip 업그레이드
pip install --upgrade pip

# 가상 환경 사용 권장
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r api/requirements.txt
```

### API 키 조회 실패
```bash
# API 키 확인
dev-agent api-key list

# 캐시 정리 후 재시도
dev-agent api-key clear-cache
```

## 참고 자료

- [FastAPI 공식 문서](https://fastapi.tiangolo.com/)
- [Uvicorn 문서](https://www.uvicorn.org/)
- [Pydantic 문서](https://docs.pydantic.dev/)
