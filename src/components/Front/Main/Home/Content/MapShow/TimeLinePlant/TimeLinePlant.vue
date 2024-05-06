<template>
  <div class="relative w-11/12 mt-4">
    <div
      class="flex justify-evenly h-24 font-bold"
      style="display: flex; justify-content: space-between"
    >
      <div
        v-for="(item, index) in plantList"
        :key="index"
        class="z-10 w-32"
        style="cursor: pointer;"
        @click="changeArea(index)"
      >
        <div >
          <div
            class=" rounded-full w-5 h-5 m-auto mt-2.5 mb-4"
            :class="(`time-line-node-${index}`) "
          ></div>
          <div
            class="font-24 mt-2 opacity-30 transition duration-1000"
            :class="{ 'active-text': index === timeIndex }"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="absolute top-0 mt-5 w-full h-px bg-white z-0 opacity-30"></div>
  </div>
</template>

<script>
export default {
  name: "TimeLinePlant",
  props: {
    index: {
      type: Number,
    },
  },
  data() {
    return {
      plantList: [
        "总览",
        "地标建筑",
        "亲子游",
        "上海夜景",
        "小清新摄影地",
        "人气免票公园",
        "历史烙印",
        "周边古镇",
        "绿色户外",
      ],
      timeIndex: 0,
    };
  },
  methods: {
    changeArea(index) {
      this.timeIndex = index;
      this.$emit("changeAreaFromSon", index);
    },
  },
  watch: {
    index() {
      this.timeIndex = this.index;
    },
  },
};
</script>

<style scoped lang="less">

.mt-4 {
  margin-top: 1rem;
}
.relative {
  position: relative;
}
.font-bold {
  font-weight: 700;
}
.justify-evenly {
  justify-content: space-evenly;
}
.h-24 {
  height: 6rem;
}
.flex {
  display: flex;
}

.w-32 {
  width: 8rem;
}
.z-10 {
  z-index: 10;
  text-align: center;
}
.active-node {
  background-color: #fff;
  box-shadow: 0 0 0 2px #fff inset, 0 0 0 5px green inset;
}
.time-line-node-0 {
  box-sizing: border-box;
  background-color: black;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.time-line-node-1 {
  box-sizing: border-box;
  background-color: #2b73c5;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.time-line-node-2 {
  box-sizing: border-box;
  background-color: #7dcd7b;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.time-line-node-3 {
  box-sizing: border-box;
  background-color: #ffc656;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.time-line-node-4 {
  box-sizing: border-box;
  background-color: #ff5c5c;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.time-line-node-5 {
  box-sizing: border-box;
  background-color: #52bfdd;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.time-line-node-6 {
  box-sizing: border-box;
  background-color: #00a685;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.time-line-node-7 {
  box-sizing: border-box;
  background-color: #ff7d47;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.time-line-node-8 {
  box-sizing: border-box;
  background-color: #a45db2;
  box-shadow: 0 0 0 2px white inset, 0 0 0 5px white inset;
}
.rounded-full {
  border-radius: 9999px;
}
.w-5 {
  width: 1.25rem;
}
.h-5 {
  height: 1.25rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-2\.5 {
  margin-top: 0.625rem;
}
.m-auto {
  margin: auto;
}
.duration-1000 {
  transition-duration: 1000ms;
}
.transition {
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform, filter, backdrop-filter,
    -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.mt-2 {
  margin-top: 0.5rem;
}
.self-center {
  align-self: center;
}
.w-7 {
  width: 1.75rem;
}
.m-auto {
  margin: auto;
}
img {
  border-style: none;
}
img,
video {
  max-width: 100%;
  height: auto;
}
img,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}
.active-text {
  font-size: 20px;
  transform: translateY(10px);
  opacity: 1;
}
</style>
