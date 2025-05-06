#!/usr/bin/env node

/**
 * Build script for SolumindEditorJs
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

// Log with color
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Execute a command and log the output
function exec(command, options = {}) {
  log(`\n${colors.bright}${colors.blue}> ${command}${colors.reset}\n`);
  try {
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    log(`\n${colors.red}Error executing command: ${command}${colors.reset}\n`);
    if (options.ignoreError) {
      return false;
    }
    process.exit(1);
  }
}

// Clean the dist directory
function cleanDist() {
  log(`\n${colors.yellow}Cleaning dist directory...${colors.reset}`);
  if (fs.existsSync('dist')) {
    exec('rm -rf dist');
  }
  fs.mkdirSync('dist', { recursive: true });
}

// Build the TypeScript files
function buildTypeScript() {
  log(`\n${colors.yellow}Building TypeScript...${colors.reset}`);
  exec('tsc');
}

// Copy CSS files to the dist directory
function copyCssFiles() {
  log(`\n${colors.yellow}Copying CSS files...${colors.reset}`);
  if (fs.existsSync('styles')) {
    fs.mkdirSync('dist/styles', { recursive: true });
    fs.readdirSync('styles').forEach(file => {
      if (file.endsWith('.css')) {
        fs.copyFileSync(
          path.join('styles', file),
          path.join('dist/styles', file)
        );
        log(`Copied ${file}`);
      }
    });
  }
}

// Create package.json for distribution
function createDistPackageJson() {
  log(`\n${colors.yellow}Creating package.json for distribution...${colors.reset}`);
  const packageJson = require('../package.json');
  
  const distPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    main: 'index.js',
    types: 'index.d.ts',
    author: packageJson.author,
    license: packageJson.license,
    dependencies: packageJson.dependencies,
    peerDependencies: packageJson.peerDependencies
  };
  
  fs.writeFileSync(
    path.join('dist', 'package.json'),
    JSON.stringify(distPackageJson, null, 2)
  );
}

// Copy README.md to the dist directory
function copyReadme() {
  log(`\n${colors.yellow}Copying README.md...${colors.reset}`);
  if (fs.existsSync('README.md')) {
    fs.copyFileSync('README.md', path.join('dist', 'README.md'));
  }
}

// Run the build process
function build() {
  log(`\n${colors.magenta}${colors.bright}Building SolumindEditorJs...${colors.reset}\n`);
  
  cleanDist();
  buildTypeScript();
  copyCssFiles();
  createDistPackageJson();
  copyReadme();
  
  log(`\n${colors.green}${colors.bright}Build completed successfully!${colors.reset}\n`);
}

// Execute the build
build();
