<template>
  <div class="boutique_article">
    <div class="titleBox">
      <h3 style="color: rgb(184, 28, 34)">
        <i class="el-icon-s-order"></i>&nbsp;精品攻略
      </h3>
      <p>包含本站所有攻略，阅读愉快~</p>
    </div>
    <div
      class="contentBox"
      v-loading="state.loading"
      element-loading-text="玩命加载中..."
      style="z-index: 0"
    >
      <div class="titleWrapper">
        <h3 class="title"><b>最新</b></h3>
        <button @click="goWrite"><i class="el-icon-edit"></i>写攻略</button>
      </div>
      <div
        class="articleBox"
        v-for="(item, index) in state.articleInfo"
        :key="index"
      >
        <router-link :to="'/strategyDetails/' + item.strategyId">
          <h4 class="title">
            <span>{{ item.strategyName }}</span>
          </h4>
          <!-- <div class="score">
            <el-rate
              :value="scoreValue"
              disabled
              score-template="{value}"
            ></el-rate>
            <div class="score-text">
              <span>评分:4.8分</span>
            </div>
          </div> -->
          <div class="collections">
            <span style="color: rgb(184, 28, 34);">{{ item.collections.length }}</span>次收藏
          </div>
          <div class="article">
            <div class="textBox">
<!--              <p style="margin-bottom: 25px; margin: 0">{{ item.texts[0] }}</p>-->

              <p class="articleMessage hidden-xs-only">
                <span>
                  <i class="el-icon-user"></i>&nbsp;
                  <font class="highlight">{{ item.ownerName }}</font>&nbsp;
                  <img v-if="item.avatar!==''" class="focus" :src="item.avatar" />
                  <img v-if="item.avatar===''" class="focus" src="@/assets/images/logo.png" />
                </span>
                <span>
                  <i class="el-icon-timer"></i>
                  {{ item.createTime }}
                </span>
                <span>
                  <i class="el-icon-star-off"></i>
                  {{ item.collections.length }}
                </span>
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <Pagination
        :pageNo="state.currentPage"
        :pageSize="state.pageSize"
        :total="state.total"
        :continues="4"
        @getPageNo="getPageNo"
        style="margin-top: 35px"
      />
    </div>
  </div>
</template>

<script>
import Axios from "@/utils/request.js";
import Pagination from "../../../../OtherModules/Pagination";
import {nanoid} from "nanoid";

