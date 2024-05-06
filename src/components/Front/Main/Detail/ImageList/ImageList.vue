<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="index">
        <div class="smallPic" :style="{'background-image':'url('+ slide +')'}"  :class="{active:currentIndex==index}" @click="changecurrentIndex(index)"></div>
        <!-- <img :src="slide" :class="{active:currentIndex==index}" @click="changecurrentIndex(index)"> -->
      </div>
    </div>
<!--    <div class="swiper-button-next"></div>-->
<!--    <div class="swiper-button-prev"></div>-->
  </div>
</template>

<script>

import Swiper from 'swiper'

export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: ['skuImageList'],
  methods: {
    changecurrentIndex(index) {
      this.currentIndex = index
      this.$bus.$emit('getIndex', this.currentIndex)
    }
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        var mySwiper = new Swiper(this.$refs.cur, {
          // direction: "vertical", // 垂直切换选项
          // loop: true, // 循环模式选项

          // 如果需要分页器
          // pagination: {
          //   el: ".swiper-pagination",
          //   clickable:true
          // },

          // 如果需要前进后退按钮
          // navigation: {
          //   nextEl: ".swiper-button-next",
          //   prevEl: ".swiper-button-prev",
          // },
          slidesPerView: 3,
          slidesPerGroup: 1,
          // 如果需要滚动条
          // scrollbar: {
          //   el: ".swiper-scrollbar",
          // },
        });
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  // height: 56px;
  // width: 412px;
  // box-sizing: border-box;
  // padding: 0 12px;

  .swiper-slide {
    // width: 56px;
    // height: 56px;
    .smallPic {
      overflow: hidden;
      border: 2px 2px;
      width: 107px;
      max-width: 107px;
      height: 75px;
      margin-bottom: 10px;
      background-size: cover;
      box-sizing: border-box;
      box-shadow: 0 0 3px gray;
      transition: 0.2s linear all;
      // padding: 2px;
      background-position:center;
      &.active {
        border: 2px solid #f60;
        // padding: 2px;
      }
      &:hover {
        // border: 2px solid #f60;
        // padding: 2px;
        transform: scale(1.05);
        cursor: pointer;
      }
      // &:first-child {
      //   margin-top: 10px;
      // }
    }
    // img {
    //   // width: 100%;
    //   // height: 100%;
    //   border: 1px solid #ccc;
    //   padding: 2px;
    //   width: 50px;
    //   height: 50px;
    //   display: block;

    //   &.active {
    //     border: 2px solid #f60;
    //     padding: 1px;
    //   }

    //   &:hover {
    //     border: 2px solid #f60;
    //     padding: 1px;
    //   }
    // }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>