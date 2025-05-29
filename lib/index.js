const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function init(options = {}) {
  const targetDir = path.join(process.cwd(), '.claude');
  const sourceDir = path.join(__dirname, '..', 'templates');
  
  // Header
  console.log('\n' + chalk.yellow('━'.repeat(50)));
  console.log(chalk.yellow.bold('  🔨 Claude Forge') + chalk.gray(' - AI-powered project shaping'));
  console.log(chalk.yellow('━'.repeat(50)) + '\n');
  
  console.log(chalk.cyan('📦 Installing forge methodology...\n'));
  
  try {
    // Create directories
    console.log(chalk.blue('📁 Creating directories:'));
    await fs.ensureDir(path.join(targetDir, 'methods'));
    console.log(chalk.gray('   ✓ .claude/methods/'));
    await fs.ensureDir(path.join(targetDir, 'personas'));
    console.log(chalk.gray('   ✓ .claude/personas/'));
    await fs.ensureDir(path.join(targetDir, 'templates'));
    console.log(chalk.gray('   ✓ .claude/templates/'));
    await fs.ensureDir(path.join(targetDir, 'commands'));
    console.log(chalk.gray('   ✓ .claude/commands/'));
    
    // Copy files
    console.log('\n' + chalk.blue('📄 Installing files:'));
    await copyFiles(sourceDir, targetDir, options);
    
    // Handle CLAUDE.md - check both possible locations
    console.log('\n' + chalk.blue('🔧 Configuring CLAUDE.md:'));
    await handleClaudeMd(options);
    
    // Success box
    console.log('\n' + chalk.green('┌' + '─'.repeat(48) + '┐'));
    console.log(chalk.green('│') + chalk.green.bold('  ✅ Claude Forge installed successfully!') + '       ' + chalk.green('│'));
    console.log(chalk.green('└' + '─'.repeat(48) + '┘'));
    
    // Workflow instructions
    console.log('\n' + chalk.magenta.bold('🚀 Recommended Workflow:\n'));
    
    console.log(chalk.white('  1️⃣  Open Claude Code in this project:'));
    console.log(chalk.gray('      $ claude\n'));
    
    console.log(chalk.white('  2️⃣  Initialize Claude Code (if not done):'));
    console.log(chalk.gray('      > /init\n'));
    
    console.log(chalk.white('  3️⃣  Start forging your project:'));
    console.log(chalk.gray('      > Let\'s forge a new project'));
    console.log(chalk.gray('      > Create a PRD'));
    console.log(chalk.gray('      > What\'s next?\n'));
    
    // Features box
    console.log(chalk.cyan('📚 What you get:'));
    console.log(chalk.gray('   • 7 AI personas (Analyst, PM, Architect, etc.)'));
    console.log(chalk.gray('   • Document templates (PRD, Architecture, etc.)'));
    console.log(chalk.gray('   • Natural workflow guidance'));
    console.log(chalk.gray('   • 3 simple slash commands (/forge, /forge-prd, /forge-build)'));
    console.log(chalk.gray('   • No complex commands to memorize\n'));
    
    // Tips
    console.log(chalk.yellow('💡 Pro tip:') + chalk.gray(' All artifacts will be created in the docs/ directory'));
    console.log(chalk.yellow('💡 Pro tip:') + chalk.gray(' The PRD at docs/prd.md contains your story checklist!'));
    console.log(chalk.yellow('💡 Pro tip:') + chalk.gray(' Say "What\'s next?" anytime to get guidance'));
    
    // Footer
    console.log('\n' + chalk.gray('─'.repeat(50)));
    console.log(chalk.gray('Learn more: https://github.com/peteknowsai/claude-forge'));
    console.log(chalk.gray('─'.repeat(50)) + '\n');
    
  } catch (error) {
    console.error('\n' + chalk.red('❌ Error: ' + error.message));
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
        console.log(chalk.yellow(`   ⚠️  Skipping: ${path.relative(process.cwd(), targetPath)}`));
      } else {
        await fs.copy(sourcePath, targetPath);
        if (!options.quiet) {
          const icon = targetPath.includes('personas') ? '👤' : 
                       targetPath.includes('templates') ? '📝' : 
                       targetPath.includes('methods') ? '📖' : 
                       targetPath.includes('commands') ? '⚡' : '📄';
          console.log(chalk.gray(`   ${icon} ${path.relative(process.cwd(), targetPath)}`));
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
      console.log(chalk.gray(`   ✅ Created ${location}`));
    } else {
      // Check if forge section already exists
      const content = await fs.readFile(claudeMdPath, 'utf8');
      
      if (content.includes('Claude Forge')) {
        console.log(chalk.yellow(`   ⚠️  ${location} already has forge section`));
      } else {
        // Append forge section
        const updatedContent = content.trimEnd() + '\n' + forgeSection;
        await fs.writeFile(claudeMdPath, updatedContent);
        console.log(chalk.gray(`   ✅ Updated ${location}`));
      }
    }
  } catch (error) {
    console.error(chalk.yellow(`   ⚠️  Could not update CLAUDE.md: ${error.message}`));
  }
}

module.exports = init;