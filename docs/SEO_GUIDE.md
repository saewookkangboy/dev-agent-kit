# SEO, AI SEO, GEO, AIO 최적화 가이드

## 개요

Dev Agent Kit은 웹 서비스 최적화를 위한 종합 도구를 제공합니다:
- **SEO**: 검색 엔진 최적화
- **AI SEO**: AI 기반 SEO 최적화
- **GEO**: 지리적 위치 기반 최적화
- **AIO**: All-In-One 종합 최적화

## SEO 최적화

### 기본 사용법

```bash
# SEO 분석
dev-agent seo analyze https://example.com

# Sitemap 생성
dev-agent seo sitemap -u https://example.com https://example.com/about

# Robots.txt 생성
dev-agent seo robots
```

### 주요 기능

1. **메타 태그 분석**
   - Title 태그 길이 검증 (30-60자 권장)
   - Description 태그 길이 검증 (120-160자 권장)
   - Open Graph 태그 확인

2. **키워드 분석**
   - 키워드 밀도 계산
   - 키워드 배치 최적화

3. **구조화된 데이터**
   - JSON-LD 스키마 검증
   - Schema.org 마크업 확인

4. **기술적 SEO**
   - Sitemap.xml 생성
   - Robots.txt 생성
   - URL 구조 분석

## AI SEO 최적화

### 기본 사용법

```bash
# AI 키워드 리서치
dev-agent ai-seo keywords "웹 개발"

# 콘텐츠 최적화
dev-agent ai-seo optimize "콘텐츠 내용" -k "키워드1" "키워드2"

# 경쟁사 분석
dev-agent ai-seo competitors example.com -c competitor1.com competitor2.com
```

### 주요 기능

1. **AI 키워드 리서치**
   - 주요 키워드 추천
   - 롱테일 키워드 생성
   - 의미론적 키워드 제안
   - 경쟁사 키워드 분석

2. **AI 콘텐츠 최적화**
   - 키워드 밀도 최적화 (0.5-2.0% 권장)
   - 가독성 점수 계산
   - 콘텐츠 품질 평가
   - 자동 개선 제안

3. **경쟁사 분석**
   - 경쟁사 키워드 추출
   - 백링크 분석
   - 도메인 권한 평가
   - 콘텐츠 점수 비교

## GEO 최적화

### 기본 사용법

```bash
# 위치 분석
dev-agent geo analyze "서울시 강남구"

# 지역 비즈니스 스키마 생성
dev-agent geo schema -n "비즈니스명" -p "02-1234-5678" -a "서울시 강남구 테헤란로"

# Hreflang 태그 생성
dev-agent geo hreflang -l ko en -u https://example.com

# 지역별 최적화
dev-agent geo optimize "서울"
```

### 주요 기능

1. **위치 분석**
   - 좌표 정보 추출
   - 타임존 확인
   - 지역 키워드 추천
   - 주변 경쟁사 분석

2. **지역 비즈니스 스키마**
   - LocalBusiness Schema 생성
   - 주소 정보 구조화
   - 영업시간 정보
   - 지리 좌표 포함

3. **다국어 최적화**
   - Hreflang 태그 생성
   - 언어별 URL 매핑
   - 기본 언어 설정

4. **지역별 콘텐츠**
   - 지역 키워드 최적화
   - 지역별 랜딩 페이지 제안
   - 지역 경쟁사 분석

## AIO (All-In-One) 최적화

### 기본 사용법

```bash
# 종합 분석
dev-agent aio analyze https://example.com

# 자동 최적화
dev-agent aio optimize https://example.com

# 리포트 생성
dev-agent aio report -f markdown
```

### 주요 기능

1. **종합 분석**
   - SEO 점수
   - AI SEO 점수
   - GEO 점수
   - 성능 점수
   - 접근성 점수
   - 보안 점수
   - 소셜 미디어 점수

