<template>
  <div>
    <div class="detail-container">
      <div class="detail-main">
        <div class="profile">
          <div class="left">
            <Zoom :skuImageList="scenic.scenicImages" />
            <ImageList :skuImageList="scenic.scenicImages" />
          </div>
          <div class="right">
            <div class="name">
              <span>{{ scenic.scenicName }}</span>
            </div>
            <div class="score">
              <el-rate v-model="scenic.score" disabled text-color="#ff9900" score-template="{value}">
              </el-rate>
              <div class="score-text">
                <span>评分:{{ scenic.score }}分</span>
              </div>
            </div>
            <div class="relative-msg">
              <div style="margin-right: 20px">
                <span class="num">{{ scenic.commentUsers.length }}</span> 条点评
              </div>
              <div><span class="num">{{ scenic.collectionUsers.length }}</span> 次收藏</div>
            </div>
            <div class="type">
              <span v-if="scenic.stype === '1'">景点分类：地标建筑</span>
              <span v-if="scenic.stype === '2'">景点分类：亲子游</span>
              <span v-if="scenic.stype === '3'">景点分类：上海夜景</span>
              <span v-if="scenic.stype === '4'">景点分类：小清新摄影地</span>
              <span v-if="scenic.stype === '5'">景点分类：人气免票公园</span>
              <span v-if="scenic.stype === '6'">景点分类：历史烙印</span>
              <span v-if="scenic.stype === '7'">景点分类：周边古镇</span>
              <span v-if="scenic.stype === '8'">景点分类：绿色户外</span>
            </div>
            <div class="playTime">
              <span>用时参考：<span class="num">{{ scenic.playTime }}</span> </span>
            </div>

            <div class="phoneAndCollect">
              <div class="playTime">
                <span>电话：{{ scenic.phone }}</span>
              </div>
              <div v-if="!scenic.collectionUsers.includes(userId) && !collect" class="notCollection"
                @click="chooseCollect">
                <div>
                  <i class="el-icon-star-off"></i>
                </div>
                <span style="margin-left: 10px">收藏</span>
              </div>
              <div v-else class="collection" @click="goPersonCollect">
                <div>
                  <i class="el-icon-star-on"></i>
                </div>
                <span style="margin-left: 10px">已收藏</span>
              </div>
            </div>
          </div>
        </div>
        <div class="location">
          <h1>景点位置</h1>
          <p style="color: #666">{{ scenic.location }}</p>
          <div>
            <baidu-map class="bm-view" :center="{
              lng: this.scenic.longitude,
              lat: this.scenic.latitude,
            }" :zoom="15">
              <bm-marker :position="{
                lng: this.scenic.longitude,
                lat: this.scenic.latitude,
              }" animation="BMAP_ANIMATION_BOUNCE">
              </bm-marker>
            </baidu-map>
          </div>
        </div>
        <ul class="msg">
          <div class="msgTip">
            <span>景点信息</span>
          </div>
          <li class="introduction">
            <div v-if="open" class="open">
              <div class="title">介绍</div>
              <div class="content">
                <p v-for="(textList, index) in scenic.text" :key="index">{{ textList }}</p>
              </div>
              <!-- <a href="#" @click="changeOpen">展开></a> -->
              <span class="foldBtn" @click="changeOpen">...展开></span>
            </div>
            <div v-else class="fold">
              <div class="title">介绍</div>
              <div class="content">
                <p v-for="(textList, index) in scenic.text" :key="index">{{ textList }}</p>
              </div>
              <span class="foldBtn" @click="changeOpen">收起</span>
            </div>
          </li>
          <li class="openTime">
            <div class="title">开放时间</div>
            <!-- <div class="content" v-for="(timeList,index)  in scenic.openTime" :key="index">{{ timeList }}</div> -->
            <div class="content">
              <p v-for="(timeList, index)  in scenic.openTime" :key="index">{{ timeList }}</p>
            </div>
          </li>
          <li class="门票">
            <div class="title">门票</div>
            <!-- <div class="content" v-for="(ticketList,index)  in scenic.ticket" :key="index">
              {{ ticketList }}
            </div> -->
            <div class="content">
              <p v-for="(ticketList, index)  in scenic.ticket" :key="index">{{ ticketList }}</p>
            </div>
          </li>
          <li class="traffic">
            <div class="title">交通</div>
            <!-- <div class="content" v-for="(trafficList,index)  in scenic.traffic" :key="index">
              {{ trafficList }}
            </div> -->
            <div class="content">
              <p v-for="(trafficList, index)  in scenic.traffic" :key="index">{{ trafficList }}</p>
            </div>
          </li>
        </ul>
        <!-- 评论区 -->
        <div class="comment" style="background: white">
          <div class="commentTip">
            <div class="comment-header">
              <span>热门评论</span><span style="font-size: 20px">({{ commentsLength }}条评论)</span>
            </div>
            <div class="commentBtnPosition">
              <button style="margin-right: 50px" class="commentButton" @click="giveScenicComment">
                {{ buttonText.default }}
              </button>
            </div>

          </div>
          <CommentView :parentId="scenic.scenicId" type="Scenic"></CommentView>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :visible.sync="commentDialog">
        <el-form title="景点评论">
          <el-form-item label="评分">
            <el-select v-model="gradevalue" placeholder="请选择">
              <el-option v-for="item in level" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}分</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评论">
            <el-input v-model="commmentText" type="textarea" :autosize="{ minRows: 3, maxRows: 10 }" style="width: 80%"
              show-word-limit maxlength="300"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload action="#" ref="uploadRef" :file-list="filelist" list-type="picture-card"
              :http-request="submitUpLoad" :limit="8" multiple accept=".jpg,.jpeg,.png,.JPG,.JPEG"
              :before-upload="beforeUploadHandle" :on-change="handleChange" :on-exceed="handleExceed"
              :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelComment">取 消</el-button>
          <el-button type="primary" @click="confirmComment">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Axios from "@/utils/request";
