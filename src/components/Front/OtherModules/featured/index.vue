<template>
  <!--  首页精选-->
<!--  <div style="height:100vh">-->
    <div
        class="featured"
        v-loading="state.loading"
        element-loading-text="玩命加载中..."
        style="z-index: 0"
    >
      <div class="featured_title">
        <h3 class="title"><b>精选</b></h3>
      </div>
      <div class="featured_layout">
        <div
            v-for="(item, index) in state.articleInfo"
            :key="index"
            class="shangfu"
        >
          <div class="contentBox item">
            <router-link
                :to="'/strategyDetails/' + item.strategyId"
            >
              <!-- 判断是否有缩略图，没有则样式不同 -->
              <div :class="[item.avatar ? 'articleContent' : 'articleContent']">
                <h4 class="title">{{ item.strategyName }}</h4>
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
                  <span style="color: rgb(184, 28, 34)">{{ item.collections.length }}</span>次收藏
                </div>
                <p style="font-size: 14px">
                <span>
                  <i class="el-icon-user"></i>
                  <font class="highlight">{{ item.ownerName }}</font>
                  <img
                      v-if="item.avatar !== ''"
                      class="focus"
                      :src="item.avatar"
                      style="width: 20px; height: 20px; margin: 0px 10px -5px 5px; border-radius: 50px;"
                  />
                  <img
                      v-if="item.avatar === ''"
                      class="focus"
                      src="@/assets/images/logo.png"
                      style="width: 20px; height: 20px; margin: 0px 10px -5px 5px; border-radius: 50px;"
                  />
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
            </router-link>
          </div>
        </div>
      </div>
    </div>
<!--  </div>-->
</template>
<script>
import Axios from "@/utils/request.js";

export default {
  data() {
    return {
      scoreValue: 4.8,
      state: {
        featuredData: [],
        // 筛选出来的文章内容
        articleInfo: [],
        total: 0, //总条数
        pageSize: 3, //每页显示行数
        currentPage: 1, //当前页码
        loading: false,
      },
    };
  },
  methods: {
    loadData() {
      this.state.loading = true;

      var params = {
        // pageNum: this.state.currentPage,
        // pageSize: this.state.pageSize,
      };
      Axios.get("/strategy/pageByCollection", {
        params,
      }).then((res) => {
        // console.log(res)
        // 先清空数据
        this.state.articleInfo = [];
        res.data.strategies.forEach((element) => {
          // 时间戳格式化
          element.createTime = this.formatDate(element.createTime);
          // 添加
          this.state.articleInfo.push(element);
        });
        //JSON.parse 将从后台得到的数据转换为标准JSON格式
        //前台展示的是需要数组，JSON.parse转换后的数据，element-plus可以解析
        // state.tableData = res.data.data.list;
        // console.log(this.state.articleInfo)
        this.state.total = res.data.strategies.length;

        this.state.loading = false;
      });
    },
    /**
     * @desc 格式化日期字符串
     * @param { Nubmer} - 时间戳
     * @returns { String } 格式化后的日期字符串
     */
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
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.featured {
  background: #f1f1f1;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  /*width: 265px;*/
  /*position: sticky;*/
  /*top: 83px;*/
}

/*div.sticky {*/
/*  position: -webkit-sticky; !* Safari *!*/
/*  position: sticky;*/
/*  top: 0;*/
/*}*/
/*.featured {*/
/*  position: -webkit-sticky; !* Safari *!*/
/*  position: sticky;*/
/*  top: 30px;*/
/*  background-color: green;*/
/*}*/

.featured_title {
  margin-bottom: 15px;
  margin-top: -10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid white;
  overflow: hidden;
}

.featured_title .title {
  line-height: 40px;
  color: rgb(69, 69, 69);
}

.featured_title .title b {
  display: inline-block;
  border-bottom: 4px solid rgb(184, 28, 34);
}

.featured_layout .contentBox {
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
  font-size: 12px;
  color: #999;
  line-height: 18px;
}

.featured_layout .contentBox:hover {
  transform: translateY(-10px);
  transition: all 0.2s ease-in-out;
}

/* .shangfu :hover {

} */
.shangfu :hover p {
  color: rgb(184, 28, 34);
  transform: translateY(0px);
}

.shangfu :hover h4 {
  color: rgb(184, 28, 34);
  transform: translateY(0px);
}

.shangfu :hover i {
  color: rgb(184, 28, 34);
  transform: translateY(0px);
}

.shangfu :hover img {
  color: rgb(184, 28, 34);
  transform: translateY(0px);
}

.shangfu :hover .articleContent {
  color: rgb(184, 28, 34);
  transform: translateY(0px);
}

.featured_layout .contentBox span {
  cursor: pointer;
}

.featured_layout {
  height: 480px;
  overflow: auto;
  padding-top: 20px;
  margin-bottom: -40px;
}

.featured_layout .bannerImg {
  display: block;
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 6px;
}

.featured_layout .title {
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 10px;
  color: #454545;
}

.featured_layout p {
  font-size: 12px;
  color: #999;
}

.featured_layout .contentBox.item {
  border-top: 5px solid #ddd;
  background: white;
  border-left: 5px solid rgb(184, 28, 34);
  padding: 10px;
}

.featured_layout .contentBox.item .banner {
  width: 30%;
  height: 60px;
  overflow: hidden;
  float: left;
  border-radius: 4px;
  margin-right: 15px;
  cursor: pointer;
}

.featured_layout .contentBox.item .banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured_layout .contentBox.item .title {
  font-size: 18px;
  /* line-height: 18px; */
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  text-align: justify;
  cursor: pointer;
  margin: 10px 0 5px 0;
  /* line-height: 20px; */
}

.articleContent {
  width: 100%;
  float: left;
  word-break: break-all;
  text-align: justify;
}

/*.articleContent2 {*/
/*  width: 100%;*/
/*  float: left;*/
/*  word-break: break-all;*/
/*  text-align: justify;*/
/*}*/
.score {
  margin: 0;
  display: flex;
  align-items: center;
}

.score .score-text {
  margin-left: 10px;
  font-size: 14px;
  /* width: 100px; */
  /* height: 30px; */
  background-color: rgb(184, 28, 34);
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 10px;
}

.contentBox p {
  margin-top: 3px;
}

.collections {
  margin: 10px 0 10px 0;
  color: #999;
  font-size: 14px;
}
.focus{
  border-radius: 50px !important;
} 
</style>
