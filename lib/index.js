const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { 
  getAvailableMethodologies, 
  listMethodologies, 
  promptForMethodology, 
  loadMethodologyConfig 
} = require('./methodologies');

async function init(options = {}) {
  // Handle list flag
  if (options.list) {
    return await listMethodologies();
  }
  
  const targetDir = path.join(process.cwd(), '.claude');
  const sourceDir = path.join(__dirname, '..', 'templates');
  
  // Determine methodology
  let methodologyId = options.methodology;
  if (!methodologyId) {
    methodologyId = await promptForMethodology();
  }
  
  // Load methodology config
  let config;
  try {
    config = await loadMethodologyConfig(methodologyId);
  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    console.log(chalk.yellow('\nAvailable methodologies:'));
    await listMethodologies();
    process.exit(1);
  }
  
  // Header with methodology name
  console.log('\n' + chalk.yellow('━'.repeat(50)));
  console.log(chalk.yellow.bold(`  ${config.messages?.welcome || '🔨 Claude Forge'}`));
  console.log(chalk.gray(`  ${config.description}`));
  console.log(chalk.yellow('━'.repeat(50)) + '\n');
  
  console.log(chalk.cyan(`📦 Installing ${config.name} methodology...\n`));
  
  try {
    // Create base directories
    console.log(chalk.blue('📁 Creating directories:'));
    await fs.ensureDir(path.join(targetDir, 'methods'));
    console.log(chalk.gray('   ✓ .claude/methods/'));
    await fs.ensureDir(path.join(targetDir, 'personas'));
    console.log(chalk.gray('   ✓ .claude/personas/'));
    await fs.ensureDir(path.join(targetDir, 'templates'));
    console.log(chalk.gray('   ✓ .claude/templates/'));
    await fs.ensureDir(path.join(targetDir, 'commands'));
    console.log(chalk.gray('   ✓ .claude/commands/'));
    
    // Copy methodology-specific files
    console.log('\n' + chalk.blue('📄 Installing methodology files:'));
    await copyMethodologyFiles(sourceDir, targetDir, methodologyId, config, options);
    
    // Copy shared files
    console.log('\n' + chalk.blue('📄 Installing shared components:'));
    await copySharedFiles(sourceDir, targetDir, config, options);
    
    // Handle CLAUDE.md
    console.log('\n' + chalk.blue('🔧 Configuring CLAUDE.md:'));
    await handleClaudeMd(methodologyId, config, options);
    
    // Success box
    console.log('\n' + chalk.green('┌' + '─'.repeat(48) + '┐'));
    console.log(chalk.green('│') + chalk.green.bold(`  ✅ ${config.name} methodology installed!`) + ' '.repeat(48 - 6 - config.name.length) + chalk.green('│'));
    console.log(chalk.green('└' + '─'.repeat(48) + '┘'));
    
    // Methodology-specific workflow instructions
    await displayWorkflowInstructions(config);
    
  } catch (error) {
    console.error('\n' + chalk.red('❌ Error: ' + error.message));
    process.exit(1);
  }
}

async function copyMethodologyFiles(sourceDir, targetDir, methodologyId, config, options) {
  const methodologyDir = path.join(sourceDir, 'methodologies', methodologyId);
  
  // Copy each component type
  const componentTypes = ['methods', 'personas', 'templates', 'commands'];
  
  for (const type of componentTypes) {
    const sourceTypeDir = path.join(methodologyDir, type);
    const targetTypeDir = path.join(targetDir, type);
    
    if (await fs.pathExists(sourceTypeDir)) {
      const files = await fs.readdir(sourceTypeDir);
      
      for (const file of files) {
        const sourcePath = path.join(sourceTypeDir, file);
        const targetPath = path.join(targetTypeDir, file);
        
        if (await fs.pathExists(targetPath) && !options.force) {
          console.log(chalk.yellow(`   ⚠️  Skipping: ${path.relative(process.cwd(), targetPath)}`));
        } else {
          await fs.copy(sourcePath, targetPath);
          if (!options.quiet) {
            const icon = type === 'personas' ? '👤' : 
                         type === 'templates' ? '📝' : 
                         type === 'methods' ? '📖' : 
                         type === 'commands' ? '⚡' : '📄';
            console.log(chalk.gray(`   ${icon} ${path.relative(targetDir, targetPath)}`));
          }
        }
      }
    }
  }
}

