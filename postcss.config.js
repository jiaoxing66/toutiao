module.exports = {
  plugins: {
    // Vue Cli 内部已经配置过这个了 所以这里有冲突了 注掉
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 配置使用 postcss-pxtorem 插件
      // 作用：把 px 转为 rem
      // eslint-disable-next-line space-before-function-paren
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // `propList` 用来设定可以从 px 转为 rem 的属性
      // 例如 `*` 就是所有属性都要转换，`width` 就是仅转换 `width` 属性
      propList: ['*'],
      // 排除markdown不转换格式
      exclude: 'github-markdown'
    }
  }
}
