<template>
  <van-icon :loading="loading" :color="value === 1 ? '#fd344b' : '#777'" :name="value === 1 ? 'good-job' : 'good-job-o'" @click="changeLike" />
</template>

<script>
import { addLike, deleteLike } from '@/api/article.js'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  components: {},
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async changeLike() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 取消点赞
          // console.log(0, this.articleId)
          await deleteLike(this.articleId)
        } else {
          // 新增点赞
          // console.log(1, this.articleId)
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞成功')
      } catch (err) {
        this.$toast.fail('操作失败,稍后再试')
      }
      this.loading = false
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less"></style>
