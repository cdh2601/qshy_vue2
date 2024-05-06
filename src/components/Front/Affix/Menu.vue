<template>
  <div>
    <!-- 打开菜单栏固钉 -->
    <div class="menu_box hidden-sm-and-up" @click="visible = true" title="菜单">
      <el-icon :size="20">
        <Menu />
      </el-icon>
    </div>

    <div class="hidden-sm-and-up">
      <el-drawer v-model="visible" :show-close="true" size="55%">
        <!-- 标题 -->
        <template #header="{ close, titleId, titleClass }">
          <img src="../../../assets/images/logo.png" alt="" style="width: 60%" />
        </template>

        <!-- 内容 -->
        <MenuList @onCloseDrawer="closeDrawer"></MenuList>
      </el-drawer> 
    </div>
  </div>
</template>

<script>
// 引入菜单列表自定义组件
import MenuList from "./Menu/MenuList";
// import { Menu } from "element-ui";
// import { ref, reactive, toRefs, onMounted } from "vue";
// import { ElButton, ElDrawer } from "element-plus";
// import { CircleCloseFilled } from "@element-plus/icons-vue";

export default {
  components: {
    MenuList
  },
  data(){
    return{
      state:{
        visible: false,
      }
    }
  },
  mounted(){
    this.getWindowResize();
    window.addEventListener("resize", this.getWindowResize);
  },
  methods:{
    getWindowResize() {
      if (window.innerWidth > 768) {
        this.state.visible = false;
      }
    },
    closeDrawer(val){
      this.state.visible = val;
    }
  },
};
</script>

<style scoped>
/* 打开菜单栏固钉 */
.menu_box {
  height: 40px;
  width: 40px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #e9e9e9;
  color: #646464;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--el-box-shadow-lighter);
  cursor: pointer;
  right: 40px;
  bottom: 150px;
  text-align: center;
  line-height: 50px;
  z-index: 999;
}

/* css注释：设置了浏览器宽度不大于768px时 */
@media screen and (max-width: 768px) {
  .hidden-sm-and-up {
    display: block !important;
  }
}

@media screen and (min-width: 768px) {
  .hidden-sm-and-up {
    display: none !important;
  }
}

.menu_box:hover {
  /* background-color: rgba(47, 167, 185); */
  /* 1、linear-gradient() 线性渐变 2、radial-gradient() 径向渐变 3、repeating-linear-gradient() 重复线性渐变 4、repeating-radial-gradient() 重复径向渐变  */
  background: repeating-linear-gradient(rgb(184, 28, 34), #535b9a);
  color: white;
}

/* 抽屉菜单样式 */
:global(.el-drawer.rtl) {
  overflow: initial;
}

:global(.el-drawer__close-btn) {
  margin-left: 30% !important;
}
</style>