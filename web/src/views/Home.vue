<template>
  <div class="home-page">
    <!-- 使用Vant NavBar -->
    <van-nav-bar title="首页" fixed placeholder />

    <div class="page-content">
      <!-- 使用Vant Card -->
      <van-card title="欢迎使用" desc="这是一个基于Vue 3 + Vant UI + Pinia的H5应用案例"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
        <template #tags>
          <van-tag type="primary">Vue 3</van-tag>
          <van-tag type="success">Vant UI</van-tag>
          <van-tag type="warning">Pinia</van-tag>
        </template>
      </van-card>

      <!-- 功能列表 -->
      <van-cell-group title="功能特性" inset>
        <van-cell v-for="(feature, index) in features" :key="index" :title="feature.text" :icon="feature.icon"
          is-link />
      </van-cell-group>

      <!-- Vant Cell 组件案例展示 -->
      <van-cell-group title="Cell 基础用法" inset style="margin-top: 16px;">
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>

      <van-cell-group title="Cell 展示图标" inset style="margin-top: 16px;">
        <van-cell title="单元格" icon="location-o" is-link />
        <van-cell title="单元格" icon="location-o" value="内容" is-link />
        <van-cell title="单元格" icon="location-o" label="描述信息" is-link />
      </van-cell-group>

      <van-cell-group title="Cell 只设置 value" inset style="margin-top: 16px;">
        <van-cell value="内容" />
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>

      <van-cell-group title="Cell 展示箭头" inset style="margin-top: 16px;">
        <van-cell title="单元格" is-link />
        <van-cell title="单元格" value="内容" is-link />
        <van-cell title="单元格" is-link arrow-direction="down" />
        <van-cell title="单元格" is-link arrow-direction="up" />
        <van-cell title="单元格" is-link arrow-direction="left" />
        <van-cell title="单元格" is-link arrow-direction="right" />
      </van-cell-group>

      <van-cell-group title="Cell 分组标题" inset style="margin-top: 16px;">
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" />
      </van-cell-group>

      <van-cell-group title="Cell 自定义内容" inset style="margin-top: 16px;">
        <van-cell value="内容" is-link>
          <template #title>
            <span>单元格</span>
            <van-tag type="danger">标签</van-tag>
          </template>
        </van-cell>
        <van-cell title="单元格" is-link>
          <template #value>
            <span>内容</span>
          </template>
        </van-cell>
        <van-cell title="单元格" label="描述信息" is-link>
          <template #icon>
            <van-icon name="shop-o" />
          </template>
          <template #right-icon>
            <van-icon name="search" />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="Cell 自定义大小" inset style="margin-top: 16px;">
        <van-cell title="单元格" value="内容" size="large" />
        <van-cell title="单元格" value="内容" size="large" label="描述信息" />
      </van-cell-group>

      <van-cell-group title="Cell 垂直居中" inset style="margin-top: 16px;">
        <van-cell title="单元格" value="内容" center />
        <van-cell title="单元格" value="内容" label="描述信息" center />
      </van-cell-group>

      <van-cell-group title="Cell 点击事件" inset style="margin-top: 16px;">
        <van-cell title="单元格" value="内容" is-link @click="handleCellClick('点击了单元格1')" />
        <van-cell title="单元格" value="内容" is-link @click="handleCellClick('点击了单元格2')" />
      </van-cell-group>

      <van-cell-group title="Cell 徽标提示" inset style="margin-top: 16px;">
        <van-cell title="单元格" value="内容">
          <template #right-icon>
            <van-badge dot />
          </template>
        </van-cell>
        <van-cell title="单元格" value="内容">
          <template #right-icon>
            <van-badge content="5" />
          </template>
        </van-cell>
        <van-cell title="单元格" value="内容">
          <template #right-icon>
            <van-badge content="99+" />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="Cell 表单类型" inset style="margin-top: 16px;">
        <van-cell title="输入框" is-link>
          <template #value>
            <van-field v-model="cellForm.input" placeholder="请输入" />
          </template>
        </van-cell>
        <van-cell title="开关" is-link>
          <template #value>
            <van-switch v-model="cellForm.switch" />
          </template>
        </van-cell>
        <van-cell title="步进器" is-link>
          <template #value>
            <van-stepper v-model="cellForm.stepper" />
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="Cell 自定义样式" inset style="margin-top: 16px;">
        <van-cell title="单元格" value="内容" title-style="color: #1989fa;" />
        <van-cell title="单元格" value="内容" value-class="custom-value" />
      </van-cell-group>

      <!-- 安全区域信息 -->
      <van-cell-group title="安全区域高度" inset style="margin-top: 16px;">
        <van-cell title="顶部安全区域" :value="`${safeArea.top}px`" />
        <van-cell title="底部安全区域" :value="`${safeArea.bottom}px`" />
        <van-cell title="左侧安全区域" :value="`${safeArea.left}px`" />
        <van-cell title="右侧安全区域" :value="`${safeArea.right}px`" />
        <van-cell title="屏幕宽度" :value="`${screenSize.width}px`" />
        <van-cell title="屏幕高度" :value="`${screenSize.height}px`" />
        <van-cell title="可视区域宽度" :value="`${screenSize.innerWidth}px`" />
        <van-cell title="可视区域高度" :value="`${screenSize.innerHeight}px`" />
      </van-cell-group>

      <!-- 商品列表示例 -->
      <van-cell-group title="推荐商品" inset style="margin-top: 16px;">
        <van-card v-for="product in products" :key="product.id" :num="cartStore.getItemQuantity(product.id)"
          :price="product.price" :title="product.title" :thumb="product.image" :origin-price="product.originPrice"
          @click-thumb="handleProductClick(product)">
          <template #footer>
            <van-button size="mini" type="primary" @click="handleAddToCart(product)">
              加入购物车
            </van-button>
          </template>
        </van-card>
      </van-cell-group>

      <van-barrage v-model="list">
        <div class="video" style="width: 100%; height: 150px"></div>
      </van-barrage>
      <van-space style="margin-top: 10px">
        <van-button @click="add" type="primary" size="small"> 弹幕 </van-button>
      </van-space>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { showToast, showSuccessToast } from 'vant';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

