<template>
  <el-row :gutter="20">
    <!--    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">-->
    <!--      &lt;!&ndash; 左侧间隙 &ndash;&gt;-->
    <!--    </el-col>-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-row :gutter="20">
        <el-col class="hidden-sm-and-down" :md="24" :lg="24" :xl="24">
          <div>
            <!-- 走马灯/轮播图 -->
            <Carousel></Carousel>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <!-- 特色景点 -->
          <Tese></Tese>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="padding-top: 30px;">
          <Luxian></Luxian>
        </el-col>
      </el-row> -->
      <!-- <el-row :gutter="20" style="margin-bottom: -20px;">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <Gonglue></Gonglue>
        </el-col>
      </el-row> -->
      <!--      <el-row :gutter="20">-->
      <!--        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">-->
      <!--          &lt;!&ndash; 地图展示 &ndash;&gt;-->
      <!--          <MapShow></MapShow>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <!-- <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20" style="margin: 0 auto;">
          <baidu-map class="bm-view" center="上海">
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-overlay
                pane="labelPane"
                :class="{ sample: true, active }"
                @draw="draw"
                @mouseover.native="active = true"
                @mouseleave.native="active = false"
            >
              <div><router-link :to="`/earth`" style="color: #fff;text-decoration: none">查看上海景点地图</router-link></div>
            </bm-overlay>
            <bm-overview-map
                anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                :isOpen="true"
            ></bm-overview-map>
          </baidu-map>
        </el-col>
      </el-row> -->
    </el-col>
    <!--    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">-->
    <!--      &lt;!&ndash; 右侧间隙 &ndash;&gt;-->
    <!--    </el-col>-->
  </el-row>
</template>

<script>
// 引入走马灯/轮播图
import Carousel from "./Content/Banner";
// 引入搜索功能
// import SearchCard from "../../OtherModules/SearchCard";
// 引入特色景点
import Tese from "./Content/Tese";
// 引入地图
import MapShow from "./Content/MapShow";
import Luxian from "./Content/Luxian";
import Gonglue from "./Content/Gonglue";

export default {
  name: "Home",
  data() {
    return {
      active: false,
    };
  },
  components: {
    Carousel,
    // SearchCard,
    Tese,
    MapShow,
    Luxian,
    Gonglue
  },
  methods: {
    draw({el, BMap, map}) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(121.47, 31.23));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
  },
};
</script>

<style scoped>
.el-col {
  overflow: hidden;
}

.el-col > div {
  border-radius: 10px;
}

.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
}

.bm-view {
  width: 100%;
  height: 300px;
}

.label {
  z-index: 10;
}

.sample {
  width: 150px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}

.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}

</style>