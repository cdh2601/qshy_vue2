<template>
  <div>
    <div v-for="(scenicList,index) in routeMsg.scenics" :key="index">
      <div class="route-item" @click="goScenic(scenicList.scenicId)">
        <div class="picture">
          <img :src="scenicList.scenicImages[0]">
        </div>
        <div class="route-msg">
          <div class="route-name">{{ scenicList.scenicName }}</div>
          <div class="score">
            <el-rate v-model="scenicList.score" disabled></el-rate>
            <div class="score-text">
              <span>评分:{{ scenicList.score }}分</span>
            </div>
          </div>
          <div class="relative-msg">
            <div style="margin-right: 20px">{{ scenicList.commentUsers.length }}条点评</div>
            <div>{{ scenicList.collectionUsers.length }}次收藏</div>
          </div>
          <!-- <div class="locations">
              <div>景点:</div>
              <ul class="location-list">
                <li><a href="#">东方明珠</a></li>
                <li><a href="#">黄浦江</a></li>
                <li><a href="#">城隍庙</a></li>
              </ul>
            </div> -->
          <div class="time">
            <span>游玩参考时间:&nbsp;</span>
            <span
            ><span style="color: black; font-size: 13px">{{ scenicList.playTime }}</span
            >&nbsp;</span
            >
          </div>
          <div class="region">
            <span>所在地:&nbsp;{{ scenicList.location }}</span>
          </div>
        </div>
      </div>
      <baidu-map v-if="(scenicList.nextLongtitude!==-1&&scenicList.nextLatitude!==-1)"
                 class="bm-view"
                 center="上海"
                 :zoom="15"
                 ref="divRef"
      >
        <div class="routebox">
          <bm-transit :start="{lng:scenicList.longitude,lat:scenicList.latitude}"
                      :end="{lng:scenicList.nextLongtitude,lat:scenicList.nextLatitude}" :auto-viewport="true"
                      location="上海"></bm-transit>
        </div>
      </baidu-map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'routeListItem',
  props: {
    routeMsg: {
      type: Object
    }
  },
  data() {
    return {
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  mounted() {
    // console.log(this.routeMsg)
    this.$nextTick(()=>{
      for(let i=0;i<this.routeMsg.scenics.length;i++){
        let outer=this.$refs.divRef[i].$el
        // console.log(outer)
        outer.querySelector(':first-child').style.height="200px"
      }
    })
  },
  methods: {
    goScenic(scenicId) {
      this.$router.push({
        path: '/detail/' + scenicId
      })
    }
  }
}
</script>

<style scoped>
.routebox {
  overflow-y: auto;

}

.bm-view {
  width: 100%;
  /*height:200px;*/
  margin-bottom: auto;
}

.bm-view > div:first-child {
  height: 200px;
}

.route-item {
  height: 200px;
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
  width: 250px;
  height: 100%;
  /*background-image: url("./images/上海背景图.jpg");*/
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-right: 20px;
  margin-left: 20px;
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
}

.route-item .picture img {
  width: 250px;
  height: 100%;
}

.route-item .route-msg {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.route-msg .route-name {
  font-size: 25px;
  font-weight: bold;
}

.score {
  /* margin: 5px; */
  display: flex;
  align-items: center;
}

.score .score-text {
  margin-left: 10px;
  font-size: 15px;
  /* width: 80px;
  height: 25px; */
  padding: 5px 10px;
  background-color: rgb(184, 28, 34);
  color: white;
  text-align: center;
  border-radius: 10px;
}

.route-msg .relative-msg {
  display: flex;
  font-size: 13px;
}

.route-msg .time {
  font-size: 12px;
  color: gray;
}

.locations {
  color: gray;
  font-size: 8px;
  display: flex;
  /* margin-top: 10px; */
}

.locations ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.locations ul li {
  padding: 0 10px;
  list-style: none;
  border-right: 1px solid gray;
}

.locations ul li:last-child {
  border-right: none;
}

.region {
  color: gray;
  /* margin-top: 10px; */
  font-size: 10px;
}

.baidu-map {
  height: 200px;
}
</style>