<template>
  <el-row :gutter="20">
    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">
      <!-- 左侧间隙 -->
    </el-col>
    <el-col :xs="24" :sm="22" :md="22" :lg="18" :xl="16">
      <!-- 主要内容 -->
      <MainContent></MainContent>
    </el-col>
    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">
      <!-- 右侧间隙 -->
    </el-col>
  </el-row>
</template>
<script>
// 主要内容
import MainContent from './content/mainContent/index.vue'


export default {
  components: {
    MainContent,
  },
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