<template>
  <!-- immediate-check 是否在初始化时立即执行滚动位置检查,默认true -->
  <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
    <CommentItem v-for="(item, index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click', item)" />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
// 引入评论每一项
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator: function (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  components: { CommentItem },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null, // 数据页码戳
      limit: 10 // 每一页显示的数量,默认是10
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      try {
        // 1.发请求获取数据
        const { data } = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2.保存数据
        const { results } = data.data
        this.list.push(...results)
        this.$emit('onload-success', data.data) // 评论总数传到父组件
        // 3.将加载更多的 loading 改为false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          //   如果有更新获取下一页的页码
          this.offset = data.data.last_id
        } else {
          //   没有则关闭加载更多
          this.finished = true
        }
      } catch (err) {
        this.err = true
        this.loading = false
      }
    }
  },
  created() {
    this.loading = true // 手动的把加载中设置为true
    this.onLoad()
  },
  mounted() {}
}
</script>

<style scoped lang="less"></style>
