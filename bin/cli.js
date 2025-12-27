#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Command } from 'commander';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name('dev-agent')
  .description('통합 개발 에이전트 패키지 CLI')
  .version('1.0.0');

// To-do 명령어
const todoCommand = program.command('todo');
todoCommand
  .command('add')
  .description('새로운 To-do 항목 추가')
  .argument('<description>', '작업 설명')
  .option('-p, --priority <level>', '우선순위 (high, medium, low)', 'medium')
  .option('-m, --milestone <name>', '마일스톤 이름')
  .action(async (description, options) => {
    const { default: todoModule } = await import('../src/modules/todo/index.js');
    await todoModule.add(description, options);
  });

todoCommand
  .command('list')
  .description('To-do 리스트 조회')
  .option('-s, --status <status>', '상태 필터 (pending, in-progress, completed)')
  .action(async (options) => {
    const { default: todoModule } = await import('../src/modules/todo/index.js');
    await todoModule.list(options);
  });

todoCommand
  .command('complete')
  .description('To-do 항목 완료 처리')
  .argument('<id>', 'To-do ID')
  .action(async (id) => {
    const { default: todoModule } = await import('../src/modules/todo/index.js');
    await todoModule.complete(id);
  });

// Role 명령어
const roleCommand = program.command('role');
roleCommand
  .command('set')
  .description('현재 Agent Role 설정')
  .option('-r, --role <role>', '역할 (pm, frontend, backend, server-db, security, ui-ux, marketing)')
  .action(async (options) => {
    const { default: roleModule } = await import('../src/modules/roles/index.js');
    await roleModule.setRole(options.role);
  });

roleCommand
  .command('list')
  .description('사용 가능한 Role 목록 조회')
  .action(async () => {
    const { default: roleModule } = await import('../src/modules/roles/index.js');
    await roleModule.list();
  });

roleCommand
  .command('info')
  .description('현재 Role 정보 조회')
  .action(async () => {
    const { default: roleModule } = await import('../src/modules/roles/index.js');
    await roleModule.info();
  });

// Spec-kit 명령어
const specCommand = program.command('spec');
specCommand
  .command('create')
  .description('새로운 사양 문서 생성')
  .argument('<name>', '사양 이름')
  .action(async (name) => {
    const { default: specModule } = await import('../src/modules/spec-kit/index.js');
    await specModule.create(name);
  });

specCommand
  .command('validate')
  .description('사양 문서 검증')
  .action(async () => {
    const { default: specModule } = await import('../src/modules/spec-kit/index.js');
    await specModule.validate();
  });

specCommand
  .command('list')
  .description('사양 문서 목록 조회')
  .action(async () => {
    const { default: specModule } = await import('../src/modules/spec-kit/index.js');
    await specModule.list();
  });

// Training 명령어
program
  .command('train')
  .description('AI 강화학습 시작')
  .option('-a, --agent <name>', '에이전트 이름')
  .option('-e, --episodes <number>', '에피소드 수', '100')
  .action(async (options) => {
    const { default: lightningModule } = await import('../src/modules/lightning/index.js');
    await lightningModule.train(options);
  });

// Skills 명령어
const skillsCommand = program.command('skills');
skillsCommand
  .command('list')
  .description('사용 가능한 Skills 목록 조회')
  .option('-t, --type <type>', '스킬 타입 (claude, agent)')
  .action(async (options) => {
    if (!options.type || options.type === 'claude') {
      const { default: claudeSkills } = await import('../src/modules/claude-skills/index.js');
      await claudeSkills.list();
    }
    if (!options.type || options.type === 'agent') {
      const { default: agentSkills } = await import('../src/modules/agent-skills/index.js');
      await agentSkills.list();
    }
  });

skillsCommand
  .command('activate')
  .description('Skill 활성화')
  .argument('<name>', 'Skill 이름')
  .option('-t, --type <type>', '스킬 타입 (claude, agent)', 'claude')
  .action(async (name, options) => {
    if (options.type === 'claude') {
      const { default: claudeSkills } = await import('../src/modules/claude-skills/index.js');
      await claudeSkills.activate(name);
    } else {
      const { default: agentSkills } = await import('../src/modules/agent-skills/index.js');
      await agentSkills.activate(name);
    }
  });

// SEO 명령어
const seoCommand = program.command('seo');
seoCommand
  .command('analyze')
  .description('SEO 분석')
  .argument('<url>', '분석할 URL 또는 경로')
  .action(async (url) => {
    const { default: seoModule } = await import('../src/modules/seo/index.js');
    await seoModule.analyze(url);
  });

seoCommand
  .command('sitemap')
  .description('Sitemap 생성')
  .option('-u, --urls <urls...>', 'URL 목록')
  .action(async (options) => {
    const { default: seoModule } = await import('../src/modules/seo/index.js');
    await seoModule.generateSitemap(options.urls || []);
  });

