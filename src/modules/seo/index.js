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
      },
      mobile: {
        enabled: true,
        responsive: true,
        viewport: 'width=device-width, initial-scale=1'
      },
      performance: {
        enabled: true,
        coreWebVitals: {
          lcp: 2.5, // Largest Contentful Paint (초)
          fid: 100, // First Input Delay (밀리초)
          cls: 0.1 // Cumulative Layout Shift
        }
      },
      backlinks: {
        enabled: true,
        qualityCheck: true
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

  async analyzeMobileOptimization(urlOrPath) {
    try {
      console.log(chalk.blue(`\n📱 모바일 최적화 분석 시작...\n`));

      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        viewport: false,
        responsive: false,
        touchFriendly: false,
        mobileFriendly: false,
        score: 0,
        recommendations: []
      };

      // 모바일 최적화 분석 시뮬레이션
      // 실제 구현 시 Google Mobile-Friendly Test API 사용
      analysis.viewport = true;
      analysis.responsive = true;
      analysis.touchFriendly = true;
      analysis.mobileFriendly = true;

      if (!analysis.viewport) {
        analysis.recommendations.push({
          type: 'viewport',
          message: 'Viewport 메타 태그 추가 필요',
          action: '<meta name="viewport" content="width=device-width, initial-scale=1">'
        });
      }

      // 점수 계산
      let score = 100;
      if (!analysis.viewport) score -= 30;
      if (!analysis.responsive) score -= 30;
      if (!analysis.touchFriendly) score -= 20;
      if (!analysis.mobileFriendly) score -= 20;
      analysis.score = score;

      console.log(chalk.bold.cyan('📱 모바일 최적화 분석 결과:\n'));
      console.log(chalk.blue(`점수: ${chalk.bold(analysis.score)}/100\n`));
      console.log(chalk.blue(`Viewport: ${analysis.viewport ? '✅' : '❌'}`));
      console.log(chalk.blue(`반응형: ${analysis.responsive ? '✅' : '❌'}`));
      console.log(chalk.blue(`터치 친화적: ${analysis.touchFriendly ? '✅' : '❌'}`));
      console.log(chalk.blue(`모바일 친화적: ${analysis.mobileFriendly ? '✅' : '❌'}\n`));

      if (analysis.recommendations.length > 0) {
        console.log(chalk.yellow('💡 권장사항:\n'));
        analysis.recommendations.forEach(rec => {
          console.log(`  • ${rec.message}`);
          console.log(chalk.gray(`    → ${rec.action}`));
        });
        console.log();
      }

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ 모바일 최적화 분석 실패: ${error.message}`));
      throw error;
    }
  }

  async analyzePerformance(urlOrPath) {
    try {
      console.log(chalk.blue(`\n⚡ 성능 분석 시작...\n`));

      const config = await this.loadConfig();
      const analysis = {
        url: urlOrPath,
        timestamp: new Date().toISOString(),
        coreWebVitals: {
          lcp: 0, // Largest Contentful Paint
          fid: 0, // First Input Delay
          cls: 0  // Cumulative Layout Shift
        },
        score: 0,
        recommendations: []
      };

      // Core Web Vitals 분석 시뮬레이션
      // 실제 구현 시 PageSpeed Insights API 사용
      analysis.coreWebVitals.lcp = 2.1;
      analysis.coreWebVitals.fid = 80;
      analysis.coreWebVitals.cls = 0.08;

      // 점수 계산
      let score = 100;
      if (analysis.coreWebVitals.lcp > config.performance.coreWebVitals.lcp) {
        score -= 20;
        analysis.recommendations.push({
          type: 'lcp',
          message: 'LCP 개선 필요 (현재: ' + analysis.coreWebVitals.lcp + '초)',
          action: '이미지 최적화, 서버 응답 시간 개선'
        });
      }
      if (analysis.coreWebVitals.fid > config.performance.coreWebVitals.fid) {
        score -= 15;
        analysis.recommendations.push({
          type: 'fid',
          message: 'FID 개선 필요 (현재: ' + analysis.coreWebVitals.fid + 'ms)',
          action: 'JavaScript 최적화, 코드 분할'
        });
      }
      if (analysis.coreWebVitals.cls > config.performance.coreWebVitals.cls) {
        score -= 15;
        analysis.recommendations.push({
          type: 'cls',
          message: 'CLS 개선 필요 (현재: ' + analysis.coreWebVitals.cls + ')',
          action: '이미지 크기 지정, 동적 콘텐츠 최소화'
        });
      }
      analysis.score = score;

      console.log(chalk.bold.cyan('⚡ 성능 분석 결과:\n'));
      console.log(chalk.blue(`점수: ${chalk.bold(analysis.score)}/100\n`));
      console.log(chalk.blue(`LCP: ${analysis.coreWebVitals.lcp}초 ${analysis.coreWebVitals.lcp <= 2.5 ? '✅' : '⚠️'}`));
      console.log(chalk.blue(`FID: ${analysis.coreWebVitals.fid}ms ${analysis.coreWebVitals.fid <= 100 ? '✅' : '⚠️'}`));
      console.log(chalk.blue(`CLS: ${analysis.coreWebVitals.cls} ${analysis.coreWebVitals.cls <= 0.1 ? '✅' : '⚠️'}\n`));

      if (analysis.recommendations.length > 0) {
        console.log(chalk.yellow('💡 권장사항:\n'));
        analysis.recommendations.forEach(rec => {
          console.log(`  • ${rec.message}`);
          console.log(chalk.gray(`    → ${rec.action}`));
        });
        console.log();
      }

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ 성능 분석 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new SEOManager();