2. **자동 최적화**
   - Sitemap 자동 생성
   - Robots.txt 자동 생성
   - 이미지 최적화 권장
   - 보안 헤더 설정
   - 성능 최적화 제안

3. **리포트 생성**
   - JSON 형식
   - Markdown 형식
   - 상세 분석 결과
   - 우선순위별 권장사항

## 통합 워크플로우

### 1. 초기 SEO 설정

```bash
# SEO 분석
dev-agent seo analyze https://example.com

# 기본 파일 생성
dev-agent seo sitemap -u https://example.com
dev-agent seo robots
```

### 2. AI 기반 최적화

```bash
# 키워드 리서치
dev-agent ai-seo keywords "주요 주제"

# 콘텐츠 최적화
dev-agent ai-seo optimize "기존 콘텐츠" -k "주요키워드"

# 경쟁사 분석
dev-agent ai-seo competitors example.com
```

### 3. 지역 최적화

```bash
# 위치 분석
dev-agent geo analyze "서울시 강남구"

# 지역 스키마 생성
dev-agent geo schema -n "회사명" -p "전화번호" -a "주소"

# 다국어 설정
dev-agent geo hreflang -l ko en ja -u https://example.com
```

### 4. 종합 최적화

```bash
# AIO 종합 분석
dev-agent aio analyze https://example.com

# 자동 최적화 적용
dev-agent aio optimize https://example.com

# 리포트 확인
dev-agent aio report -f markdown
```

## 최적화 체크리스트

### SEO 기본
- [ ] Title 태그 최적화 (50자 권장)
- [ ] Description 태그 최적화 (155자 권장)
- [ ] 메타 키워드 설정
- [ ] Open Graph 태그 추가
- [ ] Sitemap.xml 생성
- [ ] Robots.txt 생성
- [ ] 구조화된 데이터 (JSON-LD) 추가

### AI SEO
- [ ] 주요 키워드 리서치 완료
- [ ] 키워드 밀도 최적화 (1% 권장)
- [ ] 롱테일 키워드 활용
- [ ] 의미론적 키워드 포함
- [ ] 콘텐츠 가독성 개선
- [ ] 경쟁사 키워드 분석

### GEO
- [ ] 지역 비즈니스 등록 (Google My Business)
- [ ] LocalBusiness Schema 추가
- [ ] 지역 키워드 콘텐츠 작성
- [ ] Hreflang 태그 설정
- [ ] 지역별 랜딩 페이지 생성
- [ ] 주소 정보 정확성 확인

### AIO
- [ ] 종합 분석 실행
- [ ] 점수 80점 이상 목표
- [ ] 우선순위별 최적화 적용
- [ ] 정기적 모니터링 설정

## 고급 기능

### 커스텀 설정

각 모듈의 설정 파일을 수정하여 커스터마이징할 수 있습니다:

- SEO 설정: `.project-data/seo/seo-config.json`
- AI SEO 설정: `.project-data/ai-seo/ai-seo-config.json`
- GEO 설정: `.project-data/geo/geo-config.json`
- AIO 설정: `.project-data/aio/aio-config.json`

### API 통합

실제 구현 시 다음 API를 통합할 수 있습니다:

- **Google Search Console API**: 검색 성능 데이터
- **Google Analytics API**: 트래픽 분석
- **Claude API**: AI 기반 분석
- **OpenAI API**: 콘텐츠 최적화
- **Google Maps API**: 지리 정보
- **PageSpeed Insights API**: 성능 분석

## 문제 해결

### 분석 결과가 나오지 않는 경우

```bash
# 설정 파일 확인
cat .project-data/seo/seo-config.json

# 리포트 파일 확인
cat .project-data/seo/seo-report.json
```

### 최적화 점수가 낮은 경우

1. AIO 종합 분석 실행
2. 우선순위 높은 항목부터 개선
3. 점수가 낮은 영역 집중 개선
4. 정기적으로 재분석

## 참고 자료

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Google My Business](https://www.google.com/business/)

