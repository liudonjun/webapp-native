<template>
  <div class="home-page">
    <!-- 使用Vant NavBar -->
    <van-nav-bar title="首页" fixed placeholder />

    <div class="page-content">
      <!-- 使用Vant Card -->
      <van-card
        title="欢迎使用"
        desc="这是一个基于Vue 3 + Vant UI + Pinia的H5应用案例"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      >
        <template #tags>
          <van-tag type="primary">Vue 3</van-tag>
          <van-tag type="success">Vant UI</van-tag>
          <van-tag type="warning">Pinia</van-tag>
        </template>
      </van-card>

      <!-- 功能列表 -->
      <van-cell-group title="功能特性" inset>
        <van-cell
          v-for="(feature, index) in features"
          :key="index"
          :title="feature.text"
          :icon="feature.icon"
          is-link
        />
      </van-cell-group>

      <!-- 商品列表示例 -->
      <van-cell-group title="推荐商品" inset style="margin-top: 16px;">
        <van-card
          v-for="product in products"
          :key="product.id"
          :num="cartStore.getItemQuantity(product.id)"
          :price="product.price"
          :title="product.title"
          :thumb="product.image"
          :origin-price="product.originPrice"
          @click-thumb="handleProductClick(product)"
        >
          <template #footer>
            <van-button
              size="mini"
              type="primary"
              @click="handleAddToCart(product)"
            >
              加入购物车
            </van-button>
          </template>
        </van-card>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast, showSuccessToast } from 'vant';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const features = ref([
  { icon: 'shop-o', text: 'Vue 3 Composition API' },
  { icon: 'shop-o', text: 'Vant UI 组件库' },
  { icon: 'shop-o', text: 'Pinia 状态管理' },
  { icon: 'shop-o', text: 'Vue Router 路由' },
  { icon: 'shop-o', text: '移动端适配' }
]);

const products = ref([
  {
    id: 1,
    title: '商品名称1',
    price: '99.00',
    originPrice: '199.00',
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    id: 2,
    title: '商品名称2',
    price: '199.00',
    originPrice: '299.00',
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  {
    id: 3,
    title: '商品名称3',
    price: '299.00',
    originPrice: '399.00',
    image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  }
]);

function handleProductClick(product) {
  showToast(`点击了商品：${product.title}`);
}

function handleAddToCart(product) {
  cartStore.addItem({
    id: product.id,
    title: product.title,
    price: parseFloat(product.price),
    image: product.image
  });
  showSuccessToast('已加入购物车');
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 60px;
}

.page-content {
  padding: 16px;
}
</style>
