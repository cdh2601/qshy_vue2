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
      <img
          src="../../../../assets/images/logo.png"
          style="cursor: pointer; width: 65px; padding: 1px 26px"
          alt="QSHY"
          @click="link({ path: '/' }), cl"
      />
      <div class="title">
        <div class="title1">QSHY</div>
        <div class="title2">数字上海旅游馆</div>
      </div>
      <div class="flex-grow"/>
      <el-menu-item index="/home" id="home" @click="link({ path: '/' })">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/map" @click="link({ path: '/map' })">
        <i class="el-icon-location"></i>
        <span>地图概览</span>
      </el-menu-item>
      <el-menu-item index="/tourism" @click="link({ path: '/tourism' })">
        <i class="el-icon-s-flag"></i>
        <span>热门景点</span>
      </el-menu-item>
      <el-menu-item index="/recommend" @click="link({ path: '/recommend' })">
        <i class="el-icon-s-order"></i>
        <span>导航推荐</span>
      </el-menu-item>
      <!-- <el-menu-item index="/message">
            <span>留言</span>
        </el-menu-item> -->
      <el-menu-item index="/login" v-show="!userInfo" @click="closeDrawer">
        <span>登录/注册</span>
      </el-menu-item>
      <el-menu-item
          index="/person"
          v-show="userInfo"
          @click="closeDrawer"
      >
        <span>已登录，进入个人主页</span>
      </el-menu-item>
      <el-menu-item v-show="userInfo">
        <el-dropdown style="width:100%;height: 100%;cursor: pointer;">
          <div class="el-dropdown-link" style="width:100%;margin: auto;">
            <img v-if="state.userInfo.avatar !== null && state.userInfo.avatar !== ''" :src="url+state.userInfo.avatar"
                 style="width: 30px;margin-right: 10px;vertical-align:middle;border-radius: 50px;"/>
            <img v-if="state.userInfo.avatar=== null ||state.userInfo.avatar === ''"
                 src="../../../../assets/images/logo.png"
                 style="width: 30px;margin-right: 10px;vertical-align:middle;border-radius: 50px;">
            <span>{{ state.userName }}</span>
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toPath('/person')">个人设置</el-dropdown-item>
              <el-dropdown-item divided @click="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import { ref, reactive, toRefs, watch, onMounted } from "vue";

// import { useRoute, useRouter } from "vue-router";

export default {
  name: "Header",
  data() {
    return {
      url: process.env.VUE_APP_URL,
      state: {
        userInfo: "",
        username: ''
      },
      activeIndex: this.$route.path,
    };
  },
  methods: {
    link(path) {
      this.$router.push(path);
    },
    cl() {
      document.getElementById("home").click();
    },
    exit() {
      // console.log("sb")
      // 清除用户登录信息
      sessionStorage.removeItem("userInfo");
      // 刷新界面
      location.reload(true);
    },
    toPath(path) {
      window.location.href = path
    },
    // 关闭抽屉
    closeDrawer() {
      this.$emit("onCloseDrawer", false);
    }
  },
  mounted() {
    const tokenStr = sessionStorage.getItem("userInfo");
    if (tokenStr) {
      const userInfo = JSON.parse(tokenStr);
      // console.log(userInfo)
      this.state.username = userInfo.username;
      this.state.userInfo = userInfo;
      // console.log(this.state.userInfo)
    }
  }
  // setup() {
  //   // const route = useRoute();
  //   // const router = useRouter();
  //   const state = reactive({
  //     // activeIndex: sessionStorage.getItem('activeIndex1'), // 默认为空
  //     // screenWidth: document.body.clientWidth, //屏幕可视区宽度
  //     // 当前登录的用户信息
  //     userInfo: "",
  //     // 服务器路径
  //     url: process.env.VUE_APP_URL,
  //   });
  //   onMounted(() => {
  //     // 获取用户信息
  //     const tokenStr = sessionStorage.getItem("userInfo");
  //     if (tokenStr) {
  //       const userInfo = JSON.parse(tokenStr);
  //       state.userInfo = userInfo.data[0];
  //       console.log(state.userInfo);
  //     }
  //   });
  //   // 退出登录
  //   const exit = () => {
  //     // 清除用户登录信息
  //     window.sessionStorage.removeItem("userInfo");
  //     // 刷新界面
  //     window.location.reload(true);
  //   };
  //   // 前往某个界面
  //   const toPath = (path) => {
  //     window.location.href = path;
  //   };
  // // 菜单激活回调  index:path 路由 当前选择菜单的路由 index
  // const handleSect = ((index) => {
  //     sessionStorage.setItem('activeIndex1', index)
  // })
  // // 捕获 听器  获取窗口宽高
  // window.addEventListener('resize', () => {
  //     // 窗口宽度 screenWidth
  //     state.screenWidth = document.body.clientWidth;
  // })
  // // 监听器1：当前监听当前窗口是否改变，val为修改后的值,preVal为修改前的值
  // watch(() => state.screenWidth, (val, preVal) => {
  //     // 判断窗口改变后是否大于768px，大于则将sessionStorage中存储的值= activeIndex(当前选中菜单的index)
  //     // sessionStorage用于存储两个菜单其中一个更改了选项的路由(就是菜单的index)
  //     if (val > 768) {
  //         // sessionStorage存储的值传给activeIndex
  //         state.activeIndex = sessionStorage.getItem('activeIndex1');
  //         // 监听器2：当前监听sessionStorage第一次进入界面的时候是为空的
  //         // 那么就应该给sessionStorage赋初始值('/')
  //         watch(() => sessionStorage.getItem('activeIndex1'), (val,
  //             preVal) => { // val为修改后的值,preVal为修改前的值
  //             // 为什么是val不是preVal，因为我们赋初始值时赋的时sessionStorage.getItem('activeIndex1')
  //             // 一开始sessionStorage.getItem('activeIndex1')是没有数据的，所有为空，则需要在这进行非空验证
  //             // 为空则赋值'/'(首页)
  //             if (val == null) {
  //                 // 为空则菜单的index就为'/'(首页)
  //                 state.activeIndex = "/"
  //             }
  //             console.log(val);
  //             console.log(val == null);
  //             console.log(val == "");
  //         }, {
  //             immediate: true, // 立刻监听
  //             deep: true, // 深度监听
  //         })
  //     }
  // }, {
  //     immediate: true, // 立刻监听
  //     deep: true, // 深度监听
  // })
  // return {
  //   ...toRefs(state),
  //   // handleSect,
  //   // route,
  //   // router,
  //   exit,
  //   toPath,
  // };
  // },
};
</script>

<style scoped>
.title {
  margin: -13px 10px 0px 0px;
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
  font-size: 6px;
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
  background-color: rgb(184, 28, 34);
}

.header-img {
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 90px;
}

.el-menu--horizontal > .el-menu-item a {
  color: #303133;
}

.el-menu--horizontal > .el-menu-item a:hover {
  color: rgb(184, 28, 34);
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
  background-color: rgb(184, 28, 34);
  color: rgb(184, 28, 34);
}

a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: rgb(184, 28, 34);
}
</style>

