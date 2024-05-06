<template>
  <!--  站点信息-->
  <div class="websiteInfo">
    <div class="titleWrapper" data-v-d40d816c="">
      <h3 class="title">站点信息</h3>
    </div>
    <ul>
      <li><b>建站时间：</b>2024年04月01日</li>
      <li><b>站点主题：</b>轻松沪游</li>
      <li><b>采用技术：</b>Java、Vue2等前后端开发技术</li>
      <li><b>本站走过：</b>{{ distance }}</li>
      <li><b>微信公众号：</b>扫描二维码，关注我们</li>
      <li class="websiteInfo_img" style="margin:20px 0 -10px 0px">
        <img src="@/assets/images/getqrcode.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  data(){
    return{
      distance:''
    }
  },
  methods: {
    init() {
      setInterval(() => {
        var day = Math.floor(new Date().getTime() / 1000) - (new Date('2024/04/01 00:00:00').getTime() / 1000),
            day2 = Math.floor(day / (24 * 3600)),
            day3 = day2 * 24 * 3600,
            day4 = day - day3,
            day5 = Math.floor(day4 / 3600),
            day6 = day4 - day5 * 3600,
            day7 = Math.floor(day6 / 60),
            day8 = day6 - day7 * 60;
        this.distance = `${day2} 天 ${day5} 时 ${day7} 分 ${day8} 秒`
      }, 1000)
    }
  },
  mounted() {
    this.init()
  }
}

</script>

<style scoped>
.websiteInfo {
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0,0,0,.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.titleWrapper {
  margin-bottom: 15px;
  margin-top: -10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  overflow: hidden;
}

.websiteInfo .title {
  display: inline-block;
  border-bottom: 4px solid rgb(184, 28, 34);
  line-height: 40px;
  color: rgb(69, 69, 69);
}

.websiteInfo li {
  margin-bottom: 8px;
  font-size: 15px;
  list-style: none;
  margin-left: -36px;
}

.websiteInfo_img {
  width: 80%;
  margin: auto;
}

.websiteInfo_img img {
  width: 100%;
}
</style>