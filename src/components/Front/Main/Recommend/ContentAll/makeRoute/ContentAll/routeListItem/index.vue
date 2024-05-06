<template>
  <div>
    <div v-for="(routeScenicList) in makeRoute.scenics" :key="routeScenicList.scenicId">
      <div class="route-item">
        <div class="checkSpot">
          <input
              type="checkbox"
              :checked="routeScenicList.checked"
              @change="handleCheck(routeScenicList.scenicId)"
          />
        </div>
        <div class="picture">
          <img :src="routeScenicList.scenicImages[0]">
        </div>
        <div class="route-msg">
          <div class="route-name">{{ routeScenicList.scenicName }}</div>
          <div class="score">
            <el-rate v-model="routeScenicList.score" disabled></el-rate>
            <div class="score-text">
              <span>评分:{{ routeScenicList.score }}分</span>
            </div>
          </div>
          <div class="relative-msg">
            <div style="margin-right: 20px"><span style="color: rgb(184, 28, 34);">{{
                routeScenicList.commentUsers.length
              }}</span>条点评
            </div>
            <div><span style="color: rgb(184, 28, 34);">{{ routeScenicList.collectionUsers.length }}</span> 次收藏</div>
          </div>
          <div class="time">
            <span>游玩参考时间:&nbsp;</span>
            <span
            ><span style="color: black; font-size: 13px">{{ routeScenicList.playTime }}</span
            >&nbsp;</span
            >
          </div>
          <div class="region">
            <span>所在地:&nbsp;{{ routeScenicList.location }}</span>
          </div>
        </div>
      </div>
      <baidu-map v-if="(routeScenicList.nextLongtitude!==-1&&routeScenicList.nextLatitude!==-1)"
                 class="bm-view"
                 center="上海"
                 :zoom="15"
                 ref="divRef"
      >
        <div class="routebox">
          <bm-transit :start="{lng:routeScenicList.longitude,lat:routeScenicList.latitude}"
                      :end="{lng:routeScenicList.nextLongtitude,lat:routeScenicList.nextLatitude}"
                      :auto-viewport="true"
                      location="上海"></bm-transit>
        </div>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import Axios from '@/utils/request.js'

export default {
  name: 'routeListItem',
  data() {
    return {
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      checked: false,
      // makeRoute:this.props.makeRoute,
      // scenicIds:[]
    }
  },
  props: {
    makeRoute: {
      type: Object
    }
  },
  methods: {
    handleCheck(id) {
      // console.log(id);
      // this.checkTodo(id);
      this.$bus.$emit("checkScenicDelete", id);
    },
    // toScenicId(id){
    //   this.scenicIds=[]
    //   for(let i=0;i<this.makeRoute.length;i++){
    //     this.scenicIds.push(this.makeRoute.scenicId)
    //   }
    //   let params={
    //     routeId:this.makeRoute.routeId,
    //     scenicId:id,
    //     scenicIds:this.scenicIds
    //   }
    //   Axios.post('/route/addScenic',{},{
    //     params
    //   }).then((res)=>{
    //     console.log(res)
    //     this.makeRoute=res.data.route
    //   })
    // }
  },
  mounted() {
    // console.log("sb",this.makeRoute)

    // this.$bus.$on('toScenicId',this.toScenicId)
    // setTimeout(()=>{
    //   var outer = document.getElementById("outer")
    //   var first = outer.children[0]
    //   first.style.height = "200px"
    // },2000)
  },
  beforeUpdate() {
    // console.log("sb2",this.makeRoute)
    this.$nextTick(() => {
      for (let i = 0; i < this.makeRoute.scenics.length-1; i++) {
        // console.log("----",this.$refs.divRef[i])
        let outer = this.$refs.divRef[i].$el
        // console.log(outer)
        outer.querySelector(':first-child').style.height = "200px"
      }
    })
  }
}
</script>

<style scoped>
.routebox {
  overflow-y: auto;

}

.bm-view {
  width: 100%;
  /*height: 200px;*/
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
  box-shadow: 0px 35px 77px -17px rgb(0, 0, 0, 0.64);
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
  /* width: 80px; */
  /* height: 25px; */
  padding: 5px 8px;
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

/* .locations ul {
    display: flex;
}
.locations ul li {
    padding: 0 10px;
    border-right: 1px solid gray;
}
.locations ul li:last-child {
    border-right: none;
} */

.region {
  color: gray;
  /* margin-top: 10px; */
  font-size: 10px;
}

.checkSpot {
  margin-right: 10px;
}
</style>
