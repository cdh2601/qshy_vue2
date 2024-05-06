<template>
  <div class="commentBox">
    <h3>文章评论</h3>
    <p>评论出精彩，精彩源与你！</p>
    <div class="comment_issue">
      <el-input @click="VerifyingLogin(ref)" v-model="commentContent" maxlength="100"
                placeholder="留下你的精彩评论吧" :autosize="{ minRows: 4, maxRows: 6 }" show-word-limit type="textarea"
                style="margin-bottom: 10px;"/>
      <div style=" text-align:right">
        <button @click="submitAdd(0)">提交</button>
      </div>

    </div>
    <h3>最新评论</h3>
    <div>
      <CommentView ref="commentRef" :parentId="$props.routeId" type="Route"></CommentView>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import CommentView from "@/components/Front/OtherModules/commentItem";
import Axios from "@/utils/request";


export default {
  components: {
    CommentView
  },
  props: {
    routeInfo: Object,
    routeId: String
  },
  data() {
    // 评论表单获得焦点 校验是否登录
    const VerifyingLogin = (event) => {
      if (!this.tokenStr) {
        this.$confirm(
            '当前系统检测到您未登录，登录即可解锁更多精彩内容',
            '提示', {
              confirmButtonText: '前往登录',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(() => {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.path
            } // 登录成功后返回当前页面
          })
        })
      } else {
        this.state.readonly = false
      }
    }
    // 回复评论
    const reply = (id) => {
      // 判断是否登录，没有登录前往登录界面
      if (!this.tokenStr) {
        this.$confirm(
            '当前系统检测到您未登录，登录即可解锁更多精彩内容',
            '提示', {
              confirmButtonText: '前往登录',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(() => {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.path
            } // 登录成功后返回当前页面
          })
        })
      } else {
        // 关闭回复
        if (this.state.replyId === id) {
          this.state.replyId = false;
        }
        // 当前评论没有关闭又点击其他回复时
        else if (this.state.replyId !== id && this.state.replyId !== false) {
          this.state.replyId = id
        } else { // 为false时
          this.state.replyId = id
        }
      }
    }
    // 提交评论
    const submitAdd = (parentId) => {
      // 判断是否登录，没有登录前往登录界面
      if (!this.tokenStr) {
        this.$confirm(
            '当前系统检测到您未登录，登录即可解锁更多精彩内容',
            '提示', {
              confirmButtonText: '前往登录',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(() => {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.path
            } // 登录成功后返回当前页面
          })
        })
      } else {
        if (this.commentContent !== "") {
          const params = {
            // 评论用户id
            "userId": JSON.parse(sessionStorage.getItem("userInfo")).userId,
            // 评论内容
            "commentText": this.commentContent,
            // 父评论  没有为0
            "routeId": this.routeId
          }
          Axios.post("/comment/saveRouteComment",
              {}, {params}
          ).then(res => {
            if (parentId == 0) {
              // 正常评论
              this.state.commentContent = ""
            } else {
              // 回复
              this.state.replyIdContent = ""
              // 回复表单
              this.state.replyId = false
            }
            // 刷新评论数据
            // this.loadData();
            this.$refs.commentRef.getComments();
            this.$message({
              message: '评论成功',
              type: 'success',
            })
          })
        } else {
          this.$message.error('表达你的态度再评论吧')
        }

      }
    }
    // 回复评论
    const submitAdd2 = (parentId, replyContent) => {
      // 判断是否登录，没有登录前往登录界面
      if (!this.tokenStr) {
        this.$confirm(
            '当前系统检测到您未登录，登录即可解锁更多精彩内容',
            '提示', {
              confirmButtonText: '前往登录',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(() => {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.path
            } // 登录成功后返回当前页面
          })
        })
      } else {
        if (replyContent !== "") {
          const params = {
            // 当前文章id
            "articleId": this.articleId,
            // 评论用户id
            "userId": this.state.userInfo.userId,
            // 评论内容
            "commentText": this.replyIdContent,
            // 父评论  没有为0
            "strategyId": parentId
          }
          // console.log(params);
          Axios.get("/comment/insertCommentInfo",
              {params}
          ).then(res => {
            if (parentId == 0) {
              // 正常评论
              this.state.commentContent = ""
            } else {
              // 回复
              this.state.replyIdContent = ""
              // 回复表单
              this.state.replyId = false
            }
            // 刷新评论数据
            this.loadData();
            this.$message({
              message: '评论成功',
              type: 'success',
            })
          })
        } else {
          this.$message.error('表达你的态度再评论吧')
        }

      }
    }

    // 删除评论
    const deleteComment = (commentId) => {
      axios.delete("/comment/delete", {
        params: {
          commentId: commentId
        }
      }).then(res => { // 删除成功
        if (res.data.code == 0) {
          // 刷新评论数据
          // this.loadData();
          this.$refs.commentRef.getComments();
        } else {
          this.$message.error('删除失败')
        }

      })
    }
    return {
      commentRef: null,
      VerifyingLogin,
      reply,
      submitAdd,
      submitAdd2,
      deleteComment,
      tokenStr: sessionStorage.getItem("userInfo"),
      commentContent: "",
      loading: true,// 当前文章信息
      routeInfo: {},
      state: {
        // 当前文章对应的评论信息
        commentInfo: [],
        // 评论内容
        commentContent: "",
        // 回复内容
        replyIdContent: '',
        // 回复状态
        replyId: false,
        // 评论框 只读
        readonly: true,
        // 总评论数
        commentCount: '',
        // 登录信息
        userInfo: {},
        // 服务器路径
        url: process.env.VUE_APP_URL,
      }
    }
  },
  methods: {},
  mounted() {
    // this.loadData();
    // this.$refs.commentRef.getComments();
    // console.log("route", this.$props.routeId)
    if (this.tokenStr) {
      this.state.userInfo = JSON.parse(this.tokenStr).data[0]
    }
  },
  updated() {
    this.state.commentCount = document.querySelectorAll('.comment').length + document.querySelectorAll('.comment_child').length
  }


}
</script>

