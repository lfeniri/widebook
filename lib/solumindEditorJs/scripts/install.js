#!/usr/bin/env node

/**
 * SolumindEditorJs Installation Script
 * 
 * This script helps to integrate the SolumindEditorJs library
 * into a Next.js project.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

// Check if a path exists
function pathExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

// Check if the project is a Next.js project
function isNextJsProject() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!pathExists(packageJsonPath)) {
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.dependencies && 
    (packageJson.dependencies.next || packageJson.devDependencies?.next);
}

// Ask a yes/no question
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(`${colors.yellow}${question} (y/n) ${colors.reset}`, (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Ask for input with default value
function askInput(question, defaultValue) {
  return new Promise((resolve) => {
    rl.question(`${colors.yellow}${question} ${defaultValue ? `(${defaultValue}) ` : ''}${colors.reset}`, (answer) => {
      resolve(answer || defaultValue);
    });
  });
}

// Create an example component file
function createExampleComponent(componentPath) {
  const content = `"use client";

import React, { useState } from 'react';
import { SolumindEditor } from 'solumind-editor-js';

export default function SolumindEditorComponent() {
  const [content, setContent] = useState({
    html: '<div class="container mx-auto p-4">Hello World</div>',
    css: '.container { background-color: #f8f9fa; padding: 20px; }',
    js: 'console.log("SolumindEditor loaded");'
  });

  const handleChange = (data) => {
    setContent(data);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Page Editor</h2>
      <SolumindEditor
        value={content}
        onChange={handleChange}
        height="70vh"
      />
    </div>
  );
}
`;

  fs.mkdirSync(path.dirname(componentPath), { recursive: true });
  fs.writeFileSync(componentPath, content);
  log(`${colors.green}Created example component at ${componentPath}${colors.reset}`);
}

// Create an example page file
function createExamplePage(pagePath) {
  const content = `"use client";

import dynamic from 'next/dynamic';

// Import the editor component dynamically with client-side only rendering
const SolumindEditorComponent = dynamic(
  () => import('@/components/SolumindEditorComponent'),
  { ssr: false }
);

export default function EditorPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Solumind Page Editor</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <SolumindEditorComponent />
      </div>
    </div>
  );
}
`;

  fs.mkdirSync(path.dirname(pagePath), { recursive: true });
  fs.writeFileSync(pagePath, content);
  log(`${colors.green}Created example page at ${pagePath}${colors.reset}`);
}

// Create CSS module for editor
function createCssModule(cssPath) {
  // Create directory if it doesn't exist
  fs.mkdirSync(path.dirname(cssPath), { recursive: true });
  
  // Copy the CSS file
  const sourceCssPath = path.join(__dirname, '..', 'styles', 'editor.css');
  fs.copyFileSync(sourceCssPath, cssPath);
  
  log(`${colors.green}Created CSS module at ${cssPath}${colors.reset}`);
}

// Main installation function
async function install() {
  log(`\n${colors.bright}${colors.cyan}Solumind Editor Installation${colors.reset}\n`);
  
  if (!isNextJsProject()) {
    log(`${colors.red}This doesn't appear to be a Next.js project. The installation might not work correctly.${colors.reset}`);
    const proceed = await askQuestion('Do you want to continue anyway?');
    if (!proceed) {
      log(`${colors.yellow}Installation cancelled.${colors.reset}`);
      rl.close();
      return;
    }
  }
  
  // Ask for installation options
  const createExample = await askQuestion('Do you want to create an example component and page?');
  
  let componentPath = '';
  let pagePath = '';
  
  if (createExample) {
    componentPath = await askInput(
      'Path for the example component (relative to project root):',
      'src/components/SolumindEditorComponent.tsx'
    );
    
    pagePath = await askInput(
      'Path for the example page (relative to project root):',
      'src/app/admin/editor/page.tsx'
    );
  }
  
  // Ask if CSS should be imported
  const createCss = await askQuestion('Do you want to create a CSS module for the editor?');
  
  let cssPath = '';
  if (createCss) {
    cssPath = await askInput(
      'Path for the CSS module (relative to project root):',
      'src/styles/solumind-editor.css'
    );
  }
  
  log(`\n${colors.green}Starting installation...${colors.reset}\n`);
  
  // Install NPM package locally
  log(`${colors.yellow}Installing the editor package...${colors.reset}`);
  
  // Create symlink or copy library files
  const libPath = path.join(process.cwd(), 'node_modules', 'solumind-editor-js');
  if (pathExists(libPath)) {
    log(`${colors.yellow}Removing existing installation...${colors.reset}`);
    fs.rmSync(libPath, { recursive: true, force: true });
  }
  
  // Create directory
  fs.mkdirSync(libPath, { recursive: true });
  
  // Copy package files
  const sourceDir = path.join(__dirname, '..');
  const filesToCopy = [
    'dist',
    'package.json',
    'README.md'
  ];
  
  filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(libPath, file);
    
    if (pathExists(sourcePath)) {
      if (fs.lstatSync(sourcePath).isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        
        // Copy directory recursively
        fs.readdirSync(sourcePath).forEach(subFile => {
          const subSourcePath = path.join(sourcePath, subFile);
          const subDestPath = path.join(destPath, subFile);
          
          if (fs.lstatSync(subSourcePath).isDirectory()) {
            // Recursively copy subdirectory
            fs.mkdirSync(subDestPath, { recursive: true });
            fs.readdirSync(subSourcePath).forEach(subSubFile => {
              const subSubSourcePath = path.join(subSourcePath, subSubFile);
              const subSubDestPath = path.join(subDestPath, subSubFile);
              fs.copyFileSync(subSubSourcePath, subSubDestPath);
            });
          } else {
            // Copy file
            fs.copyFileSync(subSourcePath, subDestPath);
          }
        });
      } else {
        // Copy file
        fs.copyFileSync(sourcePath, destPath);
      }
    }
  });
  
  log(`${colors.green}Editor library installed successfully!${colors.reset}`);
  
  // Create example files if requested
  if (createExample) {
    log(`\n${colors.yellow}Creating example files...${colors.reset}`);
    createExampleComponent(path.join(process.cwd(), componentPath));
    createExamplePage(path.join(process.cwd(), pagePath));
  }
  
  // Create CSS module if requested
  if (createCss) {
    log(`\n${colors.yellow}Creating CSS module...${colors.reset}`);
    createCssModule(path.join(process.cwd(), cssPath));
    
    log(`\n${colors.yellow}Don't forget to import the CSS module in your app:${colors.reset}`);
    log(`import '${cssPath.replace(/\\/g, '/').replace(/^src\//, '@/')}'`, colors.green);
  }
  
  // Final instructions
  log(`\n${colors.bright}${colors.green}Installation completed successfully!${colors.reset}\n`);
  
  if (createExample) {
    log(`${colors.yellow}You can now access the editor at:${colors.reset}`);
    const basePathMatch = pagePath.match(/^src\/app\/(.*?)(\/page\.[jt]sx?)?$/);
    const basePath = basePathMatch ? basePathMatch[1] : pagePath;
    log(`http://localhost:3000/${basePath}`, colors.green);
  }
  
  log(`\n${colors.yellow}To use the editor in your own components:${colors.reset}`);
  log(`
import { SolumindEditor } from 'solumind-editor-js';

export default function MyComponent() {
  const [content, setContent] = useState({
    html: '<div>Hello World</div>',
    css: '',
    js: ''
  });

  return (
    <SolumindEditor
      value={content}
      onChange={(data) => setContent(data)}
      height="600px"
    />
  );
}`, colors.green);

  rl.close();
}

// Run the installation
install();
