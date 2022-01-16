<template>
  <div class="update-avatar">
    <img :src="img" ref="img" />
    <div class="footbar">
      <div class="cancel" @click="$router.back()">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'updateAvatar',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  components: {},
  data() {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.loadUserPhoto(blob)
      })
    },
    // 楼上的上传图象
    async loadUserPhoto(blob) {
      try {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true,
          duration: 0
        })
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        // console.log(data)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-img', data.data.photo)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  },
  created() {},
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background-color: #000;
  height: 100%;
  img {
    display: block;
    max-width: 100%;
  }
  .footbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
