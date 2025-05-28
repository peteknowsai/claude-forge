const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function init(options = {}) {
  const targetDir = path.join(process.cwd(), '.claude');
  const sourceDir = path.join(__dirname, '..', 'templates');
  
  console.log(chalk.yellow('🔨 Forging your project with Claude...\n'));
  
  try {
    // Create directories
    await fs.ensureDir(path.join(targetDir, 'methods'));
    await fs.ensureDir(path.join(targetDir, 'personas'));
    await fs.ensureDir(path.join(targetDir, 'templates'));
    
    // Copy files
    await copyFiles(sourceDir, targetDir, options);
    
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

module.exports = init;