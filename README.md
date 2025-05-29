# claude-forge

> Forge your ideas into reality with Claude Code - AI-powered project shaping

## 🚀 Version 2.0: AI-Optimized Shape Up

Major update! Shape Up now includes AI-optimized execution mode - shape features for immediate AI implementation instead of 6-week cycles.

## What is claude-forge?

A flexible methodology toolkit that turns Claude Code into your complete development team. Choose from multiple proven methodologies like Scrum or Shape Up, each tailored for Claude Code's natural language understanding and file-aware capabilities.

## Installation

Choose your methodology:

```bash
# Scrum (default)
npx claude-forge init

# Shape Up
npx claude-forge init -m shapeup

# List available methodologies
npx claude-forge list-methodologies
```

Or install globally:

```bash
npm install -g claude-forge
claude-forge init -m shapeup
```

### Recommended Setup Order

1. **First**: Run `claude-forge init` with your chosen methodology
2. **Then**: Open Claude Code (`claude`) and run `/init` to initialize your project
3. **Start**: Use the methodology's start prompt (e.g., "Let's forge a new project" for Scrum)

## What it does

1. Updates your `CLAUDE.md` file (or creates one) to activate your chosen methodology
2. Creates a `.claude/` directory in your project with:
   - **methods/** - Your chosen methodology documentation
   - **personas/** - AI personalities for each development role
   - **templates/** - Document templates for consistent outputs
   - **commands/** - Slash commands for quick access

## Available Methodologies

### Scrum (Agile Sprint-based)
Classic agile methodology with sprints, user stories, and ceremonies.

**How to use:**
- "Let's forge a new project" - Start from scratch
- "Create a PRD" - Claude becomes a PM and creates requirements
- "What's next?" - See where you are in the workflow
- `/forge` - Start or continue your workflow
- `/forge-prd` - Jump straight to PRD creation
- `/forge-build` - Start building from your stories

### Shape Up (AI-Optimized) 🆕
Basecamp's Shape Up methodology adapted for AI execution - shape once, execute immediately.

**Traditional Mode** (6-week cycles):
- "Let's shape a new project" - Start shaping work
- "Create a pitch" - Define problem and solution
- "Where are we in the cycle?" - Check progress
- `/shape` - Start shaping a feature
- `/bet` - Review and make bets
- `/build` - Start building cycle
- `/cooldown` - Enter cool-down period

**AI-Optimized Mode** (Single execution):
- Shape features for immediate AI implementation
- Translator converts pitches to explicit task lists
- AI Executor implements in one run
- 2-5 fix iterations if needed
- Hours instead of weeks!

**New Personas**:
- **Translator**: Converts shaped work to explicit tasks
- **AI Executor**: Implements all tasks in sequence

Perfect for well-defined features, CRUD operations, and pattern-based implementations.

## Philosophy

claude-forge adapts proven methodologies for AI-assisted development:

- **Flexible**: Choose the methodology that fits your project
- **AI-Native**: Designed specifically for Claude Code's capabilities
- **Lightweight**: Structure without bureaucracy
- **Document-Driven**: All artifacts saved to `docs/` directory
- **Natural Language**: Just talk to Claude Code

## Adding Custom Methodologies

Want to contribute a new methodology? Check our [contribution guide](https://github.com/peteknowsai/claude-forge/blob/main/CONTRIBUTING.md) for details on the methodology format.

## License

MIT