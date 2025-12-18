/**
 * 购物车状态管理 Store
 * 使用Pinia管理购物车相关状态
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // 购物车商品列表
  const items = ref([]);

  // 计算属性
  const totalCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  const isEmpty = computed(() => {
    return items.value.length === 0;
  });

  // 方法
  function addItem(product) {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({
        ...product,
        quantity: 1
      });
    }
  }

  function removeItem(productId) {
    const index = items.value.findIndex(item => item.id === productId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  function clearCart() {
    items.value = [];
  }

  function getItemQuantity(productId) {
    const item = items.value.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  return {
    // 状态
    items,
    // 计算属性
    totalCount,
    totalPrice,
    isEmpty,
    // 方法
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity
  };
});

