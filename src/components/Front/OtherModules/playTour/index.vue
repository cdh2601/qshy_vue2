<template>
  <!--  打赏-->
  <div class="playTour">
    <div class="titleWrapper" data-v-d40d816c="">
      <h3 class="title">打赏本站</h3>
    </div>
    <ul>
      <li>如果你觉得本站很棒，可以通过扫码支付打赏哦！</li>
      <li><b>微信扫码：</b>感谢支持！</li>
      <li class="playTour_img">
        <img src="@/assets/images/weixin.jpg" alt="">
      </li>
      <li><b>支付宝扫码：</b>感谢支持！</li>
      <li class="playTour_img">
        <img src="@/assets/images/zhifubao.jpg" alt="">
      </li>
    </ul>
  </div>
</template>

<style scoped>
.playTour {
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

.playTour .title {
  display: inline-block;
  border-bottom: 4px solid rgb(184, 28, 34);
  line-height: 40px;
  color: rgb(69, 69, 69);
}

.playTour li {
  margin-bottom: 8px;
  font-size: 15px;
  list-style: none;
  margin-left: -36px;
}

.playTour_img {
  width: 60%;
  margin: auto;
}

.playTour_img img {
  width: 100%;
}
</style>