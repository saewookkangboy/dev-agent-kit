# Dev Agent Kit

集成开发代理包 - 集成 Spec-kit、待办事项管理、代理角色、AI 强化学习和 Claude Skills 的综合开发工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **开源项目**：这是一个任何人都可以自由使用、修改和分发的开源项目。

## 🌐 其他语言 / Other Languages

- 🇰🇷 [한국어 (Korean)](README.ko.md)
- 🇺🇸 [English](README.en.md)
- 🇪🇸 [Español (Spanish)](README.es.md)

## 主要功能

### 1. Spec-kit 集成
- 基于 GitHub Spec-kit 的规格文档管理
- 需求文档化和版本控制
- 规格验证和测试

### 2. 待办事项列表和分步任务管理
- 任务项创建和管理
- 基于里程碑的进度跟踪
- 优先级和依赖关系管理

### 3. 代理角色系统
支持各种开发角色的代理系统：
- **PM（项目经理）**：项目管理和协调
- **前端开发人员**：前端开发
- **后端开发人员**：后端开发
- **服务器/数据库开发人员**：服务器和数据库管理
- **安全管理员**：安全管理和审计
- **UI/UX 设计师**：用户界面和体验设计
- **AI 市场研究员**：基于 AI 的市场研究

### 4. AI 强化学习（Agent Lightning）
- 基于 Microsoft Agent Lightning 的强化学习集成
- 代理性能优化
- 训练数据管理

### 5. Claude Skills 集成
- 与 ComposioHQ awesome-claude-skills 集成
- 利用各种 Claude AI 技能
- 支持自定义技能开发

### 6. Agent Skills 集成
- 与 agentskills 框架集成
- 代理技能管理和扩展

### 7. SEO 优化
- 搜索引擎优化分析
- 元标签和关键词分析
- Sitemap 和 Robots.txt 生成
- 结构化数据验证

### 8. AI SEO 优化
- 基于 AI 的关键词研究
- 自动内容优化
- 关键词密度和可读性分析
- 竞争对手关键词分析

### 9. FastAPI 后端服务器
- 优化的 RESTful API 提供
- 异步处理和性能优化
- 自动 API 文档生成（Swagger/OpenAPI）

### 10. API 密钥令牌优化
- 令牌缓存和重用
- 安全加密存储
- 使用跟踪和监控

### 11. GEO（生成式引擎优化）
- 生成式 AI 搜索引擎优化（ChatGPT、Claude、Perplexity、Gemini 等）
- AI 友好的内容结构分析
- FAQ、HowTo、Article 架构生成
- 多 AI 引擎兼容性优化
- 引用和可信度提升

### 12. AIO（一体化）优化
- SEO、AI SEO、GEO 综合分析
- 性能、可访问性、安全性分析
- 社交媒体优化
- 自动优化和报告生成

## 安装

### 基本安装

```bash
# 克隆存储库
git clone https://github.com/saewookkangboy/dev-agent-kit.git
cd dev-agent-kit

# 安装依赖
npm install

# 设置
npm run setup
```

### 全局安装（可选）

```bash
npm link
# 或
npm install -g .
```

安装后，您可以在任何地方使用 `dev-agent` 命令。

## 使用方法

### 项目初始化

```bash
npm run init
# 或
dev-agent init
```

### CLI 使用

#### 待办事项列表管理

```bash
# 添加待办事项（带优先级和里程碑）
dev-agent todo add "任务描述" -p high -m "阶段 1"
dev-agent todo add "API 集成" -p medium

# 列出待办事项
dev-agent todo list
dev-agent todo list -s pending  # 按状态筛选

# 完成待办事项
dev-agent todo complete <id>
```

#### 代理角色配置

```bash
# 设置角色
dev-agent role set --role frontend
dev-agent role set --role backend
dev-agent role set --role pm

# 列出可用角色
dev-agent role list

# 获取当前角色信息
dev-agent role info
```

#### Spec-kit 管理

```bash
# 创建规格文档
dev-agent spec create "用户认证系统"
dev-agent spec create "API 设计"

# 列出规格文档
dev-agent spec list

# 验证规格文档
dev-agent spec validate
```

#### AI 强化学习

```bash
# 开始强化学习
dev-agent train --agent my-agent --episodes 100
```

#### 技能管理

```bash
# 列出 Claude 技能
dev-agent skills list --type claude

# 列出代理技能
dev-agent skills list --type agent

# 激活技能
dev-agent skills activate spec-kit --type claude
dev-agent skills activate web-search --type agent
```

#### SEO 优化

```bash
# SEO 分析
dev-agent seo analyze https://example.com

# 生成网站地图
dev-agent seo sitemap -u https://example.com https://example.com/about

# 生成 Robots.txt
dev-agent seo robots
```

#### AI SEO 优化

```bash
# AI 关键词研究
dev-agent ai-seo keywords "网页开发"

# 内容优化
dev-agent ai-seo optimize "内容文本" -k "关键词1" "关键词2"

# 竞争对手分析
dev-agent ai-seo competitors example.com -c competitor1.com
```

#### GEO（生成式引擎优化）

```bash
# GEO 分析（AI 搜索引擎优化）
dev-agent geo analyze https://example.com

# 生成常见问题架构
dev-agent geo faq -q "问题 1" "问题 2"

# 生成操作指南架构
dev-agent geo howto -n "指南名称" -s "步骤 1" "步骤 2"

# 生成文章架构
dev-agent geo article -h "标题" -a "作者" -u "https://example.com"

# 生成式引擎优化
dev-agent geo optimize https://example.com -e chatgpt claude perplexity
```

#### AIO 综合优化

