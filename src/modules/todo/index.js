import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const TODO_FILE = path.join(process.cwd(), '.project-data', 'todos.json');

/**
 * To-do 관리 모듈
 * 작업 항목 생성, 관리, 마일스톤 추적
 */
class TodoManager {
  constructor() {
    this.ensureDataDir();
  }

  ensureDataDir() {
    const dataDir = path.dirname(TODO_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(TODO_FILE)) {
      fs.writeFileSync(TODO_FILE, JSON.stringify({ todos: [], milestones: [] }, null, 2));
    }
  }

  async loadData() {
    try {
      const data = await fs.readJson(TODO_FILE);
      return data;
    } catch (error) {
      return { todos: [], milestones: [] };
    }
  }

  async saveData(data) {
    await fs.writeJson(TODO_FILE, data, { spaces: 2 });
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async add(description, options = {}) {
    try {
      const data = await this.loadData();
      const todo = {
        id: this.generateId(),
        description,
        status: 'pending',
        priority: options.priority || 'medium',
        milestone: options.milestone || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: null
      };

      data.todos.push(todo);
      
      // 마일스톤이 지정된 경우 마일스톤 목록에 추가
      if (options.milestone) {
        const milestone = data.milestones.find(m => m.name === options.milestone);
        if (!milestone) {
          data.milestones.push({
            name: options.milestone,
            created_at: new Date().toISOString(),
            status: 'active'
          });
        }
      }

      await this.saveData(data);
      
      console.log(chalk.green(`✅ To-do 항목이 추가되었습니다.`));
      console.log(chalk.blue(`   ID: ${todo.id}`));
      console.log(chalk.blue(`   설명: ${description}`));
      console.log(chalk.blue(`   우선순위: ${options.priority || 'medium'}`));
      if (options.milestone) {
        console.log(chalk.blue(`   마일스톤: ${options.milestone}`));
      }
    } catch (error) {
      console.error(chalk.red(`❌ To-do 추가 실패: ${error.message}`));
      throw error;
    }
  }

  async list(options = {}) {
    try {
      const data = await this.loadData();
      let todos = data.todos;

      // 상태 필터 적용
      if (options.status) {
        todos = todos.filter(t => t.status === options.status);
      }

      if (todos.length === 0) {
        console.log(chalk.yellow('📋 To-do 항목이 없습니다.'));
        return;
      }

      console.log(chalk.blue(`\n📋 To-do 목록 (${todos.length}개):\n`));

      // 마일스톤별로 그룹화
      const byMilestone = {};
      const noMilestone = [];

      todos.forEach(todo => {
        if (todo.milestone) {
          if (!byMilestone[todo.milestone]) {
            byMilestone[todo.milestone] = [];
          }
          byMilestone[todo.milestone].push(todo);
        } else {
          noMilestone.push(todo);
        }
      });

      // 마일스톤별 출력
      Object.keys(byMilestone).forEach(milestone => {
        console.log(chalk.bold.cyan(`\n🎯 ${milestone}`));
        byMilestone[milestone].forEach(todo => {
          this.printTodo(todo);
        });
      });

      // 마일스톤 없는 항목 출력
      if (noMilestone.length > 0) {
        console.log(chalk.bold.cyan(`\n📌 기타`));
        noMilestone.forEach(todo => {
          this.printTodo(todo);
        });
      }

      // 통계
      const stats = this.calculateStats(data.todos);
      console.log(chalk.blue(`\n📊 통계:`));
      console.log(chalk.blue(`   전체: ${stats.total}개`));
      console.log(chalk.yellow(`   대기: ${stats.pending}개`));
      console.log(chalk.blue(`   진행중: ${stats.inProgress}개`));
      console.log(chalk.green(`   완료: ${stats.completed}개`));
      console.log();
    } catch (error) {
      console.error(chalk.red(`❌ To-do 목록 조회 실패: ${error.message}`));
      throw error;
    }
  }

  printTodo(todo) {
    const statusIcon = {
      'pending': '⏳',
      'in-progress': '🔄',
      'completed': '✅'
    };

    const priorityColor = {
      'high': chalk.red,
      'medium': chalk.yellow,
      'low': chalk.green
    };

    const statusColor = {
      'pending': chalk.yellow,
      'in-progress': chalk.blue,
      'completed': chalk.green
    };

    const icon = statusIcon[todo.status] || '•';
    const statusText = statusColor[todo.status](todo.status);
    const priorityText = priorityColor[todo.priority](`[${todo.priority}]`);

    console.log(`  ${icon} ${chalk.bold(todo.id)} ${todo.description}`);
    console.log(`    상태: ${statusText} | 우선순위: ${priorityText}`);
  }

  calculateStats(todos) {
    return {
      total: todos.length,
      pending: todos.filter(t => t.status === 'pending').length,
      inProgress: todos.filter(t => t.status === 'in-progress').length,
      completed: todos.filter(t => t.status === 'completed').length
    };
  }

  async complete(id) {
    try {
      const data = await this.loadData();
      const todo = data.todos.find(t => t.id === id);

      if (!todo) {
        console.log(chalk.red(`❌ ID "${id}"에 해당하는 To-do를 찾을 수 없습니다.`));
        return;
      }

      todo.status = 'completed';
      todo.completed_at = new Date().toISOString();
      todo.updated_at = new Date().toISOString();

      await this.saveData(data);
      
      console.log(chalk.green(`✅ To-do 항목이 완료 처리되었습니다.`));
      console.log(chalk.blue(`   ID: ${id}`));
      console.log(chalk.blue(`   설명: ${todo.description}`));
    } catch (error) {
      console.error(chalk.red(`❌ To-do 완료 처리 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new TodoManager();

