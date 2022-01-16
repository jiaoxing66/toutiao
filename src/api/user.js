import request from '@/utils/request'
// import store from '@/store/index.js'

// 用户认证 (登陆注册)  /v1_0/authorizations post   code,mobile
export const login = (data) => request({ url: '/v1_0/authorizations', method: 'POST', data })

// 获取验证码  /v1_0/sms/codes/:mobile get mobile
export const sendSms = (mobile) => request({ url: `/v1_0/sms/codes/${mobile}`, method: 'GET' })

// 获取用户信息   /v1_0/user  -------注意：该接口需要授权才能访问---------------发送请求头数据------
export const getUserInfo = () => request({ url: '/v1_0/user', method: 'GET' })

// 获取频道列表数据  /v1_0/channels
export const getChanenlList = () => request({ url: '/v1_0/channels', method: 'GET' })

// 获取用户个人资料 /v1_0/user/profile  GET
export const getUserProfile = () => request({ url: '/v1_0/user/profile', method: 'GET' })

// 更新用户个人资料  /v1_0/user/profile  PATCH
export const updateProfile = (data) => request({ url: '/v1_0/user/profile', method: 'PATCH', data })

// 更新用户图象  /v1_0/user/photo  PATCH
export const updateUserPhoto = (data) => request({ url: '/v1_0/user/photo', method: 'PATCH', data })
