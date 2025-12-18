/**
 * 用户状态管理 Store
 * 使用Pinia管理用户相关状态
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  // 状态
  const userInfo = ref({
    id: null,
    name: '游客',
    avatar: '',
    phone: '',
    email: ''
  });

  const isLoggedIn = ref(false);

  // 计算属性
  const displayName = computed(() => {
    return userInfo.value.name || '游客';
  });

  // 方法
  function login(userData) {
    userInfo.value = {
      ...userInfo.value,
      ...userData
    };
    isLoggedIn.value = true;
  }

  function logout() {
    userInfo.value = {
      id: null,
      name: '游客',
      avatar: '',
      phone: '',
      email: ''
    };
    isLoggedIn.value = false;
  }

  function updateUserInfo(data) {
    userInfo.value = {
      ...userInfo.value,
      ...data
    };
  }

  return {
    // 状态
    userInfo,
    isLoggedIn,
    // 计算属性
    displayName,
    // 方法
    login,
    logout,
    updateUserInfo
  };
});