import CommentView from "@/components/Front/OtherModules/commentItem";
import comment2 from "@/components/Front/Main/Recommend/ContentAll/routeMsg/ContentAll/comment2";
import TextOverFlow from "@/components/usefulCom/TextOverFlow";
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";
import { nanoid } from "nanoid";
import AxiosOpenAi from "@/utils/requestOpenAi";

export default {
  components: { CommentView, comment2, TextOverFlow, ImageList, Zoom },
  data() {
    return {
      collect: false,
      open: true,
      value: 4.3,
      loading: true,
      showImg: "",
      level: [
        { label: "超棒", value: "5" },
        { label: "较好", value: "4" },
        { label: "不错", value: "3" },
        {
          label: "一般",
          value: "2",
        },
        {
          label: "不好",
          value: "1",
        },
      ],
      gradevalue: "",
      commmentText: "",
      filelist: [],
      buttonText: {
        // 按钮文字
        type: String,
        default: "写评论",
      },
      uploadRef: null,
      commentId: "",
      UpcommentId: "",
      uplistlength: 0,
      giveComment: {},
      commentDialog: false,
      scenic: {},
      active: false,
      comments: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      commentsLength: '',
      userId: '',
      pageEnterTime: null,
      pageLeaveTime: null,
      scenicId: null,
    };
  },
  methods: {
    goPersonCollect() {
      Axios.get('/scenic/deCollection', {
        params: {
          userId: JSON.parse(sessionStorage.getItem('userInfo')).userId,
          scenicId: this.scenic.scenicId
        }
      }).then((res) => {
        //console.log(res)
        if (res.code === 200) {
          this.collect = !this.collect
          this.$message('取消收藏成功')
          location.reload();
        }
      })
      // this.$router.push({
      //   path: '/collect'
      // })
    },
    changeOpen() {
      this.open = !this.open;
    },
    chooseCollect() {
      const userInfo = sessionStorage.getItem("userInfo");
      if (!userInfo) {
        // 登录验证
        this.$message.warning("请先登录后收藏");
      } else {
        this.collect = !this.collect;
        let params = {
          scenicId: this.scenic.scenicId,
          userId: this.userId
        }
        // console.log(this.routeMsg.routeId,this.routeMsg.userId)
        Axios.get('/scenic/collection', {
          params,
          headers: {
            token: localStorage.getItem("token"),
          },
        }).then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.$message.success('收藏成功')
            // this.routeMsg.collectionUsers.length= res.data.route.collectionUsers.length;
            // console.log(this.routeMsg.collectionUsers.length)
          }
        })
      }
    },
    getScenicInfo() {
      let params = { scenicId: this.$route.params.scenicId };
      Axios.get("/scenic/oneInfo", {
        params,
      }).then((res) => {
        this.scenic = res.data.scenic;
      });
    },
    getScenicComments() {
      let params = { "articleId": this.$route.params.scenicId };
      Axios.get("/comment/getScenicComments", {
        params,
      }).then((res) => {
        // console.log(res);

        this.commentsLength = res.data.comments.length;
      });
    },
    giveScenicComment() {
      //先检查是否登录
      const userInfo = sessionStorage.getItem("userInfo");
      if (!userInfo) {
        // 登录验证
        this.$message.warning("请先登录后评论");
      } else {
        //dialog 显示
        // console.log("发表评论");
        this.commentDialog = true;
      }
    },
    scenicFavor() {
      //收藏
    },
    giveScenicLike() {
      //景点点赞
      Axios.get("/scenic/like", {
        params: {
          scenicId: this.scenic.scenicId,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log("点赞景点", res);
        if (res.code === 200) {
          this.scenic.likes += 1;
        }
      });
    },
    confirmComment() {
      //提交评论
      if (this.gradevalue === "") {
        this.$message.warning("评分不能为空");
        return;
      }
      if (this.commmentText === "") {
        this.$message.warning("评论不能为空");
        return;
      }
      this.UpcommentId = nanoid(12)
      Axios.get("/comment/prepareComment", {
        params: {
          commentId: this.UpcommentId,
          userId: JSON.parse(sessionStorage.getItem("userInfo")).userId,
          parentId: this.scenic.scenicId
        }
      }).then((res) => {
        // console.log("prepare", res)
        if (res.code === 200) {
          // console.log("检查filelist", this.filelist);
          if (this.filelist.length <= 0) {
            this.submitUpLoad(null);
          } else {
            this.$refs.uploadRef.submit();
          }
          // this.$refs.upLoadRef.value.clearFiles();
          // console.log("上传完毕");
          this.commentDialog = false;
          this.uplistlength = 0;
          this.commentId = "";
          // console.log("upload Ref", this.$refs.uploadRef);
          // this.$refs.upLoadRef.clearFiles();
        } else {
          this.$message.error("请稍后再试")
        }
      })
    },
    handleRemove(file) {
      //删除图片
      // console.log("delete file", file);
      // console.log("raw list", this.filelist);
      for (let i in this.filelist) {
        if (file.url === this.filelist[i].url) {
          this.filelist.splice(i, 1);
          break;
        }
      }
    },
    handlePictureCardPreview(file) {
      //预览上传图片
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      //修改回调更新长度
      // console.log(file, fileList);
      this.filelist = fileList;
      this.uplistlength = fileList.length;
    },
    beforeUploadHandle(file) {
      //上传图片之前检查
      // console.log(file.type);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt3M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.warning("不支持此格式");
        return false;
      }
      if ((isPNG || isJPG) && !isLt3M) {
        this.$message.warning("图片大小不能超过2MB");
        return false;
      }
      return true;
    },
    handleExceed() {
      //图片总数提示
      this.$message.warning("图片总数不得超过10张");
    },
    submitUpLoad(item) {
      //手动上传
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // console.log("开始上传", item.file)
      // console.log("评论", this.commmentText)
      // console.log("评分", this.gradevalue)
      // console.log("用户", userInfo.userId)

      // console.log("评论id生成", this.UpcommentId)
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      };
      let formData = new FormData();
      if (this.filelist.length <= 0 || item === null) {
        formData.append("file", null);
      } else {
        formData.append("file", item.file);
      }
      formData.append("userId", userInfo.userId);
      formData.append("scenicId", this.scenic.scenicId);
      formData.append("score", this.gradevalue);
      formData.append("commentId", this.UpcommentId);
      formData.append("commentText", this.commmentText);
      Axios.post("/comment/saveScenicComment", formData, config)
        .then((res) => {
          // console.log("scenicComment", res);
          if (res.code === 200) {
            this.comments = res.data.comments;
            // console.log("upload Ref", this.$refs.uploadRef);
            location.reload()
            this.$message.success("评论成功")
          }
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          // this.$refs.upLoadRef.clearFiles();
        });
    },
    cancelComment() {
      this.uplistlength = 0;
      // this.$refs.upLoadRef.clearFiles();
      // console.log("upload Ref", this.$refs.uploadRef);
      this.commentDialog = false;
    },
    recordPageView() {
      const scenicId = this.scenicId;
      Axios.get("/scenic/oneInfo", {
        params: { scenicId }
      }).then((res) => {
        const scenicName = res.data.scenic.scenicName;
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || { userId: '0' };
        const params = {
          userId: userInfo.userId,
          scenicName: scenicName,
          timeSpentOnPage: (this.pageLeaveTime.getTime() - this.pageEnterTime.getTime()) / 1000
        };
        AxiosOpenAi.get("book/api/view_page", { params })
          .then(response => {
            console.log('Page view recorded successfully:', response.data.message);
          })
          .catch(error => {
            console.error('Failed to record page view:', error);
          });
      });
    }
  },
  created() {
    this.pageEnterTime = new Date();
    this.scenicId = this.$route.params.scenicId;
  },
  beforeDestroy() {
    this.pageLeaveTime = new Date();
    this.recordPageView();
  },
  mounted() {
    // console.log(this.$route.params.scenicId);
    this.getScenicInfo();
    this.getScenicComments();
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      this.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
    }
  },
};
</script>
<style lang="less" scoped>
.bm-view {
  width: 99%;
  height: 218px;
}

