<template>
<div>
  <el-row class="tac">
    <el-col :span="5" style="margin-left: 20px;margin-top: 10px;width: 18.83333%;">
      <!-- <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="/setting" @click="link({ path: '/setting' })"><i class="el-icon-s-tools"></i>个人设置</el-menu-item>
        <el-menu-item index="/record" @click="link({ path: '/record' })"><i class="el-icon-s-order"></i>旅游记录</el-menu-item>
        <el-menu-item index="/like" @click="link({ path: '/like' })"><i class="el-icon-star-on"></i>点赞</el-menu-item>
        <el-menu-item index="/collect" @click="link({ path: '/collect' })"><i class="el-icon-s-flag"></i>收藏</el-menu-item> -->
<!--        <el-submenu index="1">-->
<!--          <template slot="title">-->
<!--            <i class="el-icon-location"></i>-->
<!--            <span>文化瑰宝</span>-->
<!--          </template>-->
<!--          <el-menu-item-group>-->
<!--            <el-menu-item index="/link" @click="link({ path: '/link' })">戏曲文化关系表</el-menu-item>-->
<!--            <el-menu-item index="/cultureDetail/1" @click="link({ path: '/cultureDetail/1' })">滑稽戏</el-menu-item>-->
<!--            <el-menu-item index="/cultureDetail/2" @click="link({ path: '/cultureDetail/2' })">淮剧</el-menu-item>-->
<!--            <el-menu-item index="/cultureDetail/3" @click="link({ path: '/cultureDetail/3' })">越剧</el-menu-item>-->
<!--            <el-menu-item index="/cultureDetail/4" @click="link({ path: '/cultureDetail/4' })">沪剧</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--        </el-submenu>-->
<!--        <el-submenu index="2">-->
<!--          <template slot="title">-->
<!--            <i class="el-icon-location"></i>-->
<!--            <span>相关数据</span>-->
<!--          </template>-->
<!--          <el-menu-item-group>-->
<!--            <el-menu-item index="/passengerCounting" @click="link({ path: '/passengerCounting' })">著名景点客流量</el-menu-item>-->
<!--            <el-menu-item index="/gdp" @click="link({ path: '/gdp' })">gdp</el-menu-item>-->
<!--            <el-menu-item index="/population" @click="link({ path: '/population' })">人口指标</el-menu-item>-->
<!--            <el-menu-item index="/salary" @click="link({ path: '/salary' })">薪资指标</el-menu-item>-->
<!--            <el-menu-item index="/healthy" @click="link({ path: '/healthy' })">居民健康保障</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--        </el-submenu>-->
      <!-- </el-menu> -->
      <!-- 下拉菜单 -->
          <el-menu
      default-active="1"
      class="el-menu-vertical-demo menuSettings"
      @open="handleOpen"
      @close="handleClose"
      background-color="white"
      text-color="#303133"
      active-text-color="rgb(184, 28, 34)">
      <el-menu-item index="1" @click="link({ path: '/setting' })" class="">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>  
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>我的收藏</span>
        </template>
        <el-menu-item index="2-1" @click="link({ path: '/colScienic' })"><i class="el-icon-office-building"></i>景点</el-menu-item>
        <!-- <el-menu-item index="2-2" @click="link({ path: '/colRoute' })"><i class="el-icon-location"></i>路线</el-menu-item> -->
        <el-menu-item index="2-3" @click="link({ path: '/colStragety' })"><i class="el-icon-notebook-1"></i>攻略</el-menu-item>
      </el-submenu>  
      <el-menu-item index="3" @click="link({ path: '/myRoute' })">
        <i class="el-icon-location"></i>
        <span slot="title">我的路线</span>
      </el-menu-item>  
      <el-menu-item index="4" @click="link({ path: '/myStragety' })">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">我的攻略</span>
      </el-menu-item>  
    </el-menu>
    </el-col>
    <el-col :span="19"><router-view :key="key"></router-view></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data(){
    return {
      activeIndex: this.$route.path,
    }
  },
  computed:{
    key(){
      return this.$route.fullPath
    }
  },
  methods: {
    link(path) {
      this.$router.push(path);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>
<style scoped>
.backTo h4{
  width: 80%;
  color: #8f9399;
  font-size: 25px;
  margin: 20px 0px 0 0;
  letter-spacing: 2px;
  height: 20px;
  font-family: kaiti;
}
.backTo{
  width: 350px;
  display: flex;
  padding-left: 20px;
  justify-content: space-between;
}
.backHome{
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background: #00a0ff;
  text-align: center;
  padding: 0px 0 0px 0;
  margin: 15px 0 15px 20px;
}
.menuSettings {
  border: 3px solid rgb(184, 28, 34);
  border-radius: 7px;
  /* position: fixed; */
}
</style>