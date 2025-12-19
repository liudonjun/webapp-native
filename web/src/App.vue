<template>
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
</template>

<script setup>
import { onMounted } from 'vue';
import BottomNav from './components/BottomNav.vue';

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

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
}

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
