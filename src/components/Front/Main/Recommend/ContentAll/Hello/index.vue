<template>
  <div class="content">
    <div class="diy-route">
      <div style="font-size: 50px; color: rgb(184, 28, 34); margin-bottom: 20px; margin-top: 35px; text-shadow:0 0 3px gray">一分钟搞定你的路线规划</div>
      <div style="font-size: 30px; color: rgb(184, 28, 34);text-shadow:0 0 3px gray">
        请输入出发地和目的地来自定义你的出行路线吧
      </div>
      <!-- <div class="picture">
        <img src="./images/卡通东方明珠.png" alt="" />
      </div> -->
      <div class="search-route">
        <SearchRoute></SearchRoute>
      </div>
      <!-- <div>
        <button @click="go()"><span>查看其他路线</span></button>
      </div> -->

    </div>
  </div>
</template>

<script>
import SearchRoute from './Content/SearchRoute';
export default {
  name: "Hello",
  components: {SearchRoute},
  methods: {
    go(){
      this.$bus.$emit('goRecRoute')
    },
  },
};
</script>

<style scoped>
.content {
  width: 95vw;
  height: 90vh;
  background-image: url('./images/上海背景图.jpg');
  background-size:100% 100%;
  background-repeat:no-repeat;
  overflow: auto;
  box-shadow: 0 0 10px gray;
  margin-bottom: 20px;
}
.diy-route {
  padding-top: 40px;
  width: 80vw;
  text-align: center;
  margin: 0 auto;
}

.diy-route img {
  width: 350px;
  margin-bottom: 10px;
}
.search-route {
  margin-top: 170px;
  margin-bottom: 30px;
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