seoCommand
  .command('robots')
  .description('Robots.txt 생성')
  .action(async () => {
    const { default: seoModule } = await import('../src/modules/seo/index.js');
    await seoModule.generateRobotsTxt();
  });

seoCommand
  .command('mobile')
  .description('모바일 최적화 분석')
  .argument('<url>', '분석할 URL')
  .action(async (url) => {
    const { default: seoModule } = await import('../src/modules/seo/index.js');
    await seoModule.analyzeMobileOptimization(url);
  });

seoCommand
  .command('performance')
  .description('성능 분석 (Core Web Vitals)')
  .argument('<url>', '분석할 URL')
  .action(async (url) => {
    const { default: seoModule } = await import('../src/modules/seo/index.js');
    await seoModule.analyzePerformance(url);
  });

// AI SEO 명령어
const aiSeoCommand = program.command('ai-seo');
aiSeoCommand
  .command('keywords')
  .description('AI 기반 키워드 리서치')
  .argument('<topic>', '주제')
  .action(async (topic) => {
    const { default: aiSeoModule } = await import('../src/modules/ai-seo/index.js');
    await aiSeoModule.researchKeywords(topic);
  });

aiSeoCommand
  .command('optimize')
  .description('AI 기반 콘텐츠 최적화')
  .argument('<content>', '최적화할 콘텐츠')
  .option('-k, --keywords <keywords...>', '타겟 키워드')
  .action(async (content, options) => {
    const { default: aiSeoModule } = await import('../src/modules/ai-seo/index.js');
    await aiSeoModule.optimizeContent(content, options.keywords || []);
  });

aiSeoCommand
  .command('competitors')
  .description('경쟁사 분석')
  .argument('<domain>', '도메인')
  .option('-c, --competitors <competitors...>', '경쟁사 도메인 목록')
  .action(async (domain, options) => {
    const { default: aiSeoModule } = await import('../src/modules/ai-seo/index.js');
    await aiSeoModule.analyzeCompetitors(domain, options.competitors || []);
  });

aiSeoCommand
  .command('citations')
  .description('AI 인용 모니터링')
  .argument('<url>', '모니터링할 URL')
  .action(async (url) => {
    const { default: aiSeoModule } = await import('../src/modules/ai-seo/index.js');
    await aiSeoModule.monitorAICitations(url);
  });

aiSeoCommand
  .command('multimodal')
  .description('멀티모달 콘텐츠 최적화')
  .option('-i, --images <images...>', '이미지 URL 목록')
  .option('-v, --videos <videos...>', '비디오 URL 목록')
  .action(async (options) => {
    const { default: aiSeoModule } = await import('../src/modules/ai-seo/index.js');
    const contentData = {
      images: (options.images || []).map(url => ({ url })),
      videos: (options.videos || []).map(url => ({ url }))
    };
    await aiSeoModule.optimizeMultimodalContent(contentData);
  });

// GEO (Generative Engine Optimization) 명령어
const geoCommand = program.command('geo');
geoCommand
  .command('analyze')
  .description('GEO (Generative Engine Optimization) 분석')
  .argument('<url>', '분석할 URL 또는 경로')
  .action(async (url) => {
    const { default: geoModule } = await import('../src/modules/geo/index.js');
    await geoModule.analyzeContent(url);
  });

geoCommand
  .command('faq')
  .description('FAQ 스키마 생성')
  .option('-q, --questions <questions...>', '질문 목록')
  .action(async (options) => {
    const { default: geoModule } = await import('../src/modules/geo/index.js');
    // FAQ 데이터 구조화 필요
    const faqs = (options.questions || []).map((q, i) => ({
      question: q,
      answer: `답변 ${i + 1}`
    }));
    await geoModule.generateFAQSchema(faqs);
  });

geoCommand
  .command('howto')
  .description('HowTo 스키마 생성')
  .option('-n, --name <name>', '가이드 이름')
  .option('-s, --steps <steps...>', '단계 목록')
  .action(async (options) => {
    const { default: geoModule } = await import('../src/modules/geo/index.js');
    const howToData = {
      name: options.name || '가이드',
      description: '',
      steps: (options.steps || []).map((step, i) => ({
        name: `단계 ${i + 1}`,
        text: step
      }))
    };
    await geoModule.generateHowToSchema(howToData);
  });

geoCommand
  .command('article')
  .description('Article 스키마 생성')
  .option('-h, --headline <headline>', '제목')
  .option('-a, --author <author>', '작성자')
  .option('-u, --url <url>', 'URL')
  .action(async (options) => {
    const { default: geoModule } = await import('../src/modules/geo/index.js');
    const articleData = {
      headline: options.headline || '',
      description: '',
      author: { name: options.author || '' },
      url: options.url || '',
      publisher: { name: '' }
    };
    await geoModule.generateArticleSchema(articleData);
  });

