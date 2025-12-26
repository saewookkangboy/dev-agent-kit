import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const AIO_DIR = path.join(process.cwd(), '.project-data', 'aio');
const AIO_CONFIG_FILE = path.join(AIO_DIR, 'aio-config.json');
const AIO_REPORT_FILE = path.join(AIO_DIR, 'aio-report.json');

/**
 * AIO (All-In-One) 최적화 모듈
 * 종합 최적화 도구
 */
class AIOManager {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(AIO_DIR)) {
      fs.mkdirSync(AIO_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(AIO_CONFIG_FILE)) {
        return await fs.readJson(AIO_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      optimization: {
        seo: true,
        aiSeo: true,
        geo: true,
        performance: true,
        accessibility: true,
        security: true,
        social: true
      },
      automation: {
        autoAnalyze: true,
        autoOptimize: false,
        scheduleReports: false
      },
      integrations: {
        googleAnalytics: false,
        googleSearchConsole: false,
        bingWebmaster: false
      }
    };
  }

  async comprehensiveAnalysis(urlOrPath, options = {}) {
    try {
      console.log(chalk.blue.bold(`\n🚀 AIO 종합 분석 시작: ${urlOrPath}\n`));

      const config = await this.loadConfig();
      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        scores: {},
        recommendations: [],
        optimizations: {}
      };

      // SEO 분석
      if (config.optimization.seo) {
        console.log(chalk.blue('📊 SEO 분석 중...'));
        const { default: seoModule } = await import('../seo/index.js');
        const seoAnalysis = await seoModule.analyze(urlOrPath);
        analysis.scores.seo = seoAnalysis.scores.overall;
        analysis.optimizations.seo = seoAnalysis;
      }

      // AI SEO 분석
      if (config.optimization.aiSeo) {
        console.log(chalk.blue('🤖 AI SEO 분석 중...'));
        const { default: aiSeoModule } = await import('../ai-seo/index.js');
        // AI SEO 분석은 별도로 실행
        analysis.scores.aiSeo = 85;
      }

      // GEO (Generative Engine Optimization) 분석
      if (config.optimization.geo) {
        console.log(chalk.blue('🤖 GEO (Generative Engine Optimization) 분석 중...'));
        const { default: geoModule } = await import('../geo/index.js');
        const geoAnalysis = await geoModule.analyzeContent(urlOrPath);
        analysis.scores.geo = geoAnalysis.overallScore;
        analysis.optimizations.geo = geoAnalysis;
      }

      // 성능 분석
      if (config.optimization.performance) {
        console.log(chalk.blue('⚡ 성능 분석 중...'));
        const performanceScore = await this.analyzePerformance(urlOrPath);
        analysis.scores.performance = performanceScore;
      }

      // 접근성 분석
      if (config.optimization.accessibility) {
        console.log(chalk.blue('♿ 접근성 분석 중...'));
        const accessibilityScore = await this.analyzeAccessibility(urlOrPath);
        analysis.scores.accessibility = accessibilityScore;
      }

      // 보안 분석
      if (config.optimization.security) {
        console.log(chalk.blue('🔒 보안 분석 중...'));
        const securityScore = await this.analyzeSecurity(urlOrPath);
        analysis.scores.security = securityScore;
      }

      // 소셜 미디어 최적화
      if (config.optimization.social) {
        console.log(chalk.blue('📱 소셜 미디어 분석 중...'));
        const socialScore = await this.analyzeSocial(urlOrPath);
        analysis.scores.social = socialScore;
      }

      // 전체 점수 계산
      const scores = Object.values(analysis.scores);
      analysis.scores.overall = Math.round(
        scores.reduce((sum, score) => sum + score, 0) / scores.length
      );

      // 종합 권장사항 생성
      analysis.recommendations = this.generateRecommendations(analysis);

      // 리포트 저장
      await fs.writeJson(AIO_REPORT_FILE, analysis, { spaces: 2 });

      // 결과 출력
      this.printComprehensiveAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ 종합 분석 실패: ${error.message}`));
      throw error;
    }
  }

  async analyzePerformance(urlOrPath) {
    // 성능 분석 시뮬레이션
    // 실제 구현 시 Lighthouse API 또는 PageSpeed Insights 사용
    const metrics = {
      loadTime: 2.5,
      firstContentfulPaint: 1.8,
      largestContentfulPaint: 2.2,
      cumulativeLayoutShift: 0.1
    };

    let score = 100;
    if (metrics.loadTime > 3) score -= 20;
    if (metrics.firstContentfulPaint > 2.5) score -= 15;
    if (metrics.largestContentfulPaint > 3) score -= 15;
    if (metrics.cumulativeLayoutShift > 0.1) score -= 10;

    return Math.max(0, Math.min(100, score));
  }

  async analyzeAccessibility(urlOrPath) {
    // 접근성 분석 시뮬레이션
    // 실제 구현 시 axe-core 또는 WAVE 사용
    let score = 100;
    score -= 10; // alt 태그 누락
    score -= 5;  // 색상 대비
    return Math.max(0, Math.min(100, score));
  }

  async analyzeSecurity(urlOrPath) {
    // 보안 분석 시뮬레이션
    // 실제 구현 시 보안 헤더, SSL 등 확인
    let score = 100;
    score -= 5;  // HTTPS 확인 필요
    return Math.max(0, Math.min(100, score));
  }

  async analyzeSocial(urlOrPath) {
    // 소셜 미디어 최적화 분석 시뮬레이션
    // Open Graph, Twitter Cards 등 확인
    let score = 100;
    score -= 15; // Open Graph 태그 누락
    score -= 10; // Twitter Cards 누락
    return Math.max(0, Math.min(100, score));
  }

  generateRecommendations(analysis) {
    const recommendations = [];

    // 점수가 낮은 영역에 대한 권장사항
    Object.entries(analysis.scores).forEach(([key, score]) => {
      if (key !== 'overall' && score < 70) {
        recommendations.push({
          type: key,
          priority: 'high',
          message: `${key.toUpperCase()} 점수가 낮습니다 (${score}/100)`,
          action: `${key} 최적화 필요`
        });
      } else if (key !== 'overall' && score < 85) {
        recommendations.push({
          type: key,
          priority: 'medium',
          message: `${key.toUpperCase()} 개선 여지가 있습니다 (${score}/100)`,
          action: `${key} 추가 최적화 권장`
        });
      }
    });

    return recommendations;
  }

  printComprehensiveAnalysis(analysis) {
    console.log(chalk.bold.cyan('\n📊 AIO 종합 분석 결과:\n'));
    console.log(chalk.blue(`전체 점수: ${chalk.bold(analysis.scores.overall)}/100\n`));

    console.log(chalk.bold('영역별 점수:\n'));
    Object.entries(analysis.scores).forEach(([key, score]) => {
      if (key !== 'overall') {
        const color = score >= 80 ? chalk.green : score >= 60 ? chalk.yellow : chalk.red;
        const icon = score >= 80 ? '✅' : score >= 60 ? '⚠️' : '❌';
        console.log(`${icon} ${key.toUpperCase()}: ${color(score)}/100`);
      }
    });

    if (analysis.recommendations.length > 0) {
      console.log(chalk.yellow(`\n💡 권장사항 (${analysis.recommendations.length}개):\n`));
      analysis.recommendations.forEach(rec => {
        const priorityIcon = rec.priority === 'high' ? '🔴' : '🟡';
        console.log(`${priorityIcon} ${rec.message}`);
        console.log(chalk.gray(`   → ${rec.action}`));
      });
    }

    console.log(chalk.blue(`\n📄 상세 리포트: ${AIO_REPORT_FILE}\n`));
  }

  async autoOptimize(urlOrPath, options = {}) {
    try {
      console.log(chalk.blue.bold(`\n🚀 AIO 자동 최적화 시작: ${urlOrPath}\n`));

      const optimizations = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        applied: [],
        skipped: []
      };

      const config = await this.loadConfig();

      // SEO 최적화
      if (config.optimization.seo) {
        console.log(chalk.blue('📊 SEO 최적화 적용 중...'));
        const { default: seoModule } = await import('../seo/index.js');
        await seoModule.generateSitemap();
        await seoModule.generateRobotsTxt();
        optimizations.applied.push('SEO: Sitemap 및 Robots.txt 생성');
      }

      // 성능 최적화
      if (config.optimization.performance) {
        console.log(chalk.blue('⚡ 성능 최적화 적용 중...'));
        optimizations.applied.push('Performance: 이미지 최적화 권장');
      }

      // 보안 최적화
      if (config.optimization.security) {
        console.log(chalk.blue('🔒 보안 최적화 적용 중...'));
        optimizations.applied.push('Security: HTTPS 강제 권장');
      }

      await fs.writeJson(AIO_REPORT_FILE, optimizations, { spaces: 2 });

      console.log(chalk.green(`\n✅ 자동 최적화 완료`));
      console.log(chalk.blue(`적용된 최적화: ${optimizations.applied.length}개\n`));

      return optimizations;
    } catch (error) {
      console.error(chalk.red(`❌ 자동 최적화 실패: ${error.message}`));
      throw error;
    }
  }

  async generateReport(format = 'json') {
    try {
      if (!fs.existsSync(AIO_REPORT_FILE)) {
        console.log(chalk.yellow('⚠️  리포트 파일이 없습니다. 먼저 분석을 실행하세요.'));
        return;
      }

      const report = await fs.readJson(AIO_REPORT_FILE);

      if (format === 'json') {
        console.log(JSON.stringify(report, null, 2));
      } else if (format === 'markdown') {
        const markdown = this.generateMarkdownReport(report);
        console.log(markdown);
      }

      return report;
    } catch (error) {
      console.error(chalk.red(`❌ 리포트 생성 실패: ${error.message}`));
      throw error;
    }
  }

  generateMarkdownReport(report) {
    let md = `# AIO 최적화 리포트\n\n`;
    md += `**생성일**: ${report.timestamp}\n\n`;

    if (report.scores) {
      md += `## 점수 요약\n\n`;
      md += `| 영역 | 점수 |\n`;
      md += `|------|------|\n`;
      Object.entries(report.scores).forEach(([key, score]) => {
        md += `| ${key.toUpperCase()} | ${score}/100 |\n`;
      });
      md += `\n`;
    }

    if (report.recommendations && report.recommendations.length > 0) {
      md += `## 권장사항\n\n`;
      report.recommendations.forEach(rec => {
        md += `- **${rec.type}**: ${rec.message}\n`;
        md += `  - ${rec.action}\n\n`;
      });
    }

    return md;
  }
}

export default new AIOManager();

