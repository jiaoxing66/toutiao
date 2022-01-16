<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <i slot="left" class="toutiao toutiao-guanbi" @click="$router.back()"></i>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登陆表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field :rules="userFormRules.mobile" name="mobile" placeholder="请输入手机号" v-model="user.mobile">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field :rules="userFormRules.code" name="code" placeholder="请输入验证码" v-model="user.code">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 发送验证码的btn -->
        <template #button>
          <van-count-down @finish="isCountDownShow = false" class="send-sms-count" :time="1000 * 60" format="ss s" v-if="isCountDownShow" />
          <van-button v-else class="send-sms-btn" round size="small" native-type="button" @click="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button block type="info" class="login-btn" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginPage',
  props: {},
  components: {},
  data() {
    return {
      user: {
        mobile: '18392466569', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [
          // 手机号校验
          { required: true, message: '手机号不能为空', trigger: 'onChange' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'onChange' },
          { pattern: /^\d{6}$/, message: '验证码错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 表单提交 用户点登陆的回调
    async onSubmit(values) {
      // TODO: 1.表单验证
      this.$toast.loading({
        // 发请求之前的提示
        message: '登陆中...',
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 持续时间一直持续
      })
      // 2.发请求
      try {
        const { data } = await login(this.user)
        // console.log('成功结果', res)
        this.$toast.success('登陆成功')
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('登陆失败,手机号或验证码错误')
        }
      }
      // 3.根据请求做下一步处理
    },
    // 点击发验证码的回调
    async onSendSms() {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('验证码发送成功注意查收')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .send-sms-count {
    width: 160px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-radius: 23px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
