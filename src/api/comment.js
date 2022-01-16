import request from '@/utils/request.js'

// 获取文章评论  /v1_0/comments GET
export const getComments = (params) => request({ url: '/v1_0/comments', method: 'GET', params })

// 对评论点赞  /v1_0/comment/likings POST target
export const addCommentLike = (target) => request({ url: '/v1_0/comment/likings', method: 'POST', data: { target } })

// 取消评论点赞  /v1_0/comment/likings/:target delete
export const delCommentLike = (target) => request({ url: `/v1_0/comment/likings/${target}`, method: 'delete' })

// 对文章评论   /v1_0/comments POST
export const addComment = (data) => request({ url: '/v1_0/comments', method: 'POST', data })
