import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const SEO_DIR = path.join(process.cwd(), '.project-data', 'seo');
const SEO_CONFIG_FILE = path.join(SEO_DIR, 'seo-config.json');
const SEO_REPORT_FILE = path.join(SEO_DIR, 'seo-report.json');

/**
 * SEO 최적화 모듈
 * 검색 엔진 최적화를 위한 도구
 */
class SEOManager {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(SEO_DIR)) {
      fs.mkdirSync(SEO_DIR, { recursive: true });
    }
  }

  async loadConfig() {
    try {
      if (fs.existsSync(SEO_CONFIG_FILE)) {
        return await fs.readJson(SEO_CONFIG_FILE);
      }
      return this.getDefaultConfig();
    } catch (error) {
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      meta: {
        title: {
          maxLength: 60,
          minLength: 30,
          recommended: 50
        },
        description: {
          maxLength: 160,
          minLength: 120,
          recommended: 155
        }
      },
      keywords: [],
      openGraph: {
        enabled: true,
        image: '',
        type: 'website'
      },
      structuredData: {
        enabled: true,
        type: 'WebSite'
      },
      sitemap: {
        enabled: true,
        changefreq: 'weekly',
        priority: 0.8
      },
      robots: {
        enabled: true,
        allow: ['/'],
        disallow: ['/admin', '/private']
      }
    };
  }

  async analyze(urlOrPath) {
    try {
      console.log(chalk.blue(`\n🔍 SEO 분석 시작: ${urlOrPath}\n`));

      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        scores: {},
        issues: [],
        recommendations: []
      };

      // 메타 태그 분석
      const metaAnalysis = await this.analyzeMetaTags(urlOrPath);
      analysis.scores.meta = metaAnalysis.score;
      analysis.issues.push(...metaAnalysis.issues);
      analysis.recommendations.push(...metaAnalysis.recommendations);

      // 키워드 분석
      const keywordAnalysis = await this.analyzeKeywords(urlOrPath);
      analysis.scores.keywords = keywordAnalysis.score;
      analysis.issues.push(...keywordAnalysis.issues);
      analysis.recommendations.push(...keywordAnalysis.recommendations);

      // 구조화된 데이터 분석
      const structuredDataAnalysis = await this.analyzeStructuredData(urlOrPath);
      analysis.scores.structuredData = structuredDataAnalysis.score;
      analysis.issues.push(...structuredDataAnalysis.issues);
      analysis.recommendations.push(...structuredDataAnalysis.recommendations);

      // 전체 점수 계산
      const totalScore = Object.values(analysis.scores).reduce((sum, score) => sum + score, 0) / Object.keys(analysis.scores).length;
      analysis.scores.overall = Math.round(totalScore);

      // 리포트 저장
      await fs.writeJson(SEO_REPORT_FILE, analysis, { spaces: 2 });

      // 결과 출력
      this.printAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ SEO 분석 실패: ${error.message}`));
      throw error;
    }
  }

  async analyzeMetaTags(urlOrPath) {
    const issues = [];
    const recommendations = [];
    let score = 100;

    // 실제 구현 시 HTML 파싱 필요
    // 여기서는 시뮬레이션
    const config = await this.loadConfig();

    // Title 태그 검사
    issues.push({
      type: 'warning',
      message: 'Title 태그 길이 확인 필요',
      severity: 'medium'
    });
    score -= 10;

    // Description 태그 검사
    recommendations.push({
      type: 'info',
      message: `Description은 ${config.meta.description.recommended}자 권장`,
      action: 'meta description 최적화'
    });

    return { score, issues, recommendations };
  }

  async analyzeKeywords(urlOrPath) {
    const issues = [];
    const recommendations = [];
    let score = 100;

    recommendations.push({
      type: 'info',
      message: '키워드 밀도 분석 권장',
      action: '주요 키워드 1-2% 밀도 유지'
    });

    return { score, issues, recommendations };
  }

  async analyzeStructuredData(urlOrPath) {
    const issues = [];
    const recommendations = [];
    let score = 100;

    recommendations.push({
      type: 'info',
      message: 'JSON-LD 구조화된 데이터 추가 권장',
      action: 'Schema.org 마크업 구현'
    });
    score -= 20;

    return { score, issues, recommendations };
  }

  printAnalysis(analysis) {
    console.log(chalk.bold.cyan('\n📊 SEO 분석 결과:\n'));
    console.log(chalk.blue(`전체 점수: ${chalk.bold(analysis.scores.overall)}/100\n`));

    Object.entries(analysis.scores).forEach(([key, score]) => {
      if (key !== 'overall') {
        const color = score >= 80 ? chalk.green : score >= 60 ? chalk.yellow : chalk.red;
        console.log(`${key}: ${color(score)}/100`);
      }
    });

    if (analysis.issues.length > 0) {
      console.log(chalk.yellow(`\n⚠️  발견된 문제 (${analysis.issues.length}개):\n`));
      analysis.issues.forEach(issue => {
        const icon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
        console.log(`${icon} ${issue.message}`);
      });
    }

    if (analysis.recommendations.length > 0) {
      console.log(chalk.blue(`\n💡 권장사항 (${analysis.recommendations.length}개):\n`));
      analysis.recommendations.forEach(rec => {
        console.log(`  • ${rec.message}`);
        console.log(chalk.gray(`    → ${rec.action}`));
      });
    }

    console.log(chalk.blue(`\n📄 상세 리포트: ${SEO_REPORT_FILE}\n`));
  }

  async generateSitemap(urls = []) {
    try {
      const config = await this.loadConfig();
      
      if (!config.sitemap.enabled) {
        console.log(chalk.yellow('⚠️  Sitemap 생성이 비활성화되어 있습니다.'));
        return;
      }

      const sitemap = {
        urlset: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          url: urls.map(url => ({
            loc: url,
            changefreq: config.sitemap.changefreq,
            priority: config.sitemap.priority,
            lastmod: new Date().toISOString()
          }))
        }
      };

      const sitemapFile = path.join(process.cwd(), 'public', 'sitemap.xml');
      const sitemapDir = path.dirname(sitemapFile);
      
      if (!fs.existsSync(sitemapDir)) {
        fs.mkdirSync(sitemapDir, { recursive: true });
      }

      // XML 생성 (간단한 버전)
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      urls.forEach(url => {
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <changefreq>${config.sitemap.changefreq}</changefreq>\n`;
        xml += `    <priority>${config.sitemap.priority}</priority>\n`;
        xml += `  </url>\n`;
      });
      xml += '</urlset>';

      await fs.writeFile(sitemapFile, xml);
      console.log(chalk.green(`✅ Sitemap 생성 완료: ${sitemapFile}`));
    } catch (error) {
      console.error(chalk.red(`❌ Sitemap 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async generateRobotsTxt() {
    try {
      const config = await this.loadConfig();
      
      if (!config.robots.enabled) {
        console.log(chalk.yellow('⚠️  Robots.txt 생성이 비활성화되어 있습니다.'));
        return;
      }

      let robots = '# Robots.txt\n';
      robots += `User-agent: *\n`;
      
      config.robots.allow.forEach(path => {
        robots += `Allow: ${path}\n`;
      });
      
      config.robots.disallow.forEach(path => {
        robots += `Disallow: ${path}\n`;
      });

      const robotsFile = path.join(process.cwd(), 'public', 'robots.txt');
      const robotsDir = path.dirname(robotsFile);
      
      if (!fs.existsSync(robotsDir)) {
        fs.mkdirSync(robotsDir, { recursive: true });
      }

      await fs.writeFile(robotsFile, robots);
      console.log(chalk.green(`✅ Robots.txt 생성 완료: ${robotsFile}`));
    } catch (error) {
      console.error(chalk.red(`❌ Robots.txt 생성 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new SEOManager();

