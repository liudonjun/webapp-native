<template>
  <!-- 使用Vant Tabbar -->
  <van-tabbar v-model="active" fixed placeholder @change="handleTabChange">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
    <van-tabbar-item
      icon="shopping-cart-o"
      to="/cart"
      :badge="cartStore.totalCount > 0 ? cartStore.totalCount : ''"
    >
      购物车
    </van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const cartStore = useCartStore();

// 根据当前路由设置激活的tab
const active = computed({
  get: () => {
    const path = route.path;
    if (path === '/') return 0;
    if (path === '/category') return 1;
    if (path === '/cart') return 2;
    if (path === '/profile') return 3;
    return 0;
  },
  set: () => {
    // Tabbar会自动处理路由跳转
  }
});

function handleTabChange(index) {
  console.log('Tab changed to:', index);
}
</script>

<style scoped>
/* Vant Tabbar 自带样式，无需额外样式 */
</style>
