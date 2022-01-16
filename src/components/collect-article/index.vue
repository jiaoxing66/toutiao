<template>
  <van-icon :loading="loading" :color="value ? '#ffa500' : '#777'" :name="value ? 'star' : 'star-o'" @click="changeCollect" />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      // 文章的articleId
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
    async changeCollect() {
      this.loading = true
      try {
        if (this.value) {
          // 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 新增收藏
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value) // 更新视图
        this.$toast.success(this.value ? '取消收藏成功' : '收藏成功')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
      this.loading = false
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less"></style>
