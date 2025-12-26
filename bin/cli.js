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

// Init 명령어
program
  .command('init')
  .description('프로젝트 초기화')
  .action(async () => {
    const { default: initScript } = await import('../scripts/init-project.js');
    await initScript();
  });

program.parse();

