import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const SKILLS_DIR = path.join(process.cwd(), '.project-data', 'claude-skills');
const ACTIVE_SKILLS_FILE = path.join(SKILLS_DIR, 'active-skills.json');

/**
 * Claude Skills 모듈
 * ComposioHQ awesome-claude-skills 통합
 */
class ClaudeSkills {
  constructor() {
    this.skills = {
      'spec-kit': {
        name: 'Spec-kit Integration',
        description: 'GitHub Spec-kit 기반 사양 문서 관리',
        category: 'development',
        source: 'awesome-claude-skills'
      },
      'todo-manager': {
        name: 'To-do Manager',
        description: '작업 항목 생성 및 관리',
        category: 'productivity',
        source: 'awesome-claude-skills'
      },
      'code-reviewer': {
        name: 'Code Reviewer',
        description: '코드 리뷰 및 개선 제안',
        category: 'development',
        source: 'awesome-claude-skills'
      },
      'test-generator': {
        name: 'Test Generator',
        description: '자동 테스트 코드 생성',
        category: 'development',
        source: 'awesome-claude-skills'
      },
      'documentation': {
        name: 'Documentation Generator',
        description: 'API 및 코드 문서 자동 생성',
        category: 'documentation',
        source: 'awesome-claude-skills'
      },
      'changelog-generator': {
        name: 'Changelog Generator',
        description: '변경 로그 자동 생성',
        category: 'productivity',
        source: 'awesome-claude-skills'
      },
      'content-research': {
        name: 'Content Research Writer',
        description: '콘텐츠 리서치 및 작성 지원',
        category: 'writing',
        source: 'awesome-claude-skills'
      },
      'file-organizer': {
        name: 'File Organizer',
        description: '파일 및 폴더 자동 정리',
        category: 'productivity',
        source: 'awesome-claude-skills'
      },
      'image-enhancer': {
        name: 'Image Enhancer',
        description: '이미지 품질 개선',
        category: 'media',
        source: 'awesome-claude-skills'
      },
      'competitive-analysis': {
        name: 'Competitive Analysis',
        description: '경쟁사 분석 및 인사이트 도출',
        category: 'business',
        source: 'awesome-claude-skills'
      }
    };
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(SKILLS_DIR)) {
      fs.mkdirSync(SKILLS_DIR, { recursive: true });
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
    console.log(chalk.blue('\n📋 사용 가능한 Claude Skills:\n'));
    
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
        console.log(chalk.yellow('사용 가능한 Skills 목록을 보려면: dev-agent skills list'));
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

export default new ClaudeSkills();

