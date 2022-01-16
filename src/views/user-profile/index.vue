<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 导航栏 -->

    <!-- 单元格 -->
    <!-- 图象 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 图象 -->
    <van-cell title="图象" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isUpdateNameShow = true" />
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" @click="isUpdateGenderShow = true" />
    <van-cell title="生日" is-link :value="user.birthday" @click="isUpdateBirthdayShow = true" />
    <!-- 单元格 -->

    <!-- 弹出层 -->
    <!-- 图象 -->
    <van-popup v-model="isUpdatePhotoShow" position="bottom" :style="{ height: '100%' }">
      <updateAvatar v-if="isUpdatePhotoShow" :img="img" @update-img="user.photo = $event" @close="isUpdatePhotoShow = false"></updateAvatar>
    </van-popup>
    <!-- 昵称 -->
    <van-popup v-model="isUpdateNameShow" position="bottom" :style="{ height: '100%' }">
      <updateName v-if="isUpdateNameShow" @close="isUpdateNameShow = false" class="field" v-model="user.name"></updateName>
    </van-popup>
    <!-- 性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <updateGender v-if="isUpdateGenderShow" @close="isUpdateGenderShow = false" v-model="user.gender"></updateGender>
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <updateBirthday v-if="isUpdateBirthdayShow" @close="isUpdateBirthdayShow = false" v-model="user.birthday"></updateBirthday>
    </van-popup>
    <!-- 弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
// 引入更新昵称的组件
import updateName from './components/update-name.vue'
// 引入更新性别的组件
import updateGender from './components/update-gender.vue'
// 引入生日的组件
import updateBirthday from './components/update-birthday.vue'
// 引入图象的组件
import updateAvatar from './components/update-avatar.vue'
export default {
  name: 'UserProfile',
  props: {},
  components: { updateName, updateGender, updateBirthday, updateAvatar },
  data() {
    return {
      user: {}, // 用户个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast.fail('获取用户信息失败')
      }
    },
    // 图象输入框发生改变
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file) // 给文件创建一个 url 地址
      this.isUpdatePhotoShow = true // 打开弹出层
      this.$refs.file.value = '' // 每一次发生改变的最后都把 file 的值清空(避免下次选择相同图片弹出层不跳出来)
    }
  },
  created() {
    this.loadUserProfile()
  },
  mounted() {}
}
</script>

<style scoped lang="less">
.user-profile {
  /deep/.van-nav-bar .van-icon {
    color: #fff;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
