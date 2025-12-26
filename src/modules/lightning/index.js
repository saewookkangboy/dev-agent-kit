import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const LIGHTNING_DIR = path.join(process.cwd(), '.project-data', 'lightning');
const AGENTS_FILE = path.join(LIGHTNING_DIR, 'agents.json');
const TRAINING_DATA_DIR = path.join(LIGHTNING_DIR, 'training-data');

/**
 * Agent Lightning 모듈
 * Microsoft Agent Lightning 기반 강화학습 통합
 */
class AgentLightning {
  constructor() {
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(LIGHTNING_DIR)) {
      fs.mkdirSync(LIGHTNING_DIR, { recursive: true });
    }
    if (!fs.existsSync(TRAINING_DATA_DIR)) {
      fs.mkdirSync(TRAINING_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(AGENTS_FILE)) {
      fs.writeFileSync(AGENTS_FILE, JSON.stringify({ agents: [] }, null, 2));
    }
  }

  async loadAgents() {
    try {
      const data = await fs.readJson(AGENTS_FILE);
      return data.agents || [];
    } catch (error) {
      return [];
    }
  }

  async saveAgents(agents) {
    await fs.writeJson(AGENTS_FILE, { agents }, { spaces: 2 });
  }

  async train(options = {}) {
    try {
      const agentName = options.agent || 'default-agent';
      const episodes = parseInt(options.episodes) || 100;

      console.log(chalk.blue(`\n🚀 AI 강화학습 시작...\n`));
      console.log(chalk.blue(`에이전트: ${agentName}`));
      console.log(chalk.blue(`에피소드: ${episodes}개\n`));

      // 에이전트 정보 로드 또는 생성
      const agents = await this.loadAgents();
      let agent = agents.find(a => a.name === agentName);

      if (!agent) {
        agent = {
          name: agentName,
          created_at: new Date().toISOString(),
          episodes_completed: 0,
          total_reward: 0,
          best_score: 0,
          status: 'training'
        };
        agents.push(agent);
      }

      // 학습 시뮬레이션 (실제 구현 시 agent-lightning 라이브러리 사용)
      console.log(chalk.yellow('📊 학습 진행 중...\n'));

      for (let episode = 1; episode <= episodes; episode++) {
        // 시뮬레이션된 학습 과정
        const reward = Math.random() * 100;
        agent.total_reward += reward;
        agent.episodes_completed += 1;
        
        if (reward > agent.best_score) {
          agent.best_score = reward;
        }

        if (episode % 10 === 0) {
          const avgReward = agent.total_reward / agent.episodes_completed;
          console.log(chalk.blue(`에피소드 ${episode}/${episodes} | 평균 보상: ${avgReward.toFixed(2)} | 최고 점수: ${agent.best_score.toFixed(2)}`));
        }
      }

      agent.updated_at = new Date().toISOString();
      agent.status = 'trained';

      await this.saveAgents(agents);

      // 학습 데이터 저장
      const trainingData = {
        agent_name: agentName,
        episodes: episodes,
        total_reward: agent.total_reward,
        average_reward: agent.total_reward / episodes,
        best_score: agent.best_score,
        completed_at: new Date().toISOString()
      };

      const trainingDataFile = path.join(TRAINING_DATA_DIR, `${agentName}-${Date.now()}.json`);
      await fs.writeJson(trainingDataFile, trainingData, { spaces: 2 });

      console.log(chalk.green(`\n✅ 학습 완료!\n`));
      console.log(chalk.blue(`📊 학습 결과:`));
      console.log(chalk.blue(`   총 에피소드: ${episodes}개`));
      console.log(chalk.blue(`   총 보상: ${agent.total_reward.toFixed(2)}`));
      console.log(chalk.blue(`   평균 보상: ${(agent.total_reward / episodes).toFixed(2)}`));
      console.log(chalk.blue(`   최고 점수: ${agent.best_score.toFixed(2)}`));
      console.log(chalk.blue(`\n💾 학습 데이터 저장: ${trainingDataFile}\n`));

      // 실제 구현 시 agent-lightning 라이브러리 사용 예시:
      // const { AgentLightning } = require('agentlightning');
      // const agent = new AgentLightning(config);
      // await agent.train({ episodes });

    } catch (error) {
      console.error(chalk.red(`❌ 학습 실패: ${error.message}`));
      throw error;
    }
  }

  async listAgents() {
    try {
      const agents = await this.loadAgents();
      
      if (agents.length === 0) {
        console.log(chalk.yellow('📋 등록된 에이전트가 없습니다.'));
        return;
      }

      console.log(chalk.blue('\n📋 등록된 에이전트:\n'));
      
      agents.forEach(agent => {
        const statusColor = agent.status === 'trained' ? chalk.green : 
                           agent.status === 'training' ? chalk.yellow : chalk.blue;
        
        console.log(chalk.bold.cyan(`${agent.name}`));
        console.log(`  상태: ${statusColor(agent.status)}`);
        console.log(`  완료된 에피소드: ${agent.episodes_completed}개`);
        console.log(`  총 보상: ${agent.total_reward.toFixed(2)}`);
        console.log(`  최고 점수: ${agent.best_score.toFixed(2)}`);
        console.log(`  생성일: ${agent.created_at || 'N/A'}\n`);
      });
    } catch (error) {
      console.error(chalk.red(`❌ 에이전트 목록 조회 실패: ${error.message}`));
      throw error;
    }
  }
}

export default new AgentLightning();

