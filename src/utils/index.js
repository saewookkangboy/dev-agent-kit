/**
 * 유틸리티 함수 모음
 */

/**
 * ID 생성
 * @returns {string} 고유 ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * 날짜 포맷팅
 * @param {Date} date - 포맷할 날짜
 * @param {string} format - 포맷 형식
 * @returns {string} 포맷된 날짜 문자열
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 디렉토리 존재 확인 및 생성
 * @param {string} dirPath - 디렉토리 경로
 */
export function ensureDirectory(dirPath) {
  const fs = require('fs-extra');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 객체 깊은 복사
 * @param {object} obj - 복사할 객체
 * @returns {object} 복사된 객체
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 배열 중복 제거
 * @param {Array} array - 중복을 제거할 배열
 * @returns {Array} 중복이 제거된 배열
 */
export function uniqueArray(array) {
  return [...new Set(array)];
}

/**
 * 지연 실행 (Promise)
 * @param {number} ms - 지연 시간 (밀리초)
 * @returns {Promise}
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 에러 처리 래퍼
 * @param {Function} fn - 실행할 함수
 * @returns {Function} 에러 처리가 포함된 함수
 */
export function asyncHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };
}