<style scoped>
.commentBox {
  height: auto;
  overflow: hidden;
  background-color: white;
  padding: 25px;
  color: #474749;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: -40px;
}

.commentBox > p {
  border-bottom: #dbdbdb 1px dashed;
  line-height: 30px;
  color: #888;
  font-size: 13px;
  padding-bottom: 5px;
  margin-bottom: 20px;
}

/* 评论区样式 */
.comment {
  /* width: 100%;
  float: left; */
  display: flex;
}

/* .comment_left {
    width: 40px;
    height: auto;
    margin-right: 10px;
} */

.comment_left > img {
  width: 40px;
  border-radius: 50px;
  object-fit: cover;
  overflow: hidden;
  margin-right: 10px;
}

.comment_right {
  /* width: 85%; */
  height: auto;
  /* float: left; */
  line-height: 25px;
}

.comment_name {
  color: #6F6F6F;
  font-size: 14px;
}

.comment_author {
  padding: 0 3px;
  background: rgb(184, 28, 34);
  color: white;
  margin-left: 5px;
  border-radius: 3px;
}

.comment_else {
  font-size: 14px;
  color: #b1b1b1;
  margin-bottom: 10px;
}

.comment_else span {
  margin-right: 15px;
  margin-right: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.comment_else span .el-icon {
  margin-right: 5px;
}

.comment_else .reply {
  color: #777777;
  cursor: pointer;
  font-size: 12px;
}

.comment_child_content {
  display: flex;
}

/* .comment_child_left {
    width: 30px;
    height: auto;
    margin-right: 8px;
} */

.comment_child_name {
  color: #6F6F6F;
  font-size: 13px;
}

.comment_child_left img {
  width: 40px;
  border-radius: 50px;
  object-fit: cover;
  overflow: hidden;
  margin-right: 10px;
}

.comment_child_right {
  /* width: 90%;
  height: auto;
  float: left; */
  height: auto;
  line-height: 25px;
}

button {
  height: 40px;
  width: 80px;
  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
  color: white;
  font-size: 15px;
  transition: 0.2s all;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}
</style>
