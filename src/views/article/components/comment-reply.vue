<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <CommentItem :comment="comment"></CommentItem>
      <!-- /当前评论项 -->

      <van-cell title="所有回复" />

      <!-- 评论的回复列表 -->
      <CommentList :source="comment.com_id" type="c" :list="commentList"></CommentList>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="btn-wrap">
      <van-button size="small" round class="write-btn" @click="isReplyShow = true">写评论</van-button>
    </div>
    <!-- /底部 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <Comment-post :id="comment.com_id" @postSuccess="commentSuccess"></Comment-post>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './article-comment.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, CommentPost },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isReplyShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 评论发布成功的回调,子组件传过来的数据
    commentSuccess(data) {
      this.isReplyShow = false // 关闭弹出层
      // 总数量+1
      this.comment.reply_count++
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar .van-icon {
  color: #1989fa !important;
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.btn-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
