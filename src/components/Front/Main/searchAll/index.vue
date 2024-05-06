<template>
  <div>
    <div class="container">
      <div class="searchTip">
        <span>#搜索结果如下...</span>
      </div>
      <!-- 相关景点 -->
      <div class="scienic">
        <div class="tip">相关景点</div>
        <div>
          <el-row :gutter="20">
            <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">
              <!-- 左侧间隙 -->
            </el-col>
            <el-col :xs="24" :sm="22" :md="22" :lg="18" :xl="16">
              <div class="search">
                <div class="py-container">
                  <!--details-->
                  <div class="details clearfix">
                    <div class="goods-list">
                      <ul class="yui3-g">
                        <!-- 单个景点 -->
                        <div v-if="attractions.length < 1" class="emptyImg"><p style="padding-top: 270px;">暂无相关景点</p></div>
                        <li class="yui3-u-1-5"
                            v-for="attraction in attractions"
                            :key="attraction.scenicId">
                          <router-link :to="`/detail/${attraction.scenicId}`">
                            <div class="list-wrap">
                              <!-- <div class="p-img">
                          <img :src="attraction.scenicImages[0]"/>
                        </div> -->
                              <div
                                  class="pic"
                                  :style="{'background-image':'url('+ attraction.scenicImages[0] +')'}"
                              ></div>

                              <div class="introduction">
                                <p>
                                  <i class="el-icon-edit"></i>
                                  {{ attraction.introduction }}
                                </p>
                              </div>
                              <div class="price">
                                <p>{{ attraction.scenicName }}</p>
                              </div>
                            </div>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <Pagination
                        v-if="total!==0"
                        :pageNo="pageNo"
                        :pageSize="pageSize"
                        :total="total"
                        :continues="4"
                        @getPageNo="getPageNo"
                    />
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">
              <!-- 右侧间隙 -->
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 相关攻略 -->
      <div class="stragety">
        <div class="tip">相关攻略</div>
        <div class="boutique_article">
          <div
              class="contentBox"
              v-loading="false"
              element-loading-text="玩命加载中..."
              style="z-index: 0"
          >
            <div class="titleWrapper">
              <h3 class="title"><b>最新</b></h3>
            </div>
            <!-- 单个攻略 -->
            <div v-if="strategies.length < 1" class="emptyImg"><p style="padding-top: 270px;">暂无相关攻略</p></div>
            <div class="articleBox" v-for="(strategyList,index) in strategies" :key="index">
              <router-link :to="'/strategyDetails/'+strategyList.strategyId">
                <h4 class="title">
                  <span>{{ strategyList.strategyName }}</span>
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
                  <span style="color: rgb(184, 28, 34)">{{ strategyList.collections.length }}</span>次收藏
                </div>
                <div class="article">
                  <div class="textBox">
                    <!--              <p style="margin-bottom: 25px; margin: 0">{{ item.texts[0] }}</p>-->

                    <p class="articleMessage hidden-xs-only">
                      <span>
                        <i class="el-icon-user"></i>&nbsp;
                        <font class="highlight">{{ strategyList.ownerName }}</font>&nbsp;
                        <img
                            v-if="strategyList.avatar !== ''"
                            class="focus"
                            :src="strategyList.avatar"
                        />
                        <img v-if="strategyList.avatar === ''" class="focus" src="@/assets/images/logo.png"/>
                      </span>
                      <span>
                        <i class="el-icon-timer"></i>
                        {{ strategyList.createName }}
                      </span>
                      <span>
                        <i class="el-icon-star-off"></i>
                        {{ strategyList.collections.length }}
                      </span>
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
            <Pagination
                v-if="total2!==0"
                :pageNo="pageNo2"
                :pageSize="pageSize2"
                :total="total2"
                :continues="4"
                @getPageNo="getPageNo2"
                style="margin-top: 20px"
            />
          </div>
        </div>
      </div>
      <!-- 相关路线 -->
      <!-- <div class="route">
        <div class="tip">相关路线</div>
        <div class="route-list">
          <div v-if="routes.length < 1" class="emptyImg"><p style="padding-top: 270px;">暂无相关路线</p></div>
          <div class="route-item" @click="goRouteMsg(routeList.routeId,routeList)" v-for="(routeList,index) in routes" :key="index">
            <div class="picture">
              <img :src="routeList.scenics[0].scenicImages[0]">
            </div>
            <div class="route-msg">
              <div class="route-name">{{ routeList.routeName }}</div>
               <div class="score">
          <el-rate :value="Number(recRouteList.score)"
                   disabled
                   score-template="{value}"></el-rate>
          <div class="score-text">
            <span>评分:{{ recRouteList.score }}分</span>
          </div>
        </div> 
              <div class="relative-msg">
                <div style="margin-right: 20px">
                  <span style="color: rgb(184, 28, 34)">{{ routeList.commentUsers.length }}</span
                  >&nbsp;条点评
                </div>
                <div>
                  <span style="color: rgb(184, 28, 34)">{{ routeList.collectionUsers.length }}</span
                  >&nbsp;次收藏
                </div>
              </div>
              <div class="locations">
                <div>景点:</div>
                <ul class="location-list">
                  <li v-for="(scenicList,index) in routeList.scenics" :key="index">
                    <router-link :to="`/detail/${scenicList.scenicId}`">{{ scenicList.scenicName }}</router-link>
                  </li>
                </ul>
              </div>
              <div class="region">
                <div>所在区:</div>
                <ul class="location-list">
                  <li v-for="(locationName,index) in routeList.locationList" :key="index">{{ locationName }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import Pagination from "../../OtherModules/Pagination";
import Axios from "@/utils/request";

export default {
  components: {Pagination},
  inject: ["reload"],
  data() {
    return {
      pageNo: 1,
      search: "",
      pageSize: 8,
      total: "",
      pageNo2: 1,
      pageSize2: 3,
      total2: "",
      attractions: [],
      strategies: [],
      routes: []
    };
  },
  methods: {
    goRouteMsg(routeId, recRouteList){
      this.$router.push({
        path: '/routeMsg/' + routeId + '/' + encodeURIComponent(JSON.stringify(recRouteList))
      })
    },
    getAllScenics() {
      let params = {
        scenicName: this.search,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
      };
      Axios.get("/scenic/search", {
        params,
      }).then((res) => {
        // console.log(res);
        this.total = res.data.scenics.total;
        this.attractions = res.data.scenics.records;
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
    getAllstrategies() {
      let params2 = {
        strategyName: this.search,
        pageNum: this.pageNo2,
        pageSize: this.pageSize2,
      };
      Axios.get("/strategy/search", {
        params: params2,
      }).then((res) => {
        // console.log(res);
        this.strategies = [];
        res.data.strategies.records.forEach((element) => {
          // 时间戳格式化
          element.createTime = this.formatDate(element.createTime);
          // 添加
          this.strategies.push(element);
        });
        this.total2 = res.data.strategies.total;
        // this.strategies = res.data.strategies.records;
      });
    },
    getAllRoutes() {
      let params3 = {
        scenicName: this.search
      };
      Axios.get("/route/search", {
        params: params3,
      }).then((res) => {
        // console.log(res);
        // this.total2 = res.data.scenics.total;
        this.routes = res.data.routes;
      });
    },
    getPageNo(pageNo) {
      this.pageNo = pageNo;
      //   console.log(this.pageNo)
      this.getAllScenics()
    },
    getPageNo2(pageNo) {
      this.pageNo2 = pageNo;
      //   console.log(this.pageNo)
      this.getAllstrategies()
    },
  },
  mounted() {
    this.search = this.$route.query.keyword
    // console.log(this.$route.query.keyword)
    this.getAllScenics()
    this.getAllstrategies()
    this.getAllRoutes()
  }
};
</script>
<style lang="less" scoped>
// .container {
//   width: 1200px;
//   margin: 0 auto;
//   height: 2000px;
//   background-color: pink;
// }
.searchTip {
  width: 1000px;
  margin: 0 auto;
  font-size: 30px;
  color: #999;
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.filters {
  text-align: center;
  margin-bottom: 2rem;
}

.filters * {
  display: inline-block;
}

.filters li {
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 2rem;
  min-width: 50px;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
}

.filters li:hover {
  background: rgb(184, 28, 34);
  color: white;
}

.isActive {
  background: rgb(184, 28, 34);
  color: white;
}

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

.search {
  margin: 10px 0;

  .py-container {
    // width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0 30px 0;

        ul {
          display: flex;
          flex-wrap: wrap;
          margin: 0px 0px 0px -35px;

          li {
            border-radius: 10px;
            //height: 350px;
            border: 2px solid rgb(184, 28, 34);
            width: 23%;
            margin: 0px 9px;
            list-style-type: none;
            margin-top: 20px;
            line-height: 28px;
            transition: 0.2s all linear;

            &:hover {
              box-shadow: 0 0 5px rgb(184, 28, 34);
              // box-shadow: 0 0 5px gray;
              transform: scale(1.05);
            }

            a {
              text-decoration: none;
            }

            .list-wrap {
              &:hover p {
                color: rgb(184, 28, 34);
              }

              // border: 1px solid #e6e6e6;

              .pic {
                margin: 0 auto;
                width: 100%;
                max-width: 260px;
                height: 180px;
                border: 1px solid #ccc;
                background-size: cover;
                background-position: center;
                box-shadow: 0 0 3px gray;
                // margin-right: 20px;
                border-radius: 10px;
              }

              .introduction {
                margin: 10px 10px 0 10px;
                color: #a3a2a2;
                height: 150px;
                font-size: 15px;
                border-bottom: 1px solid rgb(184, 28, 34);
                overflow: auto;
              }

              .price {
                // padding-left: 15px;
                font-size: 18px;
                color: #8f9399;
                text-align: center;
                height: 60px;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}

.tip {
  width: 1200px;
  margin: 20px auto;
  font-size: 30px;
  color: rgb(184, 28, 34);
  text-align: center;
  padding-bottom: 30px;
  border-bottom: 1px dashed rgb(184, 28, 34);
}

.boutique_article {
  width: 1200px;
  margin: 20px auto;
}

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
  /* margin-bottom: 15px; */
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
  padding: 0px 20px;
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
  // .boutique_article .textBox {
    /* width: 500px; */
  // }
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
  margin: 10px 0 10px 10px;
}

.route-item {
  margin: 0 auto;
  width: 1090px;
  height: 250px;
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 0 0 3px gray;
  display: flex;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  transition: 0.2s all linear;
}

.route-item:hover {
  box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.64);
  transform: scale(1.02);
  cursor: pointer;
}

.route-item .picture {
  width: 300px;
  height: 100%;
  /*background-image: url("./images/上海背景图.jpg");*/
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-right: 20px;
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
}

.route-item .picture img {
  width: 300px;
  height: 100%;
}

.route-msg {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.route-msg .route-name {
  font-size: 25px;
  font-weight: bold;
  color: rgb(184, 28, 34);
  margin-bottom: 10px;
}

.score {
  margin: 10px;
  display: flex;
  align-items: center;
}

.score .score-text {
  margin-left: 10px;
  font-size: 18px;
  width: 100px;
  height: 30px;
  background-color: rgb(184, 28, 34);
  color: white;
  text-align: center;
  border-radius: 10px;
}

.route-msg .relative-msg {
  display: flex;
  font-size: 18px;
}

.locations {
  color: gray;
  font-size: 15px;
  display: flex;
  margin-top: 10px;
}

.locations ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.locations ul li {
  padding: 0 10px;
  margin: 0;
  list-style: none;
  border-right: 1px solid gray;
}

.locations ul li:last-child {
  border-right: none;
}

.locations ul li a {
  text-decoration: none;
  color: #666;
}

.locations ul li a:hover {
  color: rgb(184, 28, 34);
  text-decoration: none;
}

.region {
  color: gray;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
}

.region ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.region ul li {
  padding: 0 10px;
  margin: 0;
  list-style: none;
  border-right: 1px solid gray;
}

.region ul li:last-child {
  border-right: none;
}
.emptyImg {
  z-index: 1;
  display: block;
  width: 250px;
  min-height: 270px;
  background: url(@/assets/images/glass.png) no-repeat;
  background-size: 250px 250px;
  text-align: center;
  font-size: 17px;
  margin: 0px auto;
  color: #9A9;
}
.focus{
  border-radius: 50px !important;
}
</style>
