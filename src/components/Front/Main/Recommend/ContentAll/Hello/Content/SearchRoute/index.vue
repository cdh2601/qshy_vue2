<template>
  <div>
    <div class="route-msg">
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
      <button @click="createRoute">创建路线</button>
    </div>
  </div>
</template>

<script>
import Axios from '@/utils/request.js'

export default {
  data() {
    return {
      start: '',
      end:'',
      detailShow: [],
      detailShow1: [],
      timer: null,
      len: false,
    }
  },
  name: 'SearchRoute',
  methods: {
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    buquan(name){
      this.start=name
      this.detailShow=[]
    },
    buquan1(name){
      this.end=name
      this.detailShow1=[]
    },
    createRoute() {
      const userInfo = sessionStorage.getItem("userInfo");
      if (!userInfo) {
        this.$message.warning("请先登录后创建路线");
      }
      else{
        this.$router.push({
          path: '/makeRoute',
          query: {
            start: this.start,
            end: this.end,
          },
        })
      }
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
          // console.log(this.keyword);
          this.detailShow1 = [];
        }
        if (this.keyword === "") {
          this.len = false;
          return;
        }
      }
    }
  },
}
</script>

<style scoped>
.downDrop {
  width: 360px;
  position: absolute;
  margin-left: -14px;
  margin-top: 13px;
  background: #ffffff;
  max-height: 250px;
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
  max-height: 250px;
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
.route-msg {
  width: 1000px;
  height: 130px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  font-size: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px gray;
  background-color: white;
  margin-top: -50px;
}

.route-msg input {
  /* height: 20px; */
  font-size: 20px;
  border: none;
  outline: none;
}

.origion, .destination {
  width: 350px;
  height: 50px;
  border: 2px solid gray;
  border-radius: 5px;
  padding: auto;
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
</style>