import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import crypto from 'crypto';

const API_KEY_DIR = path.join(process.cwd(), '.project-data', 'api-keys');
const API_KEY_CONFIG_FILE = path.join(API_KEY_DIR, 'api-keys.json');
const API_KEY_CACHE_FILE = path.join(API_KEY_DIR, 'api-key-cache.json');

/**
 * API 키 토큰 최적화 관리 모듈
 * - 토큰 캐싱 및 재사용
 * - 여러 API 공급자 지원
 * - 사용량 추적 및 제한
 * - 보안 관리
 */
class APIKeyManager {
  constructor() {
    this.ensureDirectories();
    this.tokenCache = new Map(); // 인메모리 캐시
    this.usageStats = new Map(); // 사용량 통계
    this.maxCacheAge = 3600000; // 1시간 (밀리초)
    this.loadCache();
  }

  ensureDirectories() {
    if (!fs.existsSync(API_KEY_DIR)) {
      fs.mkdirSync(API_KEY_DIR, { recursive: true });
    }
  }

  /**
   * API 키 저장 (암호화)
   */
  async saveAPIKey(provider, apiKey, options = {}) {
    try {
      const config = await this.loadConfig();
      
      // API 키 암호화
      const encryptedKey = this.encryptAPIKey(apiKey);
      
      const keyEntry = {
        provider,
        encryptedKey,
        environment: options.environment || 'default',
        createdAt: new Date().toISOString(),
        lastUsed: null,
        usageCount: 0,
        rateLimit: options.rateLimit || null,
        expiresAt: options.expiresAt || null,
        metadata: options.metadata || {}
      };

      if (!config.keys) {
        config.keys = {};
      }
      
      config.keys[provider] = keyEntry;
      
      await fs.writeJson(API_KEY_CONFIG_FILE, config, { spaces: 2 });
      
      // 캐시에 저장
      this.tokenCache.set(provider, {
        apiKey,
        cachedAt: Date.now(),
        usageCount: 0
      });

      console.log(chalk.green(`✅ API 키 저장 완료: ${provider}`));
      
      return keyEntry;
    } catch (error) {
      console.error(chalk.red(`❌ API 키 저장 실패: ${error.message}`));
      throw error;
    }
  }

  /**
   * API 키 조회 (최적화된 방식)
   */
  async getAPIKey(provider, options = {}) {
    try {
      // 1. 인메모리 캐시 확인 (가장 빠름)
      if (this.tokenCache.has(provider)) {
        const cached = this.tokenCache.get(provider);
        const cacheAge = Date.now() - cached.cachedAt;
        
        if (cacheAge < this.maxCacheAge) {
          // 사용량 추적
          cached.usageCount++;
          this.updateUsageStats(provider, 'cache_hit');
          
          return cached.apiKey;
        } else {
          // 캐시 만료
          this.tokenCache.delete(provider);
        }
      }

      // 2. 파일에서 조회 (암호화 해제)
      const config = await this.loadConfig();
      
      if (!config.keys || !config.keys[provider]) {
        throw new Error(`API 키를 찾을 수 없습니다: ${provider}`);
      }

      const keyEntry = config.keys[provider];
      
      // 만료 확인
      if (keyEntry.expiresAt && new Date(keyEntry.expiresAt) < new Date()) {
        throw new Error(`API 키가 만료되었습니다: ${provider}`);
      }

      // API 키 복호화
      const apiKey = this.decryptAPIKey(keyEntry.encryptedKey);
      
      // 캐시에 저장
      this.tokenCache.set(provider, {
        apiKey,
        cachedAt: Date.now(),
        usageCount: 1
      });

      // 사용 기록 업데이트
      keyEntry.lastUsed = new Date().toISOString();
      keyEntry.usageCount++;
      config.keys[provider] = keyEntry;
      await fs.writeJson(API_KEY_CONFIG_FILE, config, { spaces: 2 });
      
      this.updateUsageStats(provider, 'file_read');
      
      return apiKey;
    } catch (error) {
      console.error(chalk.red(`❌ API 키 조회 실패: ${error.message}`));
      throw error;
    }
  }

  /**
   * 여러 API 키 일괄 조회 (최적화)
   */
  async getMultipleAPIKeys(providers) {
    const keys = {};
    const promises = providers.map(async (provider) => {
      try {
        keys[provider] = await this.getAPIKey(provider);
      } catch (error) {
        keys[provider] = null;
      }
    });
    
    await Promise.all(promises);
    return keys;
  }

  /**
   * API 키 삭제
   */
  async deleteAPIKey(provider) {
    try {
      const config = await this.loadConfig();
      
      if (config.keys && config.keys[provider]) {
        delete config.keys[provider];
        await fs.writeJson(API_KEY_CONFIG_FILE, config, { spaces: 2 });
        
        // 캐시에서도 삭제
        this.tokenCache.delete(provider);
        
        console.log(chalk.green(`✅ API 키 삭제 완료: ${provider}`));
      }
    } catch (error) {
      console.error(chalk.red(`❌ API 키 삭제 실패: ${error.message}`));
      throw error;
    }
  }

  /**
   * API 키 목록 조회
   */
  async listAPIKeys() {
    try {
      const config = await this.loadConfig();
      
      if (!config.keys) {
        return [];
      }

      return Object.entries(config.keys).map(([provider, keyEntry]) => ({
        provider,
        environment: keyEntry.environment,
        createdAt: keyEntry.createdAt,
        lastUsed: keyEntry.lastUsed,
        usageCount: keyEntry.usageCount,
        expiresAt: keyEntry.expiresAt,
        hasExpired: keyEntry.expiresAt ? new Date(keyEntry.expiresAt) < new Date() : false
      }));
    } catch (error) {
      console.error(chalk.red(`❌ API 키 목록 조회 실패: ${error.message}`));
      return [];
    }
  }

