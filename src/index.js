/**
 * Dev Agent Kit - 메인 진입점
 * 통합 개발 에이전트 패키지
 */

import chalk from 'chalk';

console.log(chalk.blue.bold('\n🚀 Dev Agent Kit\n'));
console.log(chalk.gray('통합 개발 에이전트 패키지\n'));

console.log(chalk.blue('사용 가능한 모듈:'));
console.log(chalk.blue('  • Spec-kit: 사양 문서 관리'));
console.log(chalk.blue('  • To-do: 작업 관리'));
console.log(chalk.blue('  • Roles: Agent 역할 관리'));
console.log(chalk.blue('  • Lightning: AI 강화학습'));
console.log(chalk.blue('  • Claude Skills: Claude AI 스킬'));
console.log(chalk.blue('  • Agent Skills: 에이전트 스킬\n'));

console.log(chalk.yellow('CLI를 사용하려면: dev-agent --help\n'));

export default {
  version: '1.0.0',
  description: '통합 개발 에이전트 패키지'
};

