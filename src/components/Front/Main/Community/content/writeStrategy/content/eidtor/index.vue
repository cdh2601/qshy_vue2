<template>
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
</template>

<script>
import Vue from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import Axios from '@/utils/request.js'
import Mitt from "@/utils/mitt";

export default Vue.extend({
  components: {Editor, Toolbar},
  data() {
    return {
      editor: null,
      imageList: [],
      mode: 'default', // or 'simple'
      html: '<p>hello</p>',
      toolbarConfig: {},
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
              formData.append("strategyId", this.$route.params.strategyId);
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
              Mitt.emit("msg", src)
              // console.log('inserted image', src, alt, url, href)
            }
          }
          // checkImage: customCheckImageFn, // 也支持 async 函数
          // parseImageSrc: customParseImageSrc, // 也支持 async 函数
        }
      }
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    // getmsg(url) {
      // this._data.imageList.push(url)
      // console.log("this method", this._data.imageList)
    // }

  }, mounted() {
    // this.$bus.$emit('getHtml','sb')
    // Mitt.on("msg", this.getmsg)
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //     this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    // }, 1500)

  }, beforeDestroy() {
    Mitt.off("msg")
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style scoped>
@import url(@wangeditor/editor/dist/css/style.css);
</style>
