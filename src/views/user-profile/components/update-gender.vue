<template>
  <div class="update-gender">
    <van-picker title="性别" show-toolbar :columns="columns" :default-index="value" @confirm="onConfirm" @cancel="onCancel" @change="onChange" />
  </div>
</template>

<script>
import { updateProfile } from '@/api/user.js'
export default {
  name: 'updateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  components: {},
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
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
        const localGender = this.localGender
        await updateProfile({
          gender: localGender
        })
        this.$toast.success('更新成功')
        // 关闭试图
        this.$emit('close')
        // 更改数据
        this.$emit('input', localGender)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange(picker, value, index) {
      this.localGender = index
    },
    onCancel() {
      this.$emit('close')
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less"></style>
