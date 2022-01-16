<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(text, index) in suggestions" :key="index" @click="$emit('onSearch', text)">
      <div slot="title" v-html="highLight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [] // 搜索建议
    }
  },
  computed: {},
  watch: {
    // 监听搜索内容的变化
    searchText: {
      // 防抖 import { debounce } from 'lodash'
      handler: debounce(function (value) {
        this.loadSearchSuggestion(value)
      }, 200),
      // handler(value) {
      //   this.loadSearchSuggestion(value)
      // },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 获取搜索建议
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(MediaQueryListEvent)
        this.suggestions = data.data.options ? ['hello', 'helloaaa', 'helloworld', 'hello测试高亮', 'helloworld这是测试数据', 'helloworld因为后台没有返回数据', 'hello所以写的假数据', 'hello接口有返回数据则不显示这个,自动的'] : data.data.options
      } catch (err) {
        this.$toast('获取搜索建议失败')
      }
    },
    // 处理高亮
    highLight(text) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span class='active'>${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/.active {
    color: red;
  }
}
</style>
