# Changelog

All notable changes to claude-forge will be documented in this file.

## [2.0.0] - 2024-01-29

### Added
- **AI-Optimized Shape Up** - New execution mode for immediate AI implementation
  - Shape features for single-run execution instead of 6-week cycles
  - Complexity-based sizing (Simple/Moderate/Complex) instead of time-based
  - Zero-shot execution with 2-5 bug fix iterations if needed

- **New Personas for Shape Up**
  - `Translator` - Converts shaped pitches into explicit execution plans
  - `AI Executor` - Implements complete features in a single run
  - `Bettor` - Makes strategic decisions at betting table

- **New Templates**
  - `execution-plan.md` - Detailed task specifications for AI execution
  - `run-result.md` - AI execution status reporting

- **Enhanced Shape Up Documentation**
  - Complete methodology guide based on Shape Up book
  - Detailed shaping techniques (breadboarding, fat marker sketches)
  - Hill chart improvements with better progress visualization

### Changed
- Shape Up personas now accurately reflect the methodology
  - `Shaper` - Enhanced with proper shaping techniques and principles
  - `Builder` - Updated to use scopes instead of tasks, proper hill chart thinking
- Pitch template now follows the 5-ingredient structure from the book
- Shape Up config supports both traditional and AI-optimized modes

### Fixed
- Shape Up terminology and concepts now align with official methodology
- Clearer separation between shaping and building phases

## [1.3.0] - Previous Release

### Added
- Multi-methodology support
- Methodology selection during init
- `list-methodologies` command

### Changed
- Modular architecture for methodologies
- Shared components between methodologies