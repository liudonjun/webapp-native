<template>
  <div class="category-page">
    <!-- 使用Vant NavBar -->
    <van-nav-bar title="分类" fixed placeholder />

    <div class="page-content">
      <!-- 使用Vant Grid -->
      <van-grid :column-num="4" :gutter="10">
        <van-grid-item
          v-for="(category, index) in categories"
          :key="index"
          :icon="category.icon"
          :text="category.name"
          @click="handleCategoryClick(category)"
        />
      </van-grid>

      <!-- 分类商品列表 -->
      <van-cell-group title="热门分类" inset style="margin-top: 16px;">
        <van-cell
          v-for="(item, index) in categoryList"
          :key="index"
          :title="item.name"
          :label="item.desc"
          :value="item.count + '件商品'"
          is-link
          @click="handleCategorySelect(item)"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const categories = ref([
  { icon: 'phone-o', name: '手机数码' },
  { icon: 'laptop-o', name: '电脑办公' },
  { icon: 'shopping-bag-o', name: '服装鞋帽' },
  { icon: 'fire-o', name: '食品生鲜' },
  { icon: 'home-o', name: '家居家装' },
  { icon: 'car-o', name: '汽车用品' },
  { icon: 'game-o', name: '游戏娱乐' },
  { icon: 'book-o', name: '图书文娱' }
]);

const categoryList = ref([
  { name: '手机数码', desc: '最新款手机、数码配件', count: 128 },
  { name: '电脑办公', desc: '笔记本、台式机、办公用品', count: 256 },
  { name: '服装鞋帽', desc: '时尚潮流、品质保证', count: 512 },
  { name: '食品生鲜', desc: '新鲜直达、健康美味', count: 384 }
]);

function handleCategoryClick(category) {
  showToast(`点击了：${category.name}`);
}

function handleCategorySelect(item) {
  showToast(`选择了：${item.name}`);
}
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 60px;
}

.page-content {
  padding: 16px;
}
</style>
