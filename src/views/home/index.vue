<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar bars" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道列表 -->
    <!-- 频道编辑 -->
    <van-popup v-model="isChannelEditShow" closeable close-icon-position="top-left" position="bottom" :style="{ height: '90%' }">
      <ChannelEdit :channels="channels" :active="active" @updateChannels="updateChannels" @updateActive="updateActive"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getChanenlList } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'HomeIndex',
  props: {},
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false // 这里我们先设置为 true 就能看到弹窗的页面了
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    async loadChannells() {
      try {
        if (this.user) {
          // 已登录
          const { data } = await getChanenlList()
          this.channels = data.data.channels
        } else {
          // 未登录
          // 1有数据
          if (getItem('TOUUTIAO_CHANNEL')) {
            this.channels = getItem('TOUUTIAO_CHANNEL')
          } else {
            // 2无数据
            const { data } = await getChanenlList()
            this.channels = data.data.channels
          }
        }
      } catch (err) {
        this.$toach.message('获取频道列表失败')
      }
    },
    // 子组件传来的自定义事件  active的值  非编辑状态
    updateActive(index, isChannelEditShow = true) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    },
    // 子组件传过来channels的增加与删除
    updateChannels(channelIndex, boolean) {
      if (boolean) {
        // 增加channel
        this.channels.push(channelIndex)
      } else {
        // 删除channel
        this.channels.splice(channelIndex, 1)
      }
    }
  },
  created() {
    this.loadChannells()
  },
  mounted() {}
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 87px;
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
  }
  .van-icon {
    color: #fff;
    font-size: 32px;
  }
  .van-tab__pane-wrapper {
    padding-top: 87px;
  }
  /deep/ .channel-tabs {
    .van-tab {
      display: fixed;
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      font-size: 30px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .van-tabs__wrap {
      position: fixed;
      z-index: 1;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
    .hamburger-btn:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
