<template>
  <div class="spotItem">
    <div class="route-item" v-for="scenicList in spotList" :key="scenicList.scenicId">
      <div class="checkSpot">
        <input
            type="checkbox"
            :checked="scenicList.checked"
            @change="handleCheck(scenicList.scenicId,$event)"
        />
      </div>
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
        <div class="time">
          <span>游玩参考时间:&nbsp;</span>
          <span
          ><span style="color: black; font-size: 13px">{{ scenicList.playTime }}</span>&nbsp;</span
          >
        </div>
        <div class="region">
          <span>所在地:&nbsp;{{  scenicList.location}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spotItem',
  data() {
    return {
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
    }
  },
  props:{
    spotList:{
      type:Array
    }
  },
  mounted(){
    // console.log(this.spotList)
  },
  methods:{
    handleCheck(id,event) {
      // console.log(event.target.checked)
      // isChecked=!isChecked
      // this.checkTodo(id);
      // for(let i=0;i<this.spotList.length)
      this.$bus.$emit("checkScenic", id);
    },
  },

};
</script>

<style scoped>
.route-item {
  /* width: 1100px; */
  height: 170px;
  background-color: white;
  margin-bottom: 20px;
  box-shadow: 0 0 3px gray;
  display: flex;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  transition: 0.2s all linear;
}

.route-item:hover {
  box-shadow: 0px 35px 77px -17px rgb(0 0 0 / 64%);
  transform: scale(1.02);
  cursor: pointer;
}

.route-item .picture {
  width: 180px;
  height: 100%;
  /*background-image: url("./images/上海背景图.jpg");*/
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-right: 10px;
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
}
.route-item .picture img {
  width: 180px;
  height: 100%;
}
.route-item .route-msg {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.route-msg .route-name {
  font-size: 20px;
  font-weight: bold;
}

.score {
  /* margin: 5px; */
  display: flex;
  align-items: center;
}

.score .score-text {
  /* margin-left: 10px; */
  font-size: 15px;
  /* width: 80px;
  height: 25px; */
  padding: 2px 9px;
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
