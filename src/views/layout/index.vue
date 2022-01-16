<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 标签导航栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/" class="layout-tabbar">
        <i slot="icon" class="toutiao toutiao-shouye"> </i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa" class="layout-tabbar">
        <i slot="icon" class="toutiao toutiao-wenda"> </i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video" class="layout-tabbar">
        <i slot="icon" class="toutiao toutiao-shipin"> </i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my" class="layout-tabbar">
        <i slot="icon" class="toutiao toutiao-wode"> </i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less">
.layout-container {
  padding-bottom: 100px;
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
