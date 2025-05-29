const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function getAvailableMethodologies() {
  const methodologiesDir = path.join(__dirname, '..', 'templates', 'methodologies');
  const methodologies = [];
  
  const dirs = await fs.readdir(methodologiesDir);
  
  for (const dir of dirs) {
    const configPath = path.join(methodologiesDir, dir, 'config.json');
    if (await fs.pathExists(configPath)) {
      const config = await fs.readJson(configPath);
      methodologies.push({
        id: config.id,
        name: config.displayName || config.name,
        description: config.description
      });
    }
  }
  
  return methodologies;
}

async function listMethodologies() {
  const methodologies = await getAvailableMethodologies();
  
  console.log('\n' + chalk.yellow('━'.repeat(50)));
  console.log(chalk.yellow.bold('  📚 Available Methodologies'));
  console.log(chalk.yellow('━'.repeat(50)) + '\n');
  
  for (const methodology of methodologies) {
    console.log(chalk.cyan.bold(`  ${methodology.id}`) + chalk.gray(` - ${methodology.name}`));
    console.log(chalk.gray(`     ${methodology.description}\n`));
  }
  
  console.log(chalk.gray('Use: claude-forge init -m <methodology>\n'));
}

async function promptForMethodology() {
  const methodologies = await getAvailableMethodologies();
  
  console.log(chalk.cyan('\n📋 Select a methodology:\n'));
  
  methodologies.forEach((m, index) => {
    console.log(chalk.white(`  ${index + 1}. ${m.name}`));
    console.log(chalk.gray(`     ${m.description}\n`));
  });
  
  // For now, we'll default to scrum if no selection is made
  // In a real implementation, you'd use inquirer or similar for interactive prompts
  console.log(chalk.yellow('\n⚡ Defaulting to Scrum methodology (use -m flag to specify)\n'));
  return 'scrum';
}

async function loadMethodologyConfig(methodologyId) {
  const configPath = path.join(__dirname, '..', 'templates', 'methodologies', methodologyId, 'config.json');
  
  if (!await fs.pathExists(configPath)) {
    throw new Error(`Methodology '${methodologyId}' not found`);
  }
  
  return await fs.readJson(configPath);
}

module.exports = {
  getAvailableMethodologies,
  listMethodologies,
  promptForMethodology,
  loadMethodologyConfig
};