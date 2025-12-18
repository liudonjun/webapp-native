<template>
  <div class="cart-page">
    <!-- 使用Vant NavBar -->
    <van-nav-bar title="购物车" fixed placeholder>
      <template #right>
        <van-button
          v-if="!cartStore.isEmpty"
          size="mini"
          type="danger"
          plain
          @click="handleClearCart"
        >
          清空
        </van-button>
      </template>
    </van-nav-bar>

    <div class="page-content">
      <!-- 空购物车 -->
      <van-empty
        v-if="cartStore.isEmpty"
        description="购物车是空的"
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      >
        <van-button type="primary" @click="goToHome">去逛逛</van-button>
      </van-empty>

      <!-- 购物车商品列表 -->
      <van-card
        v-for="item in cartStore.items"
        :key="item.id"
        :num="item.quantity"
        :price="item.price.toFixed(2)"
        :title="item.title"
        :thumb="item.image"
      >
        <template #footer>
          <van-stepper
            v-model="item.quantity"
            @change="(value) => handleQuantityChange(item.id, value)"
          />
          <van-button
            size="mini"
            type="danger"
            style="margin-left: 8px;"
            @click="handleRemoveItem(item.id)"
          >
            删除
          </van-button>
        </template>
      </van-card>

      <!-- 购物车结算栏 -->
      <van-submit-bar
        v-if="!cartStore.isEmpty"
        :price="cartStore.totalPrice * 100"
        button-text="结算"
        @submit="handleCheckout"
      >
        <template #tip>
          共 {{ cartStore.totalCount }} 件商品
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { showConfirmDialog, showSuccessToast } from 'vant';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const cartStore = useCartStore();

function goToHome() {
  router.push('/');
}

function handleQuantityChange(productId, quantity) {
  cartStore.updateQuantity(productId, quantity);
}

function handleRemoveItem(productId) {
  cartStore.removeItem(productId);
}

async function handleClearCart() {
  try {
    await showConfirmDialog({
      title: '确认清空',
      message: '确定要清空购物车吗？'
    });
    cartStore.clearCart();
    showSuccessToast('已清空购物车');
  } catch {
    // 用户取消
  }
}

function handleCheckout() {
  if (cartStore.isEmpty) {
    return;
  }
  showSuccessToast(`结算成功！共 ${cartStore.totalCount} 件商品，总价 ¥${cartStore.totalPrice.toFixed(2)}`);
  // 这里可以跳转到结算页面
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 100px;
}

.page-content {
  padding: 16px;
}
</style>
