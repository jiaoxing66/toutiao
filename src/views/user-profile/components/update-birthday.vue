<template>
  <div class="update-birthday">
    <van-datetime-picker v-model="currentDate" type="date" title="选择出生日期" :min-date="minDate" :max-date="maxDate" @cancel="onCancel" @confirm="onConfirm" />
  </div>
</template>

<script>
import { updateProfile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'updateBirthday',
  props: {
    value: {
      typr: String,
      requird: true
    }
  },
  components: {},
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  methods: {
    onCancel() {
      this.$emit('close')
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        // dayjs的格式化时间
        const localDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateProfile({
          birthday: localDate
        })
        this.$toast.success('更新成功')
        // 关闭视图
        this.$emit('close')
        // 更改数据
        this.$emit('input', localDate)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less"></style>
