import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const AGENT_SKILLS_DIR = path.join(process.cwd(), '.project-data', 'agent-skills');
const ACTIVE_SKILLS_FILE = path.join(AGENT_SKILLS_DIR, 'active-skills.json');

/**
 * Agent Skills 모듈
 * agentskills 프레임워크 통합
 */
class AgentSkills {
  constructor() {
    this.skills = {
      'web-search': {
        name: 'Web Search',
        description: '웹 검색 및 정보 수집',
        category: 'research',
        source: 'agentskills'
      },
      'code-execution': {
        name: 'Code Execution',
        description: '코드 실행 및 결과 분석',
        category: 'development',
        source: 'agentskills'
      },
      'file-operations': {
        name: 'File Operations',
        description: '파일 읽기, 쓰기, 수정 작업',
        category: 'productivity',
        source: 'agentskills'
      },
      'database-query': {
        name: 'Database Query',
        description: '데이터베이스 쿼리 실행',
        category: 'data',
        source: 'agentskills'
      },
      'api-call': {
        name: 'API Call',
        description: '외부 API 호출 및 데이터 처리',
        category: 'integration',
        source: 'agentskills'
      },
      'git-operations': {
        name: 'Git Operations',
        description: 'Git 저장소 관리 및 작업',
        category: 'development',
        source: 'agentskills'
      },
      'data-analysis': {
        name: 'Data Analysis',
        description: '데이터 분석 및 시각화',
        category: 'data',
        source: 'agentskills'
      },
      'nlp-processing': {
        name: 'NLP Processing',
        description: '자연어 처리 및 분석',
        category: 'ai',
        source: 'agentskills'
      },
      'image-processing': {
        name: 'Image Processing',
        description: '이미지 처리 및 분석',
        category: 'media',
        source: 'agentskills'
      },
      'scheduling': {
        name: 'Scheduling',
        description: '작업 스케줄링 및 관리',
        category: 'productivity',
        source: 'agentskills'
      }
    };
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(AGENT_SKILLS_DIR)) {
      fs.mkdirSync(AGENT_SKILLS_DIR, { recursive: true });
    }
    if (!fs.existsSync(ACTIVE_SKILLS_FILE)) {
      fs.writeFileSync(ACTIVE_SKILLS_FILE, JSON.stringify({ skills: [] }, null, 2));
    }
  }

  async loadActiveSkills() {
    try {
      const data = await fs.readJson(ACTIVE_SKILLS_FILE);
      return data.skills || [];
    } catch (error) {
      return [];
    }
  }

  async saveActiveSkills(skills) {
    await fs.writeJson(ACTIVE_SKILLS_FILE, { skills }, { spaces: 2 });
  }

  async list() {
    console.log(chalk.blue('\n📋 사용 가능한 Agent Skills:\n'));
    
    const categories = {};
    Object.entries(this.skills).forEach(([key, skill]) => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push({ key, ...skill });
    });

    Object.entries(categories).forEach(([category, skills]) => {
      console.log(chalk.bold.cyan(`\n${category.toUpperCase()}:`));
      skills.forEach(skill => {
        console.log(chalk.blue(`  • ${chalk.bold(skill.key)}: ${skill.name}`));
        console.log(chalk.gray(`    ${skill.description}`));
      });
    });

    const activeSkills = await this.loadActiveSkills();
    if (activeSkills.length > 0) {
      console.log(chalk.green(`\n✅ 활성화된 Skills (${activeSkills.length}개):`));
      activeSkills.forEach(skillKey => {
        const skill = this.skills[skillKey];
        if (skill) {
          console.log(chalk.green(`   • ${skill.name}`));
        }
      });
    }
    console.log();
  }

  async activate(skillName) {
    try {
      if (!this.skills[skillName]) {
        console.log(chalk.red(`❌ 알 수 없는 Skill: ${skillName}`));
        console.log(chalk.yellow('사용 가능한 Skills 목록을 보려면: dev-agent skills list --type agent'));
        return;
      }

      const activeSkills = await this.loadActiveSkills();
      
      if (activeSkills.includes(skillName)) {
        console.log(chalk.yellow(`⚠️  "${skillName}"은 이미 활성화되어 있습니다.`));
        return;
      }

      activeSkills.push(skillName);
      await this.saveActiveSkills(activeSkills);

      const skill = this.skills[skillName];
      console.log(chalk.green(`✅ Skill이 활성화되었습니다.`));
      console.log(chalk.blue(`   이름: ${skill.name}`));
      console.log(chalk.blue(`   설명: ${skill.description}`));
      console.log(chalk.blue(`   카테고리: ${skill.category}`));
    } catch (error) {
      console.error(chalk.red(`❌ Skill 활성화 실패: ${error.message}`));
      throw error;
    }
  }

  async deactivate(skillName) {
    try {
      const activeSkills = await this.loadActiveSkills();
      const index = activeSkills.indexOf(skillName);
      
      if (index === -1) {
        console.log(chalk.yellow(`⚠️  "${skillName}"은 활성화되어 있지 않습니다.`));
        return;
      }

      activeSkills.splice(index, 1);
      await this.saveActiveSkills(activeSkills);

      console.log(chalk.green(`✅ Skill이 비활성화되었습니다: ${skillName}`));
    } catch (error) {
      console.error(chalk.red(`❌ Skill 비활성화 실패: ${error.message}`));
      throw error;
    }
  }

  getSkill(skillName) {
    return this.skills[skillName] || null;
  }
}

export default new AgentSkills();

