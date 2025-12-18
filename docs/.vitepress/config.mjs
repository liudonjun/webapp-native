import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WebApp Native',
  description: 'Web应用转原生应用构建系统 - 支持Android和iOS，基于Capacitor',
  
  // 基础路径（如果部署到子路径）
  // base: '/build-apk/',
  
  // 主题配置
  themeConfig: {
    // 网站logo
    logo: '/logo.png',
    
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/quick-start' },
      { text: '配置指南', link: '/guide/env-config' },
      { text: '签名配置', link: '/guide/signing-setup' },
      { text: '常见问题', link: '/faq/' }
    ],
    
    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '环境要求', link: '/guide/requirements' }
          ]
        },
        {
          text: '配置指南',
          items: [
            { text: '环境变量配置', link: '/guide/env-config' },
            { text: '签名证书配置', link: '/guide/signing-setup' },
            { text: 'Java SDK设置', link: '/guide/java-setup' },
            { text: 'Gradle镜像配置', link: '/guide/gradle-mirror' }
          ]
        },
        {
          text: '高级配置',
          items: [
            { text: 'Gradle镜像备选方案', link: '/guide/gradle-mirror-alternatives' }
          ]
        }
      ],
      '/faq/': [
        {
          text: '常见问题',
          items: [
            { text: '常见问题首页', link: '/faq/' },
            { text: '环境配置问题', link: '/faq/#环境配置问题' },
            { text: '构建问题', link: '/faq/#构建问题' },
            { text: '签名问题', link: '/faq/#签名问题' },
            { text: '配置问题', link: '/faq/#配置问题' },
            { text: '测试问题', link: '/faq/#测试问题' },
            { text: '其他问题', link: '/faq/#其他问题' }
          ]
        }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liudonjun/webapp-native' }
    ],
    
    // 页脚
    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2025'
    },
    
    // 搜索
    search: {
      provider: 'local'
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/liudonjun/webapp-native/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    
    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    
    // 大纲
    outline: {
      level: [2, 3],
      label: '页面导航'
    }
  },
  
  // Markdown配置
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  
  // 构建配置
  build: {
    outDir: './dist'
  }
})