export default {
  components: { Pagination },
  data() {
    return {
      scoreValue: 4.8,
      state: {
        articleInfo: [],
        total: "", //总条数
        pageSize: 6, //每页显示行数
        currentPage: 1, //当前页码
        loading: false,
      },
    };
  },
  methods: {
    goWrite() {
      const userInfo = sessionStorage.getItem("userInfo");
      if (!userInfo) {
        this.$message({
          type:'warning',
          message:'请登录后写攻略'
        })
        return
      }
      let strategyId=nanoid(12)
      let obj=new Object()
      this.$router.push({
        path:"/writeStrategy/"+strategyId+'/'+obj
      });
    },
    formatDate(timestamp) {
      // 补全为13位
      let arrTimestamp = (timestamp + "").split("");
      for (let start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
          arrTimestamp[start] = "0";
        }
      }
      timestamp = arrTimestamp.join("") * 1;
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      let month = day * 30;
      let now = new Date().getTime();
      let diffValue = now - timestamp;
      // 如果本地时间反而小于变量时间
      if (diffValue < 0) {
        return "不久前";
      }
      // 计算差异时间的量级
      let monthC = diffValue / month;
      let weekC = diffValue / (7 * day);
      let dayC = diffValue / day;
      let hourC = diffValue / hour;
      let minC = diffValue / minute;
      // 数值补0方法
      let zero = function (value) {
        if (value < 10) {
          return "0" + value;
        }
        return value;
      };
      // 使用
      if (monthC > 4) {
        // 超过1年，直接显示年月日
        return (function () {
          let date = new Date(timestamp);
          return (
            date.getFullYear() +
            "年" +
            zero(date.getMonth() + 1) +
            "月" +
            zero(date.getDate()) +
            "日"
          );
        })();
      } else if (monthC >= 1) {
        return parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        return parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        return parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        return parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        return parseInt(minC) + "分钟前";
      }
      return "刚刚";
    },
    /**
     * @desc 加载获取数据
     */
    loadData() {
      this.state.loading = true;

      var params = {
        pageNum: this.state.currentPage,
        pageSize: this.state.pageSize,
      };
      Axios.get("/strategy/list", {
        params,
      }).then((res) => {
        // console.log(res);
        // 先清空数据
        this.state.articleInfo = [];
        res.data.strategies.records.forEach((element) => {
          // 时间戳格式化
          element.createTime = this.formatDate(element.createTime);
          // 添加
          this.state.articleInfo.push(element);
        });
        //JSON.parse 将从后台得到的数据转换为标准JSON格式
        //前台展示的是需要数组，JSON.parse转换后的数据，element-plus可以解析
        // state.tableData = res.data.data.list;
        // console.log(this.state.articleInfo)
        this.state.total = res.data.strategies.total;

        this.state.loading = false;
      });
    },
    getPageNo(pageNo) {
      this.state.currentPage = pageNo;
      //   console.log(this.pageNo)
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.boutique_article .titleBox {
  width: 100%;
  background-color: #f1f1f1;
  padding: 20px;
  /* 添加此属性 padding间距不扩大div */
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 20px;
}

.boutique_article .titleBox h3 {
  font-size: 20px;
  font-weight: 700;
  /* padding-left: 10px; */
  margin-bottom: 10px;
  /* border-left: 4px solid rgb(184, 28, 34); */
  color: #474749;
}

.boutique_article .titleBox p {
  color: #666;
}

.boutique_article .contentBox {
  width: 100%;
  padding: 20px;
  /* 添加此属性 padding间距不扩大div */
  box-sizing: border-box;
  background: #f1f1f1;
  border-radius: 10px;
}

.boutique_article .titleWrapper {
  margin-bottom: 35px;
  margin-top: -10px;
  border-bottom: 3px solid white;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.boutique_article .titleWrapper .title {
  line-height: 40px;
  color: #474749;
}

.boutique_article .titleWrapper .title b {
  display: inline-block;
  border-bottom: 4px solid rgb(184, 28, 34);
}

/* 文章样式 */
.boutique_article .articleBox {
  padding: 5px 20px;
  background-color: #fff;
  border-bottom: 1px solid white;
  transition: all 0.4s ease-out;
  border-left: 10px solid rgb(184, 28, 34);
  margin-bottom: 15px;
}

.articleBox:hover {
  box-shadow: 0px 5px 30px -17px rgb(0 0 0 / 64%);
  transform: scale(1.02);
  cursor: pointer;
}

.boutique_article .articleBox .title {
  font-size: 24px;
  padding-top: 20px;
  padding-left: 10px;
  line-height: 45px;
  color: #474749;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /*text-align: justify;*/
  margin: 0;
}

.boutique_article .articleBox :hover .title {
  color: black;
}

.boutique_article .article {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.articleBox a {
  text-decoration: none;
}

.boutique_article .article img {
  width: 20px;
  height: 20px;
  margin-top: -2px;
  border-radius: 4px;
  object-fit: cover;
  overflow: hidden;
}

.boutique_article .articleMessage span {
  font-size: 13px;
  color: #999;
  line-height: 20px;
  margin-right: 15px;
  display: inline-flex;
  align-items: center;
}

.boutique_article .articleMessage .el-icon {
  font-size: 15px;
  margin-right: 8px;
}

.boutique_article .textBox {
  /*width: 750px;*/
  /* height: 100px; */
  line-height: 22px;
  font-size: 13px;
  color: #999;
  margin-left: 10px;
  /* margin-bottom: 10px; */
}

.boutique_article .textBox2 {
  width: auto;
  margin-left: 0px;
  overflow: hidden;
}

.boutique_article .textBox p {
  color: #999;
  margin-bottom: 15px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  text-align: justify;
  cursor: pointer;
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  /* .boutique_article .textBox { */
    /* width: 500px; */
  /* } */
}

/* 分页样式 */
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: black;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}

:deep(.el-table .cell) {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}

@media screen and (max-width: 500px) {
  .hidePaging {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  .showPaging {
    display: none;
  }
}
button {
  height: 40px;
  width: 120px;
  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
  color: white;
  font-size: 15px;
  transition: 0.2s all;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}

.score {
  margin: 0 0 10px 10px;
  display: flex;
  align-items: center;
}

.score .score-text {
  margin-left: 10px;
  font-size: 16px;
  /* width: 100px; */
  /* height: 30px; */
  background-color: rgb(184, 28, 34);
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 10px;
}
.collections {
  color: #999;
  margin:10px 0 10px 10px;
}
.focus{
  border-radius: 50px !important;
}
</style>
