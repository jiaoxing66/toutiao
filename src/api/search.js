import request from '@/utils/request'
// import store from '@/store/index.js'

// 获取搜索联想建议  /v1_0/suggestion get query参数q
export const getSearchSuggestion = (q) => request({ url: '/v1_0/suggestion', method: 'get', params: { q } })

// 获取搜索结果  /v1_0/search
export const getSearchResult = (params) => request({ url: '/v1_0/search', method: 'get', params: params })
