<template>
  <div>
    <div class="route-item" @click="goRouteMsg(recRouteList.routeId,recRouteList)"
         v-for="(recRouteList,index) in recRoutes" :key="index">
      <div class="picture">
        <img :src="recRouteList.scenics[0].scenicImages[0]">
      </div>
      <div class="route-msg">
        <div class="route-name">
          {{ recRouteList.routeName }}
        </div>
        <!-- <div class="score">
          <el-rate :value="Number(recRouteList.score)"
                   disabled
                   score-template="{value}"></el-rate>
          <div class="score-text">
            <span>评分:{{ recRouteList.score }}分</span>
          </div>
        </div> -->
        <div class="relative-msg">
          <div style="margin-right: 20px"><span style="color: rgb(184, 28, 34);">{{
              recRouteList.commentUsers.length
            }}</span>&nbsp;条点评
          </div>
          <div><span style="color: rgb(184, 28, 34);">{{ recRouteList.collectionUsers.length }}</span>&nbsp;次收藏</div>
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
      <div class="deleteRoute">
        <button @click.stop="delMyRoute(recRouteList.routeId)">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from '@/utils/request.js'

export default {
  name: "recRouteItem",
  methods: {
    goRouteMsg(routeId, recRouteList) {
      // console.log(recRouteList)
      // let obj = new Object()
      this.$router.push({
        path: '/routeMsg/' + routeId + '/' + encodeURIComponent(JSON.stringify(recRouteList))
      })
    },
    delMyRoute(routeId) {
      this.$confirm('此操作将永久删除该路线, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios.get('/route/deUserRoute', {
          params: {
            userId: JSON.parse(sessionStorage.getItem('userInfo')).userId,
            routeId: routeId
          }
        }).then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '路线删除成功'
            })
            this.$emit('getRecRoutes')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  props: {
    recRoutes: {
      type: Array
    }
  },
  data() {
    return {
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  mounted() {
    // console.log(this.recRoutes)
  }
};
</script>

<style scoped>
.route-item {
  margin: 0 auto;
  /*width: 1090px;*/
  height: 250px;
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

.deleteRoute button {
  height: 40px;
  width: 90px;
  background-color: #f56c6c;
  border: 1px solid #f56c6c;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  transition: 0.2s all;
  cursor: pointer;
  /* text-align: end; */
}

.deleteRoute button:hover {
  background: #ff3131;
  border: 1px solid #ff3131;
}

.deleteRoute {
  display: none;
}

.route-item:hover .deleteRoute {
  display: flex;
  justify-content: flex-end;
  /* display: none; */
  width: 340px;
  align-items: center;
}
</style>
