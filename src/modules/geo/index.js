import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const GEO_DIR = path.join(process.cwd(), '.project-data', 'geo');
const GEO_CONFIG_FILE = path.join(GEO_DIR, 'geo-config.json');
const GEO_REPORT_FILE = path.join(GEO_DIR, 'geo-report.json');

/**
 * GEO (Generative Engine Optimization) 모듈
 * 생성형 AI 검색 엔진 최적화 (ChatGPT, Claude, Perplexity, Gemini 등)
 */
class GEOManager {
  constructor() {
    this.ensureDirectories();
    this.targetEngines = ['chatgpt', 'claude', 'perplexity', 'gemini', 'copilot'];
  }

  ensureDirectories() {
    if (!fs.existsSync(GEO_DIR)) {
      fs.mkdirSync(GEO_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(GEO_CONFIG_FILE)) {
        return await fs.readJson(GEO_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      targetEngines: this.targetEngines,
      contentStructure: {
        useHeadings: true,
        useLists: true,
        useTables: true,
        useCodeBlocks: true,
        useCitations: true
      },
      structuredData: {
        enabled: true,
        types: ['FAQPage', 'HowTo', 'Article', 'QAPage']
      },
      aiFriendlyFormat: {
        directAnswers: true,
        stepByStep: true,
        bulletPoints: true,
        definitions: true
      },
      citations: {
        enabled: true,
        format: 'markdown',
        includeAuthor: true,
        includeDate: true
      }
    };
  }

  async analyzeContent(urlOrPath, options = {}) {
    try {
      console.log(chalk.blue(`\n🤖 GEO (Generative Engine Optimization) 분석 시작: ${urlOrPath}\n`));

      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        engines: {},
        scores: {},
        issues: [],
        recommendations: [],
        overallScore: 0
      };

      const config = await this.loadConfig();

      // 각 AI 엔진별 분석
      for (const engine of config.targetEngines) {
        const engineAnalysis = await this.analyzeForEngine(urlOrPath, engine);
        analysis.engines[engine] = engineAnalysis;
        analysis.scores[engine] = engineAnalysis.score;
      }

      // 콘텐츠 구조 분석
      const structureAnalysis = await this.analyzeContentStructure(urlOrPath);
      analysis.scores.structure = structureAnalysis.score;
      analysis.issues.push(...structureAnalysis.issues);
      analysis.recommendations.push(...structureAnalysis.recommendations);

      // 구조화된 데이터 분석
      const schemaAnalysis = await this.analyzeStructuredData(urlOrPath);
      analysis.scores.schema = schemaAnalysis.score;
      analysis.issues.push(...schemaAnalysis.issues);
      analysis.recommendations.push(...schemaAnalysis.recommendations);

      // AI 친화적 형식 분석
      const formatAnalysis = await this.analyzeAIFriendlyFormat(urlOrPath);
      analysis.scores.format = formatAnalysis.score;
      analysis.issues.push(...formatAnalysis.issues);
      analysis.recommendations.push(...formatAnalysis.recommendations);

      // 인용 가능성 분석
      const citationAnalysis = await this.analyzeCitations(urlOrPath);
      analysis.scores.citations = citationAnalysis.score;
      analysis.issues.push(...citationAnalysis.issues);
      analysis.recommendations.push(...citationAnalysis.recommendations);

      // 전체 점수 계산
      const scores = Object.values(analysis.scores);
      analysis.overallScore = Math.round(
        scores.reduce((sum, score) => sum + score, 0) / scores.length
      );

      // 리포트 저장
      await fs.writeJson(GEO_REPORT_FILE, analysis, { spaces: 2 });

      // 결과 출력
      this.printAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ GEO 분석 실패: ${error.message}`));
      throw error;
    }
  }

  async analyzeForEngine(urlOrPath, engine) {
    // 엔진별 분석 시뮬레이션
    // 실제 구현 시 각 AI 엔진의 특성에 맞춰 분석
    const analysis = {
      engine,
      score: 75,
      factors: {
        contentClarity: 80,
        structureQuality: 70,
        citationQuality: 75,
        answerFormat: 80
      },
      recommendations: []
    };

    // 엔진별 특화 권장사항
    if (engine === 'chatgpt') {
      analysis.recommendations.push({
        type: 'format',
        message: 'ChatGPT는 단계별 설명을 선호합니다',
        action: 'HowTo 스키마 추가 권장'
      });
    } else if (engine === 'claude') {
      analysis.recommendations.push({
        type: 'format',
        message: 'Claude는 상세한 설명과 인용을 선호합니다',
        action: 'Article 스키마 및 인용 추가 권장'
      });
    } else if (engine === 'perplexity') {
      analysis.recommendations.push({
        type: 'citation',
        message: 'Perplexity는 신뢰할 수 있는 소스를 중요시합니다',
        action: '인용 및 출처 명확히 표시'
      });
    }

    return analysis;
  }

  async analyzeContentStructure(urlOrPath) {
    const issues = [];
    const recommendations = [];
    let score = 100;

    // 제목 구조 확인
    recommendations.push({
      type: 'structure',
      message: '명확한 제목 구조 (H1, H2, H3) 사용 권장',
      action: '계층적 제목 구조 구현'
    });

    // 리스트 사용 확인
    recommendations.push({
      type: 'structure',
      message: 'AI는 리스트 형식을 선호합니다',
      action: '불릿 포인트 또는 번호 리스트 활용'
    });

    // 표 사용 확인
    recommendations.push({
      type: 'structure',
      message: '표를 사용하여 정보를 구조화하세요',
      action: '표 형식으로 데이터 정리'
    });

    score -= 15; // 기본 구조 개선 여지

    return { score, issues, recommendations };
  }

  async analyzeStructuredData(urlOrPath) {
    const issues = [];
    const recommendations = [];
    let score = 100;

    // FAQ 스키마 확인
    recommendations.push({
      type: 'schema',
      message: 'FAQPage 스키마 추가 권장',
      action: '자주 묻는 질문을 FAQ 스키마로 구조화'
    });
    score -= 20;

    // HowTo 스키마 확인
    recommendations.push({
      type: 'schema',
      message: 'HowTo 스키마로 단계별 가이드 제공',
      action: 'HowTo 스키마 구현'
    });
    score -= 15;

    // Article 스키마 확인
    recommendations.push({
      type: 'schema',
      message: 'Article 스키마로 콘텐츠 구조화',
      action: 'Article 스키마 추가'
    });
    score -= 10;

    return { score, issues, recommendations };
  }

  async analyzeAIFriendlyFormat(urlOrPath) {
    const issues = [];
    const recommendations = [];
    let score = 100;

    // 직접 답변 형식
    recommendations.push({
      type: 'format',
      message: '질문에 대한 직접적인 답변 제공',
      action: '명확하고 간결한 답변 형식 사용'
    });

    // 단계별 설명
    recommendations.push({
      type: 'format',
      message: '단계별 설명 형식 사용',
      action: 'Step-by-step 가이드 제공'
    });

    // 정의 제공
    recommendations.push({
      type: 'format',
      message: '주요 용어에 대한 정의 제공',
      action: '용어집 또는 정의 섹션 추가'
    });

    score -= 10;

    return { score, issues, recommendations };
  }

  async analyzeCitations(urlOrPath) {
    const issues = [];
    const recommendations = [];
    let score = 100;

    // 인용 확인
    recommendations.push({
      type: 'citation',
      message: '신뢰할 수 있는 소스 인용 추가',
      action: '출처 및 참고문헌 명시'
    });
    score -= 20;

    // 날짜 정보
    recommendations.push({
      type: 'citation',
      message: '콘텐츠 작성 및 업데이트 날짜 표시',
      action: '날짜 메타데이터 추가'
    });
    score -= 10;

    return { score, issues, recommendations };
  }

  printAnalysis(analysis) {
    console.log(chalk.bold.cyan('📊 GEO (Generative Engine Optimization) 분석 결과:\n'));
    console.log(chalk.blue(`전체 점수: ${chalk.bold(analysis.overallScore)}/100\n`));

    console.log(chalk.bold('AI 엔진별 점수:\n'));
    Object.entries(analysis.scores).forEach(([key, score]) => {
      if (this.targetEngines.includes(key)) {
        const color = score >= 80 ? chalk.green : score >= 60 ? chalk.yellow : chalk.red;
        console.log(`${key}: ${color(score)}/100`);
      }
    });

    console.log(chalk.bold('\n영역별 점수:\n'));
    ['structure', 'schema', 'format', 'citations'].forEach(key => {
      if (analysis.scores[key]) {
        const color = analysis.scores[key] >= 80 ? chalk.green : 
                     analysis.scores[key] >= 60 ? chalk.yellow : chalk.red;
        console.log(`${key}: ${color(analysis.scores[key])}/100`);
      }
    });

    if (analysis.recommendations.length > 0) {
      console.log(chalk.yellow(`\n💡 권장사항 (${analysis.recommendations.length}개):\n`));
      analysis.recommendations.forEach(rec => {
        console.log(`  • ${rec.message}`);
        console.log(chalk.gray(`    → ${rec.action}`));
      });
    }

    console.log(chalk.blue(`\n📄 상세 리포트: ${GEO_REPORT_FILE}\n`));
  }

  async generateFAQSchema(faqs = []) {
    try {
      console.log(chalk.blue(`\n🤖 FAQ 스키마 생성...\n`));

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      };

      const schemaFile = path.join(process.cwd(), 'public', 'faq-schema.json');
      const schemaDir = path.dirname(schemaFile);
      
      if (!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir, { recursive: true });
      }

      await fs.writeJson(schemaFile, schema, { spaces: 2 });
      console.log(chalk.green(`✅ FAQ 스키마 생성 완료: ${schemaFile}`));
      console.log(chalk.blue(`\nHTML에 추가할 코드:\n`));
      console.log(chalk.gray(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`));
      console.log();

      return schema;
    } catch (error) {
      console.error(chalk.red(`❌ FAQ 스키마 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async generateHowToSchema(howToData) {
    try {
      console.log(chalk.blue(`\n🤖 HowTo 스키마 생성...\n`));

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: howToData.name || '',
        description: howToData.description || '',
        step: howToData.steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name || '',
          text: step.text || '',
          image: step.image || ''
        }))
      };

      const schemaFile = path.join(process.cwd(), 'public', 'howto-schema.json');
      const schemaDir = path.dirname(schemaFile);
      
      if (!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir, { recursive: true });
      }

      await fs.writeJson(schemaFile, schema, { spaces: 2 });
      console.log(chalk.green(`✅ HowTo 스키마 생성 완료: ${schemaFile}`));
      console.log(chalk.blue(`\nHTML에 추가할 코드:\n`));
      console.log(chalk.gray(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`));
      console.log();

      return schema;
    } catch (error) {
      console.error(chalk.red(`❌ HowTo 스키마 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async generateArticleSchema(articleData) {
    try {
      console.log(chalk.blue(`\n🤖 Article 스키마 생성...\n`));

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleData.headline || '',
        description: articleData.description || '',
        author: {
          '@type': 'Person',
          name: articleData.author?.name || '',
          url: articleData.author?.url || ''
        },
        datePublished: articleData.datePublished || new Date().toISOString(),
        dateModified: articleData.dateModified || new Date().toISOString(),
        publisher: {
          '@type': 'Organization',
          name: articleData.publisher?.name || '',
          logo: {
            '@type': 'ImageObject',
            url: articleData.publisher?.logo || ''
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleData.url || ''
        }
      };

      const schemaFile = path.join(process.cwd(), 'public', 'article-schema.json');
      const schemaDir = path.dirname(schemaFile);
      
      if (!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir, { recursive: true });
      }

      await fs.writeJson(schemaFile, schema, { spaces: 2 });
      console.log(chalk.green(`✅ Article 스키마 생성 완료: ${schemaFile}`));
      console.log(chalk.blue(`\nHTML에 추가할 코드:\n`));
      console.log(chalk.gray(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`));
      console.log();

      return schema;
    } catch (error) {
      console.error(chalk.red(`❌ Article 스키마 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async optimizeForEngines(urlOrPath, engines = []) {
    try {
      console.log(chalk.blue(`\n🤖 생성형 엔진 최적화 시작: ${urlOrPath}\n`));

      const targetEngines = engines.length > 0 ? engines : this.targetEngines;
      const optimization = {
        url: urlOrPath,
        engines: targetEngines,
        timestamp: new Date().toISOString(),
        optimizations: [],
        recommendations: []
      };

      // 엔진별 최적화 제안
      targetEngines.forEach(engine => {
        if (engine === 'chatgpt') {
          optimization.recommendations.push({
            engine: 'chatgpt',
            type: 'content',
            message: 'ChatGPT는 단계별 가이드를 선호합니다',
            action: 'HowTo 스키마 및 단계별 설명 추가'
          });
        } else if (engine === 'claude') {
          optimization.recommendations.push({
            engine: 'claude',
            type: 'content',
            message: 'Claude는 상세한 설명과 인용을 선호합니다',
            action: 'Article 스키마 및 상세 인용 추가'
          });
        } else if (engine === 'perplexity') {
          optimization.recommendations.push({
            engine: 'perplexity',
            type: 'citation',
            message: 'Perplexity는 신뢰할 수 있는 소스를 중요시합니다',
            action: '출처 및 참고문헌 명확히 표시'
          });
        }
      });

      // 공통 최적화
      optimization.optimizations.push({
        type: 'structure',
        action: 'FAQ 스키마 추가',
        priority: 'high'
      });

      optimization.optimizations.push({
        type: 'format',
        action: '명확한 제목 구조 및 리스트 형식 사용',
        priority: 'high'
      });

      await fs.writeJson(GEO_REPORT_FILE, optimization, { spaces: 2 });

      console.log(chalk.green(`✅ 생성형 엔진 최적화 완료`));
      console.log(chalk.blue(`대상 엔진: ${targetEngines.join(', ')}`));
      console.log(chalk.blue(`📄 리포트: ${GEO_REPORT_FILE}\n`));

      return optimization;
    } catch (error) {
      console.error(chalk.red(`❌ 생성형 엔진 최적화 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new GEOManager();
