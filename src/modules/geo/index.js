import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const GEO_DIR = path.join(process.cwd(), '.project-data', 'geo');
const GEO_CONFIG_FILE = path.join(GEO_DIR, 'geo-config.json');
const GEO_REPORT_FILE = path.join(GEO_DIR, 'geo-report.json');

/**
 * GEO 최적화 모듈
 * 지리적 위치 기반 최적화
 */
class GEOManager {
  constructor() {
    this.ensureDirectories();
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
      targetRegions: [],
      languages: ['ko', 'en'],
      timezones: [],
      localKeywords: {},
      geoTagging: {
        enabled: true,
        schema: 'LocalBusiness'
      },
      hreflang: {
        enabled: true
      },
      localBusiness: {
        enabled: true,
        name: '',
        address: {},
        phone: '',
        openingHours: {}
      }
    };
  }

  async analyzeLocation(location, options = {}) {
    try {
      console.log(chalk.blue(`\n🌍 지리적 위치 분석 시작: ${location}\n`));

      const analysis = {
        location,
        timestamp: new Date().toISOString(),
        coordinates: {},
        timezone: '',
        localKeywords: [],
        competitors: [],
        recommendations: [],
        score: 0
      };

      // 위치 정보 분석 시뮬레이션
      // 실제 구현 시 지리 API 사용 (Google Maps, OpenStreetMap 등)
      analysis.coordinates = {
        lat: 37.5665,
        lng: 126.9780
      };
      analysis.timezone = 'Asia/Seoul';
      analysis.localKeywords = [
        `${location} 서비스`,
        `${location} 전문`,
        `${location} 추천`
      ];

      // 지역별 경쟁사 분석
      analysis.competitors = [
        {
          name: '경쟁사 A',
          distance: '2.5km',
          rating: 4.5
        },
        {
          name: '경쟁사 B',
          distance: '5.0km',
          rating: 4.2
        }
      ];

      // 권장사항
      analysis.recommendations.push({
        type: 'local-seo',
        message: 'Google My Business 등록 권장',
        action: '지역 비즈니스 등록'
      });

      analysis.recommendations.push({
        type: 'content',
        message: '지역 키워드 콘텐츠 추가 권장',
        action: '지역별 랜딩 페이지 생성'
      });

      // 점수 계산
      analysis.score = this.calculateGeoScore(analysis);

      // 리포트 저장
      await fs.writeJson(GEO_REPORT_FILE, analysis, { spaces: 2 });

      // 결과 출력
      this.printAnalysis(analysis);

      return analysis;
    } catch (error) {
      console.error(chalk.red(`❌ 위치 분석 실패: ${error.message}`));
      throw error;
    }
  }

  calculateGeoScore(analysis) {
    let score = 100;

    if (analysis.localKeywords.length === 0) {
      score -= 30;
    }

    if (!analysis.coordinates.lat || !analysis.coordinates.lng) {
      score -= 20;
    }

    if (analysis.recommendations.length > 2) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  printAnalysis(analysis) {
    console.log(chalk.bold.cyan('📊 지리적 위치 분석 결과:\n'));
    console.log(chalk.blue(`위치: ${chalk.bold(analysis.location)}`));
    console.log(chalk.blue(`점수: ${chalk.bold(analysis.score)}/100\n`));

    if (analysis.coordinates.lat && analysis.coordinates.lng) {
      console.log(chalk.blue(`좌표: ${analysis.coordinates.lat}, ${analysis.coordinates.lng}`));
    }

    if (analysis.timezone) {
      console.log(chalk.blue(`타임존: ${analysis.timezone}`));
    }

    if (analysis.localKeywords.length > 0) {
      console.log(chalk.yellow('\n지역 키워드:'));
      analysis.localKeywords.forEach(kw => {
        console.log(`  • ${kw}`);
      });
    }

    if (analysis.competitors.length > 0) {
      console.log(chalk.yellow('\n주변 경쟁사:'));
      analysis.competitors.forEach(comp => {
        console.log(`  • ${comp.name} (${comp.distance}, 평점: ${comp.rating})`);
      });
    }

    if (analysis.recommendations.length > 0) {
      console.log(chalk.blue('\n💡 권장사항:\n'));
      analysis.recommendations.forEach(rec => {
        console.log(`  • ${rec.message}`);
        console.log(chalk.gray(`    → ${rec.action}`));
      });
    }

    console.log(chalk.blue(`\n📄 상세 리포트: ${GEO_REPORT_FILE}\n`));
  }

  async generateLocalSchema(businessInfo) {
    try {
      console.log(chalk.blue(`\n🌍 지역 비즈니스 스키마 생성...\n`));

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: businessInfo.name || '',
        address: {
          '@type': 'PostalAddress',
          streetAddress: businessInfo.address?.street || '',
          addressLocality: businessInfo.address?.city || '',
          addressRegion: businessInfo.address?.region || '',
          postalCode: businessInfo.address?.postalCode || '',
          addressCountry: businessInfo.address?.country || 'KR'
        },
        telephone: businessInfo.phone || '',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: businessInfo.coordinates?.lat || '',
          longitude: businessInfo.coordinates?.lng || ''
        },
        openingHoursSpecification: businessInfo.openingHours || [],
        priceRange: businessInfo.priceRange || '$$'
      };

      const schemaFile = path.join(process.cwd(), 'public', 'local-business-schema.json');
      const schemaDir = path.dirname(schemaFile);
      
      if (!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir, { recursive: true });
      }

      await fs.writeJson(schemaFile, schema, { spaces: 2 });
      console.log(chalk.green(`✅ 지역 비즈니스 스키마 생성 완료: ${schemaFile}`));
      console.log(chalk.blue(`\nHTML에 추가할 코드:\n`));
      console.log(chalk.gray(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`));
      console.log();

      return schema;
    } catch (error) {
      console.error(chalk.red(`❌ 스키마 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async generateHreflang(languages, baseUrl) {
    try {
      console.log(chalk.blue(`\n🌍 Hreflang 태그 생성...\n`));

      const hreflangTags = languages.map(lang => ({
        rel: 'alternate',
        hreflang: lang.code,
        href: `${baseUrl}/${lang.path || lang.code}`
      }));

      // 기본 언어 추가
      hreflangTags.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: baseUrl
      });

      const hreflangFile = path.join(process.cwd(), 'public', 'hreflang.json');
      await fs.writeJson(hreflangFile, { tags: hreflangTags }, { spaces: 2 });

      console.log(chalk.green(`✅ Hreflang 태그 생성 완료\n`));
      console.log(chalk.blue('HTML <head>에 추가할 태그:\n'));
      hreflangTags.forEach(tag => {
        console.log(chalk.gray(`<link rel="${tag.rel}" hreflang="${tag.hreflang}" href="${tag.href}" />`));
      });
      console.log();

      return hreflangTags;
    } catch (error) {
      console.error(chalk.red(`❌ Hreflang 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async optimizeForRegion(region, options = {}) {
    try {
      console.log(chalk.blue(`\n🌍 지역별 최적화 시작: ${region}\n`));

      const optimization = {
        region,
        timestamp: new Date().toISOString(),
        localKeywords: [],
        contentSuggestions: [],
        technical: []
      };

      // 지역별 키워드 추천
      optimization.localKeywords = [
        `${region} 서비스`,
        `${region} 전문가`,
        `${region} 추천 업체`
      ];

      // 콘텐츠 제안
      optimization.contentSuggestions.push({
        type: 'landing-page',
        message: `${region} 전용 랜딩 페이지 생성`,
        action: '지역별 콘텐츠 작성'
      });

      // 기술적 최적화
      optimization.technical.push({
        type: 'schema',
        message: '지역 비즈니스 스키마 추가',
        action: 'LocalBusiness Schema 구현'
      });

      await fs.writeJson(GEO_REPORT_FILE, optimization, { spaces: 2 });

      console.log(chalk.green(`✅ 지역별 최적화 완료`));
      console.log(chalk.blue(`📄 리포트: ${GEO_REPORT_FILE}\n`));

      return optimization;
    } catch (error) {
      console.error(chalk.red(`❌ 지역별 최적화 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new GEOManager();

