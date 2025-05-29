# Shape Up Methodology

## Overview

Shape Up is a product development methodology created by Basecamp that gives teams uninterrupted time to build, with shaped projects instead of feature lists, and betting tables instead of roadmaps. It's designed to help teams stop running in circles and ship meaningful work.

## Core Philosophy

- **Fixed time, variable scope**: Ship the best solution in the time available
- **Shaped work, not specs**: Define projects at the right level of abstraction
- **Bets, not backlogs**: Make deliberate choices about what to build
- **Circuit breaker**: Projects end after 6 weeks, no extensions
- **Full responsibility**: Teams own the entire project from start to ship

## The Shape Up Cycle

```
[2 weeks Cool-down] → [6 weeks Build] → [2 weeks Cool-down] → [6 weeks Build]
     ↓                                        ↓
  Shaping                                 Shaping
  Betting                                 Betting
```

## Core Concepts

### 1. Shaping (During Cool-down)
**What**: Transform raw ideas into concrete, buildable projects
**Who**: Senior people who combine UX, tech, and business thinking
**How**: Closed-door creative process using breadboards and fat marker sketches

Key principles:
- Work at the right level of abstraction
- Find the elements that matter
- Patch rabbit holes before they become problems
- Leave room for builder creativity

### 2. Appetite
**Not an estimate** - it's how much time we *want* to spend:
- **Small Batch**: 2 weeks for small improvements
- **Big Batch**: 6 weeks for larger features

The appetite constrains the solution. Good solutions are relative to time invested.

### 3. Betting Table (During Cool-down)
**What**: Leadership meeting to decide next cycle's projects
**Who**: CEO, CTO, senior leaders
**How**: Review shaped pitches, consider priorities, make bets

Key principles:
- No backlog - bet now or let it go
- Consider timing, not just importance
- Full commitment for the cycle
- Some good ideas don't get built, and that's okay

### 4. Building (6-week cycle)
**What**: Autonomous teams build shaped projects
**Who**: Small integrated teams (designer + programmers)
**How**: Full ownership from concept to ship

Key principles:
- Teams define their own tasks (discovered, not assigned)
- Organize work by scopes, not roles
- Track progress on hill charts
- Done means deployed

### 5. Scopes vs Tasks
**Scopes**: Natural boundaries in the work
- Bigger than tasks, smaller than the project
- Named after the problem structure
- Discovered through doing the work
- Each scope can be completed independently

**Why scopes beat tasks**:
- Show meaningful progress
- Create shared language
- Enable better status conversations
- Help identify what to cut if needed

### 6. Hill Charts
Visual tool showing work progressing from unknown → known → done

**Uphill** (Problem-solving):
- "Still figuring out the approach"
- "Exploring options"
- Confidence is low

**Downhill** (Execution):
- "Know exactly what to do"
- "Just need to build it"
- Confidence is high

### 7. Cool-down (2 weeks)
**Purpose**: Breathing room between cycles
**Activities**:
- Bug fixes and maintenance
- Exploration and experiments
- Shaping next cycle's projects
- Betting table meeting

No scheduled project work - it's truly flexible time.

## Getting Started

### As a Shaper
1. "Let's shape [problem/idea]" - Start shaping process
2. Use breadboarding for flows, fat marker sketches for layouts
3. Write pitch with 5 ingredients: Problem, Appetite, Solution, Rabbit Holes, No-gos
4. Save pitches to `docs/pitches/`

### As a Bettor
1. "Review pitches for next cycle" - Examine shaped work
2. "What should we bet on?" - Run betting table
3. Consider business priorities and team capacity
4. Create cycle plan in `docs/cycles/`

### As a Builder
1. "Start building [project]" - Begin 6-week cycle
2. Study the pitch, get oriented
3. Discover scopes through real work
4. Update hill charts in `docs/cycles/current/`
5. Ship before cycle ends

## Key Differences from Other Methodologies

| Traditional | Shape Up |
|------------|----------|
| Product backlog | No backlog |
| Sprint planning | Betting table |
| User stories | Shaped pitches |
| Tasks assigned | Scopes discovered |
| Daily standups | Asynchronous hill charts |
| Estimates | Appetite |
| Velocity tracking | Shipping |
| Flexible deadlines | Circuit breaker |

## Templates & Artifacts

All artifacts go in the `docs/` directory:
- `docs/pitches/` - Shaped project pitches
- `docs/cycles/` - Cycle plans and hill charts
- `docs/cycles/current/` - Active cycle tracking

## Commands

- `/shape` - Enter shaping mode for a new project
- `/bet` - Run a betting table session
- `/build` - Start building a shaped project
- `/cooldown` - Enter cool-down period activities

## Success Metrics

- Projects ship within cycles
- Teams feel autonomous and empowered
- No death marches or endless projects
- Meaningful features delivered regularly
- Time for maintenance and exploration

Remember: Shape Up is about making deliberate choices with constrained resources to ship meaningful work on a predictable schedule.