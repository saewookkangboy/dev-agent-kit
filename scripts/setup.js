import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * 패키지 설정 스크립트
 */
async function setup() {
  console.log(chalk.blue.bold('\n🔧 Dev Agent Kit 설정\n'));

  try {
    // 필요한 디렉토리 확인
    const binFile = path.join(process.cwd(), 'bin', 'cli.js');
    if (fs.existsSync(binFile)) {
      // 실행 권한 부여 (Unix 계열)
      if (process.platform !== 'win32') {
        const { execSync } = await import('child_process');
        execSync(`chmod +x ${binFile}`, { stdio: 'inherit' });
        console.log(chalk.green('✓ CLI 실행 권한 설정 완료'));
      }
    }

    console.log(chalk.green.bold('\n✅ 설정 완료!\n'));
    console.log(chalk.blue('사용 방법:'));
    console.log(chalk.blue('  dev-agent --help\n'));

  } catch (error) {
    console.error(chalk.red(`❌ 설정 실패: ${error.message}`));
    process.exit(1);
  }
}

export default setup;

// 직접 실행 시
if (import.meta.url === `file://${process.argv[1]}`) {
  setup();
}

