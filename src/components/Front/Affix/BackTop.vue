<template>
  <el-backtop :bottom="100" :visibility-height="100" class="backtop_box">
    <i class="el-icon-caret-top"></i>
  </el-backtop>
</template>

<script>
export default {
  name:'BackTop',
};
</script>

<style scoped>
/* 回到顶部 */
.backtop_box {
  background-color: white;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #e9e9e9;
  font-size: 13px;
  color: #646464;
  z-index: 999;
  border-radius: 50px;
}

.el-backtop:hover {
  /* background-color: rgba(47, 167, 185); */
  /* 1、linear-gradient() 线性渐变 2、radial-gradient() 径向渐变 3、repeating-linear-gradient() 重复线性渐变 4、repeating-radial-gradient() 重复径向渐变  */
  background: repeating-linear-gradient(rgb(184, 28, 34), #535b9a);
  color: white;
}
</style>