// Cell 表单数据
const cellForm = ref({
  input: '',
  switch: false,
  stepper: 1
});

const defaultList = [
  { id: 100, text: '轻量' },
  { id: 101, text: '可定制的' },
  { id: 102, text: '移动端' },
  { id: 103, text: 'Vue' },
  { id: 104, text: '组件库' },
  { id: 105, text: 'VantUI' },
  { id: 106, text: '666' },
];

const list = ref([...defaultList]);
const add = () => {
  list.value.push({ id: Math.random(), text: 'Barrage' });
};

// Cell 点击事件处理
function handleCellClick(message) {
  showToast(message);
}

// 安全区域数据
const safeArea = ref({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

// 屏幕尺寸数据
const screenSize = ref({
  width: 0,
  height: 0,
  innerWidth: 0,
  innerHeight: 0
});

/**
 * 获取安全区域高度
 * 通过创建临时元素并读取CSS环境变量的计算值
 */
function getSafeAreaInsets() {
  // 创建一个临时元素来获取安全区域的值
  const tempEl = document.createElement('div');
  tempEl.style.position = 'fixed';
  tempEl.style.visibility = 'hidden';
  tempEl.style.top = '0';
  tempEl.style.left = '0';
  tempEl.style.width = '1px';
  tempEl.style.height = '1px';
  tempEl.style.paddingTop = 'env(safe-area-inset-top)';
  tempEl.style.paddingBottom = 'env(safe-area-inset-bottom)';
  tempEl.style.paddingLeft = 'env(safe-area-inset-left)';
  tempEl.style.paddingRight = 'env(safe-area-inset-right)';

  document.body.appendChild(tempEl);

  const computedStyle = window.getComputedStyle(tempEl);

  // 获取计算后的padding值
  safeArea.value = {
    top: parseFloat(computedStyle.paddingTop) || 0,
    bottom: parseFloat(computedStyle.paddingBottom) || 0,
    left: parseFloat(computedStyle.paddingLeft) || 0,
    right: parseFloat(computedStyle.paddingRight) || 0
  };

  // 移除临时元素
  document.body.removeChild(tempEl);
}

/**
 * 获取屏幕尺寸
 */
function getScreenSize() {
  screenSize.value = {
    width: window.screen.width,
    height: window.screen.height,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  };
}

/**
 * 更新安全区域和屏幕尺寸
 */
function updateSafeArea() {
  getSafeAreaInsets();
  getScreenSize();
}

// 监听窗口大小变化
let resizeTimer = null;
function handleResize() {
  // 防抖处理
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(() => {
    updateSafeArea();
  }, 100);
}

onMounted(() => {
  // 初始化时获取一次
  updateSafeArea();

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
});

onUnmounted(() => {
  // 清理事件监听
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('orientationchange', handleResize);
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
});

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
  transition: background-color 0.3s ease;
}

/* 暗黑模式样式 */
html.dark-mode .home-page {
  background: #1a1a1a;
}

/* 顶部导航栏适配安全区域 */
:deep(.van-nav-bar) {
  padding-top: env(safe-area-inset-top);
}

.page-content {
  padding: 16px;
}

/* Cell 自定义样式 */
:deep(.custom-value) {
  color: #1989fa;
  font-weight: bold;
}
</style>
