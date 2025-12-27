# Config 모듈

프로젝트 설정 관리 모듈입니다.

## 주요 기능

- 설정 로드 및 저장
- 설정 업데이트
- 설정 초기화

## 사용 예제

```javascript
import { loadConfig, updateConfig } from './src/config/index.js';

// 설정 로드
const config = await loadConfig();

// 설정 업데이트
await updateConfig({ language: 'en' });
```

