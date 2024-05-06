<template>
  <div>
    <div class="container">
      <div class="tip">
        <div class="words">
          <span>发表攻略</span>
        </div>
        <div v-if="isPublic" class="public">
          <div class="first" @click="choosePublic">
            <div class="display">
              <i class="el-icon-success chooseBck"></i>
            </div>
            <div class="submitTip">
              <div class="title">公开发表</div>
              <div class="explain">其他人可以在攻略推荐页看到</div>
            </div>
          </div>
          <div class="second" @click="choosePrivate">
            <div class="notDisplay">
              <i class="el-icon-success chooseBck"></i>
            </div>
            <div class="submitTip">
              <div class="title">私密发表</div>
              <div class="explain">只在我的攻略里面可以看到</div>
            </div>
          </div>
        </div>
        <div v-else class="private">
          <div class="first" @click="choosePublic">
            <div class="notDisplay">
              <i class="el-icon-success chooseBck"></i>
            </div>
            <div class="submitTip">
              <div class="title">公开发表</div>
              <div class="explain">其他人可以在攻略推荐页看到</div>
            </div>
          </div>
          <div class="second" @click="choosePrivate">
            <div class="display">
              <i class="el-icon-success chooseBck"></i>
            </div>
            <div class="submitTip">
              <div class="title">私密发表</div>
              <div class="explain">只在我的攻略里面可以看到</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mainContent">
        <div class="editContent">
          <div class="title">
            <el-input
                type="text"
                placeholder="请输入标题"
                v-model="title"
                maxlength="50"
                show-word-limit
            >
            </el-input>
          </div>
          <div class="edit">
            <!-- 编辑器 -->
            <!--            <myEditor></myEditor>-->
            <div style="border: 1px solid #ccc;">
              <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editor"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
              />
              <Editor
                  style="height: 500px; overflow-y: hidden;"
                  v-model="html"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="onCreated"
              />
            </div>
          </div>
          <div class="submit">
            <div style="margin-bottom: 15px">
              <el-checkbox v-model="checked"></el-checkbox>
              <span style="color: #666666">&nbsp;我已阅读并同意</span>
              <span class="protocal" @click="goProtocol"
              >《轻松沪游攻略协议》</span
              >
            </div>
            <div class="Btn">
              <button @click="issue">发布</button>
              <div class="saveChoice">
                <span>或者</span>
                <span class="saveDraft" @click="saveDraft">保存草稿</span>
              </div>
            </div>
          </div>
        </div>
        <div class="drafts">
          <div class="draftTitle">草稿箱（{{ draftsLength }}）</div>
          <div class="content">
            <draftItem :allDrafts="allDrafts" @getDraftInfo="strategyInfo" @afterDel="afterDel"></draftItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myEditor from "@/components/Front/Main/Community/content/writeStrategy/content/eidtor";
import draftItem from "@/components/Front/Main/Community/content/writeStrategy/content/draftItem";
import Axios from "@/utils/request";
import Mitt from "@/utils/mitt";
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import {nanoid} from "nanoid";

