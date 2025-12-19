#!/usr/bin/env node

/**
 * iOS构建脚本
 * 功能：
 * 1. 验证iOS项目存在
 * 2. 更新iOS配置（Info.plist等）
 * 3. 执行CocoaPods安装
 * 4. 使用xcodebuild构建IPA
 * 5. 复制IPA到输出目录
 * 
 * 注意：此脚本需要在macOS系统上运行，且需要安装Xcode
 */

// 加载环境变量
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const config = require('../build.config.js');

console.log('🍎 开始构建iOS应用...\n');

// 检查是否在macOS上运行
function checkPlatform() {
  if (os.platform() !== 'darwin') {
    throw new Error('iOS构建只能在macOS系统上运行');
  }
  console.log('✅ 平台检查通过: macOS');
}

// 验证iOS项目存在
function validateIOSProject() {
  const iosDir = path.join(__dirname, '..', 'ios');
  
  if (!fs.existsSync(iosDir)) {
    throw new Error('iOS目录不存在，请先运行 npm run init');
  }
  
  const xcodeProjectPath = path.join(iosDir, 'App', 'App.xcodeproj');
  if (!fs.existsSync(xcodeProjectPath)) {
    throw new Error('iOS项目不完整，请先运行 npm run sync');
  }
  
  console.log('✅ iOS项目验证通过');
}

// 检查Xcode是否安装
function checkXcode() {
  try {
    execSync('xcodebuild -version', { stdio: 'pipe' });
    console.log('✅ Xcode已安装');
  } catch (error) {
    throw new Error('未找到Xcode，请先安装Xcode和Command Line Tools');
  }
}

// 检查CocoaPods是否安装
function checkCocoaPods() {
  try {
    execSync('pod --version', { stdio: 'pipe' });
    console.log('✅ CocoaPods已安装');
  } catch (error) {
    console.warn('⚠️  CocoaPods未安装，正在尝试安装...');
    console.warn('   如果安装失败，请手动运行: sudo gem install cocoapods');
    try {
      execSync('sudo gem install cocoapods', { stdio: 'inherit' });
      console.log('✅ CocoaPods安装成功');
    } catch (installError) {
      throw new Error('CocoaPods安装失败，请手动安装: sudo gem install cocoapods');
    }
  }
}

// 更新iOS配置
function updateIOSConfig() {
  const iosDir = path.join(__dirname, '..', 'ios');
  const infoPlistPath = path.join(iosDir, 'App', 'App', 'Info.plist');
  
  if (!fs.existsSync(infoPlistPath)) {
    console.warn('⚠️  无法找到Info.plist，跳过配置更新');
    return;
  }
  
  try {
    // 读取Info.plist（XML格式）
    let infoPlistContent = fs.readFileSync(infoPlistPath, 'utf8');
    
    // 更新应用名称（CFBundleDisplayName）
    if (infoPlistContent.includes('<key>CFBundleDisplayName</key>')) {
      infoPlistContent = infoPlistContent.replace(
        /<key>CFBundleDisplayName<\/key>\s*<string>[^<]+<\/string>/,
        `<key>CFBundleDisplayName</key>\n\t<string>${config.appName}</string>`
      );
    } else {
      // 如果不存在，在CFBundleName之后添加
      infoPlistContent = infoPlistContent.replace(
        /(<key>CFBundleName<\/key>\s*<string>[^<]+<\/string>)/,
        `$1\n\t<key>CFBundleDisplayName</key>\n\t<string>${config.appName}</string>`
      );
    }
    
    // 更新Bundle Identifier（CFBundleIdentifier）
    if (infoPlistContent.includes('<key>CFBundleIdentifier</key>')) {
      infoPlistContent = infoPlistContent.replace(
        /<key>CFBundleIdentifier<\/key>\s*<string>[^<]+<\/string>/,
        `<key>CFBundleIdentifier</key>\n\t<string>${config.appId}</string>`
      );
    }
    
    // 更新版本号（CFBundleShortVersionString）
    if (config.version && infoPlistContent.includes('<key>CFBundleShortVersionString</key>')) {
      infoPlistContent = infoPlistContent.replace(
        /<key>CFBundleShortVersionString<\/key>\s*<string>[^<]+<\/string>/,
        `<key>CFBundleShortVersionString</key>\n\t<string>${config.version}</string>`
      );
    }
    
    fs.writeFileSync(infoPlistPath, infoPlistContent);
    console.log(`✅ iOS配置已更新: appName=${config.appName}, appId=${config.appId}`);
    
  } catch (error) {
    console.warn(`⚠️  更新iOS配置失败: ${error.message}`);
  }
}

