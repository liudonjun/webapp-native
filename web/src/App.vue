<template>
  <van-config-provider :theme="theme" :theme-vars="themeVars" theme-vars-scope="global">
    <div id="app">
      <!-- 主要内容区域 -->
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <!-- 底部导航栏 -->
      <BottomNav />
    </div>
  </van-config-provider>
</template>

<script setup>
import { computed, reactive, watch, onMounted } from 'vue';
import BottomNav from './components/BottomNav.vue';
import { useThemeStore } from './stores/theme';

const themeStore = useThemeStore();

// 将 isDarkMode 转换为 Vant 的 theme 格式
const theme = computed(() => {
  const themeValue = themeStore.isDarkMode ? 'dark' : 'light';
  return themeValue;
});

// 监听主题变化，输出调试信息
watch(() => themeStore.isDarkMode, (newValue) => {
  console.log('Theme store changed:', newValue);
  console.log('ConfigProvider theme will be:', newValue ? 'dark' : 'light');
}, { immediate: true });

// 自定义主题变量（可选）
const themeVars = reactive({
  // 可以在这里自定义主题变量
  // 例如：buttonPrimaryBackground: '#1989fa',
});

// 初始化应用
onMounted(() => {
  console.log('Vue App mounted');

  // 检查是否在原生环境中运行
  if (window.Capacitor) {
    console.log('Running on native platform');
  } else {
    console.log('Running on web platform');
  }

  // 禁止页面缩放（防止双指缩放等手势）
  preventZoom();
});

/**
 * 禁止页面缩放
 * 通过阻止触摸事件来防止双指缩放等手势
 */
function preventZoom() {
  let lastTouchEnd = 0;

  // 阻止双指缩放
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  // 阻止双击缩放
  document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // 阻止手势缩放
  document.addEventListener('gesturestart', (event) => {
    event.preventDefault();
  });

  document.addEventListener('gesturechange', (event) => {
    event.preventDefault();
  });

  document.addEventListener('gestureend', (event) => {
    event.preventDefault();
  });
}
</script>

<style>
/* 全局样式，不使用scoped */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
  /* 适配安全区域 - 顶部和底部 */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  /* 暗黑模式过渡动画 */
  transition: background-color 0.3s ease;
}

/* 暗黑模式样式 */
html.dark-mode #app {
  background: #1a1a1a;
}
</style>

<style scoped>
.main-content {
  flex: 1;
  padding-bottom: 60px;
  /* 为底部导航栏留出空间 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  /* 允许滚动但禁止缩放 */
  touch-action: pan-y;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
