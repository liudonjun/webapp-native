<template>
  <div class="profile-page">
    <!-- 使用Vant NavBar -->
    <van-nav-bar title="我的" fixed placeholder />

    <div class="page-content">
      <!-- 用户信息卡片 -->
      <van-cell-group inset>
        <van-cell
          :title="userStore.displayName"
          :label="userStore.isLoggedIn ? '已登录' : '未登录'"
          :icon="userStore.isLoggedIn ? 'user-circle-o' : 'contact'"
          is-link
          @click="handleUserInfo"
        >
          <template #right-icon>
            <van-image
              v-if="userStore.userInfo.avatar"
              :src="userStore.userInfo.avatar"
              round
              width="40"
              height="40"
            />
            <van-icon v-else name="contact" size="40" />
          </template>
        </van-cell>
      </van-cell-group>

      <!-- 功能菜单 -->
      <van-cell-group title="我的服务" inset style="margin-top: 16px;">
        <van-cell
          v-for="(item, index) in menuItems"
          :key="index"
          :title="item.text"
          :icon="item.icon"
          is-link
          @click="handleMenuClick(item)"
        />
      </van-cell-group>

      <!-- 操作按钮 -->
      <div style="padding: 16px;">
        <van-button
          v-if="userStore.isLoggedIn"
          type="danger"
          block
          @click="handleLogout"
        >
          退出登录
        </van-button>
        <van-button
          v-else
          type="primary"
          block
          @click="handleLogin"
        >
          登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast, showSuccessToast, showDialog } from 'vant';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const menuItems = ref([
  { icon: 'orders-o', text: '我的订单', path: '/orders' },
  { icon: 'star-o', text: '我的收藏', path: '/favorites' },
  { icon: 'location-o', text: '收货地址', path: '/address' },
  { icon: 'setting-o', text: '设置', path: '/settings' },
  { icon: 'service-o', text: '客服中心', path: '/service' }
]);

function handleUserInfo() {
  if (userStore.isLoggedIn) {
    showDialog({
      title: '用户信息',
      message: `用户名：${userStore.userInfo.name}\n手机：${userStore.userInfo.phone || '未绑定'}\n邮箱：${userStore.userInfo.email || '未绑定'}`
    });
  } else {
    handleLogin();
  }
}

function handleMenuClick(item) {
  showToast(`点击了：${item.text}`);
  // 这里可以跳转到对应页面
}

function handleLogin() {
  // 模拟登录
  userStore.login({
    id: 1,
    name: '测试用户',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    phone: '138****8888',
    email: 'test@example.com'
  });
  showSuccessToast('登录成功');
}

async function handleLogout() {
  try {
    await showDialog({
      title: '确认退出',
      message: '确定要退出登录吗？'
    });
    userStore.logout();
    showSuccessToast('已退出登录');
  } catch {
    // 用户取消
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 60px;
}

.page-content {
  padding: 16px;
}
</style>