var strategyId;
var imageList;
export default {
  name: "writeStrategy",
  components: {
    Editor, Toolbar,
    myEditor,
    draftItem,
  },
  data() {
    return {
      checked: true,
      title: "",
      isPublic: true,
      open: true,

      editor: null,
      imageList: [],
      mode: 'default', // or 'simple'
      html: '',
      toolbarConfig: {
        insertKeys:[
          {
            index: 25, // 插入的位置，基于当前的 toolbarKeys
            keys: ["imageWidth75"]
          }
        ],
        excludeKeys: [
          "insertImage",
          "group-video",
          "fullScreen"
        ]
      },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          // onInsertedImage(imageNode: ImageElement | null) {  // TS 语法
          uploadImage: {
            server: 'http://localhost:8080/QSHY/strategy/upLoadPic',
            // imageList1: [],
            async customUpload(item, insertFn) {
              // console.log(item)
              // console.log(this)
              // console.log(strategyId)
              const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
              const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                  token: localStorage.getItem("token"),
                },
              }
              let formData = new FormData();
              // if (this.filelist.length <= 0 || item === null) {
              //   formData.append("file", null);
              // } else {
              formData.append("file", item);
              // }
              formData.append("userId", userInfo.userId);
              formData.append("strategyId", strategyId);
              Axios.post("/strategy/upLoadPic", formData, config)
                  .then((res) => {
                    // console.log("uploadPic", res);
                    if (res.code === 200) {
                      insertFn(res.data.url)
                      // console.log("this", this)
                      // this.imageList1.push(res.data.url)
                      // console.log("images", this.imageList1)
                      // this.comments = res.data.comments;
                      // this.$message.success("评论成功，刷新以查看最新评论")
                    }
                  })
                  .catch((err) => {
                    // console.log(err);
                  })
                  .finally(() => {
                    // this.$refs.upLoadRef.clearFiles();
                  });
            }
          },
          insertImage: {
            imageList: [],
            onInsertedImage(imageNode) {                    // JS 语法
              if (imageNode == null) return
              // console.log("imageNode", imageNode)
              const {src, alt, url, href} = imageNode
              // Mitt.emit("msg", src)
              // console.log('inserted image', src, alt, url, href)
            }
          }
          // checkImage: customCheckImageFn, // 也支持 async 函数
          // parseImageSrc: customParseImageSrc, // 也支持 async 函数
        }
      },

      allDrafts: [],
      draftsLength: 0,

      draftInfo: {}
    };
  },
  methods: {
    choosePublic() {
      this.isPublic = true;
      this.open = true
    },
    choosePrivate() {
      this.isPublic = false;
      this.open = false
    },
    goProtocol() {
      this.$router.push("/protocol");
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      // console.log(this.editor.getAllMenuKeys())
    },
    issue() {
      if (!this.title) {
        this.$alert('请输入攻略标题', '提示', {
          confirmButtonText: '确定',
          showClose: false
        })
        return
      }
      if(this.editor.getText().length>5000){
        this.$message({
          type:'error',
          message:'攻略字数不能大于5000'
        })
        return
      }
      if (!this.checked) {
        this.$alert('请阅读并同意《轻松沪游攻略协议》', '提示', {
          confirmButtonText: '确定',
          showClose: false
        })
        return
      }
      let imageUrls = []
      for (let i of this.editor.getElemsByType('image')) {
        imageUrls.push(i.src)
      }
      // console.log(imageUrls)
      // console.log(this.editor.getHtml())
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

      if (this.open === true) {
        this.$confirm('此操作将公开发布该攻略, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Axios.post('/strategy/confirmPic', {}, { //上传图片接口
            params: {
              userId: userInfo.userId,
              strategyId: strategyId,
              imageList: imageUrls.toString()
            },
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }).then((res) => {
            // console.log(res)
            if (res.code === 200) {
              let params = {
                "draftId": strategyId
              }
              Axios.post('/strategy/uploadStrategy', { //上传攻略接口
                "strategyId": nanoid(12),
                "userId": userInfo.userId,
                "open": this.open,
                "strategyName": this.title,
                "text": this.editor.getHtml()
              }, {
                params, headers: {
                  "Content-Type": "application/json",
                  token: localStorage.getItem("token"),
                },
              }).then((res) => {
                // console.log(res)
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '发布攻略成功'
                  })
                  setTimeout(() => {
                    this.$router.push({
                      path: '/community'
                    })
                  }, 2000)
                }
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });
        });
      } else if (this.open === false) {
        this.$confirm('此操作将私密发布该攻略, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Axios.post('/strategy/confirmPic', {}, { //上传图片接口
            params: {
              userId: userInfo.userId,
              strategyId: strategyId,
              imageList: imageUrls.toString()
            },
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }).then((res) => {
            // console.log(res)
            if (res.code === 200) {
              let params = {
                "draftId": strategyId,
              }
              Axios.post('/strategy/uploadStrategy', { //上传攻略接口
                "strategyId": nanoid(12),
                "userId": userInfo.userId,
                "open": this.open,
                "strategyName": this.title,
                "text": this.editor.getHtml()
              }, {
                params, headers: {
                  "Content-Type": "application/json",
                  token: localStorage.getItem("token"),
                },
              }).then((res) => {
                // console.log(res)
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '发布攻略成功'
                  })
                  setTimeout(() => {
                    this.$router.push({
                      path: '/community'
                    })
                  }, 2000)
                }
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });
        });
      }


    },
    saveDraft() {
      if (!this.title) {
        this.$alert('请输入攻略标题', '提示', {
          confirmButtonText: '确定',
          showClose: false
        })
        return
      }
      if (!this.checked) {
        this.$alert('请阅读并同意《轻松沪游攻略协议》', '提示', {
          confirmButtonText: '确定',
          showClose: false
        })
        return
      }
      let imageUrls = []
      for (let i of this.editor.getElemsByType('image')) {
        imageUrls.push(i.src)
      }
      // console.log(imageUrls)
      // console.log(this.editor.getHtml())
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      Axios.post('/strategy/confirmPic', {}, { //上传图片接口
        params: {
          userId: userInfo.userId,
          strategyId: strategyId,
          imageList: imageUrls.toString()
        },
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }).then((res) => {
        // console.log(res)
        if (res.code === 200) {
          Axios.post('/strategy/uploadDraft', { //上传攻略接口   草稿
            "draftId": strategyId,
            "userId": userInfo.userId,
            "open": false,
            "type": false,
            "draftName": this.title,
            "text": this.editor.getHtml()
          }).then((res) => {
            // console.log(res)
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '攻略保存草稿成功'
              })
              setTimeout(() => {

                this.$router.push({
                  path: '/community'
                })
              }, 2000)
            }
          })
        }
      })
    },
    // getmsg(url) {
    // this._data.imageList.push(url)
    // console.log("this method", this._data.imageList)
    // }
    getDrafts() {
      Axios.get('/strategy/getUserDrafts', {
        params: {
          userId: JSON.parse(sessionStorage.getItem('userInfo')).userId
        }
      }).then((res) => {
        // console.log(res)
        this.draftsLength = res.data.drafts.length
        res.data.drafts.forEach((element) => {
          // 时间戳格式化
          element.createTime = this.formatDate(element.createTime);
          // 添加
          this.allDrafts.push(element);
        });
      })
    },
    formatDate(timestamp) {
      // 补全为13位
      let arrTimestamp = (timestamp + "").split("");
      for (let start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
          arrTimestamp[start] = "0";
        }
      }
      timestamp = arrTimestamp.join("") * 1;
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      let month = day * 30;
      let now = new Date().getTime();
      let diffValue = now - timestamp;
      // 如果本地时间反而小于变量时间
      if (diffValue < 0) {
        return "不久前";
      }
      // 计算差异时间的量级
      let monthC = diffValue / month;
      let weekC = diffValue / (7 * day);
      let dayC = diffValue / day;
      let hourC = diffValue / hour;
      let minC = diffValue / minute;
      // 数值补0方法
      let zero = function (value) {
        if (value < 10) {
          return "0" + value;
        }
        return value;
      };
      // 使用
      if (monthC > 4) {
        // 超过1年，直接显示年月日
        return (function () {
          let date = new Date(timestamp);
          return (
              date.getFullYear() +
              "年" +
              zero(date.getMonth() + 1) +
              "月" +
              zero(date.getDate()) +
              "日"
          );
        })();
      } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
      }
      return "刚刚";
    },
    strategyInfo(draftInfo) {
      strategyId = draftInfo.draftId
      this.draftInfo = draftInfo
      // console.log(this.draftInfo)
      this.html = this.draftInfo.text
      this.title = this.draftInfo.draftName
      this.open = this.draftInfo.open
      this.isPublic = this.open
    },
    afterDel(dra) {
      this.allDrafts = dra
      this.draftsLength = dra.length
    }
  },
  mounted() {
    strategyId = this.$route.params.strategyId
    // console.log(JSON.parse(decodeURIComponent(this.$route.params.obj)))
    setTimeout(() => {
      this.strategyInfo(JSON.parse(decodeURIComponent(this.$route.params.obj)))
    }, 1000)
    this.getDrafts();
    // Mitt.on("msg", this.getmsg)
    // console.log(this.$route.params)
  },
  beforeDestroy() {
    // Mitt.off("msg")
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
};
</script>

