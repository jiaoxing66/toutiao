<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search fiexd @focus="isShowResult = false" v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" background="#3296fa" />
    </form>
    <SearchResult v-if="isShowResult" :searchText="searchText"></SearchResult>
    <SearchSuggestion v-else-if="searchText" :searchText="searchText" @onSearch="onSearch"></SearchSuggestion>
    <SearchHistory @goSearchHistory="goSearchHistory" @clearHistories="clearHistories" v-else :searchHistories="searchHistories"></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '', // 可以控制是否显示搜索建议|搜索历史
      isShowResult: false, // 是否显示搜索结果
      searchHistories: getItem('serach-histories') || [] // 搜索历史记录
    }
  },
  computed: {},
  watch: {
    searchHistories(newvalue) {
      setItem('serach-histories', newvalue)
    }
  },
  created() {},
  methods: {
    onSearch(val) {
      if (val) {
        this.searchText = val
        const index = this.searchHistories.indexOf(val)
        if (index !== -1) {
          this.searchHistories.splice(index, 1)
        }
        this.searchHistories.unshift(val)
        this.isShowResult = true
      } else {
        this.$toast('请输入搜索内容')
      }
    },
    onCancel() {
      this.$router.back()
    },
    // 清除历史记录
    clearHistories(item) {
      if (!item) {
        this.searchHistories = []
      } else {
        this.searchHistories.splice(item, 1)
      }
    },
    // 跳转到搜索记录这一项
    goSearchHistory(history) {
      this.searchText = history
      this.isShowResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 110px;
}
.van-search__action {
  color: #fff;
}
.search-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
