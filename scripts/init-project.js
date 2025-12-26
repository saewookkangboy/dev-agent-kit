import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 프로젝트 초기화 스크립트
 */
async function initProject() {
  console.log(chalk.blue.bold('\n🚀 Dev Agent Kit 프로젝트 초기화\n'));

  try {
    // 기본 디렉토리 생성
    const directories = [
      '.project-data',
      '.spec-kit',
      '.project-data/todos',
      '.project-data/lightning',
      '.project-data/lightning/training-data',
      '.project-data/claude-skills',
      '.project-data/agent-skills',
      'docs',
      'templates'
    ];

    console.log(chalk.blue('📁 디렉토리 생성 중...'));
    for (const dir of directories) {
      const dirPath = path.join(process.cwd(), dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(chalk.green(`   ✓ ${dir}`));
      } else {
        console.log(chalk.yellow(`   - ${dir} (이미 존재)`));
      }
    }

    // 기본 설정 파일 생성
    console.log(chalk.blue('\n📄 설정 파일 생성 중...'));

    const configFile = path.join(process.cwd(), '.project-data', 'config.json');
    if (!fs.existsSync(configFile)) {
      const config = {
        project_name: path.basename(process.cwd()),
        created_at: new Date().toISOString(),
        version: '1.0.0',
        settings: {
          auto_save: true,
          default_role: null,
          active_skills: []
        }
      };
      await fs.writeJson(configFile, config, { spaces: 2 });
      console.log(chalk.green(`   ✓ config.json`));
    }

    // Git 초기화 확인
    const gitDir = path.join(process.cwd(), '.git');
    if (!fs.existsSync(gitDir)) {
      const { initGit } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'initGit',
          message: 'Git 저장소를 초기화하시겠습니까?',
          default: true
        }
      ]);

      if (initGit) {
        const { execSync } = await import('child_process');
        execSync('git init', { cwd: process.cwd(), stdio: 'inherit' });
        console.log(chalk.green('   ✓ Git 저장소 초기화 완료'));
      }
    }

    // README 생성 (없는 경우)
    const readmeFile = path.join(process.cwd(), 'README.md');
    if (!fs.existsSync(readmeFile)) {
      const readmeContent = `# ${path.basename(process.cwd())}

이 프로젝트는 Dev Agent Kit을 사용하여 관리됩니다.

## 사용 방법

\`\`\`bash
# To-do 관리
dev-agent todo add "작업 내용"

# Role 설정
dev-agent role set --role frontend

# Spec-kit 관리
dev-agent spec create "사양명"

# 더 많은 명령어
dev-agent --help
\`\`\`
`;
      await fs.writeFile(readmeFile, readmeContent);
      console.log(chalk.green(`   ✓ README.md`));
    }

    console.log(chalk.green.bold('\n✅ 프로젝트 초기화 완료!\n'));
    console.log(chalk.blue('다음 단계:'));
    console.log(chalk.blue('  1. dev-agent role set --role <role> 으로 역할 설정'));
    console.log(chalk.blue('  2. dev-agent todo add "작업 내용" 으로 작업 추가'));
    console.log(chalk.blue('  3. dev-agent spec create "사양명" 으로 사양 문서 생성\n'));

  } catch (error) {
    console.error(chalk.red(`❌ 초기화 실패: ${error.message}`));
    process.exit(1);
  }
}

export default initProject;

// 직접 실행 시
if (import.meta.url === `file://${process.argv[1]}`) {
  initProject();
}

