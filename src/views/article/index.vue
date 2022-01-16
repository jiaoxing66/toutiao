<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-text="返回" left-arrow title="黑马头条" @click-left="onClickLeft"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" ref="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
          <!-- 关注按钮的子组件 -->
          <FollowUser v-model="article.is_followed" :articleId="article.aut_id"></FollowUser>
          <!-- <FollowUser :isFollowed="article.is_followed" :articleId="article.aut_id" @updateFollowedStatus="updateFollowedStatus"></FollowUser> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <CommentList :list="commentList" :source="article.art_id" @onload-success="totalCommentCount = $event.total_count" @reply-click="replyClick"></CommentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="isPostShow = true">写评论</van-button>
          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
          <!-- 收藏的子组件 -->
          <CollectArticle v-model="article.is_collected" :articleId="article.art_id"></CollectArticle>
          <!-- 点赞的子组件 -->
          <LikeArticle v-model="article.attitude" :articleId="article.art_id"></LikeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost :id="article.art_id" @postSuccess="commentSuccess"></CommentPost>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论的回复弹出层 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply v-if="isReplyShow" :comment="commentReply" @commentReply="addcommentReply" @click-close="isReplyShow = false"></CommentReply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
// 引入关注按钮的组件
import FollowUser from '@/components/followUser'
// 引入搜藏的组件
import CollectArticle from '@/components/collect-article'
// 引入点赞组件
import LikeArticle from '@/components/like-article'
// 引入评论的组件
import CommentList from './components/article-comment'
// 文章评论的弹出框
import CommentPost from './components/comment-post.vue'
// 评论的回复
import CommentReply from './components/comment-reply.vue'

export default {
  name: 'ArticleIndex',
  components: { FollowUser, CollectArticle, LikeArticle, CommentList, CommentPost, CommentReply },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data() {
    return {
      article: {}, // 后台获取到的文章详情
      loading: true,
      status: 0, // 获取文章的状态码
      totalCommentCount: 0,
      isPostShow: false,
      commentList: [], // 评论列表
      isReplyShow: false, // 评论的回复
      commentReply: {} // 评论的回复
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticleInfo()
  },
  mounted() {},
  methods: {
    // 获取文章数据
    async loadArticleInfo() {
      const data = await getArticleById(this.articleId)
      if (data.status === 200) {
        this.article = data.data.data
        // this.$nextTick(function () { // 这个获取不到节点
        //   console.log(this.$refs['article-detail'])
        // })
        setTimeout(() => {
          // console.log(this.$refs['article-detail'])
          this.previewImg()
        }, 0)
      } else if (data.status === 404) {
        this.status = 404 // 文章不存在
      } else {
        this.status = 507 // 服务器数据库异常
      }
      this.loading = false
    },
    // 左侧返回
    onClickLeft() {
      this.$router.back()
    },
    // 楼上获取到文章之后里面的图片的预览
    previewImg() {
      const dom = this.$refs['article-detail']
      const imgs = dom.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        // c点击当前图时,放大该图片,并顺序排列其他所有图
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    // 子组件传过来的更改followed状态
    updateFollowedStatus(boolean) {
      this.article.is_followed = boolean
    },
    // 评论发布成功的回调,子组件传过来的数据
    commentSuccess(data) {
      this.isPostShow = false // 关闭弹出层
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    },
    // 对评论的回复
    replyClick(comment) {
      this.commentReply = comment
      this.isReplyShow = true
    },
    // 评论的回复的评论
    addcommentReply(a) {
      // console.log(a)
      this.commentReply.unshift(a)
    }
  }
}
</script>

<style scoped lang="less">
@import url('./github-markdown.css');
.article-container {
  /deep/.van-nav-bar .van-icon {
    color: #fff;
  }
  /deep/.van-nav-bar__text {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
