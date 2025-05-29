# Shape Up AI-Optimized

## Overview

Shape Up adapted for AI execution. Instead of 6-week cycles, we shape work for immediate AI implementation. The AI executes in a single run (zero-shot) or with 2-5 iterations for bug fixes. Perfect for rapid feature development with AI agents.

## Core Changes from Traditional Shape Up

| Traditional Shape Up | AI-Optimized Shape Up |
|---------------------|----------------------|
| 6-week cycles | Single execution run |
| Human builders discover scopes | Translator defines all tasks upfront |
| Hill charts track confidence | Execution plan tracks completion |
| Cool-down for recovery | Immediate bug fix iterations |
| Teams work autonomously | AI executes sequentially |

## The AI Execution Flow

```
[Shape] → [Bet] → [Translate] → [Execute] → [Fix if needed]
  1hr      15min     30min        1 run       2-5 runs
```

## Core Concepts

### 1. Appetite becomes Complexity Budget
Instead of time, we think in terms of:
- **Simple**: ~10-20 tasks (one component/feature)
- **Moderate**: ~30-50 tasks (multiple integrated components)
- **Complex**: ~50-100 tasks (full feature with multiple flows)

### 2. Shaping for AI
Same process but consider:
- AI needs explicit file paths
- AI needs clear patterns to follow
- AI can't "discover" - must be told everything
- AI works best with clear boundaries

### 3. Betting on AI Work
Consider:
- Is this well-defined enough for AI?
- Do we have good examples in the codebase?
- Is the scope small enough for one run?
- Are the patterns consistent?

### 4. Translation is Critical
The Translator must:
- Define every file to touch
- Specify exact code patterns
- Include all edge cases upfront
- Order tasks by dependency

### 5. Execution in One Shot
The AI Executor:
- Runs through all tasks sequentially
- Generates complete implementation
- Outputs working code + tests
- Reports any blockers

### 6. Bug Fix Iterations
If issues arise:
- Run 1: Initial implementation
- Run 2-5: Fix specific bugs
- Each run is targeted at specific issues
- After 5 runs, needs human intervention

## Workflow Phases

### Phase 1: Shaping (1 hour)
**Same as traditional Shape Up but consider AI constraints:**
- More explicit about technical approach
- Include code examples in pitch
- Think about file organization
- Consider testability

### Phase 2: Betting (15 minutes)
**Quick decision based on:**
- Clarity of specification
- Codebase readiness
- Pattern consistency
- AI capability fit

### Phase 3: Translation (30 minutes)
**Critical phase for AI success:**
- Convert pitch to execution plan
- Define every task explicitly
- Include code snippets
- Order by dependency

### Phase 4: Execution (1 run)
**AI runs the complete plan:**
- Implements all tasks
- Writes tests
- Handles edge cases
- Produces working code

### Phase 5: Fix Iterations (if needed)
**2-5 targeted runs:**
- Run tests, identify failures
- Create fix tasks
- AI executes fixes
- Repeat until working

## Templates for AI Shape Up

### Execution Plan Structure
```
1. Setup Tasks (dependencies, imports)
2. Data Layer Tasks (models, schemas)
3. Business Logic Tasks (services, utils)
4. UI Component Tasks (views, components)
5. Integration Tasks (wiring, routes)
6. Test Tasks (unit, integration)
7. Cleanup Tasks (linting, formatting)
```

### Task Specification Format
```markdown
Task #N: [Clear task name]
Type: [Create|Modify|Delete|Test]
File: exact/path/to/file.ext
Dependencies: [Task #s that must complete first]

Input State:
[What exists before this task]

Implementation:
[Step-by-step what to do]

Code Example:
```[language]
// Exact pattern to follow
```

Output State:
[What should exist after]

Validation:
[How to verify success]
```

## When to Use AI Shape Up

✅ **Great for:**
- Well-understood features
- Pattern-based implementations  
- CRUD operations
- UI components following design system
- API endpoints with clear specs
- Refactoring with clear rules

❌ **Not suitable for:**
- Exploratory work
- Novel algorithms
- Complex architectural decisions
- Performance optimization
- Unclear requirements

## Success Metrics

- **Execution Success Rate**: % of features that work on first run
- **Fix Iterations**: Average number of fix runs needed
- **Task Clarity Score**: How often AI asks for clarification
- **Pattern Reuse**: % of tasks using existing patterns

## Commands

- `/shape` - Shape work with AI constraints in mind
- `/bet` - Decide if ready for AI execution
- `/translate` - Convert to explicit execution plan
- `/execute` - Run the AI implementation

## Key Principle

> "Shape for humans to understand, translate for AI to execute"

The shaping process remains creative and strategic. The translation makes it mechanical and explicit. This separation lets us leverage human creativity AND AI execution speed.