<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini" @click="isShowEdit = !isShowEdit">{{ isShowEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <!-- 频道内容 -->
    <van-grid class="my-grid" :gutter="10">
      <!-- 不可编辑的频道 -->
      <!-- 可编辑的频道 -->
      <van-grid-item v-for="(value, index) in channels" :key="value.id" class="grid-item" @click="delOrJump(value, index)">
        <!--------------------------------------------------------只有索引为0的才返回true  这里就需要一个布尔值   -->
        <van-icon slot="icon" name="clear" v-show="isShowEdit && !notAllowed.includes(value.id)"></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{ value.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道内容 -->
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item v-for="value in recommendChannels" :key="value.id" :text="value.name" icon="plus" class="grid-item" @click="onAddChannel(value)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/article.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有频道列表
      isShowEdit: false, // 是否显示编辑频道
      notAllowed: [0]
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((obj) => {
        return !this.channels.find((obj2) => {
          return obj.id === obj2.id
        })
      })
    },
    // 获取登陆状态
    ...mapState(['user'])
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    // 获取全部列表的回调
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        // console.log(data.data.channels)
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('获取全部列表失败')
      }
    },

    // 点击添加频道的回调
    async onAddChannel(channel) {
      // 告诉父组件channels增加channel
      // this.channels.push(channel)
      this.$emit('updateChannels', channel, true)
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录,保存到服务器
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.channels.length // 顺序序号
          })
        } catch (err) {
          console.log(err)
          this.$toast('保存数据失败,稍后重试')
        }
      } else {
        // 未登录,保存到本地
        setItem('TOUUTIAO_CHANNEL', this.channels)
      }
    },

    // 点击我的频道的item跳转或删除
    delOrJump(channel, index) {
      // 如果点击得是推荐(固定频道) 就不让他删除
      if (this.notAllowed.includes(channel.id)) {
        return
      }
      if (this.isShowEdit) {
        // 编辑状态 执行的是删除
        // 告诉父组件channels删除channel
        this.$emit('updateChannels', index, false)
        // this.channels.splice(index, 1)
        if (index < this.active) {
          this.$emit('updateActive', this.active - 1, true)
        }
        // 删除请求
        this.delChannel(channel.id)
      } else {
        // 非编辑状态 执行的是跳转
        this.$emit('updateActive', index, false)
      }
    },
    // 楼上删除channel的回调
    async delChannel(id) {
      // 已登录
      try {
        if (this.user) {
          await deleteUserChannel(id)
        } else {
          // 未登录,保存到本地
          setItem('TOUUTIAO_CHANNEL', this.channels)
        }
      } catch (err) {
        this.$toast('删除频道失败等会再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        font-size: 28px;
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