// 更新Xcode项目配置
function updateXcodeProject() {
  const iosDir = path.join(__dirname, '..', 'ios');
  const projectPbxprojPath = path.join(iosDir, 'App', 'App.xcodeproj', 'project.pbxproj');
  
  if (!fs.existsSync(projectPbxprojPath)) {
    console.warn('⚠️  无法找到project.pbxproj，跳过项目配置更新');
    return;
  }
  
  try {
    let projectContent = fs.readFileSync(projectPbxprojPath, 'utf8');
    
    // 更新PRODUCT_BUNDLE_IDENTIFIER
    projectContent = projectContent.replace(
      /PRODUCT_BUNDLE_IDENTIFIER = [^;]+;/g,
      `PRODUCT_BUNDLE_IDENTIFIER = ${config.appId};`
    );
    
    // 更新MARKETING_VERSION（版本号）
    if (config.version) {
      projectContent = projectContent.replace(
        /MARKETING_VERSION = [^;]+;/g,
        `MARKETING_VERSION = ${config.version};`
      );
    }
    
    fs.writeFileSync(projectPbxprojPath, projectContent);
    console.log('✅ Xcode项目配置已更新');
    
  } catch (error) {
    console.warn(`⚠️  更新Xcode项目配置失败: ${error.message}`);
  }
}

// 安装CocoaPods依赖
function installPods() {
  const iosDir = path.join(__dirname, '..', 'ios');
  const podfilePath = path.join(iosDir, 'App', 'Podfile');
  
  if (!fs.existsSync(podfilePath)) {
    console.warn('⚠️  Podfile不存在，跳过CocoaPods安装');
    return;
  }
  
  console.log('📦 安装CocoaPods依赖...');
  
  try {
    execSync('pod install', {
      stdio: 'inherit',
      cwd: path.join(iosDir, 'App')
    });
    console.log('✅ CocoaPods依赖安装完成');
  } catch (error) {
    throw new Error(`CocoaPods安装失败: ${error.message}`);
  }
}

// 构建IPA
function buildIPA() {
  const iosDir = path.join(__dirname, '..', 'ios');
  const workspacePath = path.join(iosDir, 'App', 'App.xcworkspace');
  const scheme = 'App';
  const buildType = config.buildMode === 'release' ? 'Release' : 'Debug';
  const configuration = buildType;
  
  // 检查是否存在workspace（使用CocoaPods后会生成）
  const useWorkspace = fs.existsSync(workspacePath);
  const projectPath = useWorkspace 
    ? workspacePath 
    : path.join(iosDir, 'App', 'App.xcodeproj');
  
  console.log(`🔨 执行Xcode构建 (${buildType})...`);
  console.log(`   项目路径: ${projectPath}`);
  console.log(`   使用Workspace: ${useWorkspace}`);
  
  // 创建构建输出目录
  const buildDir = path.join(iosDir, 'build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  try {
    // 清理之前的构建
    console.log('🧹 清理之前的构建...');
    const cleanCommand = useWorkspace
      ? `xcodebuild clean -workspace "${workspacePath}" -scheme "${scheme}" -configuration "${configuration}"`
      : `xcodebuild clean -project "${projectPath}" -scheme "${scheme}" -configuration "${configuration}"`;
    
    execSync(cleanCommand, {
      stdio: 'inherit',
      cwd: iosDir
    });
    
    // 构建应用
    console.log(`📦 执行构建命令...`);
    const buildCommand = useWorkspace
      ? `xcodebuild build -workspace "${workspacePath}" -scheme "${scheme}" -configuration "${configuration}" -derivedDataPath "${buildDir}" CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO`
      : `xcodebuild build -project "${projectPath}" -scheme "${scheme}" -configuration "${configuration}" -derivedDataPath "${buildDir}" CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO`;
    
    execSync(buildCommand, {
      stdio: 'inherit',
      cwd: iosDir
    });
    
    console.log(`✅ Xcode构建完成 (${buildType})`);
    
    // 查找生成的.app文件
    const appPath = findAppFile(buildDir, scheme);
    if (!appPath) {
      throw new Error('未找到生成的.app文件');
    }
    
    return appPath;
    
  } catch (error) {
    throw new Error(`Xcode构建失败: ${error.message}`);
  }
}

