<template>
  <van-button v-if="isFollowed" class="follow-btn" round size="small" :loading="followLoading" @click="careAbout">已关注</van-button>
  <van-button v-else class="follow-btn" type="info" :loading="followLoading" color="#3296fa" @click="careAbout" round size="small" icon="plus">关注</van-button>
</template>

<script>
import { deleteFollow, addFollow } from '@/api/article.js'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: {},
  data() {
    return {
      followLoading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 点击关注(取关)的请求
    async careAbout() {
      this.followLoading = true // 展示关注按钮的 loading 状态
      try {
        if (this.isFollowed) {
          // 已关注,则取关
          await deleteFollow(this.articleId)
        } else {
          // 否则,加关注
          await addFollow(this.articleId)
        }
        // 不管加关注还是取关,都需要给
        // 告诉父组件更改article的状态
        // this.article.is_followed = !this.article.is_followed
        // this.$emit('updateFollowedStatus', !this.isFollowed)
        this.$emit('update-is_followed', !this.isFollowed) // 更新视图状态
      } catch (err) {
        let msg = '操作失败,请重试'
        if (err.response && err.response.status === 400) {
          msg = '不能关注自己'
        }
        this.$toast(msg)
      }
      this.followLoading = false // 关闭关注按钮的 loading 状态
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less"></style>
