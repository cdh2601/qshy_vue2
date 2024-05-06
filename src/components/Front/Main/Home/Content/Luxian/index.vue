<template>
  <div class="luxian" style="border-radius: 0px; i-right: 65px">
    <div class="luxianTop">
      <h2 class="title" style="color: rgb(184, 28, 34);">推荐路线</h2>
      <h2 class="suikou">让你的旅行，不止拍拍照就离开</h2>
      <h3 class="more"><router-link :to="`/recommend`">更多>></router-link></h3>
    </div>
    <div
      class="luxainMain"
      style="display: flex; justify-content: space-between"
    >
      <div class="mainLeft" style="width: 70%; margin-left: 55px">
        <ul style="padding-bottom: 30px; margin-top:32px;">
          <!-- 单个路线块 -->
          <div class="route-item" v-for="(recRouteList,index) in recRoutes" :key="index" @click="goRouteMsg(recRouteList.routeId)">
            <div class="picture">
              <img :src="recRouteList.scenics[0].scenicImages[0]">
            </div>
            <div class="route-msg">
              <div class="route-name">{{ recRouteList.routeName }}</div>
              <!-- <div class="score">
          <el-rate :value="Number(recRouteList.score)"
                   disabled
                   score-template="{value}"></el-rate>
          <div class="score-text">
            <span>评分:{{ recRouteList.score }}分</span>
          </div>
        </div> -->
              <div class="relative-msg">
                <div style="margin-right: 20px">
                  <span style="color: rgb(184, 28, 34)">{{ recRouteList.commentUsers.length }}</span
                  >&nbsp;条点评
                </div>
                <div>
                  <span style="color: rgb(184, 28, 34)">{{ recRouteList.collectionUsers.length }}</span
                  >&nbsp;次收藏
                </div>
              </div>
              <div class="locations">
                <div>景点:</div>
                <ul class="location-list">
                  <li v-for="(scenicList,index) in recRouteList.scenics" :key="index">
                    <router-link :to="`/detail/${scenicList.scenicId}`">{{ scenicList.scenicName }}</router-link>
                  </li>
                </ul>
              </div>
              <div class="region">
                <div>所在区:</div>
                <ul class="location-list">
                  <li v-for="(locationName,index) in recRouteList.locationList" :key="index">{{ locationName }}</li>
                </ul>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div
        class="mainRight"
        style="margin-top: 30px; width: 15%; margin-right: 100px"
      >
        <div class="goRecommend">
          <div class="goContent">
            <h2 class="zidingyi">自定义路线</h2>
            <h3 class="dianji">点击前往</h3>
            <router-link :to="`/recommend`" style="text-decoration: none"
              ><div class="content-button">Click me</div></router-link
            >
            <img class="goContentImg" src="@/assets/images/glass.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "@/utils/request";

export default {
  data(){
    return{
      recRoutes:[],
    }
  },
  methods:{
    goRouteMsg(routeId) {
      let obj = new Object()
      this.$router.push({
        path: '/routeMsg/' + routeId + '/' + obj
      })
    },
    init(){
      let params={
        // area:this.areaSelect
      }
      Axios.get('route/getRoutes',{
        params
      }).then((res)=>{
        // console.log(res)
        if(res.code===200){
          this.recRoutes=[]
          for(let i=0;i<3;i++){
            this.recRoutes.push(res.data.routes[i])
          }
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style scoped lang="less">
.luxianTop {
  border-bottom: 2px solid #e6e6e6;
  margin-left: 20px;
}

.luxianTop .title {
  font-size: 35px;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 500;
}

.luxianTop .suikou {
  color: rgb(169, 169, 169);
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.luxianTop .more {
  color: #8e9399;
  position: relative;
  float: right;
  font-size: 16px;
  cursor: pointer;
  margin: -40px 25px 0px 0px;
  font-style: normal;
}

.goRecommend {
  height: 695px;
  background: #0071e7;
  border-radius: 10px;
}

.luxianTitle {
  margin-top: 15px;
  margin-right: 10px;
}

li {
  transition: all 0.4s ease-out;
}

li:hover {
  box-shadow: 0px 35px 77px -17px rgb(0 0 0 / 64%);
  transform: scale(1.02);
  cursor: pointer;
}
.goContentImg {
  width: 100%;
  height: 100%;
  //margin-left: -25px;
}
.content-button {
  background-color: white;
  border: none;
  padding: 8px 26px;
  color: black;
  text-align: center;
  border-radius: 20px;
  margin: 25px auto;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
  width: 50%;
}
.content-button:hover {
  color: white;
  background-color: rgb(184, 28, 34);
}
.goContent {
  padding-top: 50px;
}
.zidingyi {
  font-size: 35px;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 500;
  color: white;
  padding-top: 70px;
}
.dianji {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}
.luxianIntroduction {
  margin-right: 10px;
}
.more a {
  color: #8e9399;
  text-decoration: none;
}
.route-item {
  margin: 0 auto;
  //width: 1060px;
  height: 225px;
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 0 0 3px gray;
  display: flex;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  transition: 0.2s all linear;
}

.route-item:hover {
  box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.64);
  transform: scale(1.02);
  cursor: pointer;
}

.route-item .picture {
  width: 300px;
  height: 100%;
  /*background-image: url("./images/上海背景图.jpg");*/
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-right: 20px;
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
}

.route-item .picture img {
  width: 300px;
  height: 100%;
}
.route-msg {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.route-msg .route-name {
  font-size: 25px;
  font-weight: bold;
  color: rgb(184, 28, 34);
  margin-bottom: 10px;
}

.score {
  margin: 10px;
  display: flex;
  align-items: center;
}

.score .score-text {
  margin-left: 10px;
  font-size: 18px;
  width: 100px;
  height: 30px;
  background-color: rgb(184, 28, 34);
  color: white;
  text-align: center;
  border-radius: 10px;
}

.route-msg .relative-msg {
  display: flex;
  font-size: 18px;
}

.locations {
  color: gray;
  font-size: 15px;
  display: flex;
  margin-top: 10px;
}

.locations ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.locations ul li {
  padding: 0 10px;
  margin: 0;
  list-style: none;
  border-right: 1px solid gray;
}

.locations ul li:last-child {
  border-right: none;
}

.locations ul li a {
  text-decoration: none;
  color: #666;
}

.locations ul li a:hover {
  color: rgb(184, 28, 34);
  text-decoration: none;
}

.region {
  color: gray;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
}

.region ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.region ul li {
  padding: 0 10px;
  margin: 0;
  list-style: none;
  border-right: 1px solid gray;
}

.region ul li:last-child {
  border-right: none;
}
</style>
