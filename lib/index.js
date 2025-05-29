const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function init(options = {}) {
  const targetDir = path.join(process.cwd(), '.claude');
  const sourceDir = path.join(__dirname, '..', 'templates');
  
  console.log(chalk.yellow('🔨 Forging your project with Claude Code...\n'));
  
  try {
    // Create directories
    await fs.ensureDir(path.join(targetDir, 'methods'));
    await fs.ensureDir(path.join(targetDir, 'personas'));
    await fs.ensureDir(path.join(targetDir, 'templates'));
    
    // Copy files
    await copyFiles(sourceDir, targetDir, options);
    
    // Handle CLAUDE.md - check both possible locations
    await handleClaudeMd(options);
    
    // Success message
    console.log(chalk.green('\n✓ Claude Forge installed successfully!\n'));
    console.log('Next steps:');
    console.log('1. Say "Hey Claude, let\'s forge a new project" to start');
    console.log('2. Or "What\'s next?" to see where you are');
    console.log('3. Check .claude/ for personas and templates\n');
    
  } catch (error) {
    console.error(chalk.red('Error:', error.message));
    process.exit(1);
  }
}

async function copyFiles(source, target, options) {
  const items = await fs.readdir(source);
  
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    const stat = await fs.stat(sourcePath);
    
    if (stat.isDirectory()) {
      await copyFiles(sourcePath, targetPath, options);
    } else {
      // Check if file exists
      if (await fs.pathExists(targetPath) && !options.force) {
        console.log(chalk.yellow(`⚠️  Skipping existing: ${path.relative(process.cwd(), targetPath)}`));
      } else {
        await fs.copy(sourcePath, targetPath);
        if (!options.quiet) {
          console.log(chalk.gray(`  ✓ Added: ${path.relative(process.cwd(), targetPath)}`));
        }
      }
    }
  }
}

async function handleClaudeMd(options) {
  // Check both possible locations for CLAUDE.md
  const rootPath = path.join(process.cwd(), 'CLAUDE.md');
  const claudeDirPath = path.join(process.cwd(), '.claude', 'CLAUDE.md');
  
  // Check which one exists (or both)
  const rootExists = await fs.pathExists(rootPath);
  const claudeDirExists = await fs.pathExists(claudeDirPath);
  
  if (claudeDirExists) {
    // If .claude/CLAUDE.md exists, update it
    await updateClaudeMd(claudeDirPath, options);
  } else if (rootExists) {
    // If only root CLAUDE.md exists, update it
    await updateClaudeMd(rootPath, options);
  } else {
    // Neither exists - create at root (most common location)
    await updateClaudeMd(rootPath, options);
  }
}

async function updateClaudeMd(claudeMdPath, options) {
  const forgeSection = `
## Claude Forge

I understand the Claude Forge methodology. The forge method files are loaded from:
- Methodology: \`.claude/methods/forge.md\`
- Personas: \`.claude/personas/\`
- Templates: \`.claude/templates/\`

When you mention "forge" or ask about project workflow, I'll guide you through the methodology.
`;

  try {
    const exists = await fs.pathExists(claudeMdPath);
    const location = path.relative(process.cwd(), claudeMdPath);
    
    if (!exists) {
      // Create new CLAUDE.md with forge section
      const content = `# Project Instructions
${forgeSection}`;
      await fs.writeFile(claudeMdPath, content);
      console.log(chalk.gray(`  ✓ Created ${location} with forge instructions`));
    } else {
      // Check if forge section already exists
      const content = await fs.readFile(claudeMdPath, 'utf8');
      
      if (content.includes('Claude Forge')) {
        console.log(chalk.yellow(`  ⚠️  ${location} already contains Claude Forge section`));
      } else {
        // Append forge section
        const updatedContent = content.trimEnd() + '\n' + forgeSection;
        await fs.writeFile(claudeMdPath, updatedContent);
        console.log(chalk.gray(`  ✓ Added Claude Forge section to ${location}`));
      }
    }
  } catch (error) {
    console.error(chalk.yellow('  ⚠️  Could not update CLAUDE.md:', error.message));
  }
}

module.exports = init;