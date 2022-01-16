<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onConfirm" />
    <!-- 导航栏 -->

    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field v-model.trim="localName" rows="2" autosize type="textarea" maxlength="7" placeholder="请输入昵称" show-word-limit />
    </div>
    <!-- 输入框 -->
  </div>
</template>

<script>
import { updateProfile } from '@/api/user'
export default {
  name: 'updateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (localName.length === '') {
          this.$toast.fail('请输入内容')
          return
        }
        await updateProfile({
          name: localName
        })
        this.$toast.success('更新成功')
        // 关闭试图
        this.$emit('close')
        // 更改数据
        this.$emit('input', localName)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less">
.update-name {
  .field-wrap {
    padding: 20px;
  }
}
</style>
