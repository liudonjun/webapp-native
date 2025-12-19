#!/usr/bin/env node

/**
 * 项目初始化脚本
 * 功能：
 * 1. 检测前端框架类型（React/Vue/Angular/Vanilla）
 * 2. 初始化Capacitor配置
 * 3. 创建Android和iOS项目结构
 * 4. 配置构建环境
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = require('../build.config.js');
const capacitorConfigPath = path.join(__dirname, '..', 'capacitor.config.json');

console.log('🚀 开始初始化项目...\n');

// 1. 检测前端框架类型
function detectFramework() {
  const webDir = path.join(__dirname, '..', 'web');
  
  if (!fs.existsSync(webDir)) {
    console.log('⚠️  web目录不存在，将创建基础结构');
    return 'vanilla';
  }
  
  const packageJsonPath = path.join(webDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return 'vanilla';
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    if (dependencies.react) {
      return 'react';
    } else if (dependencies.vue) {
      return 'vue';
    } else if (dependencies['@angular/core']) {
      return 'angular';
    }
  } catch (error) {
    console.log('⚠️  无法读取package.json，使用默认配置');
  }
  
  return 'vanilla';
}

// 2. 更新Capacitor配置
function updateCapacitorConfig() {
  try {
    const capacitorConfig = JSON.parse(fs.readFileSync(capacitorConfigPath, 'utf8'));
    
    capacitorConfig.appId = config.appId;
    capacitorConfig.appName = config.appName;
    capacitorConfig.webDir = config.webDir;
    
    fs.writeFileSync(capacitorConfigPath, JSON.stringify(capacitorConfig, null, 2));
    console.log('✅ Capacitor配置已更新');
  } catch (error) {
    console.error('❌ 更新Capacitor配置失败:', error.message);
    process.exit(1);
  }
}

// 3. 初始化Capacitor
function initCapacitor() {
  try {
    console.log('📦 初始化Capacitor...');
    
    // 检查是否已安装Capacitor CLI
    try {
      execSync('npx cap --version', { stdio: 'ignore' });
    } catch (error) {
      console.log('📥 安装Capacitor CLI...');
      execSync('npm install @capacitor/cli --save-dev', { stdio: 'inherit' });
    }
    
    // 添加Android平台
    if (!fs.existsSync(path.join(__dirname, '..', 'android'))) {
      console.log('📱 添加Android平台...');
      execSync('npx cap add android', { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
    } else {
      console.log('✅ Android平台已存在');
    }
    
    // 添加iOS平台
    if (!fs.existsSync(path.join(__dirname, '..', 'ios'))) {
      console.log('🍎 添加iOS平台...');
      try {
        execSync('npx cap add ios', { 
          stdio: 'inherit',
          cwd: path.join(__dirname, '..')
        });
      } catch (error) {
        console.warn('⚠️  iOS平台添加失败（可能需要在macOS上运行）:', error.message);
        console.warn('   如果需要在iOS上构建，请确保：');
        console.warn('   1. 在macOS系统上运行');
        console.warn('   2. 已安装Xcode');
        console.warn('   3. 已安装CocoaPods: sudo gem install cocoapods');
      }
    } else {
      console.log('✅ iOS平台已存在');
    }
    
    console.log('✅ Capacitor初始化完成');
  } catch (error) {
    console.error('❌ Capacitor初始化失败:', error.message);
    process.exit(1);
  }
}

// 4. 创建必要的目录结构
function createDirectories() {
  const dirs = [
    path.join(__dirname, '..', 'web', 'src'),
    path.join(__dirname, '..', 'web', 'public'),
    path.join(__dirname, '..', 'build'),
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ 创建目录: ${path.relative(__dirname + '/..', dir)}`);
    }
  });
}

// 5. 创建基础web项目文件（如果不存在）
function createWebProject(framework) {
  const webDir = path.join(__dirname, '..', 'web');
  
  if (!fs.existsSync(webDir)) {
    fs.mkdirSync(webDir, { recursive: true });
  }
  
  const packageJsonPath = path.join(webDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('📝 创建基础web项目配置...');
    
    const basePackageJson = {
      name: 'web',
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      }
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(basePackageJson, null, 2));
    console.log('✅ 创建web/package.json');
  }
  
  // 创建基础HTML文件
  const indexHtmlPath = path.join(webDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${config.appName}</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(indexHtmlPath, htmlContent);
    console.log('✅ 创建web/index.html');
  }
  
  // 创建基础JS文件
  const srcDir = path.join(webDir, 'src');
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  
  const mainJsPath = path.join(srcDir, 'main.js');
  if (!fs.existsSync(mainJsPath)) {
    const jsContent = `// 应用入口文件
console.log('App started');

// 监听设备就绪事件（Capacitor）
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
});

// 如果使用Capacitor，可以导入Capacitor核心
// import { Capacitor } from '@capacitor/core';
// if (Capacitor.isNativePlatform()) {
//   console.log('Running on native platform');
// }
`;
    
    fs.writeFileSync(mainJsPath, jsContent);
    console.log('✅ 创建web/src/main.js');
  }
}

// 主函数
function main() {
  const framework = detectFramework();
  console.log(`📦 检测到前端框架: ${framework}\n`);
  
  createDirectories();
  createWebProject(framework);
  updateCapacitorConfig();
  initCapacitor();
  
  console.log('\n✅ 项目初始化完成！');
  console.log('\n下一步：');
  console.log('1. 在 web/ 目录下开发你的H5项目');
  console.log('2. 运行 npm run build:apk 构建Android APK');
  console.log('3. 运行 npm run build:ipa 构建iOS IPA（需要macOS和Xcode）');
}

main();

