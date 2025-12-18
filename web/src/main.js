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

console.log('Vue App initialized');
