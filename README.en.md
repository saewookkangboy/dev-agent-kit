# Dev Agent Kit

Integrated Development Agent Package - A comprehensive development tool that integrates Spec-kit, To-do management, Agent Roles, AI Reinforcement Learning, and Claude Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **Open Source Project**: This is an open-source project that anyone can use, modify, and distribute freely.

## 🌐 View in Other Languages

- 🇰🇷 [한국어 (Korean)](README.ko.md)
- 🇨🇳 [中文 (Chinese)](README.zh.md)
- 🇪🇸 [Español (Spanish)](README.es.md)

## Features

### 1. Spec-kit Integration
- Specification document management based on GitHub Spec-kit
- Requirements documentation and version control
- Specification validation and testing

### 2. To-do List and Step-by-step Task Management
- Task item creation and management
- Milestone-based progress tracking
- Priority and dependency management

### 3. Agent Role System
An agent system that supports various development roles:
- **PM (Project Manager)**: Project management and coordination
- **Frontend Developer**: Frontend development
- **Backend Developer**: Backend development
- **Server/DB Developer**: Server and database management
- **Security Manager**: Security management and auditing
- **UI/UX Designer**: User interface and experience design
- **AI Marketing Researcher**: AI-based market research

### 4. AI Reinforcement Learning (Agent Lightning)
- Integration of reinforcement learning based on Microsoft Agent Lightning
- Agent performance optimization
- Training data management

### 5. Claude Skills Integration
- Integration with ComposioHQ awesome-claude-skills
- Utilization of various Claude AI skills
- Support for custom skill development

### 6. Agent Skills Integration
- Integration with agentskills framework
- Agent skill management and expansion

### 7. SEO Optimization
- Search engine optimization analysis
- Meta tags and keyword analysis
- Sitemap and Robots.txt generation
- Structured data validation

### 8. AI SEO Optimization
- AI-based keyword research
- Automatic content optimization
- Keyword density and readability analysis
- Competitor keyword analysis

### 9. FastAPI Backend Server
- Optimized RESTful API provision
- Asynchronous processing and performance optimization
- Automatic API documentation generation (Swagger/OpenAPI)

### 10. API Key Token Optimization
- Token caching and reuse
- Secure encrypted storage
- Usage tracking and monitoring

### 11. GEO (Generative Engine Optimization)
- Generative AI search engine optimization (ChatGPT, Claude, Perplexity, Gemini, etc.)
- AI-friendly content structure analysis
- FAQ, HowTo, Article schema generation
- Multi-AI engine compatibility optimization
- Citation and credibility enhancement

### 12. AIO (All-In-One) Optimization
- Comprehensive SEO, AI SEO, GEO analysis
- Performance, accessibility, security analysis
- Social media optimization
- Automatic optimization and report generation

## Installation

### Basic Installation

```bash
# Clone repository
git clone https://github.com/saewookkangboy/dev-agent-kit.git
cd dev-agent-kit

# Install dependencies
npm install

# Setup
npm run setup
```

### Global Installation (Optional)

```bash
npm link
# or
npm install -g .
```

After installation, you can use the `dev-agent` command anywhere.

## Usage

### Project Initialization

```bash
npm run init
# or
dev-agent init
```

### CLI Usage

#### To-do List Management

```bash
# Add To-do (with priority and milestone)
dev-agent todo add "Task description" -p high -m "Phase 1"
dev-agent todo add "API integration" -p medium

# List To-do items
dev-agent todo list
dev-agent todo list -s pending  # Filter by status

# Complete To-do
dev-agent todo complete <id>
```

#### Agent Role Configuration

```bash
# Set role
dev-agent role set --role frontend
dev-agent role set --role backend
dev-agent role set --role pm

# List available roles
dev-agent role list

# Get current role information
dev-agent role info
```

#### Spec-kit Management

```bash
# Create specification document
dev-agent spec create "User Authentication System"
dev-agent spec create "API Design"

# List specification documents
dev-agent spec list

# Validate specification documents
dev-agent spec validate
```

#### AI Reinforcement Learning

```bash
# Start reinforcement learning
dev-agent train --agent my-agent --episodes 100
```

#### Skills Management

```bash
# List Claude Skills
dev-agent skills list --type claude

# List Agent Skills
dev-agent skills list --type agent

# Activate skill
dev-agent skills activate spec-kit --type claude
dev-agent skills activate web-search --type agent
```

#### SEO Optimization

```bash
# SEO analysis
dev-agent seo analyze https://example.com

# Generate Sitemap
dev-agent seo sitemap -u https://example.com https://example.com/about

# Generate Robots.txt
dev-agent seo robots
```

#### AI SEO Optimization

```bash
# AI keyword research
dev-agent ai-seo keywords "web development"

# Content optimization
dev-agent ai-seo optimize "content text" -k "keyword1" "keyword2"

# Competitor analysis
dev-agent ai-seo competitors example.com -c competitor1.com
```

#### GEO (Generative Engine Optimization)

```bash
# GEO analysis (AI search engine optimization)
dev-agent geo analyze https://example.com

# Generate FAQ schema
dev-agent geo faq -q "Question 1" "Question 2"

# Generate HowTo schema
dev-agent geo howto -n "Guide name" -s "Step 1" "Step 2"

# Generate Article schema
dev-agent geo article -h "Title" -a "Author" -u "https://example.com"

# Generative engine optimization
dev-agent geo optimize https://example.com -e chatgpt claude perplexity
```

