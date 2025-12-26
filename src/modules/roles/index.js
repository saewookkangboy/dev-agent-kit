import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const ROLE_CONFIG_FILE = path.join(process.cwd(), '.project-data', 'role-config.json');

/**
 * Agent Role 시스템
 * 다양한 개발 역할을 지원하는 에이전트 시스템
 */
class RoleManager {
  constructor() {
    this.roles = {
      pm: {
        name: 'Project Manager',
        description: '프로젝트 관리 및 조율',
        responsibilities: [
          '프로젝트 일정 관리',
          '팀원 간 커뮤니케이션 조율',
          '리소스 할당 및 우선순위 결정',
          '리스크 관리',
          '프로젝트 진행 상황 보고'
        ],
        tools: ['Jira', 'Confluence', 'Notion', 'GitHub Projects'],
        permissions: ['read', 'write', 'manage']
      },
      frontend: {
        name: 'Frontend Developer',
        description: '프론트엔드 개발',
        responsibilities: [
          '사용자 인터페이스 구현',
          '반응형 디자인 적용',
          '브라우저 호환성 확보',
          '성능 최적화',
          '사용자 경험 개선'
        ],
        tools: ['React', 'Vue', 'Angular', 'TypeScript', 'CSS', 'Webpack'],
        permissions: ['read', 'write']
      },
      backend: {
        name: 'Backend Developer',
        description: '백엔드 개발',
        responsibilities: [
          'API 설계 및 구현',
          '비즈니스 로직 개발',
          '데이터 처리 및 변환',
          '서버 성능 최적화',
          '보안 구현'
        ],
        tools: ['Node.js', 'Python', 'Java', 'Go', 'REST API', 'GraphQL'],
        permissions: ['read', 'write']
      },
      'server-db': {
        name: 'Server/DB Developer',
        description: '서버 및 데이터베이스 관리',
        responsibilities: [
          '서버 인프라 구축 및 관리',
          '데이터베이스 설계 및 최적화',
          '백업 및 복구 전략 수립',
          '모니터링 및 로깅',
          '확장성 계획 수립'
        ],
        tools: ['Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS'],
        permissions: ['read', 'write', 'deploy']
      },
      security: {
        name: 'Security Manager',
        description: '보안 관리 및 감사',
        responsibilities: [
          '보안 정책 수립',
          '취약점 분석 및 대응',
          '보안 감사 수행',
          '인증 및 권한 관리',
          '보안 인시던트 대응'
        ],
        tools: ['OWASP', 'Snyk', 'SonarQube', 'Burp Suite', 'Nmap'],
        permissions: ['read', 'audit', 'manage']
      },
      'ui-ux': {
        name: 'UI/UX Designer',
        description: '사용자 인터페이스 및 경험 설계',
        responsibilities: [
          '사용자 연구 및 분석',
          '와이어프레임 및 프로토타입 제작',
          '디자인 시스템 구축',
          '사용성 테스트',
          '디자인 가이드라인 작성'
        ],
        tools: ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'UserTesting'],
        permissions: ['read', 'design']
      },
      marketing: {
        name: 'AI Marketing Researcher',
        description: 'AI 기반 시장 리서치',
        responsibilities: [
          '시장 동향 분석',
          '경쟁사 분석',
          '타겟 고객 조사',
          '마케팅 전략 수립',
          '데이터 기반 인사이트 도출'
        ],
        tools: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Claude AI', 'GPT'],
        permissions: ['read', 'research', 'analyze']
      }
    };
    this.ensureDataDir();
  }

  ensureDataDir() {
    const dataDir = path.dirname(ROLE_CONFIG_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  async getCurrentRole() {
    try {
      if (fs.existsSync(ROLE_CONFIG_FILE)) {
        const config = await fs.readJson(ROLE_CONFIG_FILE);
        return config.currentRole || null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async setRole(roleKey) {
    try {
      if (!this.roles[roleKey]) {
        console.log(chalk.red(`❌ 알 수 없는 역할: ${roleKey}`));
        console.log(chalk.yellow('사용 가능한 역할:'));
        this.list();
        return;
      }

      const role = this.roles[roleKey];
      const config = {
        currentRole: roleKey,
        roleData: role,
        setAt: new Date().toISOString()
      };

      await fs.writeJson(ROLE_CONFIG_FILE, config, { spaces: 2 });
      
      console.log(chalk.green(`✅ 역할이 설정되었습니다.`));
      console.log(chalk.blue(`   역할: ${role.name}`));
      console.log(chalk.blue(`   설명: ${role.description}`));
      console.log(chalk.blue(`\n📋 주요 책임:`));
      role.responsibilities.forEach(resp => {
        console.log(chalk.blue(`   • ${resp}`));
      });
    } catch (error) {
      console.error(chalk.red(`❌ 역할 설정 실패: ${error.message}`));
      throw error;
    }
  }

  async list() {
    console.log(chalk.blue('\n📋 사용 가능한 역할:\n'));
    
    Object.entries(this.roles).forEach(([key, role]) => {
      console.log(chalk.bold.cyan(`${key}: ${role.name}`));
      console.log(chalk.gray(`   ${role.description}`));
      console.log();
    });
  }

  async info() {
    const currentRoleKey = await this.getCurrentRole();
    
    if (!currentRoleKey) {
      console.log(chalk.yellow('⚠️  현재 설정된 역할이 없습니다.'));
      console.log(chalk.blue('역할을 설정하려면: dev-agent role set --role <role-key>'));
      return;
    }

    const role = this.roles[currentRoleKey];
    const config = await fs.readJson(ROLE_CONFIG_FILE);
    
    console.log(chalk.blue('\n📋 현재 역할 정보:\n'));
    console.log(chalk.bold.cyan(`역할: ${role.name}`));
    console.log(chalk.blue(`설명: ${role.description}`));
    console.log(chalk.blue(`설정일: ${config.setAt}\n`));
    
    console.log(chalk.bold('📋 주요 책임:'));
    role.responsibilities.forEach(resp => {
      console.log(chalk.blue(`   • ${resp}`));
    });
    
    console.log(chalk.bold('\n🛠️  주요 도구:'));
    role.tools.forEach(tool => {
      console.log(chalk.blue(`   • ${tool}`));
    });
    
    console.log(chalk.bold('\n🔐 권한:'));
    role.permissions.forEach(perm => {
      console.log(chalk.blue(`   • ${perm}`));
    });
    console.log();
  }

  getRole(roleKey) {
    return this.roles[roleKey] || null;
  }
}

export default new RoleManager();

