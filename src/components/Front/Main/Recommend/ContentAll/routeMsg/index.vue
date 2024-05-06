<template>
  <div>
    <div class="container">
      <div class="mainMsg">
        <div class="pic" :style="{'background-image':'url('+ routeMsg.scenics[0].scenicImages[0] +')'}">
        </div>
        <div class="route-msg">
          <div class="route-name">
            {{ routeMsg.routeName }}
          </div>
          <!-- <div class="score" v-if="routeMsg.open==='1'">
            <el-rate :value="Number(routeMsg.score)"
                     disabled
                     score-template="{value}"></el-rate>
            <div class="score-text">
              <span>评分:{{ routeMsg.score }}分</span>
            </div>
          </div> -->
          <div class="relative-msg">
            <div style="margin-right: 20px"><span class="num"><span style="color: rgb(184, 28, 34);">{{ routeMsg.commentUsers.length }}</span></span>条点评</div>
            <div><span class="num"><span style="color: rgb(184, 28, 34);">{{ routeMsg.collectionUsers.length }}</span></span>次收藏</div>
          </div>
          <div class="locations">
            <div>景点:</div>
            <ul class="location-list">
              <li v-for="(scenicList,index) in routeMsg.scenics" :key="index">
                <router-link :to="`/detail/${scenicList.scenicId}`">{{ scenicList.scenicName }}</router-link>
              </li>
            </ul>
          </div>
          <div class="region">
            <div class="regionTop">
              <div>所在区:</div>
              <ul class="location-list">
                <li v-for="(locationName,index) in routeMsg.locationList" :key="index">{{ locationName }}</li>
              </ul>
            </div>
            <!-- 收藏路线 -->
            <div v-if="routeMsg.open==='1'">
              <div v-if="!routeMsg.collectionUsers.includes(userId)&&!collect" class="notCollection"
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
      </div>
      <!-- 路线展示区 -->
      <div class="routeRegion">
        <div class="routeListTip">
          <span>路线列表</span>
          <div class="editRoute" v-if="routeMsg.open!=='1'">
            <button class="editButton" @click="backEdit">编辑路线</button>
          </div>
        </div>

        <div class="routeContent">
          <routeListItem :routeMsg="routeMsg"></routeListItem>
        </div>
      </div>
      <!-- 评论区 -->
      <div class="comment" v-if="routeMsg.open==='1'">
        <div class="commentTip">
          <span>热门评论</span>
        </div>
        <CommentsSection :routeId="$route.params.routeId"></CommentsSection>
      </div>
    </div>
  </div>
</template>

<script>
import routeListItem from '@/components/Front/Main/Recommend/ContentAll/routeMsg/ContentAll/routeListItem'
import CommentsSection from '@/components/Front/Main/Recommend/ContentAll/routeMsg/ContentAll/commentsSection'
import Axios from "@/utils/request";
// import CommentView from "@/components/Front/OtherModules/commentItem";

export default {
  name: "routeMsg",
  components: { routeListItem,CommentsSection},
  data() {
    return {
      collect: false,
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      routeMsg: [],
      userId: ''
    };
  },
  methods: {
    goPersonCollect() {
      Axios.get('/route/deCollectionRoute',{
        params:{
          userId:JSON.parse(sessionStorage.getItem('userInfo')).userId,
          routeId:this.routeMsg.routeId
        }
      }).then((res)=>{
        // console.log(res)
        if(res.code===200){
          this.collect=!this.collect
          this.$message.success('取消收藏成功')
          location.reload();
        }
      })
      // this.$router.push({
      //   path: '/collect'
      // })
    },
    backEdit() {
      // this.$router.back()
      this.$router.push({
        path: '/makeRoute',
        query: {
          routeId: this.routeMsg.routeId
        }
      })
    },
    chooseCollect() {
      const userInfo = sessionStorage.getItem("userInfo");
      if (!userInfo) {
        // 登录验证
        this.$message.warning("请先登录后收藏");
      } else {
        this.collect = !this.collect;
        let params = {
          routeId: this.routeMsg.routeId,
          userId: JSON.parse(sessionStorage.getItem('userInfo')).userId
        }
        // console.log(this.routeMsg.routeId,this.routeMsg.userId)
        Axios.get('/route/collectionRoute', {
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
    getAllRoutes() {
      if (this.$route.params.routeId.length === 8) {
        this.routeMsg = JSON.parse(decodeURIComponent(this.$route.params.obj))
      } else {
        Axios.get('route/getRoutes').then((res) => {
          // console.log(res)
          res.data.routes.forEach((element) => {
            if (element.routeId == this.$route.params.routeId) {
              this.routeMsg = element;
            }
          })
        })
      }
    }
  },
  mounted() {
    // console.log(this.$route.params)
    // console.log(this.$route.params)
    this.getAllRoutes()
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      this.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 1200px;
  /* height: 1000px; */
  /* background-color: gray; */
  /* overflow: hidden; */
}

/* 路线相关信息 */
.mainMsg {
  /* width: 1100px; */
  height: 450px;
  background-color: white;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 60px 60px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 3px gray;
}

.mainMsg .pic {
  width: 500px;
  max-width: 500px;
  height: 380px;
  border: 1px solid #ccc;
  background-size: cover;
  background-position:center;
  box-shadow: 0 0 3px gray;
  margin-right: 20px;
}


.route-msg {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 380px;
}

.route-msg .route-name {
  font-size: 30px;
  font-weight: bold;
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

.route-msg .relative-msg {
  display: flex;
  font-size: 20px;
}

.locations {
  color: gray;
  font-size: 20px;
  display: flex;
  margin-top: 10px;
}

.locations ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.locations ul li {
  padding: 0 5px;
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
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}

.notCollection {
  color: white;
  display: flex;
  background-color: rgb(184, 28, 34);
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.collection {
  color: white;
  display: flex;
  background-color: rgb(184, 28, 34);
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
}

/* 路线列表 */
/* .routeRegion {
  height: 764px;
  overflow: auto;
  padding: 10px 20px;
} */
.routeRegion .routeContent {
  height: 764px;
  overflow: auto;
  padding: 10px 20px;
}

.editRoute {
  display: flex;
  justify-content: flex-end;
}

.editButton {
  font-size: 20px;
  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  color: white;
  transition: 0.2s all linear;
  cursor: pointer;
  border-radius: 2px;
  padding: 7px 20px;
  margin-right: 100px;
}

.editButton:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}

.routeRegion .routeListTip {
  font-size: 35px;
  color: rgb(184, 28, 34);
  text-shadow: 0 0 2px gray;
  text-align: center;
  margin: 80px 0;
  padding-bottom: 40px;
  border-bottom: 1px solid rgb(184, 28, 34);
  margin-bottom: 20px;
}

.routeRegion .trafficItem {
  height: 200px;
  background-color: pink;
  margin-bottom: 10px;
}

/* 评论 */
.comment .commentTip {
  font-size: 35px;
  color: rgb(184, 28, 34);
  text-shadow: 0 0 2px gray;
  text-align: center;
  margin: 80px 0;
  padding-bottom: 40px;
  border-bottom: 1px solid rgb(184, 28, 34);
  margin-bottom: 20px;
}

.regionTop {
  color: gray;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
}

.regionTop ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.regionTop ul li {
  padding: 0 10px;
  margin: 0;
  list-style: none;
  border-right: 1px solid gray;
}

.regionTop ul li:last-child {
  border-right: none;
}

.num {
  color: rgb(184, 28, 34);
}
</style>