#### AIO Comprehensive Optimization

```bash
# Comprehensive analysis
dev-agent aio analyze https://example.com

# Automatic optimization
dev-agent aio optimize https://example.com

# Generate report
dev-agent aio report -f markdown
```

#### FastAPI Server

```bash
# Install FastAPI dependencies
dev-agent api:install

# Start server
dev-agent api:start

# Development mode (auto-reload)
dev-agent api:start --reload --port 8080
```

#### API Key Management

```bash
# Save API key
dev-agent api-key set openai -k "sk-..."

# List API keys
dev-agent api-key list

# Usage statistics
dev-agent api-key stats

# Delete API key
dev-agent api-key delete openai
```

## Project Structure

```
dev-agent-kit/
├── api/                      # FastAPI backend server
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variables example
├── src/
│   ├── index.js              # Main entry point
│   ├── modules/
│   │   ├── spec-kit/         # Spec-kit module
│   │   ├── todo/             # To-do management module
│   │   ├── roles/            # Agent Role module
│   │   ├── api-key-manager/  # API key token optimization module
│   │   ├── lightning/        # Agent Lightning module
│   │   ├── claude-skills/    # Claude Skills module
│   │   ├── agent-skills/     # Agent Skills module
│   │   ├── seo/              # SEO optimization module
│   │   ├── ai-seo/           # AI SEO optimization module
│   │   ├── geo/              # GEO optimization module
│   │   └── aio/              # AIO comprehensive optimization module
│   ├── utils/                # Utility functions
│   └── config/               # Configuration files
├── bin/
│   └── cli.js                # CLI entry point
├── scripts/                  # Scripts
│   ├── init-project.js       # Project initialization
│   └── setup.js              # Setup script
├── docs/                     # Documentation
│   ├── USAGE.md              # Usage guide
│   ├── ARCHITECTURE.md       # Architecture documentation
│   ├── RECOMMENDED_PACKAGES.md # Recommended packages
│   ├── INTEGRATION_GUIDE.md  # Integration guide
│   └── SEO_GUIDE.md          # SEO/AI SEO/GEO/AIO guide
├── .spec-kit/                # Spec-kit document repository
├── .project-data/            # Project data
│   ├── todos.json            # To-do data
│   ├── role-config.json      # Role configuration
│   └── config.json           # Project configuration
├── .env.example              # Environment variables example
├── .eslintrc.json            # ESLint configuration
├── .prettierrc.json          # Prettier configuration
├── vitest.config.js          # Vitest configuration
└── package.json.recommended  # Extended package example
```

## Extension and Integration

### Recommended Packages

Recommended packages that are useful to add to the project:

- **Code Quality**: ESLint, Prettier, SonarJS
- **Testing**: Vitest, Playwright, Cypress
- **Documentation**: TypeDoc, JSDoc
- **Dependency Management**: npm-check-updates, Snyk
- **CI/CD**: GitHub Actions, Husky
- **Logging**: Winston, Debug
- **Security**: Snyk, audit-ci

For more details, please refer to the [Recommended Packages Documentation](docs/RECOMMENDED_PACKAGES.md).

### Integration Guide

For methods to integrate with other tools, please refer to the [Integration Guide](docs/INTEGRATION_GUIDE.md).

## Documentation

- [Usage Guide](docs/USAGE.md) - Detailed usage instructions
- [Architecture Documentation](docs/ARCHITECTURE.md) - System structure and design
- [Recommended Packages](docs/RECOMMENDED_PACKAGES.md) - Recommended additional packages
- [Integration Guide](docs/INTEGRATION_GUIDE.md) - Tool integration methods
- [SEO/AI SEO/GEO/AIO Guide](docs/SEO_GUIDE.md) - Web optimization guide
- [Contributing Guide](CONTRIBUTING.md) - How to contribute to the project

## Development Workflow Example

```bash
# 1. Initialize project
dev-agent init

# 2. Set role
dev-agent role set --role frontend

# 3. Create initial specification document
dev-agent spec create "Project Overview"

# 4. Add tasks
dev-agent todo add "Component Design" -p high -m "Phase 1"
dev-agent todo add "API Integration" -p medium -m "Phase 1"

# 5. Activate skills
dev-agent skills activate code-reviewer --type claude
dev-agent skills activate git-operations --type agent

# 6. Check progress
dev-agent todo list
dev-agent spec list
```

## Contributing

If you would like to contribute to the project, please refer to the [Contributing Guide](CONTRIBUTING.md).

Bug reports, feature suggestions, and Pull Requests are welcome!

## License

MIT License

Copyright (c) 2025 Park chunghyo

This is an open-source project that anyone can use, modify, and distribute freely.

For more details, please refer to the [LICENSE](LICENSE) file.

## Reference Resources

### Core Integration Resources

- [Spec-kit](https://github.com/github/spec-kit) - Specification document management
- [Agent Lightning](https://github.com/microsoft/agent-lightning) - AI reinforcement learning
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills) - Claude Skills
- [Agent Skills](https://github.com/agentskills/agentskills) - Agent Skills framework

### Related Tools

- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Vitest](https://vitest.dev/) - Test framework
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [standard-version](https://github.com/conventional-changelog/standard-version) - Version management

## Author

**Park chunghyo**

- GitHub: [@saewookkangboy](https://github.com/saewookkangboy)

## Star

If this project was helpful to you, please give it a ⭐!

