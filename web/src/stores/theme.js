/**
 * 主题状态管理 Store
 * 使用Pinia管理暗黑模式等主题相关状态
 */

import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // 暗黑模式状态
  const isDarkMode = ref(false);

  /**
   * 初始化主题
   * 从localStorage读取保存的主题设置，如果没有则使用系统偏好
   */
  function initTheme() {
    // 从localStorage读取
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark';
    } else {
      // 使用系统偏好
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkMode.value = true;
      }
    }

    // 应用主题
    applyTheme();
  }

  /**
   * 切换暗黑模式
   */
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    applyTheme();
    // 保存到localStorage
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  }

  /**
   * 设置暗黑模式
   * @param {boolean} dark - 是否为暗黑模式
   */
  function setDarkMode(dark) {
    isDarkMode.value = dark;
    applyTheme();
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  /**
   * 应用主题到DOM
   * 同时支持自定义的 dark-mode 类和 Vant 的 ConfigProvider theme
   */
  function applyTheme() {
    const html = document.documentElement;
    const body = document.body;

    if (isDarkMode.value) {
      html.classList.add('dark-mode');
      html.setAttribute('data-theme', 'dark');
      body.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
      html.setAttribute('data-theme', 'light');
      body.classList.remove('dark-mode');
    }

    // 调试日志
    console.log('Theme applied:', isDarkMode.value ? 'dark' : 'light');
    console.log('HTML classes:', html.className);
  }

  // 监听系统主题变化（可选）
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // 只有在没有手动设置主题时才跟随系统
      if (!localStorage.getItem('theme')) {
        isDarkMode.value = e.matches;
        applyTheme();
      }
    });
  }

  return {
    // 状态
    isDarkMode,
    // 计算属性：获取 Vant theme 格式
    get theme() {
      return isDarkMode.value ? 'dark' : 'light';
    },
    // 方法
    initTheme,
    toggleDarkMode,
    setDarkMode
  };
});
