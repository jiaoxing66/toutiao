import request from '@/utils/request.js'

// 获取文章列表
export const getArticles = (params) => request({ url: '/v1_0/articles', method: 'get', params })

// 获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 添加用户频道
export const addUserChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户频道 /v1_0/user/channels/:target
export const deleteUserChannel = (target) => request({ url: `/v1_0/user/channels/${target}`, method: 'delete' })

// 获取新闻详情   /v1_0/articles/:article_id GET
export const getArticleById = (id) => request({ url: `/v1_0/articles/${id}`, method: 'GET' })

// 关注用户  /v1_0/user/followings  post target
export const addFollow = (target) => request({ url: '/v1_0/user/followings', method: 'POST', data: { target } })

// 关注用户  /v1_0/user/followings  DELETE target
export const deleteFollow = (target) => request({ url: `/v1_0/user/followings/${target}`, method: 'DELETE' })

// 收藏文章  /v1_0/article/collections postt
export const addCollect = (target) => request({ url: '/v1_0/article/collections', method: 'POST', data: { target } })

// 取消收藏文章  /v1_0/article/collections/:target  DELETE target
export const deleteCollect = (target) => request({ url: `/v1_0/article/collections/${target}`, method: 'DELETE' })

// 点赞 /v1_0/article/likings POST
export const addLike = (target) => request({ url: '/v1_0/article/likings', method: 'POST', data: { target } })

// 取消点赞    DELETE target
export const deleteLike = (target) => request({ url: `/v1_0/article/likings/${target}`, method: 'DELETE' })
