<template>
  <div>
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
      <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
      <div class="reply-info">
        <div
          tabindex="0"
          contenteditable="true"
          id="replyInput"
          spellcheck="false"
          placeholder="输入评论..."
          class="reply-input"
          @focus="showReplyBtn"
          @input="onDivInput($event)"
        ></div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button
          class="reply-btn"
          size="medium"
          @click="sendComment"
          type="primary"
          >发表评论</el-button
        >
      </div>
    </div>
    <div
      v-for="(item, i) in comments"
      :key="i"
      class="author-title reply-father"
    >
      <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
      <div class="author-info">
        <span class="author-name">{{ item.name }}</span>
        <span class="author-time">{{ item.time }}</span>
      </div>
      <div class="icon-btn" style="display: flex">
        <div class="commenList">
          <span @click="showReplyInput(i, item.name, item.id)"
            ><i
              class="el-icon-s-comment"
              style="margin: 0 5px; cursor: pointer"
            ></i
            >{{ item.commentNum }}</span
          >
        </div>
        <div v-if="item.isLike" @click="item.isLike = !item.isLike">
          <svg
            style="margin: 0 5px 0 10px; cursor: pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            /></svg
          >{{ item.like }}
        </div>
        <div v-else @click="item.isLike = !item.isLike">
          <svg
            style="margin: 0 2px 0 10px; cursor: pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            /></svg
          >{{ item.like }}
        </div>
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{ item.comment }}</span>
        </p>
      </div>
      <div class="reply-box">
        <div v-for="(reply, j) in item.reply" :key="j" class="author-title">
          <el-avatar
            class="header-img"
            :size="40"
            :src="reply.fromHeadImg"
          ></el-avatar>
          <div class="author-info">
            <span class="author-name">{{ reply.from }}</span>
            <span class="author-time">{{ reply.time }}</span>
          </div>
          <div class="icon-btn" style="display: flex">
            <div class="commenList">
              <!-- <span @click="showReplyInput(i, reply.name, reply.id)"
                ><i
                  class="el-icon-s-comment"
                  style="margin: 0 5px; cursor: pointer"
                ></i
                >{{ reply.commentNum }}</span
              > -->
            </div>
            <div v-if="reply.isLike" @click="reply.isLike = !reply.isLike">
              <svg
                style="margin: 0 5px 0 10px; cursor: pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                /></svg
              >{{ reply.like }}
            </div>
            <div v-else @click="reply.isLike = !reply.isLike">
              <svg
                style="margin: 0 2px 0 10px; cursor: pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                /></svg
              >{{ reply.like }}
            </div>
          </div>
          <div class="talk-box">
            <p>
              <span>回复 {{ reply.to }}:</span>
              <span class="reply">{{ reply.comment }}</span>
            </p>
          </div>
          <div class="reply-box"></div>
        </div>
      </div>
      <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
        <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
        <div class="reply-info">
          <div
            tabindex="0"
            contenteditable="true"
            spellcheck="false"
            placeholder="输入评论..."
            @input="onDivInput($event)"
            class="reply-input reply-comment-input"
          ></div>
        </div>
        <div class="reply-btn-box">
          <el-button
            class="reply-btn"
            size="medium"
            @click="sendCommentReply(i, j)"
            type="primary"
            >发表评论</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
  name: "ArticleComment",
  data() {
    return {
      btnShow: false,
      index: "0",
      replyComment: "",
      myName: "Lana Del Rey",
      myHeader:
        "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
      myId: 19870621,
      to: "",
      toId: -1,
      //点赞喜欢
      isLike: false,
      comments: [
        {
          name: "Lana Del Rey",
          id: 19870621,
          headImg:
            "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
          comment: "我发布一张新专辑Norman Fucking Rockwell,大家快来听啊",
          time: "2019年9月16日 18:43",
          commentNum: 2,
          like: 15,
          inputShow: false,
          //点赞喜欢
          isLike: false,
          reply: [
            {
              from: "Taylor Swift",
              fromId: 19891221,
              fromHeadImg:
                "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
              to: "Lana Del Rey",
              toId: 19870621,
              comment: "我很喜欢你的新专辑！！",
              time: "2019年9月16日 18:43",
              commentNum: 1,
              like: 15,
              inputShow: false,
              //点赞喜欢
              isLike: false,
            },
            {
              from: "Ariana Grande",
              fromId: 1123,
              fromHeadImg:
                "https://ae01.alicdn.com/kf/Hf6c0b4a7428b4edf866a9fbab75568e6U.jpg",
              to: "Lana Del Rey",
              toId: 19870621,
              comment: "别忘记宣传我们的合作单曲啊",
              time: "2019年9月16日 18:43",
              commentNum: 0,
              like: 5,
              inputShow: false,
              //点赞喜欢
              isLike: false,
            },
          ],
        },
        {
          name: "Taylor Swift",
          id: 19891221,
          headImg:
            "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
          comment: "我发行了我的新专辑Lover",
          time: "2019年9月16日 18:43",
          commentNum: 1,
          like: 5,
          inputShow: false,
          //点赞喜欢
          isLike: false,
          reply: [
            {
              from: "Lana Del Rey",
              fromId: 19870621,
              fromHeadImg:
                "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
              to: "Taylor Swift",
              toId: 19891221,
              comment: "新专辑和speak now 一样棒！",
              time: "2019年9月16日 18:43",
              commentNum: 25,
              like: 5,
              inputShow: false,
              //点赞喜欢
              isLike: false,
            },
          ],
        },
        {
          name: "Norman Fucking Rockwell",
          id: 20190830,
          headImg:
            "https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg",
          comment: "Plz buy Norman Fucking Rockwell on everywhere",
          time: "2019年9月16日 18:43",
          commentNum: 0,
          like: 5,
          inputShow: false,
          //点赞喜欢
          isLike: false,
          reply: [],
        },
      ],
    };
  },
  directives: { clickoutside },
  methods: {
    inputFocus() {
      var replyInput = document.getElementById("replyInput");
      replyInput.style.padding = "8px 8px";
      replyInput.style.border = "2px solid blue";
      replyInput.focus();
    },
    showReplyBtn() {
      this.btnShow = true;
    },
    hideReplyBtn() {
      this.btnShow = false;
      replyInput.style.padding = "10px";
      replyInput.style.border = "none";
    },
    showReplyInput(i, name, id) {
      this.comments[this.index].inputShow = false;
      this.index = i;
      this.comments[i].inputShow = true;
      this.to = name;
      this.toId = id;
    },
    _inputShow(i) {
      return this.comments[i].inputShow;
    },
    sendComment() {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空",
        });
      } else {
        let a = {};
        let input = document.getElementById("replyInput");
        let timeNow = new Date().getTime();
        let time = this.dateStr(timeNow);
        a.name = this.myName;
        a.comment = this.replyComment;
        a.headImg = this.myHeader;
        a.time = time;
        a.commentNum = 0;
        a.like = 0;
        this.comments.push(a);
        this.replyComment = "";
        input.innerHTML = "";
      }
    },
    sendCommentReply(i, j) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "评论不能为空",
        });
      } else {
        let a = {};
        let timeNow = new Date().getTime();
        let time = this.dateStr(timeNow);
        a.from = this.myName;
        a.to = this.to;
        a.fromHeadImg = this.myHeader;
        a.comment = this.replyComment;
        a.time = time;
        a.commentNum = 0;
        a.like = 0;
        this.comments[i].reply.push(a);
        this.replyComment = "";
        document.getElementsByClassName("reply-comment-input")[i].innerHTML =
          "";
      }
    },
    onDivInput: function (e) {
      this.replyComment = e.target.innerHTML;
    },
    dateStr(date) {
      //获取js 时间戳
      var time = new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date) / 1000);
      //存储转换值
      var s;
      if (time < 60 * 10) {
        //十分钟内
        return "刚刚";
      } else if (time < 60 * 60 && time >= 60 * 10) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
        //超过1天少于30天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        //超过30天ddd
        var date = new Date(parseInt(date));
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate()
        );
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.my-reply
    padding 10px
    background-color #fafbfc
    .header-img
        display inline-block
        vertical-align top
    .reply-info
        display inline-block
        margin-left 5px
        width 90%
        @media screen and (max-width:1200px) {
            width 80%
        }
        .reply-input
            min-height 20px
            line-height 22px
            padding 10px 10px
            color #ccc
            background-color #fff
            border-radius 5px
            &:empty:before
                content attr(placeholder)
            &:focus:before
                content none
            &:focus
                padding 8px 8px
                border 2px solid blue
                box-shadow none
                outline none
    .reply-btn-box
        height 25px
        margin 10px 0
        .reply-btn
            position relative
            float right
            margin-right 15px
.my-comment-reply
    margin-left 50px
    .reply-input
        width flex
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
    padding 10px
    .header-img
        display inline-block
        vertical-align top
    .author-info
        display inline-block
        margin-left 5px
        width 60%
        height 40px
        line-height 20px
        >span
            display block
            cursor pointer
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .author-name
            color #000
            font-size 18px
            font-weight bold
        .author-time
            font-size 14px
    .icon-btn
        width 30%
        padding 0 !important
        float right
        @media screen and (max-width : 1200px){
            width 20%
            padding 7px
        }
        >span
            cursor pointer
    .talk-box
        margin 0 50px
        >p
           margin 0
        .reply
            font-size 16px
            color #000
    .reply-box
        margin 10px 0 0 50px
        background-color #efefef
</style>
