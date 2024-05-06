<template>
  <div class="comment" v-loading="loading" style="width: 100%;z-index:1">
    <div
        v-if="viewPort === true"
        style="width: 150px; height: 40px; margin: 13vh auto"
    >
      <div style="font-size: 10px">
        <button class="sample" @click="goLogin">
          请登录后查看
        </button>
      </div>
    </div>
    <div v-else style="width: 100%">
      <div
          class="comment-body"
          v-for="(item, index) in comments"
          :key="item.commentId + '' + index"
      >
        <!-- 一级评论 -->
        <div class="first-comment">
          <!-- 一级评论用户昵头像 -->
          <div class="userInfo">
            <el-avatar
                :size="40"
                :src="item.avatar"
                style="width: 50px; height: 50px"
            ></el-avatar>
            <h3>{{ item.userName }}</h3>
          </div>
          <div class="content">
            <!-- 一级评论用户评分 -->
            <div v-if="item.score" style="display: flex; flex-direction: row">
              <div class="score">
                <el-rate v-model="item.score" disabled text-color="#ff9900">
                </el-rate>
                <div class="score-text">
                  <span>评分:{{ item.score }}分</span>
                </div>
              </div>
            </div>
            <p style="margin: 0;">{{ item.text }}</p>
            <div v-if="item.imgs.length > 0">
              <el-image
                  v-for="(img, index) in item.imgs"
                  :key="item.commentId + 'img' + index"
                  :src="img"
                  style="width: 150px; height: 150px;margin-left: 20px"
                  fit="cover"
              ></el-image>
            </div>
            <!-- 一级评论发布时间 -->
            <span>{{ formatTime(item.commentTime) }}</span>
            <el-button
                style="margin-left: 10px"
                type="text"
                @click="showSubComments(index)"
            >
              {{ item.subText }}
            </el-button>
            <!-- 一级评论评论内容 -->
            <!-- 一级评论评论点赞 -->
            <div class="comment-right">
              <i
                  class="el-icon-trophy underline"
                  @click="giveALike(item, item.commentId)"
                  :class="item.favour.includes(userId) ? 'active' : ''"
              ></i>

              {{ item.favour.length || 0 }}
              <i
                  class="el-icon-chat-dot-round"
                  @click="isShowSecReply(item.commentId)"
              ><span class="colorUnder">回复</span>
              </i>
              <i
                  class="el-icon-delete"
                  @click="deleteComment(item.commentId, undefined)"
                  v-if="userId === item.userId"
              ><span class="redUnder">删除</span>
              </i>
            </div>
            <!-- 回复一级评论 -->
            <div class="reply-comment" v-show="isShowSec === item.commentId">
              <el-input
                  :placeholder="placeholderText"
                  class="input"
                  v-model.trim="replyContext"
                  :maxlength="contentLength"
              ></el-input>
              <button class="replyButton" @click="addComment(item.commentId)">
                回复
              </button>
            </div>
            <!-- 次级评论 -->
            <div v-if="item.showSub">
              <!--            <div v-for="(reply,index) in item.children" :key="reply.commentId + '' + index">-->
              <!--              {{ reply.userName }}-->
              <!--            </div>-->
              <div
                  class="second-comment"
                  v-for="(reply, index) in item.children"
                  :key="reply.commentId + '' + index"
              >
                <!-- 次级评论头像,该用户没有头像则显示默认头像 -->
                <el-avatar :size="40" :src="reply.avatar"></el-avatar>
                <div class="content">
                  <!-- 次级评论用户昵称 -->
                  <h3 style="margin: 0;">{{ reply.userName }}</h3>
                  <!-- 次级评论评论时间 -->
                  <span>{{ formatTime(reply.commentTime) }}</span>
                  <!-- 景区得分 -->
                  <!-- <div class="score">
                    <el-rate v-model="value2" :colors="colors"> </el-rate>
                    <div class="score-text">
                      <span>评分:4.9分</span>
                    </div>
                  </div> -->
                  <span class="to_reply" style="margin-left: 10px">{{
                      reply.userName
                    }}</span>
                  <span class="colorUnder">回复</span>
                  <span class="to_reply">{{ item.userName }}</span
                  >:
                  <p>{{ reply.text }}</p>
                  <!--                次级评论评论点赞-->
                  <div class="comment-right">
                    <i
                        class="el-icon-delete"
                        @click="deleteComment(item.commentId, reply.commentId)"
                        v-if="userId === reply.userId"
                    >删除</i
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 暂无评论的空状态 -->
      <el-empty
          :description="emptyText"
          v-show="comments.length === 0"
      ></el-empty>
    </div>
  </div>