  /**
   * 사용량 통계 조회
   */
  getUsageStats(provider = null) {
    if (provider) {
      return this.usageStats.get(provider) || {
        cacheHits: 0,
        fileReads: 0,
        totalRequests: 0
      };
    }

    const stats = {};
    this.usageStats.forEach((value, key) => {
      stats[key] = value;
    });
    
    return stats;
  }

  /**
   * 캐시 정리 (만료된 항목 제거)
   */
  async clearExpiredCache() {
    const now = Date.now();
    let cleared = 0;
    
    for (const [provider, cached] of this.tokenCache.entries()) {
      const cacheAge = now - cached.cachedAt;
      if (cacheAge >= this.maxCacheAge) {
        this.tokenCache.delete(provider);
        cleared++;
      }
    }
    
    if (cleared > 0) {
      console.log(chalk.blue(`🧹 캐시 정리: ${cleared}개 항목 제거`));
    }
    
    return cleared;
  }

  /**
   * 모든 캐시 초기화
   */
  async clearAllCache() {
    this.tokenCache.clear();
    console.log(chalk.blue('🧹 모든 캐시 초기화 완료'));
  }

  /**
   * API 키 암호화
   */
  encryptAPIKey(apiKey) {
    // 간단한 암호화 (프로덕션에서는 더 강력한 방법 사용)
    const algorithm = 'aes-256-cbc';
    const secretKey = this.getSecretKey();
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return iv.toString('hex') + ':' + encrypted;
  }

  /**
   * API 키 복호화
   */
  decryptAPIKey(encryptedKey) {
    try {
      const algorithm = 'aes-256-cbc';
      const secretKey = this.getSecretKey();
      const parts = encryptedKey.split(':');
      const iv = Buffer.from(parts[0], 'hex');
      const encrypted = parts[1];
      
      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error('API 키 복호화 실패: ' + error.message);
    }
  }

  /**
   * 암호화용 시크릿 키 생성
   */
  getSecretKey() {
    // 프로덕션에서는 환경 변수에서 가져오기
    const defaultKey = 'dev-agent-kit-secret-key-32bytes!!';
    const envKey = process.env.API_KEY_ENCRYPTION_KEY || defaultKey;
    
    // 32바이트 키 생성
    return crypto.createHash('sha256').update(envKey).digest();
  }

  /**
   * 설정 파일 로드
   */
  async loadConfig() {
    try {
      if (fs.existsSync(API_KEY_CONFIG_FILE)) {
        return await fs.readJson(API_KEY_CONFIG_FILE);
      }
      return { keys: {} };
    } catch (error) {
      return { keys: {} };
    }
  }

  /**
   * 캐시 파일 로드
   */
  async loadCache() {
    try {
      if (fs.existsSync(API_KEY_CACHE_FILE)) {
        const cacheData = await fs.readJson(API_KEY_CACHE_FILE);
        const now = Date.now();
        
        // 만료된 캐시 제거
        for (const [provider, cached] of Object.entries(cacheData)) {
          const cacheAge = now - cached.cachedAt;
          if (cacheAge < this.maxCacheAge) {
            this.tokenCache.set(provider, cached);
          }
        }
      }
    } catch (error) {
      // 캐시 로드 실패는 무시
    }
  }

  /**
   * 캐시 저장
   */
  async saveCache() {
    try {
      const cacheData = {};
      this.tokenCache.forEach((value, key) => {
        cacheData[key] = value;
      });
      
      await fs.writeJson(API_KEY_CACHE_FILE, cacheData, { spaces: 2 });
    } catch (error) {
      // 캐시 저장 실패는 무시
    }
  }

  /**
   * 사용량 통계 업데이트
   */
  updateUsageStats(provider, type) {
    if (!this.usageStats.has(provider)) {
      this.usageStats.set(provider, {
        cacheHits: 0,
        fileReads: 0,
        totalRequests: 0
      });
    }
    
    const stats = this.usageStats.get(provider);
    stats.totalRequests++;
    
    if (type === 'cache_hit') {
      stats.cacheHits++;
    } else if (type === 'file_read') {
      stats.fileReads++;
    }
  }

  /**
   * API 키 검증
   */
  async validateAPIKey(provider, apiKey) {
    try {
      const storedKey = await this.getAPIKey(provider);
      return storedKey === apiKey;
    } catch (error) {
      return false;
    }
  }

  /**
   * 통계 출력
   */
  printStats() {
    console.log(chalk.bold.cyan('\n📊 API 키 사용량 통계:\n'));
    
    const stats = this.getUsageStats();
    
    if (Object.keys(stats).length === 0) {
      console.log(chalk.gray('  통계 데이터가 없습니다.\n'));
      return;
    }
    
    Object.entries(stats).forEach(([provider, stat]) => {
      const cacheHitRate = stat.totalRequests > 0 
        ? ((stat.cacheHits / stat.totalRequests) * 100).toFixed(1)
        : 0;
      
      console.log(chalk.blue(`  ${provider}:`));
      console.log(chalk.gray(`    총 요청: ${stat.totalRequests}`));
      console.log(chalk.green(`    캐시 히트: ${stat.cacheHits} (${cacheHitRate}%)`));
      console.log(chalk.yellow(`    파일 읽기: ${stat.fileReads}`));
      console.log();
    });
    
    console.log(chalk.blue(`  캐시된 키 수: ${this.tokenCache.size}\n`));
  }
}

export default new APIKeyManager();
