"""
FastAPI 백엔드 서버 - 최적화된 구조
성능 최적화 및 효율적인 API 엔드포인트 제공
"""

from fastapi import FastAPI, HTTPException, Depends, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from contextlib import asynccontextmanager
import uvicorn
import asyncio
from typing import Optional, List
import time
import json
from datetime import datetime
from pydantic import BaseModel, Field
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# 보안 토큰 검증
security = HTTPBearer(auto_error=False)

# FastAPI 앱 초기화 (라이프사이클 이벤트 포함)
@asynccontextmanager
async def lifespan(app: FastAPI):
    """애플리케이션 시작/종료 시 실행되는 라이프사이클 이벤트"""
    # 시작 시 초기화
    print("🚀 FastAPI 서버 시작 중...")
    yield
    # 종료 시 정리
    print("🛑 FastAPI 서버 종료 중...")

app = FastAPI(
    title="Dev Agent Kit API",
    description="통합 개발 에이전트 패키지 API",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# 미들웨어 설정 (성능 최적화)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 프로덕션에서는 특정 도메인으로 제한
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GZip 압축 (대용량 응답 최적화)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# API 키 검증 의존성
async def verify_api_key(
    authorization: Optional[HTTPAuthorizationCredentials] = Depends(security),
    x_api_key: Optional[str] = Header(None)
):
    """API 키 검증"""
    api_key = None
    
    if authorization:
        api_key = authorization.credentials
    elif x_api_key:
        api_key = x_api_key
    
    if not api_key:
        raise HTTPException(
            status_code=401,
            detail="API 키가 필요합니다. Authorization 헤더 또는 X-API-Key 헤더를 사용하세요."
        )
    
    # 실제 구현에서는 데이터베이스에서 API 키 검증
    valid_api_keys = os.getenv("VALID_API_KEYS", "").split(",")
    if api_key not in valid_api_keys and os.getenv("API_KEY") != api_key:
        raise HTTPException(
            status_code=403,
            detail="유효하지 않은 API 키입니다."
        )
    
    return api_key

# Pydantic 모델
class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str

class TodoItem(BaseModel):
    id: Optional[str] = None
    description: str
    priority: str = "medium"
    status: str = "pending"
    milestone: Optional[str] = None

class TodoListResponse(BaseModel):
    todos: List[TodoItem]
    total: int

class AnalysisRequest(BaseModel):
    url: str
    options: Optional[dict] = {}

class AnalysisResponse(BaseModel):
    url: str
    timestamp: str
    scores: dict
    recommendations: List[str]

# 루트 엔드포인트
@app.get("/", response_class=JSONResponse)
async def root():
    """루트 엔드포인트"""
    return {
        "message": "Dev Agent Kit API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

# 헬스 체크 엔드포인트 (빠른 응답, 캐싱 최적화)
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """서버 상태 확인"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0"
    )

# To-do 엔드포인트
@app.post("/api/todos", response_model=TodoItem, dependencies=[Depends(verify_api_key)])
async def create_todo(todo: TodoItem):
    """새로운 To-do 항목 생성"""
    # 실제 구현에서는 데이터베이스에 저장
    todo.id = f"todo_{int(time.time())}"
    return todo

@app.get("/api/todos", response_model=TodoListResponse, dependencies=[Depends(verify_api_key)])
async def get_todos(status: Optional[str] = None):
    """To-do 리스트 조회"""
    # 실제 구현에서는 데이터베이스에서 조회
    todos = []
    return TodoListResponse(todos=todos, total=len(todos))

@app.get("/api/todos/{todo_id}", response_model=TodoItem, dependencies=[Depends(verify_api_key)])
async def get_todo(todo_id: str):
    """특정 To-do 항목 조회"""
    # 실제 구현에서는 데이터베이스에서 조회
    raise HTTPException(status_code=404, detail="To-do 항목을 찾을 수 없습니다.")

# SEO 분석 엔드포인트
@app.post("/api/seo/analyze", response_model=AnalysisResponse, dependencies=[Depends(verify_api_key)])
async def analyze_seo(request: AnalysisRequest):
    """SEO 분석"""
    # 실제 구현에서는 SEO 모듈 호출
    return AnalysisResponse(
        url=request.url,
        timestamp=datetime.utcnow().isoformat(),
        scores={"overall": 85},
        recommendations=["메타 태그 추가", "키워드 최적화"]
    )

# AI SEO 분석 엔드포인트
@app.post("/api/ai-seo/analyze", response_model=AnalysisResponse, dependencies=[Depends(verify_api_key)])
async def analyze_ai_seo(request: AnalysisRequest):
    """AI SEO 분석"""
    # 실제 구현에서는 AI SEO 모듈 호출
    return AnalysisResponse(
        url=request.url,
        timestamp=datetime.utcnow().isoformat(),
        scores={"overall": 90},
        recommendations=["AI 키워드 리서치", "콘텐츠 최적화"]
    )

# GEO 분석 엔드포인트
@app.post("/api/geo/analyze", response_model=AnalysisResponse, dependencies=[Depends(verify_api_key)])
async def analyze_geo(request: AnalysisRequest):
    """GEO (Generative Engine Optimization) 분석"""
    # 실제 구현에서는 GEO 모듈 호출
    return AnalysisResponse(
        url=request.url,
        timestamp=datetime.utcnow().isoformat(),
        scores={"overall": 88},
        recommendations=["FAQ 스키마 추가", "구조화된 데이터 최적화"]
    )

# 스트리밍 응답 예시 (대용량 데이터 처리 최적화)
@app.get("/api/stream", dependencies=[Depends(verify_api_key)])
async def stream_data():
    """스트리밍 응답 예시"""
    async def generate():
        for i in range(10):
            yield f"data: {json.dumps({'index': i, 'timestamp': datetime.utcnow().isoformat()})}\n\n"
            await asyncio.sleep(0.1)
    
    return StreamingResponse(generate(), media_type="text/event-stream")

# 성능 최적화를 위한 요청 로깅 미들웨어
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """요청 로깅 (성능 모니터링)"""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    # 응답 헤더에 처리 시간 추가
    response.headers["X-Process-Time"] = str(process_time)
    
    # 느린 요청 경고 (1초 이상)
    if process_time > 1.0:
        print(f"⚠️ 느린 요청 감지: {request.url.path} ({process_time:.2f}초)")
    
    return response

# 에러 핸들러
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """HTTP 예외 처리"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
            "path": request.url.path
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """일반 예외 처리"""
    return JSONResponse(
        status_code=500,
        content={
            "error": "내부 서버 오류",
            "detail": str(exc),
            "path": request.url.path
        }
    )

# 서버 실행
if __name__ == "__main__":
    import asyncio
    
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True,  # 개발 환경에서만 활성화
        workers=1,  # 프로덕션에서는 CPU 코어 수에 맞게 조정
        log_level="info"
    )
