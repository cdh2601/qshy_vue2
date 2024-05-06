<template>
  <div class="pagination">
    <!-- <h1>{{ startNumAndendNum }}--当前页码{{ pageNo }}</h1> -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndendNum.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button v-if="startNumAndendNum.start > 2">···</button>

    <button v-for="(page, index) in startNumAndendNum.end" :key="index" v-if="page >= startNumAndendNum.start" @click="$emit('getPageNo', page)" :class="{active:pageNo==page}">
      {{ page }}
    </button>

    <button v-if="startNumAndendNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndendNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px;position: absolute;">共 {{ total }} 条</button>
  </div>
</template>
  
  <script>
import { computed } from "vue";
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndendNum() {
      let start = 0;
      let end = 0;
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(184, 28, 34);
      color: #fff;
    }
  }
}
</style>