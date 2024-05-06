<template>
  <div class="scope" id="jingdian">
    <div class="scope-info">
      <div class="scope-info-up">
        <h2 class="title" style="color: rgb(184, 28, 34);">推荐景点</h2>
        <h2 class="suikou">让你的旅行，不止拍拍照就离开</h2>
        <h3 class="more"><router-link :to="`/tourism`">更多>></router-link></h3>
      </div>
      <div class="scope-info-down">
        <ul class="scope-info-down-ul">
          <li v-for="(scenic, index) in recScenics" :key="scenic.scenicId" v-if="index < 4">
            <router-link :to="`/detail/${scenic.scenicId}`">
              <img class="lazyload" :src="scenic.scenicImgs[0]" />
              <h3 class="title">{{ scenic.scenicName }}</h3>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="scope-info-down">
        <ul class="scope-info-down-ul">
          <li v-for="(scenic, index) in recScenics" :key="scenic.scenicId" v-if="index > 3">
            <router-link :to="`/detail/${scenic.scenicId}`">
              <img class="lazyload" :src="scenic.scenicImgs[0]" />
              <h3 class="title">{{ scenic.scenicName }}</h3>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import Axios from "@/utils/request";
import AxiosOpenAi from "@/utils/requestOpenAi";
export default {
  name: "Tese",
  created() {
    this.$bus.$on('goDown', (sb) => {
      // console.log(sb)
      document.getElementById("jingdian").scrollIntoView({ behavior: "smooth" })
    })
  },
  created() {
    this.init();
  },
  data() {
    return {
      recScenics: [],
    }
  },
  watch: {
    // 监听 recScenics 数组的变化，并解析每个景点的 scenicImgs 字段
    'recScenics': {
      handler() {
        this.recScenics.forEach(this.parseScenicImgs);
      },
      deep: true,
    },
  },
  methods: {
    // 添加一个方法来解析 scenicImgs 字段
    parseScenicImgs(scenic) {
      if (typeof scenic.scenicImgs === 'string') {
        try {
          scenic.scenicImgs = JSON.parse(scenic.scenicImgs);
        } catch (e) {
          console.error('Error parsing scenicImgs:', e);
          scenic.scenicImgs = []; // 如果解析失败，设置为空数组
        }
      }
    },
    init() {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || { userId: '0' };
      let params = {
        userId: userInfo.userId,
      };
      // Axios.get('scenic/getRecommendScenic', {
      //   params
      // }).then((res) => {
      //   console.log(res.data)
      //   if (res.code === 200) {
      //     this.recScenics = []
      //     for (let i = 0; i < 8; i++) {
      //       this.recScenics.push(res.data.recommendedScenics[i])
      //     }
      //   }
      // })
      AxiosOpenAi.get("book/api/recommendImp", { params }).then((res)=>{
        this.recScenics = []
        for (let i = 0; i < 8; i++) {
          this.recScenics.push(res.data.data[i])
        }
      });
    }
  }
};
</script>

<style scoped>
.scope {
  width: 100%;
  float: left;
  /*margin: -20px 0px 0px -35px;*/
  padding-top: 40px;
}

.scope-info-down {
  /*width: 1300px;*/
  margin: 30px auto;
  /*padding-left: 30px;*/
}

.scope-info-down-ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

li {
  width: 50%;
  list-style: none;
}

a:link {
  background-color: transparent !important;
}

a {
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.scope-info-down li img {
  width: 100%;
  height: 250px;
  box-shadow: 8px 10px 5px #888888;
}

.scope-info-down li {
  width: 23%;
  cursor: pointer;
  transition: all 0.6s;
}

.scope-info-down li:hover {
  transform: scale(1.1);
}

.scope-info-down .title {
  /* position: absolute; */
  /* left: 0; */
  /* right: 0; */
  /* bottom: 15px; */
  margin: -40px 0px 0px 5px;
  color: #fff;
  padding-left: 14px;
  padding-right: 14px;
  /* background: linear-gradient( to bottom, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.8) 100% ); */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#99000000', GradientType=0);
  transition: opacity 0.5s ease 0s;
  font-size: 20px;
  line-height: 30px;
  /* font-size: 16px; */
  padding-bottom: 10px;
  /* line-height: 24px; */
  font-weight: normal;
  z-index: 2;
}

.scope-info-up {
  margin-left: 20px;
  /*margin-right: -20px;*/
  border-bottom: 2px solid #e6e6e6;
}

.scope-info-up .title {
  font-size: 35px;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 500;
}

.scope-info-up .suikou {
  color: rgb(169, 169, 169);
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.scope-info-up .more {
  color: #8e9399;
  position: relative;
  float: right;
  font-size: 16px;
  cursor: pointer;
  margin: -40px 25px 0px 0px;
  font-style: normal;
}

.more a {
  color: #8e9399;
  text-decoration: none;
}
</style>