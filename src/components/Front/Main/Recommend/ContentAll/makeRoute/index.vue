<template>
  <div>
    <div class="container">
      <!-- 左侧搜索区域 -->
      <div class="search">
        <div class="twoSearch">
          <div class="route-msg">
            <div class="createWords">自定义路线</div>
            <div class="origion">
              <div class="box">
                出发地：<input v-model="start" placeholder="请输入出发地" @input="searchEvent"/>
                <div :class="{ downDrop: detailShow.length != 0 }">
                  <li
                      v-for="(detailName, index) in detailShow"
                      :key="index"
                      @click="buquan(detailName)"
                  >
                    {{ detailName }}
                  </li>
                </div>
              </div>
            </div>
            <div class="destination">
              <div class="box">
                目的地：<input v-model="end" placeholder="请输入目的地" @input="searchEvent1"/>
                <div :class="{ downDrop1: detailShow1.length != 0 }">
                  <li
                      v-for="(detailName, index) in detailShow1"
                      :key="index"
                      @click="buquan1(detailName)"
                  >
                    {{ detailName }}
                  </li>
                </div>
              </div>
            </div>
            <button @click="createRoute()">创建路线</button>
          </div>
        </div>
        <!-- 添加景点 -->
        <div class="addSpot">
          <div class="addSearch">
            <div class="searchTip">添加景点</div>
            <div class="searcSpot">
              <input type="text" v-model="keyword" placeholder="请输入景点名称"/>
              <!--              <div :class="{ downDrop2: detailShow2.length != 0 }">-->
              <!--                <li-->
              <!--                    v-for="(detailName, index) in detailShow2"-->
              <!--                    :key="index"-->
              <!--                    @click="buquan2(detailName)"-->
              <!--                >-->
              <!--                  {{ detailName }}-->
              <!--                </li>-->
              <!--              </div>-->
              <button @click="searchScenic()">
                <i class="el-icon-search"></i>
              </button>
            </div>
            <div class="SpotList">
              <!-- 景点项 -->
              <spotItem :spotList="spotList"></spotItem>
            </div>
            <div class="addSubmit">
              <button @click="addScenic()">添加</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧路线列表区域 -->
      <div class="route-list">
        <div class="title">
          <!-- <div class="routeNameTip">路线名称</div> -->
          <div class="routeName">
            <input type="text" placeholder="请输入路线名称" v-model="makeRoute.routeName">
            <button @click="changeRouteName(makeRoute.routeName)">修改</button>
          </div>
          <!-- <div class="changeRouteName">
            <button>修改路线名</button>
            <button>确认修改</button>
          </div> -->
        </div>
        <div class="content">
          <div class="routeRegion">
            <div class="routeListTip">
              <span>路线列表</span>
            </div>
            <div class="routeContent" v-if="viewPort===true">
              <routeListItem :makeRoute="makeRoute"></routeListItem>
            </div>
            <div class="routeContent" v-if="viewPort===false">
              <div style="margin: 0 auto; width: 600px;text-align: center; margin-top: 250px;">
                <h2 style="color:rgb(184, 28, 34)">输入出发地和目的地，开始编辑你的路线吧！</h2>
                <img style="width: 250px;height: 250px" src="@/assets/images/glass.png">
              </div>
            </div>
          </div>
          <div class="changeRoute">
            <button @click="goRecRouteHome">路线规划首页</button>
            <div class="btn">
              <button @click="deleteScenic()">删除景点</button>
              <button @click="goRouteMsg()">生成路线</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import spotItem from '@/components/Front/Main/Recommend/ContentAll/makeRoute/ContentAll/spotItem'
import routeListItem from '@/components/Front/Main/Recommend/ContentAll/makeRoute/ContentAll/routeListItem'
import Axios from "@/utils/request";
import {nanoid} from "nanoid";