```bash
# 综合分析
dev-agent aio analyze https://example.com

# 自动优化
dev-agent aio optimize https://example.com

# 生成报告
dev-agent aio report -f markdown
```

#### FastAPI 服务器

```bash
# 安装 FastAPI 依赖
dev-agent api:install

# 启动服务器
dev-agent api:start

# 开发模式（自动重载）
dev-agent api:start --reload --port 8080
```

#### API 密钥管理

```bash
# 保存 API 密钥
dev-agent api-key set openai -k "sk-..."

# 列出 API 密钥
dev-agent api-key list

# 使用统计
dev-agent api-key stats

# 删除 API 密钥
dev-agent api-key delete openai
```

## 项目结构

```
dev-agent-kit/
├── api/                      # FastAPI 后端服务器
│   ├── main.py              # FastAPI 应用程序
│   ├── requirements.txt     # Python 依赖
│   └── .env.example         # 环境变量示例
├── src/
│   ├── index.js              # 主入口点
│   ├── modules/
│   │   ├── spec-kit/         # Spec-kit 模块
│   │   ├── todo/             # 待办事项管理模块
│   │   ├── roles/            # 代理角色模块
│   │   ├── api-key-manager/  # API 密钥令牌优化模块
│   │   ├── lightning/        # Agent Lightning 模块
│   │   ├── claude-skills/    # Claude Skills 模块
│   │   ├── agent-skills/     # Agent Skills 模块
│   │   ├── seo/              # SEO 优化模块
│   │   ├── ai-seo/           # AI SEO 优化模块
│   │   ├── geo/              # GEO 优化模块
│   │   └── aio/              # AIO 综合优化模块
│   ├── utils/                # 实用函数
│   └── config/               # 配置文件
├── bin/
│   └── cli.js                # CLI 入口点
├── scripts/                  # 脚本
│   ├── init-project.js       # 项目初始化
│   └── setup.js              # 设置脚本
├── docs/                     # 文档
│   ├── USAGE.md              # 使用指南
│   ├── ARCHITECTURE.md       # 架构文档
│   ├── RECOMMENDED_PACKAGES.md # 推荐包
│   ├── INTEGRATION_GUIDE.md  # 集成指南
│   └── SEO_GUIDE.md          # SEO/AI SEO/GEO/AIO 指南
├── .spec-kit/                # Spec-kit 文档存储库
├── .project-data/            # 项目数据
│   ├── todos.json            # 待办事项数据
│   ├── role-config.json      # 角色配置
│   └── config.json           # 项目配置
├── .env.example              # 环境变量示例
├── .eslintrc.json            # ESLint 配置
├── .prettierrc.json          # Prettier 配置
├── vitest.config.js          # Vitest 配置
└── package.json.recommended  # 扩展包示例
```

## 扩展和集成

### 推荐包

建议添加到项目中的有用包：

- **代码质量**：ESLint、Prettier、SonarJS
- **测试**：Vitest、Playwright、Cypress
- **文档**：TypeDoc、JSDoc
- **依赖管理**：npm-check-updates、Snyk
- **CI/CD**：GitHub Actions、Husky
- **日志记录**：Winston、Debug
- **安全性**：Snyk、audit-ci

有关更多详细信息，请参阅[推荐包文档](docs/RECOMMENDED_PACKAGES.md)。

### 集成指南

有关与其他工具集成的方法，请参阅[集成指南](docs/INTEGRATION_GUIDE.md)。

## 文档

- [使用指南](docs/USAGE.md) - 详细使用说明
- [架构文档](docs/ARCHITECTURE.md) - 系统结构和设计
- [推荐包](docs/RECOMMENDED_PACKAGES.md) - 推荐的附加包
- [集成指南](docs/INTEGRATION_GUIDE.md) - 工具集成方法
- [SEO/AI SEO/GEO/AIO 指南](docs/SEO_GUIDE.md) - 网页优化指南
- [贡献指南](CONTRIBUTING.md) - 如何为项目做出贡献

## 开发工作流示例

```bash
# 1. 初始化项目
dev-agent init

# 2. 设置角色
dev-agent role set --role frontend

# 3. 创建初始规格文档
dev-agent spec create "项目概述"

# 4. 添加任务
dev-agent todo add "组件设计" -p high -m "阶段 1"
dev-agent todo add "API 集成" -p medium -m "阶段 1"

# 5. 激活技能
dev-agent skills activate code-reviewer --type claude
dev-agent skills activate git-operations --type agent

# 6. 检查进度
dev-agent todo list
dev-agent spec list
```

## 贡献

如果您想为项目做出贡献，请参阅[贡献指南](CONTRIBUTING.md)。

欢迎错误报告、功能建议和 Pull Request！

## 许可证

MIT 许可证

版权所有 (c) 2025 Park chunghyo

这是一个任何人都可以自由使用、修改和分发的开源项目。

有关更多详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 参考资源

### 核心集成资源

- [Spec-kit](https://github.com/github/spec-kit) - 规格文档管理
- [Agent Lightning](https://github.com/microsoft/agent-lightning) - AI 强化学习
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills) - Claude Skills
- [Agent Skills](https://github.com/agentskills/agentskills) - Agent Skills 框架

### 相关工具

- [ESLint](https://eslint.org/) - 代码检查
- [Prettier](https://prettier.io/) - 代码格式化
- [Vitest](https://vitest.dev/) - 测试框架
- [Husky](https://typicode.github.io/husky/) - Git 钩子
- [standard-version](https://github.com/conventional-changelog/standard-version) - 版本管理

## 作者

**Park chunghyo**

- GitHub: [@saewookkangboy](https://github.com/saewookkangboy)

## 星标

如果这个项目对您有帮助，请给它一个 ⭐！

