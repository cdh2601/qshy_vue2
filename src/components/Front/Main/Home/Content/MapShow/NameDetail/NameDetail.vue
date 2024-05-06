<template>
  <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut"
  >
    <div class="waibu">
      <div @click="closeDetail" class="guanbi">×</div>
      <img style="height: 160px; width: 190px; margin: 3px 30px -3px 33px;" :src="attrtion.scenicImages[0]"/>
      <el-link style="display: flex" type="info" :underline="false" @click="searchContent(attrtion.scenicName)"
      >
        <div class="type">{{ attrtion.scenicName }}</div>
      </el-link>
    </div>
  </transition>
</template>

<script>
import "animate.css";

export default {
  name: "NameDetail",
  props: {
    didian: {
      type: String,
    },
    attrtion: {}
  },
  data() {
    return {};
  },
  methods: {
    searchContent(val) {
      this.$router.push({
        path: "/search",
        query: {
          keyword: val,
        },
      });
    },
    closeDetail() {
      this.$emit("closeDetail");
    },
  },
  mounted() {
    // console.log(this.attrtion.stype)
  }
};
</script>

<style scoped>
.waibu {
  position: absolute;
    width: 250px;
    height: 250px;
    z-index: 667;
    background-color: #fe8104;
    margin-top: -263px;
    border-radius: 5px;
    border: 2px solid #fe8104;
    margin-left: 400px;
}

.guanbi {
  float: right;
    font-size: 21px;
    color: #ffffff;
    margin: -5px 2px -5px 0px;
    cursor: pointer;
    padding: 5px;
}

.type {
  line-height: 24px;
  /*margin-left: 20px;*/
  color: #ffffff;
  text-align: center;
  font-size: 21px;
  margin-top: 18px;
}
.type:hover{
  color:rgb(184, 28, 34);
}
</style>