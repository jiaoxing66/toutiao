<template>
  <div class="article-list">
    <van-pull-refresh success-duration="1500" :success-text="refreshSuccessText" v-model="refreshing" @refresh="onRefresh">
      <van-list :error.sync="error" error-text="请求失败，点击重新加载" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title" /> -->
        <ArticleItem v-for="(article, index) in list" :key="index" :article="article"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      required: true,
      type: Object
    }
  },
  components: { ArticleItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pre_timestamp: null, // 用来存储最新的时间戳
      error: false, // 获取请求失败的信息
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      // 1. 请求获取数据
      // 3. 本次数据加载结束之后要把加载状态设置为结束
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.pre_timestamp || Date.now()
        })
        const { results } = data.data
        // 2. 把请求结果数据放到 list 数组中
        this.list.push(...results) // 数组的展开运算符，他会把数组一个一个拿出来
        // 3. 设置本次加载中 loading 状态结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          this.pre_timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.pre_timestamp || Date.now()
        })
        const { results } = data.data
        // 2. 把请求结果数据放到 list 数组中
        this.list.unshift(...results)
        if (results.length) {
          this.pre_timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
        // 关闭下拉刷新的 loading 状态
        this.refreshing = false
        this.refreshSuccessText = `成功更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '没有最新内容了'
        this.refreshing = false // 关闭下拉刷新的 loading 状态
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
