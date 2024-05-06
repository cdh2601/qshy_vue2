<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">
        <!-- 左侧间隙 -->
      </el-col>
      <el-col :xs="24" :sm="22" :md="22" :lg="18" :xl="16">
        <div class="search">

          <ol class="filters">
            <li v-for="(monthList,index) in month" :key="index" :class="{isActive:isChange==index}"
                @click="getAttractions(index,monthList.type)">{{ monthList.name }}
            </li>
          </ol>
          <div class="py-container">
            <!--details-->
            <div class="details clearfix">
              <div class="goods-list">
                <ul class="yui3-g">
                  <li
                      class="yui3-u-1-5"
                      v-for="attraction in attractions"
                      :key="attraction.scenicId"
                  >
                    <router-link :to="`/detail/${attraction.scenicId}`">
                      <div class="list-wrap">
                        <!-- <div class="p-img">
                          <img :src="attraction.scenicImages[0]"/>
                        </div> -->
                        <div class="pic" :style="{'background-image':'url('+ attraction.scenicImages[0] +')'}"></div>
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
</template>
<script>
import Pagination from "../../OtherModules/Pagination";
import Axios from "@/utils/request";

export default {
  components: {Pagination},
  inject: ['reload'],
  data() {
    return {
      isChange: -1,
      month: [
        {name: '全部景点', type: ''},
        {name: '地标建筑', type: '1'},
        {name: '亲子游', type: '2'},
        {name: '上海夜景', type: '3'},
        {name: '小清新摄影地', type: '4'},
        {name: '人气免票公园', type: '5'},
        {name: '历史烙印', type: '6'},
        {name: '周边古镇', type: '7'},
        {name: '绿色户外', type: '8'},
      ],
      type: '',
      pageNo: 1,
      pageSize: 8,
      total: "",
      attractions: [],
      sb:0
    };
  },
  methods: {
    getAttractions(index, type) { //index判断栏目有没有变化，type用来传类型给后端，两个为了
      if (JSON.stringify(this.$route.query) === "{}") {
        if (index != this.isChange) { //index判断是否变化，如果变了，颜色变化，页码变为1
          this.isChange = index;
          this.pageNo = 1
        }
        this.type = type; //为了点击分页时类型传值
        let params = {
          pageNum: this.pageNo,
          stype: type //为了传值
        };
        Axios.get("/scenic/allInfo", {params}).then((res) => {
          // console.log(res);
          this.total = res.data.scenics.total;
          this.attractions = res.data.scenics.records;
          // console.log("img", this.attractions[0])
        });
      } else {
        if(index==this.sb){
          // console.log(this.sb)
          let params = {
            scenicName: this.$route.query.keyword,
            pageNum: this.pageNo,
            pageSize: 8,
          };
          Axios.get("/scenic/search", {
            params,
          }).then((res) => {
            // console.log(res);
            this.total = res.data.scenics.total;
            this.attractions = res.data.scenics.records;
            // this.$router.replace({query: {}})
            this.sb=-1
          });
        }else{
          // console.log(this.sb)
          this.$router.replace({query: {}})
          if (index != this.isChange) {
            this.isChange = index;
            this.pageNo = 1
          }
          let params = {
            pageNum: this.pageNo,
            stype: type
          };
          Axios.get("/scenic/allInfo", {params}).then((res) => {
            // console.log(res);
            this.total = res.data.scenics.total;
            this.attractions = res.data.scenics.records;
            // console.log("img", this.attractions[0])
          });
        }

      }
    },
    getPageNo(pageNo) {
      this.pageNo = pageNo;
      //   console.log(this.pageNo)
      this.getAttractions(this.isChange, this.type);
    },
  },
  mounted() {
    this.getAttractions(0, '');
  },
  created() {
    // console.log(JSON.stringify(this.$route.query)==="{}");
  },
};
</script>
<style lang="less" scoped>
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
              box-shadow: 0 0 5px rgb(184, 28, 34) ;
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
                background-position:center;
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
</style>