.comment-header {

  .input {
    margin-left: 10px;
    margin-right: 20px;
    flex: 1;

    /deep/ .el-input__inner:focus {
      border-color: #dcdfe6;
    }
  }
}

.profile {
  margin-top: 20px;
  background: white;
  display: flex;
  align-items: center;
  padding: 20px 40px;
  box-shadow: 0 0 3px gray;
  overflow: hidden;
  // width: 1100px;
}

.left {
  display: flex;
  width: 55%;
  overflow: hidden;
  position: relative;
  left: 1%;
  // height: 200px;
  justify-content: space-evenly;
}

img {
  box-shadow: 0 0 5px gray;
}

.left {
  // background-size: cover;
  padding: 10px 0;
}

.left .bigPicture {
  width: 400px;
  height: 330px;
  max-width: 400px;
  background-size: cover;

}

.left .smallPicture {
  display: flex;
  flex-direction: column;
}

.left .smallPicture .pic {
  width: 107px;
  max-width: 107px;
  height: 75px;
  margin-bottom: 10px;
  background-size: cover;

}

.right {
  margin-left: 30px;
  width: 45%;
  height: 330px;
  margin-top: -30px;
  // background-color: pink;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.right .name {
  font-size: 40px;
}

.right .num {
  color: rgb(184, 28, 34);
}

