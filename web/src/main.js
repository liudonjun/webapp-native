/**
 * 应用入口文件
 * 功能：
 * - 初始化Vue应用
 * - 配置路由
 * - 集成Pinia状态管理
 * - 集成Vant UI组件库
 * - 监听设备就绪事件（Capacitor）
 */

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';

// 引入Vant样式
import 'vant/lib/index.css';

// 导入页面组件
import Home from './views/Home.vue';
import Category from './views/Category.vue';
import Cart from './views/Cart.vue';
import Profile from './views/Profile.vue';

// 配置路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { title: '分类' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: '购物车' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { title: '我的' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 创建Vue应用
const app = createApp(App);

// 创建Pinia实例
const pinia = createPinia();

// 使用Pinia
app.use(pinia);

// 使用路由
app.use(router);

// 挂载应用
app.mount('#app');

// 初始化主题（在应用挂载后立即初始化，确保DOM已准备好）
import { useThemeStore } from './stores/theme';
const themeStore = useThemeStore();
themeStore.initTheme();

// 隐藏Loading/Splash Screen - 在应用完全加载后隐藏，防止首屏闪屏
// 使用setTimeout确保Vue应用已经完全渲染
setTimeout(() => {
  const loadingElement = document.getElementById('app-loading');
  if (loadingElement) {
    loadingElement.classList.add('hidden');
    // 在动画完成后移除元素，释放内存
    setTimeout(() => {
      if (loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
      }
    }, 300); // 等待transition动画完成（0.3s）
  }
}, 100); // 给Vue应用100ms的渲染时间

console.log('Vue App initialized');
