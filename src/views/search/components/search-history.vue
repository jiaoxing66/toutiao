<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clearHistories')">全部删除&nbsp;&nbsp;</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell :title="item" v-for="(item, index) in searchHistories" :key="index" @click="goSearchHistory(item)">
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 跳转到指定的历史记录
    goSearchHistory(item) {
      if (!this.isDeleteShow) {
        this.$emit('goSearchHistory', item)
      } else {
        this.$emit('clearHistories', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