.right .type {
  font-size: 20px;
}

.score {
  margin: 10px;
  display: flex;
  align-items: center;
}

.score .score-text {
  margin-left: 10px;
  font-size: 20px;
  /* width: 100px; */
  /* height: 30px; */
  background-color: rgb(184, 28, 34);
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 10px;
}

.relative-msg {
  display: flex;
  font-size: 20px;
}

.playTime {
  font-size: 20px;
}

.phoneAndCollect {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notCollection {
  color: white;
  display: flex;
  background-color: rgb(184, 28, 34);
  padding: 8px 15px;
  border-radius: 10px;
  cursor: pointer;
}

.collection {
  color: white;
  display: flex;
  background-color: rgb(184, 28, 34);
  padding: 8px 15px;
  border-radius: 10px;
  cursor: pointer;
}

.commentBtnPosition {
  width: 100%;
  display: flex;
  justify-content: flex-end;
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

.right .top .title {
  display: inline;
  margin-right: 10px;
  font-weight: normal;
  font-size: 30px;
  color: #333;
  width: 70%;
}

.top {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  height: 115px;
}

.tool {
  width: 30%;
  display: flex;
  justify-content: space-around;
}

.tool i {
  border: 1px solid #e6e6e6;
  float: left;
  background: #ffffff;
  margin-right: 10px;
  font-size: 30px;
  color: #ff274d;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
}

.tool .txt {
  font-size: 17px;
  top: 7%;
  position: relative;
}

.main {
  display: flex;
  background: white;
  justify-content: space-between;
  margin: 20px 10px 0px 0px;
}

.text {
  width: 70%;
}

.tu2 {
  width: 30%;
}

/* 评论 */
.comment {
  box-shadow: 0 0 5px gray;
}

.msgTip,
.commentTip {
  font-size: 35px;
  color: rgb(184, 28, 34);
  text-shadow: 0 0 2px gray;
  text-align: center;
  margin: 80px 0;
  padding-bottom: 40px;
  border-bottom: 1px solid rgb(184, 28, 34);
  margin-bottom: 20px;
  // display: flex;
}

.writeTip {
  font-size: 30px;
  color: rgb(184, 28, 34);
  text-shadow: 0 0 2px gray;
}

.msgTip {
  margin: 40px 0;
}

.comment-container {
  display: flex;
  margin-top: 20px;
  padding-left: 20px;
  flex-direction: column;
  justify-content: center;
  padding-right: 20px;
  align-items: start;
  background: white;
  margin-bottom: 30px;
  width: 75%;
}

.tu2 img {
  width: 200px;
  float: right;
  height: 200px;
}

.left img {
  height: 630px;
  width: 667px;
}

.detail-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12%;
  margin-right: 12%;
}

.detail-container {
  background: rgb(246, 246, 246);
  height: 100%;
  width: 100%;
}

.location {
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background: white;
  box-shadow: 0 0 5px gray;
}

.text li {
  margin: 5px auto;
}

a {
  text-decoration: none;
  color: #666;
}

a:hover {
  color: rgb(184, 28, 34);
  text-decoration: none;
}

.foldBtn {
  text-decoration: none;
  color: #666;
  margin-left: 20px;
  // margin-bottom: 40px;
}

.foldBtn:hover {
  color: rgb(184, 28, 34);
  text-decoration: none;
  cursor: pointer;
}

// 景点主要内容区
ul {
  list-style: none;
  padding-inline-start: 0;
}

ul li {
  margin: 0;
  padding: 0;
}

.msg {
  // width: 100%;
  background-color: white;
  padding: 20px 20px;
  box-shadow: 0 0 5px gray;
  // fons
}

.msg li .title {
  font-size: 25px;
  margin-bottom: 20px;
}

.msg li .content {
  line-height: 31px;
  margin-bottom: 20px;
  margin-left: 10px;
  color: #666;
}

// .introduction .content {
//   // max-height: 400px;
//   // overflow: auto;
// }
.overFlow {
  // padding: 10px 20px;
  margin-bottom: 10px;
  margin-left: 10px;
  line-height: 30px;
  // width: 1000px;
}

.introduction {
  // overflow: auto;
  margin-bottom: 20px;
}

.btn {
  border: none;
  background-color: white;
  color: rgb(184, 28, 34);
  font-size: 16px;
}

.btn:hover {
  border-bottom: 1px solid rgb(184, 28, 34);
  cursor: pointer;
}

.open .content {
  height: 70px;
  overflow: hidden;
}
</style>