// 查找生成的.app文件
function findAppFile(buildDir, scheme) {
  // 在DerivedData目录中查找.app文件
  const derivedDataPath = path.join(buildDir, 'Build', 'Products', `${config.buildMode === 'release' ? 'Release' : 'Debug'}-iphoneos`);
  
  if (fs.existsSync(derivedDataPath)) {
    const files = fs.readdirSync(derivedDataPath);
    const appFile = files.find(file => file.endsWith('.app'));
    if (appFile) {
      return path.join(derivedDataPath, appFile);
    }
  }
  
  // 尝试其他可能的路径
  const possiblePaths = [
    path.join(buildDir, 'Build', 'Products', 'Debug-iphoneos', `${scheme}.app`),
    path.join(buildDir, 'Build', 'Products', 'Release-iphoneos', `${scheme}.app`),
  ];
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }
  
  return null;
}

// 创建IPA文件（可选，需要签名）
function createIPA(appPath) {
  // 注意：创建IPA需要代码签名，这通常需要：
  // 1. Apple Developer账号
  // 2. 有效的Provisioning Profile
  // 3. 代码签名证书
  // 
  // 对于开发阶段，我们只构建.app文件
  // 如果需要创建IPA，可以使用以下命令：
  // xcrun -sdk iphoneos PackageApplication -v "${appPath}" -o "${ipaPath}"
  
  console.log('ℹ️  注意：创建IPA需要代码签名');
  console.log('   当前只构建了.app文件，如需创建IPA，请：');
  console.log('   1. 在Xcode中配置签名证书和Provisioning Profile');
  console.log('   2. 使用Xcode的Archive功能导出IPA');
  console.log('   或使用xcodebuild archive和export命令');
  
  return null;
}

// 复制.app到输出目录
function copyApp(appPath) {
  const outputDir = path.join(__dirname, '..', config.outputDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const appName = path.basename(appPath);
  const destPath = path.join(outputDir, appName);
  
  // 如果目标已存在，先删除
  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true });
  }
  
  // 复制整个.app目录
  fs.cpSync(appPath, destPath, { recursive: true });
  
  console.log(`✅ 复制.app文件: ${appName}`);
  
  // 显示文件大小
  const stats = fs.statSync(destPath);
  const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`   文件大小: ${sizeInMB} MB`);
  
  console.log(`\n✅ .app文件已复制到: ${config.outputDir}`);
  console.log(`\n📝 提示：`);
  console.log(`   - 可以使用Xcode打开项目进行进一步配置和签名`);
  console.log(`   - 或使用Xcode的Archive功能导出IPA文件`);
}

// 主函数
function main() {
  try {
    checkPlatform();
    validateIOSProject();
    checkXcode();
    checkCocoaPods();
    updateIOSConfig();
    updateXcodeProject();
    installPods();
    const appPath = buildIPA();
    copyApp(appPath);
    
    console.log('\n✅ iOS构建流程完成！');
    console.log(`\n📦 输出文件位置: ${path.join(__dirname, '..', config.outputDir)}`);
    console.log('\n💡 下一步：');
    console.log('   1. 在Xcode中打开 ios/App/App.xcworkspace');
    console.log('   2. 配置签名证书和Provisioning Profile');
    console.log('   3. 使用Archive功能导出IPA文件');
  } catch (error) {
    console.error('\n❌ 构建失败:', error.message);
    console.error('\n提示:');
    console.error('1. 确保在macOS系统上运行');
    console.error('2. 确保已安装Xcode和Command Line Tools');
    console.error('3. 确保已安装CocoaPods: sudo gem install cocoapods');
    console.error('4. 确保已运行 npm run init 初始化iOS项目');
    console.error('5. 确保已运行 npm run sync 同步Web资源');
    process.exit(1);
  }
}

main();
