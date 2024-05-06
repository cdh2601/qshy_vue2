<template>
  <!-- <div id="front" :style="backgroundDiv"> -->
  <div id="front">
    <div class="common-layout">
      <el-container>
        <!-- 页眉 -->
        <el-header
          style="
            width: 100%;
            height: 60px;
            margin: -5px;
            position: fixed;
            z-index: 999;
          "
        >
          <MenuTop></MenuTop>
        </el-header>
        <!-- 主要的 -->
        <el-main style="margin:55px 0 0 0 ; overflow:initial;">
          <router-view></router-view>
        </el-main>
        <!-- 页尾\页脚 -->
        <el-footer class="front_footer">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </div>

    <OpenAiBtn></OpenAiBtn>
    <!-- Backtop 回到顶部 -->
    <BackTop></BackTop>

    <!-- 打开菜单栏固钉 -->
    <!--    <MenuRight></MenuRight>-->
  </div>
</template>

<script>
// 引入顶部菜单栏自定义组件
import MenuTop from "./Header/index";
// 引入页尾\页脚版权信息自定义组件
import Footer from "./Footer/index";
// 引入回到顶部固钉自定义组件
import BackTop from "./Affix/BackTop";
// 引入openai
import OpenAiBtn from "./Affix/OpenAiBtn";
// 引入打开菜单固钉自定义组件
import MenuRight from "./Affix/Menu";
export default {
  name: "Main",
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../../assets/images/bg.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
    };
  },
  components: {
    MenuTop,
    Footer,
    BackTop,
    OpenAiBtn
    // MenuRight,
  },
};
</script>

<style>
.front_footer {
  border-top: 1px solid #ebebeb;
  background: #fff;
}
</style>