<template>
  <el-row :gutter="20">
<!--    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">-->
<!--      &lt;!&ndash; 左侧间隙 &ndash;&gt;-->
<!--    </el-col>-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-row :gutter="20">
        <el-col class="hidden-sm-and-down" :md="6" :lg="6" :xl="6">
          <!-- 搜索功能 -->
          <SearchCard></SearchCard>
          <!-- 精选攻略 -->
          <Featured></Featured>

          <!-- 站点信息 -->
          <!-- <WebsiteInfo></WebsiteInfo> -->
          <!-- 打赏本站 -->
          <!-- <PlayTour></PlayTour> -->
        </el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <!-- 主要内容 -->
          <MainContent></MainContent>
        </el-col>
      </el-row>
    </el-col>
<!--    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">-->
<!--      &lt;!&ndash; 右侧间隙 &ndash;&gt;-->
<!--    </el-col>-->
  </el-row>
</template>
<script>
// 主要内容
import MainContent from './content/mainContent/index.vue'

// 其他内容 搜索功能
import SearchCard from '../../OtherModules/SearchCard/index.vue';
// 其他内容：站点信息
import WebsiteInfo from '../../OtherModules/websiteInfo/index.vue'
// 其他内容：打赏本站
import PlayTour from '../../OtherModules/playTour/index.vue'
// 其他内容：精选
import Featured from '../../OtherModules/featured/index.vue';

export default {
  components: {
    MainContent,
    SearchCard,
    Featured,
    WebsiteInfo,
    PlayTour,
  }
}
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
</style>