</template>

<script>
import {formatTime} from "@/utils/formatTime";
import Axios from "@/utils/request";
import ImageList from "@/components/Front/Main/Detail/ImageList/ImageList";

export default {
  name: "commentView",
  components: {ImageList},
  props: {
    parentId: String,
    type: String,
    articleId: {
      //评论所属文章 id
      type: String,
    },
    emptyText: {
      // 评论为空的时候显示的文字
      type: String,
      default: "期待你的评论！",
    },
    buttonText: {
      // 按钮文字
      type: String,
      default: "评论",
    },
    contentLength: {
      // 评论长度
      type: Number,
      default: 150,
    },
    placeholderText: {
      // 默认显示文字
      type: String,
      default: "请输入最多150字的评论...",
    },
  },
  data() {
    return {
      value2: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      viewPort: false,
      loading: true,
      context: "", // 评论内容
      comments: [], // 获取得到的评论
      showSub: false,
      subText: "查看回复",
      replyContext: "", //一级评论回复
      isShowSec: "", //是否显示次级回复框
      isClickId: "", //记录点击回复的评论id
      userId: "",
      username: "",
      firstIdx: 1,
      secIdx: 1,
      avatarUrl:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    };
  },
  created() {
    // 获取评论数据
    // this.getCommentList();
    // console.log("初始化评论", this.$props.comments)
    // this.comments = this.$props.comments
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.path
        }
      })
    },
    // 唤起文件选择
    handleClick() {
      this.$refs.avatar.click();
    },
    // 获取本篇文章所有评论
    // 评论点赞
    giveALike(item, commentId) {
      try {
        // 不允许同一个人重复点赞
        if (item.favour?.includes(this.userId)) {
          this.$message.info("您已经点过赞啦！");
          return;
        }
        this.giveCommentLike(commentId);
        item.favour.push(this.userId);
      } catch (err) {
        this.$message.error(err);
      }
    },
    giveCommentLike(commentId) {
      //景点点赞
      Axios.get("/comment/like", {
        params: {
          commentId: commentId,
          userId: this.userId,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log("点赞评论", res);
        if (res.code === 200) {
          // this.comments = res.data.comments
        }
      });
    },
    isShowSecReply(id) {
      if (id) {
        this.isShowSec = id;
        if (this.isClickId === this.isShowSec) {
          this.isShowSec = "";
        } else {
          this.isShowSec = id;
        }
        this.isClickId = this.isShowSec;
      } else {
        this.isShowSec = this.isClickId = "";
      }
    },
    deleteComment(_id, replyId) {
      if (replyId) {
        // 删除二级评论，提交请求到后端
        Axios.get("/comment/delChildComment", {
          params: {
            commentId: replyId,
            parentId: _id,
            type: this.$props.type,
            articleId: this.parentId
          }
        }).then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.comments = res.data.comments
          }
        })
        // 成功后从本地记录中删除该评论

      } else {

        // 删除一级评论，提交请求到后端
        // console.log("token", localStorage.getItem("token"))
        Axios.get("/comment/del" + this.$props.type + "Comment", {
          params: {
            commentId: _id,
            parentId: this.parentId,
            type: this.$props.type
          }
        }).then((res) => {
          // console.log("delSC", res)
          if (res.code === 200) {
            this.comments = res.data.comments
          }
        })

        // 成功后从本地记录中删除该评论
        for (let i = 0; i < this.comments.length; i++) {
          if (this.comments[i].commentId === _id) {
            this.comments.splice(i, 1);
          }
        }
      }
    },
    async addComment(id) {
      //对一级评论添加回复
      //只有文本
      Axios.post(
          "/comment/subComment",
          {},
          {
            params: {
              parentId: id,
              text: this.replyContext,
              userId: this.userId,
              parentType: this.$props.type,
              typedId: this.$props.parentId,
            },
            headers: {
              token: localStorage.getItem("token"),
            },
          }
      ).then((res) => {
        if (res.code === 200) {
          // console.log("回复返回", res);
          this.comments = res.data.comments;
        }
      });
      this.isShowSec = this.isClickId = "";
    },
    formatTime,
    getComments() {
      // console.log(":gett ", this.$props.parentId)
      let params = {"articleId": this.$props.parentId};
      Axios.get("/comment/get" + this.$props.type + "Comments", {
        params,
      }).then((res) => {
        this.loading = false
        // console.log(res);
        this.comments = res.data.comments;
      });
    },
    showSubComments(index) {
      if (this.comments[index].subText === "查看回复") {
        this.comments[index].showSub = true;
        this.comments[index].subText = "收起回复";
      } else {
        this.comments[index].showSub = false;
        this.comments[index].subText = "查看回复";
      }
    },
  },
  mounted() {
    this.getComments();
    const userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) {
      // 登录验证
      this.viewPort = true;
    } else {
      this.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId; // 浏览器指纹
      this.userName = JSON.parse(sessionStorage.getItem("userInfo")).userName; //你的用户名
      this.viewPort = false;
      // console.log(this.userId)
    }
  },
  computed: {
    showComment: function () {
      return this.comments.filter(function (item) {
        return item.showSub;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sample {
  width: 150px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  color: white;
  text-align: center;
  //padding: 10px;
  position: absolute;
}

.sample.active {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
  color: #fff;
}

.sample:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
  cursor: pointer;
}

.comment {
  min-height: 26vh;
  border-radius: 5px;
  margin-top: 2px;
  overflow: hidden;

  // .colorUnder {
  // color: rgb(184, 28, 34);
  // }
  .colorUnder:hover {
    color: rgb(184, 28, 34);
    border-bottom: 1px solid rgb(184, 28, 34);
  }

  .underline:hover {
    border-bottom: 1px solid rgb(184, 28, 34);
  }

  .redUnder {
    color: black;
  }

  .redUnder:hover {
    color: rgb(202, 4, 4);
    border-bottom: 1px solid rgb(202, 4, 4);
  }

  .active {
    color: rgb(202, 4, 4);
  }

  .commentButton {
    font-size: 20px;
    background-color: rgb(184, 28, 34);
    border: 1px solid rgb(184, 28, 34);
    color: white;
    transition: 0.2s all linear;
    cursor: pointer;
    border-radius: 2px;
    padding: 7px 20px;
    margin-left: 100px;
  }

  .commentButton:hover {
    background: rgb(138 21 25);
    border: 1px solid rgb(138 21 25);
  }

  .replyButton {
    font-size: 15px;
    background-color: rgb(184, 28, 34);
    border: 1px solid rgb(184, 28, 34);
    color: white;
    transition: 0.2s all linear;
    cursor: pointer;
    border-radius: 2px;
    padding: 5px 10px;
    width: 70px;
    height: 40px;
    // margin-left: 200px;
  }

  .replyButton:hover {
    background: rgb(138 21 25);
    border: 1px solid rgb(138 21 25);
  }

  .comment-header {
    position: relative;
    height: 50px;
    padding: 20px 5px 40px 5px;
    display: flex;
    align-items: end;
    justify-content: end;
    border-bottom: 1px dashed rgb(184, 28, 34);

    .input {
      margin-left: 10px;
      margin-right: 20px;
      flex: 1;

      /deep/ .el-input__inner:focus {
        border-color: #dcdfe6;
      }
    }
  }

  .score {
    /* margin: 5px; */
    display: flex;
    align-items: center;
  }

  .score .score-text {
    margin-left: 10px;
    font-size: 15px;
    /* width: 80px;
  height: 25px; */
    padding: 5px 10px;
    background-color: rgb(184, 28, 34);
    color: white;
    text-align: center;
    border-radius: 10px;

  }

  .comment-body {
    min-height: 70px;
    padding: 20px 20px;
    font-size: 14px;
    border-bottom: 1px dashed rgb(184, 28, 34);

    .first-comment {
      display: flex;

      .userInfo {
        text-align: center;
        margin-right: 20px;
        width: 15%;
        
        h3 {
          margin: 0px;
        }
      }

      .input {
        /deep/ .el-input__inner:focus {
          border-color: #dcdfe6;
        }
      }

      i {
        margin-right: 5px;
        margin-left: 1vw;
        cursor: pointer;

        &:nth-child(3) {
          color: rgb(202, 4, 4);
        }
      }

      .content {
        margin-left: 10px;
        position: relative;
        flex: 1;
        padding: 0px 15px;

        p {
          line-height: 30px;
        }

        & > span {
          font-size: 12px;
          color: rgb(130, 129, 129);
        }

        .comment-right {
          position: absolute;
          right: 0;
          top: 0;
        }

        .reply-comment {
          height: 60px;
          display: flex;
          align-items: center;

          .reply-button {
            margin-left: 20px;
            height: 35px;
          }
        }

        .second-comment {
          display: flex;
          padding: 10px 0 10px 5px;
          border-radius: 20px;
          background: #ffffff;

          .to_reply {
            color: rgb(126, 127, 128);
          }
        }
      }
    }
  }
}
</style>