export default {
  name: "makeRoute",
  inject: ["reload"],
  data() {
    return {
      start: '',
      end: '',
      keyword: '',
      detailShow: [],
      detailShow1: [],
      detailShow2: [],
      timer: null,
      len: false,
      makeRoute: {},
      spotList: [],
      scenicId: '',
      scenicIds: [],
      viewPort: false
    }
  },
  components: {spotItem, routeListItem},
  methods: {
    changeRouteName(name) {
      if (!this.makeRoute.routeId) {
        this.$message('请创建路线再修改路线名称')
      } else {
        // console.log(name)
        let params = {
          routeId: this.makeRoute.routeId,
          name: name
        }
        Axios.get('/route/changeRouteName', {
          params
        }).then((res) => {
          // console.log(res)
          if(res.code===200){
            this.$message.success('路线名称修改成功')
            this.makeRoute.routeName = res.data.route.routeName
          }
        })
      }
    },
    createRoute() {
      if (this.start === this.end) {
        this.$message('出发地和目的地不能相同')
      }else if(this.start===''||this.end===''){
        this.$message('请完整输入出发地和目的地')
      }
      else {
        this.viewPort = true
        let params = {
          routeId: nanoid(8),
          startName: this.start,
          endName: this.end,
          userId: JSON.parse(sessionStorage.getItem('userInfo')).userId
        }
        Axios.post('route/initRoute', {}, {params}).then((res) => {
          // console.log(res)
          this.makeRoute = res.data.route
          for (let i = 0; i < this.makeRoute.scenics.length; i++) {
            this.makeRoute.scenics[i].checked = false
          }
          // console.log(this.makeRoute )
        })
      }
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    buquan(name) {
      this.start = name
      this.detailShow = []
    },
    buquan1(name) {
      this.end = name
      this.detailShow1 = []
    },
    buquan2(name) {
      this.keyword = name
      this.detailShow2 = []
    },
    goRecRouteHome() {
      this.$router.push('/recommend')
    },
    searchEvent() {
      this.clearTimer();
      if (this.start && this.start.length > 0) {
        this.len = true;
        this.timer = setTimeout(() => {
          let params = {
            scenicName: this.start,
            pageNum: 1,
            pageSize: 8,
          }
          //此处为接口函数，获取所有带有关键字的商品名字，拿前10个
          Axios.get('/scenic/search', { //获取所有带有关键字的商品名字
            params
          }).then((res) => {
            // console.log(res)
            res.data.scenics.records.forEach((element) => {
              this.detailShow.push(element.scenicName)
            })
          })
          this.detailShow = []
          // this.detailShow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        }, 500);
      } else {
        if (this.len) {
          // console.log(this.start);
          this.detailShow = [];
        }
        if (this.start === "") {
          this.len = false;
          return;
        }
      }
    },
    searchEvent1() {
      this.clearTimer();
      if (this.end && this.end.length > 0) {
        this.len = true;
        this.timer = setTimeout(() => {
          let params = {
            scenicName: this.end,
            pageNum: 1,
            pageSize: 8,
          }
          //此处为接口函数，获取所有带有关键字的商品名字，拿前10个
          Axios.get('/scenic/search', { //获取所有带有关键字的商品名字
            params
          }).then((res) => {
            // console.log(res)
            res.data.scenics.records.forEach((element) => {
              this.detailShow1.push(element.scenicName)
            })
          })
          this.detailShow1 = []
          // this.detailShow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        }, 500);
      } else {
        if (this.len) {
          // console.log(this.start);
          this.detailShow1 = [];
        }
        if (this.end === "") {
          this.len = false;
          return;
        }
      }
    },
    searchScenic() {
      if (this.keyword == '') {
        this.spotList = []
        let params = {
          scenicName: '上海',
          pageNum: 1,
          pageSize: 56,
        }
        //此处为接口函数，获取所有带有关键字的商品名字，拿前10个
        Axios.get('/scenic/search', { //获取所有带有关键字的商品名字
          params
        }).then((res) => {
          // console.log(res)
          this.spotList = res.data.scenics.records
          for (let i = 0; i < this.spotList.length; i++) {
            this.spotList[i].checked = false
          }
          // console.log(this.spotList)
          // res.data.scenics.records.forEach((element)=>{
          //   let obj=new Object();
          //   obj['checked']=false
          //   element.push(obj)
          // })
        })
      } else {
        this.spotList = []
        let params = {
          scenicName: this.keyword,
          pageNum: 1,
          pageSize: 56,
        }
        //此处为接口函数，获取所有带有关键字的商品名字，拿前10个
        Axios.get('/scenic/search', { //获取所有带有关键字的商品名字
          params
        }).then((res) => {
          // console.log(res)
          this.spotList = res.data.scenics.records
          for (let i = 0; i < this.spotList.length; i++) {
            this.spotList[i].checked = false
          }
        })
      }
    },
    checkScenic(id) {
      for (let i = 0; i < this.spotList.length; i++) {
        if (this.spotList[i].scenicId === id) {
          this.spotList[i].checked = !(this.spotList[i].checked)
        }
      }
    },
    checkScenicDelete(id) {
      // console.log(this.makeRoute)
      for (let i = 0; i < this.makeRoute.scenics.length; i++) {
        if (this.makeRoute.scenics[i].scenicId === id) {
          this.makeRoute.scenics[i].checked = !(this.makeRoute.scenics[i].checked)
        }
      }
    },
    addScenic() {
      let sum = 0;
      for (let i = 0; i < this.spotList.length; i++) {
        if (this.spotList[i].checked === true) {
          sum++;
        }
      }
      if (sum == 2) {
        this.$message('仅能添加一个景点')
      } else if (sum == 1) {
        if (!this.makeRoute.routeId) {
          this.$message('请创建路线再添加景点')
        } else {
          for (let i = 0; i < this.spotList.length; i++) {
            if (this.spotList[i].checked === true) {
              // this.$bus.$emit('toScenicId', this.spotList[i].scenicId)
              // console.log(this.makeRoute)
              // console.log(this.scenicIds)
              let params = {
                routeId: this.makeRoute.routeId,
                scenicId: this.spotList[i].scenicId,
              }
              Axios.post('/route/addScenic', {}, {params}).then((res) => {

                // console.log(res)
                if (res.code === 603) {
                  this.$message('景点已被添加')
                } else {
                  this.makeRoute = res.data.route
                  for (let i = 0; i < this.makeRoute.length; i++) {
                    this.makeRoute[i].checked = false
                  }
                }
              })
              this.keyword = ''
              this.searchScenic()
            }
          }
        }
      } else {
        this.$message('未选择景点')
      }
    },
    deleteScenic() {
      if(!this.makeRoute.routeId){
        this.$message('请创建路线再删除景点')
      }else {
        let sum = 0;
        for (let i = 0; i < this.makeRoute.scenics.length; i++) {
          if (this.makeRoute.scenics[i].checked === true) {
            sum++;
          }
        }
        if (sum == 2) {
          this.$message('仅能删除一个景点')
        } else if (sum == 1) {
          for (let i = 0; i < this.makeRoute.scenics.length; i++) {
            if (this.makeRoute.scenics[i].checked === true) {
              // this.$bus.$emit('toScenicId', this.spotList[i].scenicId)
              // console.log(this.makeRoute)
              // console.log(this.scenicIds)
              let params = {
                routeId: this.makeRoute.routeId,
                scenicId: this.makeRoute.scenics[i].scenicId,
              }
              Axios.post('/route/deleteScenic', {}, {params}).then((res) => {

                // console.log(res)
                this.makeRoute = res.data.route
                for (let i = 0; i < this.makeRoute.scenics.length; i++) {
                  this.makeRoute.scenics[i].checked = false
                }
              })
              this.keyword = ''
              this.searchScenic()
            }
          }
        } else {
          this.$message('未选择景点')
        }
      }
    },
    goRouteMsg() {
      // console.log(this.makeRoute)
      if (!this.makeRoute.routeId) {
        this.$message('请创建路线')
      } else {
        this.$message.success('路线已成功保存至我的路线')
        this.$router.push({
          path: '/routeMsg/' + this.makeRoute.routeId + '/' + encodeURIComponent(JSON.stringify(this.makeRoute))
        })
      }
    }
  },
  mounted() {
    // console.log(this.$route.query)
    this.start = this.$route.query.start
    this.end = this.$route.query.end
    if (this.$route.query.routeId) {
      this.viewPort=true
      let params = {
        routeId: this.$route.query.routeId
      }
      Axios.get('route/singleRoute', {
        params
      }).then((res) => {
        this.makeRoute = res.data.route
      })
    } else {
      if (this.start !== '' && this.end !== '') {
        if (this.start === this.end) {
          this.$message('出发地和目的地不能相同')
        } else {
          this.createRoute()
        }
      } else {
        this.$message('请输入路线的出发地和目的地再创建路线')
      }
    }
    this.searchScenic()
    this.$bus.$on('checkScenic', this.checkScenic)
    this.$bus.$on('checkScenicDelete', this.checkScenicDelete)
  }
};
</script>

<style scoped>
.downDrop {
  width: 360px;
  position: absolute;
  margin-left: -14px;
  margin-top: 13px;
  background: #ffffff;
  max-height: 180px;
  overflow: auto;
  border: 1px solid grey;
  border-radius: 2px;
  border-top: none;
}

.downDrop li {
  line-height: 3;
  padding-left: 10px;
  cursor: pointer;
  list-style: none;
}

.downDrop li:hover {
  color: white;
  background: rgb(184, 28, 34);
}

.downDrop1 {
  width: 360px;
  position: absolute;
  margin-left: -14px;
  margin-top: 13px;
  background: #ffffff;
  max-height: 180px;
  overflow: auto;
  border: 1px solid grey;
  border-radius: 2px;
  border-top: none;
}

.downDrop1 li {
  line-height: 3;
  padding-left: 10px;
  cursor: pointer;
  list-style: none;
}

.downDrop1 li:hover {
  color: white;
  background: rgb(184, 28, 34);
}

.downDrop2 {
  width: 365px;
  position: absolute;
  margin-left: -15px;
  margin-top: 15px;
  background: #ffffff;
}

.downDrop2 li {
  line-height: 3;
  /*padding-left: 46px;*/
  cursor: pointer;
  list-style: none;
}

.downDrop2 li:hover {
  color: #830606;
  background: #f770701c;
}

.container {
  width: 1500px;
  background-color: rgb(220, 220, 220);
  margin: 0 auto;
  /* height: 1200px; */
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  /* justify-content: space-around; */
}

/* 左侧搜索栏 */
.search {
  width: 500px;
  background-color: white;
  border-radius: 5px;
  margin-right: 10px;
}

/* 右侧列表栏 */
.route-list {
  width: 100%;
  background-color: white;
  border-radius: 5px;
}

/* #region左侧搜索栏 */
.twoSearch .createWords {
  text-align: center;
  font-size: 35px;
  text-shadow: 0 0 2px gray;
  color: rgb(184, 28, 34);
  margin: 10px 0;
}

.twoSearch .route-msg {
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  font-size: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px gray;
  background-color: white;
}

.twoSearch .route-msg input {
  /* height: 20px; */
  font-size: 20px;
  border: none;
  outline: none;
}

.origion,
.destination {
  width: 350px;
  height: 50px;
  border: 2px solid gray;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  transition: 0.2s all linear;
}

.origion:hover {
  box-shadow: 0 0 5px gray;
}

.destination:hover {
  box-shadow: 0 0 5px gray;
}

button {
  height: 50px;
  width: 130px;
  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
  color: white;
  font-size: 15px;
  transition: 0.2s all;
  cursor: pointer;
}

button:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}

/* 添加景点 */

.addSearch {
  width: 500px;
  /* background-color: pink; */
  margin: 10px 0;
  box-shadow: 0 0 5px gray;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0px;
}

.searchTip {
  text-align: center;
  font-size: 35px;
  text-shadow: 0 0 2px gray;
  color: rgb(184, 28, 34);
  margin: 25px 0;
}

.searcSpot {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.searcSpot input {
  border: 1px solid gray;
  border-radius: 3px;
  font-size: 22px;
  padding-left: 5px;
  transition: 0.2s all linear;
}

.searcSpot input:hover {
  box-shadow: 0 0 5px gray;
}

.searcSpot button {
  width: 80px;
}

/* 景点列表 */
.SpotList {
  width: 500px;
  height: 500px;
  margin: 10px 0;
  /* box-shadow: 0 0 5px gray; */
  box-sizing: border-box;
  padding: 10px;
  overflow: auto;
  border-top: 1px solid rgb(184, 28, 34);
  padding-top: 20px;
}

/* 景点项 */

/* 提交项 */
.addSubmit {
  /* width: 500px; */
  /* box-shadow: 0 0 5px gray; */
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid rgb(184, 28, 34);
}

.addSubmit button {
  width: 100px;
}

/* #endregion左侧 */

/* #region右侧路线图 */
.content {
  /* height: 100%; */
  margin: 10px 0;
  box-shadow: 0 0 5px gray;
  padding: 10px 10px;
  margin-bottom: 0px;
}

.content .routeListTip {
  font-size: 35px;
  color: rgb(184, 28, 34);
  text-shadow: 0 0 2px gray;
  text-align: center;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(184, 28, 34);
  margin-bottom: 20px;
}

.route-list .title {
  text-align: center;
  padding: 10px 100px;
  /* border-bottom: 1px solid gray; */
}

.route-list .title .routeNameTip {
  font-size: 35px;
  text-shadow: 0 0 2px gray;
  color: rgb(184, 28, 34);
}

.route-list .title .routeName {
  margin: 10px 0;
  /* box-shadow: 0 0 5px rgb(184, 28, 34); */
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
}

.route-list .title .routeName button {
  width: 90px;
}

.route-list .title .routeName input {
  font-size: 30px;
  width: 600px;
  text-align: center;
  border: none;
  border-bottom: 1px solid rgb(184, 28, 34);
  outline: none;
}

/* .route-list .title .changeRouteName button {
  width: 100px;
  height: 40px;
  margin: 10px 50px;
} */
/* 路线列表内容区 */


/* 路线规划 */
.content .trafficItem {
  height: 200px;
  background-color: pink;
  margin-bottom: 10px;
}

.content .routeRegion {
  height: 764px;
  overflow: auto;
  padding: 10px 20px;
}

.content .changeRoute {
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
  border-top: 1px solid rgb(184, 28, 34);
  padding-top: 20px;
  height: 100px;
}

.content .changeRoute button {
  width: 120px;
  margin: 20px;
}
</style>
