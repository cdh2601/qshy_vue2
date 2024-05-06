<template>
  <div class="hidden-xs-only header-menu">
    <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        :ellipsis="false"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="rgb(184, 28, 34)"
        style="display: flex"
    >
      <div class="flex-grow"/>
      <img
          src="../../../assets/images/logo.png"
          style="
          cursor: pointer;
          width: 65px;
          padding: 1px 25px 1px 50px;
          box-sizing: content-box;
        "
          alt="QSHY"
          @click="linkimg({ path: '/' })"
      />
      <div class="title">
        <div class="title1">DHU</div>
        <div class="title2">上海地区智能旅游平台</div>
      </div>
      <div class="flex-grow"/>
      <form class="flex-form" style="width: 35%;text-align: center;">
        <label for="from">
          <i
              class="el-icon-location"
              style="margin-top: 24px; margin-left: 10px; margin-right: 10px"
          ></i>
        </label>
        <input type="text" placeholder="我想去..." v-model="keyword"/>
        <button class="searchBtn" type="button" index="/search" @click="goSearch">
          <i class="el-icon-search" style="font-size:30px;">
          </i>
        </button>
      </form>
      <div class="flex-grow"/>
      <el-menu-item index="/home" ref="config" @click="link({ path: '/' })">
        <i class="el-icon-s-home iHover"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/tourism" @click="link({ path: '/tourism' })">
        <i class="el-icon-s-flag iHover"></i>
        <span>热门景点</span>
      </el-menu-item>
      <el-menu-item index="/recommend" @click="link({ path: '/recommend' })">
        <i class="el-icon-location iHover"></i>
        <span>路线规划</span>
      </el-menu-item>
      <el-menu-item index="/community" @click="link({ path: '/community' })">
        <i class="el-icon-s-order iHover"></i>
        <span>游记攻略</span>
      </el-menu-item>
      <el-menu-item index="/login" @click="link({ path: '/login' })" class="loginA" style="line-height: 60px"
                    v-show="!state.userInfo">
        <span>登录/注册</span>
      </el-menu-item>
      <div class="flex-grow"/>
      <!-- <a
        href="/login"
        target="_blank"
        class="loginA"
        style="margin-top: 5px"
        v-show="!state.userInfo"
      >
        登录/注册
      </a> -->
      <el-dropdown
          v-show="state.userInfo"
          style="cursor: pointer;margin-left: -10px;width: 140px;"
          @command="handleCommand"
      >
        <div class="el-dropdown-link" style="margin: 22px 0px 0 0">
          <img
              v-if="
              state.userInfo.avatar !== null && state.userInfo.avatar !== ''
            "
              :src="state.userInfo.avatar"
              style="
              width: 30px;
              margin: -5px 10px 0px 10px;
              vertical-align: middle;
              border-radius: 50px;
            "
          />
          <img
              v-if="
              state.userInfo.avatar === null || state.userInfo.avatar === ''
            "
              src="../../../assets/images/logo.png"
              style="
              width: 30px;
              margin: -5px 10px 0px 10px;
              vertical-align: middle;
              border-radius: 50px;
            "
          />
          <span
              style="
              cursor: pointer;
              font-size: 15px;
              letter-spacing: 1px;
              font-weight: 600;
              color: rgb(184, 28, 34);
            "
          >{{ state.userName }}</span
          >
          <i class="el-icon-arrow-down" style="color: rgb(184, 28, 34)"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item index="/person" command="a"
            >个人主页
            </el-dropdown-item
            >
            <el-dropdown-item divided command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import AxiosOpenAi from "@/utils/requestOpenAi";

export default {
  name: "Header",
  data() {
    return {
      keyword: "",
      url: process.env.VUE_APP_URL,
      state: {
        userInfo: "",
        userName: "",
      },
      activeIndex: this.$route.path
    };
  },
  methods: {
    goSearch() {
      if (this.keyword == "") {
        this.$message('请输入关键字后再试试')
        // window.location.href = "/searchAll";
        // this.activeIndex = "";
      } else {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || { userId: '0' };
        let params = {
          userId: userInfo.userId,
          keyword: this.keyword,
        };
        AxiosOpenAi.get("book/api/users",{ params });
        window.location.href = "/searchAll?keyword=" + this.keyword;
        this.keyword = "";
        this.activeIndex = "";
      }
    },
    link(path) {
      this.$router.push(path);
    },
    linkimg(path) {
      this.$router.push(path);
      this.$refs.config.$el.click();
    },
    handleCommand(command) {
      if (command === "a") {
        this.$router.push("/person");
        this.activeIndex = "";
        // console.log("sb");
      } else {
        this.exit();
      }
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    exit() {
      // console.log("sb")
      // 清除用户登录信息
      sessionStorage.removeItem("userInfo");
      window.location.href = "/";
    },
    toPath(path) {
      window.location.href = path;
    },
  },
  watch: {
    $route() {
      this.activeIndex = this.$route.path
    }
  },
  mounted() {

    const tokenStr = sessionStorage.getItem("userInfo");
    if (tokenStr) {
      const userInfo = JSON.parse(tokenStr);
      // console.log(userInfo)
      this.state.userName = userInfo.userName;
      this.state.userInfo = userInfo;
      // console.log(this.state.userInfo)
    }
  },
};
</script>

<style scoped>
.title {
  margin: -11px 0px 0px 0px;
  padding-right: 10px;
  width: 95px;
}

.title1 {
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 23px 0px 11px -12px;
  color: rgb(184, 28, 34);
}

.title2 {
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.5px;
  margin: 0 0px 0px -12px;
  color: rgb(184, 28, 34);
}

/* 顶部菜单栏 */
.flex-grow {
  flex-grow: 1;
}

.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: rgb(184, 28, 34);
  background-color: #edc5c6;
}

.header-img {
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 90px;
}

.el-menu--horizontal > .el-menu-item a {
  color: #303133;
  transition: 0.3s;
}

.el-menu--horizontal > .el-menu-item a:hover {
  color: rgb(184, 28, 34);
}

.el-menu--horizontal > .el-menu-item:hover .iHover{
  color: rgb(184, 28, 34);
  transition: 0.3s;
}

.loginA {
  line-height: 56px;
  font-size: 14px;
  margin-left: 10px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
  background-color: #edc5c6;
  color: rgb(184, 28, 34);
}

a {
  color: #edc5c6;
  text-decoration: none;
}

a:hover {
  color: rgb(184, 28, 34);
}

.flex-form button[type="button"] {
  background: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  color: #fff;
  /* padding: 0 30px; */
  width: 80px;
  cursor: pointer;
  transition: all 0.2s;
  /* margin-left: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.flex-form button[type="button"]:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}

.flex-form {
  display: flex;
  z-index: 10;
  position: relative;
  height: 65px;
  margin-right: 20px;
  width: 600px;
  border-left: 1px solid #e6e6e6;
}

.flex-form > * {
  border: 0;
  padding: 0 0 0 10px;
  background: #fff;
  line-height: 50px;
  font-size: 1rem;
  border-radius: 0;
  outline: 0;
  -webkit-appearance: none;
}

input[type="text"] {
  /* flex-basis: 4px; */
  width: 500px;
}

.searchBtn {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  /* width: 30px; */
}
.el-menu-item i {
    color: #edc5c6;
    transition: 0.3s;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #edc5c6;
  color: rgb(184, 28, 34);
}
.el-popper[x-placement^=bottom] {
    margin-top: -15px;
    margin-left: -10px;
}
</style>