async function copySharedFiles(sourceDir, targetDir, config, options) {
  const sharedDir = path.join(sourceDir, 'shared');
  
  // Copy shared personas
  if (config.components.personas?.shared) {
    for (const persona of config.components.personas.shared) {
      const sourcePath = path.join(sharedDir, 'personas', `${persona}.md`);
      const targetPath = path.join(targetDir, 'personas', `${persona}.md`);
      
      if (await fs.pathExists(sourcePath)) {
        if (await fs.pathExists(targetPath) && !options.force) {
          console.log(chalk.yellow(`   ⚠️  Skipping: ${path.relative(process.cwd(), targetPath)}`));
        } else {
          await fs.copy(sourcePath, targetPath);
          if (!options.quiet) {
            console.log(chalk.gray(`   👤 personas/${persona}.md (shared)`));
          }
        }
      }
    }
  }
}

async function handleClaudeMd(methodologyId, config, options) {
  // Check both possible locations for CLAUDE.md
  const projectRoot = process.cwd();
  const possiblePaths = [
    path.join(projectRoot, 'CLAUDE.md'),
    path.join(projectRoot, '.claude', 'CLAUDE.md')
  ];
  
  let claudeMdPath = null;
  for (const possiblePath of possiblePaths) {
    if (await fs.pathExists(possiblePath)) {
      claudeMdPath = possiblePath;
      break;
    }
  }
  
  // If no CLAUDE.md exists, create one in the project root
  if (!claudeMdPath) {
    claudeMdPath = possiblePaths[0]; // Default to root
    await fs.writeFile(claudeMdPath, '');
    console.log(chalk.gray(`   ✓ Created CLAUDE.md`));
  }
  
  // Read existing content
  let content = await fs.readFile(claudeMdPath, 'utf-8');
  
  // Check if forge methodology is already included
  if (content.includes('## Claude Forge')) {
    if (!options.force) {
      console.log(chalk.yellow(`   ⚠️  Claude Forge already configured in CLAUDE.md`));
      return;
    }
    // Remove existing forge section
    content = content.replace(/## Claude Forge[\s\S]*?(?=##|$)/g, '');
  }
  
  // Add forge methodology section
  const forgeSection = `
## Claude Forge - ${config.name} Methodology

You have access to the ${config.name} methodology in the .claude/ directory:
- **methods/** - ${config.name} methodology documentation
- **personas/** - Role-based AI behaviors 
- **templates/** - Document templates
- **commands/** - Slash commands for quick access

### Quick Start
- "${config.messages.startPrompt}" - Begin a new project
- "${config.messages.nextPrompt}" - Get guidance on next steps
- Check .claude/methods/ for detailed methodology information

### Artifacts
All generated documents should be created in the docs/ directory.
`;
  
  // Append to CLAUDE.md
  content = content.trim() + '\n\n' + forgeSection.trim() + '\n';
  await fs.writeFile(claudeMdPath, content);
  
  console.log(chalk.gray(`   ✓ Updated ${path.relative(projectRoot, claudeMdPath)}`));
}

async function displayWorkflowInstructions(config) {
  console.log('\n' + chalk.magenta.bold('🚀 Getting Started:\n'));
  
  console.log(chalk.white('  1️⃣  Open Claude Code in this project:'));
  console.log(chalk.gray('      $ claude\n'));
  
  console.log(chalk.white('  2️⃣  Initialize Claude Code (if not done):'));
  console.log(chalk.gray('      > /init\n'));
  
  console.log(chalk.white(`  3️⃣  Start with ${config.name}:`));
  console.log(chalk.gray(`      > ${config.messages.startPrompt}`));
  
  if (config.components.commands && config.components.commands.length > 0) {
    console.log(chalk.gray(`      > /${config.components.commands[0]}`));
  }
  
  console.log(chalk.gray(`      > ${config.messages.nextPrompt}\n`));
  
  // Workflow phases
  if (config.settings?.workflow?.phases) {
    console.log(chalk.cyan(`📋 ${config.name} Workflow Phases:`));
    config.settings.workflow.phases.forEach((phase, index) => {
      console.log(chalk.gray(`   ${index + 1}. ${phase.charAt(0).toUpperCase() + phase.slice(1)}`));
    });
    console.log('');
  }
  
  // Components summary
  console.log(chalk.cyan('📚 What you get:'));
  if (config.components.personas) {
    const totalPersonas = (config.components.personas.shared?.length || 0) + 
                         (config.components.personas.custom?.length || 0);
    console.log(chalk.gray(`   • ${totalPersonas} AI personas`));
  }
  console.log(chalk.gray(`   • ${config.components.templates?.length || 0} document templates`));
  console.log(chalk.gray(`   • ${config.components.commands?.length || 0} slash commands`));
  console.log(chalk.gray('   • Natural workflow guidance'));
  console.log(chalk.gray('   • All artifacts saved to docs/ directory\n'));
  
  // Footer
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.gray('Learn more: https://github.com/peteknowsai/claude-forge'));
  console.log(chalk.gray('─'.repeat(50)) + '\n');
}

module.exports = init;
module.exports.listMethodologies = listMethodologies;