geoCommand
  .command('optimize')
  .description('생성형 엔진 최적화')
  .argument('<url>', '최적화할 URL 또는 경로')
  .option('-e, --engines <engines...>', '대상 엔진 (chatgpt, claude, perplexity, gemini)')
  .action(async (url, options) => {
    const { default: geoModule } = await import('../src/modules/geo/index.js');
    await geoModule.optimizeForEngines(url, options.engines || []);
  });

geoCommand
  .command('llms-txt')
  .description('llms.txt 파일 생성 (AI 모델 크롤링용)')
  .option('-u, --url <url>', '사이트 URL')
  .option('-n, --name <name>', '사이트 이름')
  .option('-d, --description <description>', '사이트 설명')
  .action(async (options) => {
    const { default: geoModule } = await import('../src/modules/geo/index.js');
    const siteInfo = {
      url: options.url || 'https://example.com',
      name: options.name || 'Site Name',
      description: options.description || ''
    };
    await geoModule.generateLLMsTxt(siteInfo);
  });

geoCommand
  .command('fact-sheet')
  .description('팩트 시트 생성 (브랜드 정보)')
  .option('-n, --name <name>', '브랜드 이름')
  .option('-d, --description <description>', '설명')
  .option('-u, --url <url>', 'URL')
  .action(async (options) => {
    const { default: geoModule } = await import('../src/modules/geo/index.js');
    const brandInfo = {
      name: options.name || '',
      description: options.description || '',
      url: options.url || ''
    };
    await geoModule.generateFactSheet(brandInfo);
  });

geoCommand
  .command('track-citations')
  .description('AI 인용 추적')
  .argument('<url>', '추적할 URL')
  .action(async (url) => {
    const { default: geoModule } = await import('../src/modules/geo/index.js');
    await geoModule.trackAICitations(url);
  });

// AIO 명령어
const aioCommand = program.command('aio');
aioCommand
  .command('analyze')
  .description('AIO 종합 분석')
  .argument('<url>', '분석할 URL 또는 경로')
  .action(async (url) => {
    const { default: aioModule } = await import('../src/modules/aio/index.js');
    await aioModule.comprehensiveAnalysis(url);
  });

aioCommand
  .command('optimize')
  .description('AIO 자동 최적화')
  .argument('<url>', '최적화할 URL 또는 경로')
  .action(async (url) => {
    const { default: aioModule } = await import('../src/modules/aio/index.js');
    await aioModule.autoOptimize(url);
  });

aioCommand
  .command('report')
  .description('AIO 리포트 생성')
  .option('-f, --format <format>', '리포트 형식 (json, markdown)', 'json')
  .action(async (options) => {
    const { default: aioModule } = await import('../src/modules/aio/index.js');
    await aioModule.generateReport(options.format);
  });

aioCommand
  .command('feedback-loop')
  .description('AI 피드백 루프 구축')
  .argument('<url>', 'URL')
  .option('-f, --frequency <frequency>', '모니터링 주기 (daily, weekly, monthly)', 'daily')
  .option('-e, --engines <engines...>', '대상 엔진')
  .action(async (url, options) => {
    const { default: aioModule } = await import('../src/modules/aio/index.js');
    await aioModule.setupAIFeedbackLoop(url, options);
  });

aioCommand
  .command('visibility')
  .description('AI 가시성 모니터링')
  .argument('<url>', '모니터링할 URL')
  .action(async (url) => {
    const { default: aioModule } = await import('../src/modules/aio/index.js');
    await aioModule.monitorAIVisibility(url);
  });

aioCommand
  .command('aeo')
  .description('AEO (Answer Engine Optimization) 최적화')
  .argument('<url>', '최적화할 URL')
  .action(async (url) => {
    const { default: aioModule } = await import('../src/modules/aio/index.js');
    await aioModule.optimizeAEO(url);
  });

// API 키 관리 명령어
const apiKeyCommand = program.command('api-key');
apiKeyCommand
  .command('set')
  .description('API 키 저장')
  .argument('<provider>', 'API 공급자 (예: openai, claude, google)')
  .option('-k, --key <key>', 'API 키')
  .option('-e, --env <environment>', '환경 (default, production, development)', 'default')
  .action(async (provider, options) => {
    const { default: apiKeyManager } = await import('../src/modules/api-key-manager/index.js');
    
    let apiKey = options.key;
    if (!apiKey) {
      // 키를 입력받기 (보안을 위해 환경 변수나 파일에서 가져오기)
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      apiKey = await new Promise((resolve) => {
        rl.question('API 키를 입력하세요: ', (answer) => {
          rl.close();
          resolve(answer);
        });
      });
    }
    
    await apiKeyManager.saveAPIKey(provider, apiKey, {
      environment: options.env
    });
  });

