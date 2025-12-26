import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPEC_DIR = path.join(process.cwd(), '.spec-kit');
const SPEC_CONFIG_FILE = path.join(SPEC_DIR, 'spec-config.yaml');

/**
 * Spec-kit 모듈
 * GitHub Spec-kit 기반 사양 문서 관리
 */
class SpecKit {
  constructor() {
    this.ensureSpecDir();
  }

  ensureSpecDir() {
    if (!fs.existsSync(SPEC_DIR)) {
      fs.mkdirSync(SPEC_DIR, { recursive: true });
    }
  }

  async create(specName) {
    try {
      const specFile = path.join(SPEC_DIR, `${specName}.yaml`);
      
      if (fs.existsSync(specFile)) {
        console.log(chalk.yellow(`⚠️  사양 "${specName}"이 이미 존재합니다.`));
        return;
      }

      const specTemplate = {
        name: specName,
        version: '1.0.0',
        description: '',
        requirements: [],
        acceptance_criteria: [],
        dependencies: [],
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await fs.writeFile(specFile, yaml.stringify(specTemplate));
      console.log(chalk.green(`✅ 사양 "${specName}"이 생성되었습니다.`));
      console.log(chalk.blue(`📄 위치: ${specFile}`));
    } catch (error) {
      console.error(chalk.red(`❌ 사양 생성 실패: ${error.message}`));
      throw error;
    }
  }

  async validate() {
    try {
      const specs = await this.getAllSpecs();
      
      if (specs.length === 0) {
        console.log(chalk.yellow('⚠️  검증할 사양이 없습니다.'));
        return;
      }

      console.log(chalk.blue(`\n📋 사양 검증 시작 (${specs.length}개)...\n`));
      
      let validCount = 0;
      let invalidCount = 0;

      for (const spec of specs) {
        const specPath = path.join(SPEC_DIR, spec);
        const content = await fs.readFile(specPath, 'utf-8');
        const specData = yaml.parse(content);

        const errors = this.validateSpec(specData);
        
        if (errors.length === 0) {
          console.log(chalk.green(`✅ ${specData.name || spec}: 유효함`));
          validCount++;
        } else {
          console.log(chalk.red(`❌ ${specData.name || spec}: 오류 발견`));
          errors.forEach(error => {
            console.log(chalk.red(`   - ${error}`));
          });
          invalidCount++;
        }
      }

      console.log(chalk.blue(`\n📊 검증 결과: ${validCount}개 유효, ${invalidCount}개 오류\n`));
    } catch (error) {
      console.error(chalk.red(`❌ 검증 실패: ${error.message}`));
      throw error;
    }
  }

  validateSpec(spec) {
    const errors = [];
    
    if (!spec.name) {
      errors.push('name 필드가 필요합니다.');
    }
    if (!spec.version) {
      errors.push('version 필드가 필요합니다.');
    }
    if (!Array.isArray(spec.requirements)) {
      errors.push('requirements는 배열이어야 합니다.');
    }
    if (!Array.isArray(spec.acceptance_criteria)) {
      errors.push('acceptance_criteria는 배열이어야 합니다.');
    }

    return errors;
  }

  async list() {
    try {
      const specs = await this.getAllSpecs();
      
      if (specs.length === 0) {
        console.log(chalk.yellow('📋 등록된 사양이 없습니다.'));
        return;
      }

      console.log(chalk.blue('\n📋 사양 문서 목록:\n'));
      
      for (const spec of specs) {
        const specPath = path.join(SPEC_DIR, spec);
        const content = await fs.readFile(specPath, 'utf-8');
        const specData = yaml.parse(content);
        
        const statusColor = specData.status === 'approved' ? chalk.green : 
                           specData.status === 'draft' ? chalk.yellow : chalk.blue;
        
        console.log(`${statusColor('●')} ${chalk.bold(specData.name)} (v${specData.version})`);
        console.log(`  상태: ${statusColor(specData.status)}`);
        console.log(`  요구사항: ${specData.requirements?.length || 0}개`);
        console.log(`  수정일: ${specData.updated_at || 'N/A'}\n`);
      }
    } catch (error) {
      console.error(chalk.red(`❌ 목록 조회 실패: ${error.message}`));
      throw error;
    }
  }

  async getAllSpecs() {
    if (!fs.existsSync(SPEC_DIR)) {
      return [];
    }
    
    const files = await fs.readdir(SPEC_DIR);
    return files.filter(file => file.endsWith('.yaml') && file !== 'spec-config.yaml');
  }
}

export default new SpecKit();

