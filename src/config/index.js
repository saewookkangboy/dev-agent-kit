/**
 * 프로젝트 설정 관리
 */

import fs from 'fs-extra';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), '.project-data', 'config.json');

/**
 * 기본 설정
 */
const defaultConfig = {
  project_name: 'dev-agent-kit',
  version: '1.0.0',
  created_at: new Date().toISOString(),
  settings: {
    language: 'ko',
    timezone: 'Asia/Seoul',
    date_format: 'YYYY-MM-DD',
    time_format: 'HH:mm:ss'
  },
  features: {
    spec_kit: true,
    todo: true,
    roles: true,
    lightning: true,
    claude_skills: true,
    agent_skills: true,
    seo: true,
    ai_seo: true,
    geo: true,
    aio: true
  }
};

/**
 * 설정 로드
 * @returns {Promise<object>} 설정 객체
 */
export async function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const config = await fs.readJson(CONFIG_FILE);
      return { ...defaultConfig, ...config };
    }
    return defaultConfig;
  } catch (error) {
    console.error('설정 로드 실패:', error.message);
    return defaultConfig;
  }
}

/**
 * 설정 저장
 * @param {object} config - 저장할 설정 객체
 * @returns {Promise<void>}
 */
export async function saveConfig(config) {
  try {
    const dir = path.dirname(CONFIG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
  } catch (error) {
    console.error('설정 저장 실패:', error.message);
    throw error;
  }
}

/**
 * 설정 업데이트
 * @param {object} updates - 업데이트할 설정
 * @returns {Promise<object>} 업데이트된 설정
 */
export async function updateConfig(updates) {
  const config = await loadConfig();
  const updated = { ...config, ...updates };
  await saveConfig(updated);
  return updated;
}

/**
 * 설정 초기화
 * @returns {Promise<object>} 초기화된 설정
 */
export async function initConfig() {
  const config = {
    ...defaultConfig,
    project_name: path.basename(process.cwd()),
    created_at: new Date().toISOString()
  };
  await saveConfig(config);
  return config;
}

export default {
  loadConfig,
  saveConfig,
  updateConfig,
  initConfig,
  defaultConfig
};