apiKeyCommand
  .command('list')
  .description('저장된 API 키 목록 조회')
  .action(async () => {
    const { default: apiKeyManager } = await import('../src/modules/api-key-manager/index.js');
    const keys = await apiKeyManager.listAPIKeys();
    
    if (keys.length === 0) {
      console.log(chalk.yellow('저장된 API 키가 없습니다.'));
      return;
    }
    
    console.log(chalk.bold.cyan('\n📋 저장된 API 키 목록:\n'));
    keys.forEach(key => {
      console.log(chalk.blue(`  ${key.provider}:`));
      console.log(chalk.gray(`    환경: ${key.environment}`));
      console.log(chalk.gray(`    생성일: ${key.createdAt}`));
      console.log(chalk.gray(`    마지막 사용: ${key.lastUsed || '없음'}`));
      console.log(chalk.gray(`    사용 횟수: ${key.usageCount}`));
      if (key.hasExpired) {
        console.log(chalk.red(`    상태: 만료됨`));
      }
      console.log();
    });
  });

apiKeyCommand
  .command('delete')
  .description('API 키 삭제')
  .argument('<provider>', 'API 공급자')
  .action(async (provider) => {
    const { default: apiKeyManager } = await import('../src/modules/api-key-manager/index.js');
    await apiKeyManager.deleteAPIKey(provider);
  });

apiKeyCommand
  .command('stats')
  .description('API 키 사용량 통계')
  .action(async () => {
    const { default: apiKeyManager } = await import('../src/modules/api-key-manager/index.js');
    apiKeyManager.printStats();
  });

apiKeyCommand
  .command('clear-cache')
  .description('API 키 캐시 초기화')
  .action(async () => {
    const { default: apiKeyManager } = await import('../src/modules/api-key-manager/index.js');
    await apiKeyManager.clearAllCache();
  });

// FastAPI 서버 명령어
program
  .command('api:start')
  .description('FastAPI 서버 시작')
  .option('-p, --port <port>', '포트 번호', '8000')
  .option('-h, --host <host>', '호스트 주소', '0.0.0.0')
  .option('--reload', '자동 리로드 활성화', false)
  .action(async (options) => {
    const { spawn } = await import('child_process');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const { dirname } = await import('path');
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const apiDir = path.join(__dirname, '..', 'api');
    
    console.log(chalk.blue.bold('\n🚀 FastAPI 서버 시작 중...\n'));
    console.log(chalk.blue(`포트: ${options.port}`));
    console.log(chalk.blue(`호스트: ${options.host}\n`));
    
    const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
    
    const uvicornArgs = [
      '-m', 'uvicorn',
      'main:app',
      '--host', options.host,
      '--port', options.port.toString()
    ];
    
    if (options.reload) {
      uvicornArgs.push('--reload');
    }
    
    const serverProcess = spawn(pythonCommand, uvicornArgs, {
      cwd: apiDir,
      stdio: 'inherit',
      shell: false
    });
    
    serverProcess.on('error', (error) => {
      console.error(chalk.red(`❌ 서버 시작 실패: ${error.message}`));
      console.log(chalk.yellow('\n💡 Python 및 FastAPI가 설치되어 있는지 확인하세요:'));
      console.log(chalk.gray('   pip install -r api/requirements.txt\n'));
    });
    
    process.on('SIGINT', () => {
      console.log(chalk.yellow('\n\n서버를 종료합니다...'));
      serverProcess.kill();
      process.exit();
    });
  });

program
  .command('api:install')
  .description('FastAPI 의존성 설치')
  .action(async () => {
    const { spawn } = await import('child_process');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const { dirname } = await import('path');
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const apiDir = path.join(__dirname, '..', 'api');
    
    console.log(chalk.blue.bold('\n📦 FastAPI 의존성 설치 중...\n'));
    
    const pipCommand = process.platform === 'win32' ? 'pip' : 'pip3';
    
    const installProcess = spawn(
      pipCommand,
      ['install', '-r', 'requirements.txt'],
      {
        cwd: apiDir,
        stdio: 'inherit',
        shell: false
      }
    );
    
    installProcess.on('error', (error) => {
      console.error(chalk.red(`❌ 설치 실패: ${error.message}`));
      console.log(chalk.yellow('\n💡 Python 및 pip가 설치되어 있는지 확인하세요.\n'));
    });
    
    installProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('\n✅ 의존성 설치 완료!\n'));
      } else {
        console.error(chalk.red(`\n❌ 설치 실패 (종료 코드: ${code})\n`));
      }
    });
  });

// Init 명령어
program
  .command('init')
  .description('프로젝트 초기화')
  .action(async () => {
    const { default: initScript } = await import('../scripts/init-project.js');
    await initScript();
  });

program.parse();

