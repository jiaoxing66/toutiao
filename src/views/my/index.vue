<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header userInfo" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image round class="avatar" fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div>
          <van-button round size="mini" to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <van-row>
          <van-col class="data-item" span="6">
            <span class="count">{{ userInfo.art_count }}</span>
            <span class="text">头条</span>
          </van-col>
          <van-col class="data-item" span="6">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </van-col>
          <van-col class="data-item" span="6">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </van-col>
          <van-col class="data-item" span="6">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <img class="mobile-img" src="~@/assets/mobile.png" @click="$router.push('/login')" />
      <span class="text">登陆/注册 </span>
    </div>

    <!-- 收藏与历史 -->
    <van-grid :column-num="2" clickable class="grid-nav">
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 消息通知，小智同学，退出登录 -->
    <van-cell title="消息通知" class="msg" is-link />
    <van-cell title="小智同学" class="xiaozhi" is-link />
    <van-cell title="退出登录" class="logout" @click="onLogout" v-if="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  props: {},
  components: {},
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: '确认退出？'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消登陆')
        })
    },
    // 获取用户信息
    async loadGetUserInfo() {
      try {
        // console.log(this.user.token)
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
      }
    }
  },
  created() {
    if (this.user) {
      this.loadGetUserInfo()
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.my-container {
  // 未登录的样式
  .not-login {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  // 登录之后的样式
  .userInfo {
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    height: 361px;
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      // background-color: pink;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      // height: 130px;
      // background-color: lightcyan;
      .data-item {
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  // 收藏于历史
  .grid-nav {
    .grid-item {
      .toutiao-shoucang {
        font-size: 45px;
        color: #eb5253;
      }
      .toutiao-lishi {
        font-size: 45px;
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  // 消息通知，小智同学，退出登录
  .logout {
    text-align: center;
    color: #d86262;
    font-size: 30px;
  }
  .xiaozhi {
    margin-bottom: 9px;
    font-size: 30px;
  }
  .msg {
    margin-top: 9px;
    font-size: 30px;
  }
}
</style>