<style scoped>
@import url(@wangeditor/editor/dist/css/style.css);

.container {
  width: 1200px;
  margin: 0 auto;
  /* background-color: pink; */
  /* height: 1000px; */
}

/* 页面头部 */
.tip {
  border-bottom: 3px solid #e5e5e5;
  display: flex;
  /* justify-content: center; */
  margin-bottom: 30px;
}

.tip .words {
  height: 40px;
  width: 20%;
  padding: 10px 100px 40px 0;
  text-align: right;
  color: rgb(184, 28, 34);
  font-size: 40px;
  /* margin-right: 40px; */
}

/* 公有私有 不同的展示效果 */
.display .chooseBck {
  background-color: rgb(184, 28, 34);
  /* background-color: blue; */
  color: white;
  border-radius: 40px;
  font-size: 35px;
  margin-right: 5px;
}

.notDisplay .chooseBck {
  background-color: #999999;
  /* background-color: blue; */
  color: white;
  border-radius: 30px;
  font-size: 35px;
  margin-right: 5px;
}

.public,
.private {
  display: flex;
  cursor: pointer;
  /* width: 50%; */
  /* align-items: center; */
  justify-content: center;
}

.first,
.second {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  margin-right: 50px;
}

.tip .title {
  font-size: 20px;
  color: #666666;
}

.tip .explain {
  font-size: 12px;
  color: #999999;
}

.public .first,
.private .second {
  border-bottom: 3px solid rgb(184, 28, 34);
}

.submitTip {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mainContent {
  /* height: 1000px; */
  display: flex;
}

.editContent {
  width: 70%;
  /* background-color: pink; */
  /* height: 100%; */
  margin-right: 20px;
}

.drafts {
  width: 30%;
  /* background-color: gray; */
  height: 620px;
  padding: 10px 10px;
  box-shadow: 0 0 5px gray;
}

.edit {
  margin: 20px 0;
}

.protocal {
  color: rgb(184, 28, 34);
}

.protocal:hover {
  border-bottom: 1px solid rgb(184, 28, 34);
  cursor: pointer;
}

/* .checkProtocol {
    color: rgb(184, 28, 34);
    background-color: rgb(184, 28, 34);
} */
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

/*
.submit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 0 20px;
} */
.submit .Btn {
  display: flex;
  align-items: center;
}

.saveDraft {
  color: rgb(184, 28, 34);
}

.saveDraft:hover {
  border-bottom: 1px solid rgb(184, 28, 34);
  cursor: pointer;
}

.drafts .draftTitle {
  font-size: 30px;
  color: rgb(184, 28, 34);
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #999999;
  text-align: center;
}

.drafts .content {
  overflow: auto;
  height: 550px;
}
</style>
