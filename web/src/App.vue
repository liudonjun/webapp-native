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
});
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
  padding-bottom: 60px; /* 为底部导航栏留出空间 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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

