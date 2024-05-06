<template>
  <div class="boutique_article">
    <!-- <div class="titleBox">
      <h3 style="color: rgb(184, 28, 34)">
        <i class="el-icon-s-order"></i>&nbsp;精品攻略
      </h3>
      <p>包含本站所有攻略，阅读愉快~</p>
    </div> -->
    <div
      class="contentBox"
      v-loading="state.loading"
      element-loading-text="玩命加载中..."
      style="z-index: 0"
    >
      <div class="titleWrapper">
        <h3 class="title"><b>攻略</b></h3>
        <!-- <button @click="goWrite"><i class="el-icon-edit"></i>写攻略</button> -->
        <div class="search">
          <input type="text" v-model="keyWordRoute" placeholder="攻略名称" />
          <button type="button" class="searchbtn" @click="searchRoutes(1)">
            <div>
              <i class="el-icon-search"> </i>
            </div>
          </button>
        </div>
      </div>
      <div
        class="articleBox"
        v-for="(item, index) in state.articleInfo"
        :key="index"
      >
      <div style="width: 70%;">
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
            <span style="color: rgb(184, 28, 34);">{{ item.collections.length }}</span>次收藏&nbsp;&nbsp;&nbsp;&nbsp;
            <span>发布状态：</span>
            <span style="color: rgb(184, 28, 34);" v-if="item.open===true">公开</span>
            <span style="color: rgb(184, 28, 34);" v-if="item.open===false">私有</span>
          </div>
          <div class="article">
            <div class="textBox">
              <!--              <p style="margin-bottom: 25px; margin: 0">{{ item.texts[0] }}</p>-->

              <p class="articleMessage hidden-xs-only">
                <span>
                  <i class="el-icon-user"></i>&nbsp;
                  <font class="highlight">{{ item.ownerName }}</font>&nbsp;
                  <img
                    v-if="item.avatar !== ''"
                    class="focus"
                    :src="item.avatar"
                  />
                  <img
                    v-if="item.avatar === ''"
                    class="focus"
                    src="@/assets/images/logo.png"
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
          </div>
        </router-link>
      </div>

        <div class="deleteStragety">
            <button @click="delStrategy(item.strategyId)">删除</button>
        </div>
      </div>
      <Pagination
        :pageNo="state.currentPage"
        :pageSize="state.pageSize"
        :total="state.total"
        :continues="4"
        @getPageNo="getPageNo"
        style="margin-top: 20px"
      />
    </div>
            <div class="drafts">
          <div class="draftTitle">草稿箱（{{ draftsLength }}）</div>
          <div class="content">
            <draftItem @goDraftEdit="goDraftEdit" @afterDel="afterDel" :allDrafts="allDrafts"></draftItem>
          </div>
        </div>
  </div>
</template>

<script>
import Axios from "@/utils/request.js";
import Pagination from "@/components/Front/OtherModules/Pagination";
import draftItem from '@/components/Front/Main/Community/content/writeStrategy/content/draftItem'
import { nanoid } from "nanoid";

export default {
  components: { Pagination ,draftItem},
  data() {
    return {
      scoreValue: 4.8,
      state: {
        articleInfo: [],
        total: "", //总条数
        pageSize: 5, //每页显示行数
        currentPage: 1, //当前页码
        loading: false,
      },
      allDrafts: [],
      draftsLength: 0,

      keyWordRoute:''
    };
  },
  methods: {
    // goWrite() {
    //   let strategyId=nanoid(12)
    //   this.$router.push({
    //     path:"/writeStrategy/"+strategyId
    //   });
    // },
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
        userId:JSON.parse(sessionStorage.getItem('userInfo')).userId,
        pageNum: this.state.currentPage,
        pageSize: this.state.pageSize,
      };
      Axios.get("/strategy/getUserStrategyPage", {
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
      if(this.keyWordRoute!==''){
        this.searchRoutes()
      }else{
        this.loadData();
      }
      //   console.log(this.pageNo)
    },
    delStrategy(strategyId){
      this.$confirm('此操作将永久删除该攻略, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios.get('/strategy/delIssue',{
          params:{
            userId:JSON.parse(sessionStorage.getItem('userInfo')).userId,
            strategyId:strategyId
          }
        }).then((res)=>{
          // console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(()=>{
            this.loadData()
          },200)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getDrafts() {
      Axios.get('/strategy/getUserDrafts', {
        params: {
          userId: JSON.parse(sessionStorage.getItem('userInfo')).userId
        }
      }).then((res) => {
        // console.log(res)
        this.allDrafts=[]
        this.draftsLength = res.data.drafts.length
        res.data.drafts.forEach((element) => {
          // 时间戳格式化
          element.createTime = this.formatDate(element.createTime);
          // 添加
          this.allDrafts.push(element);
        });
      })
    },
    afterDel(dra){
      this.allDrafts=dra
      this.draftsLength=dra.length
    },
    goDraftEdit(dra){
      // console.log(dra)
      this.$router.push({
        path:'/writeStrategy/'+nanoid(12)+'/'+encodeURIComponent(JSON.stringify(dra))
      })
    },
    searchRoutes(resetPage){
      // if(!this.keyWordRoute){
      //   this.$message('请输入攻略名称')
      //   return
      // }

      Axios.get('/strategy/userStrategySearch',{
        params:{
          userId:JSON.parse(sessionStorage.getItem('userInfo')).userId,
          pageNum: resetPage==undefined?this.state.currentPage:1,
          pageSize: this.state.pageSize,
          strategyName:this.keyWordRoute
        }
      }).then((res)=>{
        // console.log(res)
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
      })
      // this.state.articleInfo=this.state.articleInfo.filter(v=>{
      //   return v.strategyName.includes(this.keyWordRoute)
      // })
      // console.log(this.state.articleInfo)
      // this.state.total=this.state.articleInfo.length
      // this.state.total = this.state.articleInfo.filter(v=>{
      //   let total=0
      //   if(v.strategyName.includes(this.keyWordRoute)){
      //     total++
      //   }
      //   return total
      // })
      // console.log(this.state.total)
    }
  },
  mounted() {
    this.loadData();
    this.getDrafts();
  },
};
</script>

<style scoped>
.boutique_article {
  display: flex;
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
  width: 67%;
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
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
  display: flex;
  justify-content: space-between;
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
  .boutique_article .textBox {
    /* width: 500px; */
  }
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
  height: 30px;
  background-color: rgb(184, 28, 34);
  color: white;
  text-align: center;
  padding: 5px 10px;
  border-radius: 10px;
}
.search .searchbtn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40px;
  font-size: 10px;
  height: 30px;

  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  border: none;
  color: white;
  transition: 0.2s all linear;
  cursor: pointer;
  /* //   border-radius: 2px; */
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.search .searchbtn:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}
.search {
  /* width: 250px; */
  /* margin-top: 30px; */
  margin-right: 30px;
  height: 30px;
  border: none;
  display: flex;
  justify-content: flex-end;
}
.deleteStragety {
    display: flex;
    justify-content: flex-end;
     display: none;
    width: 700px;
    align-items: center;
}
.articleBox:hover .deleteStragety {
    display: flex;
    justify-content: flex-end;
     /* display: none; */
    width: 100px;
    align-items: center;
}
.deleteStragety button {
  height: 40px;
  width: 90px;
  background-color: #f56c6c;
  border: 1px solid #f56c6c;
  border-radius: 5px;
  color: white;
  font-size: 15px;
  transition: 0.2s all;
  cursor: pointer;
  /* text-align: end; */
}
.deleteStragety button:hover {
  background: #ff3131;
  border: 1px solid #ff3131;
}
.collections {
  margin:10px 0 10px 10px;
  color: #999;
}
.drafts {
  width: 30%;
  /* background-color: gray; */
  height: 620px;
  padding: 10px 10px;
  box-shadow: 0 0 5px gray;
  margin-top: 12px;
}
.drafts .draftTitle {
  font-size: 30px;
  color: rgb(184, 28, 34);
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #999999;
  text-align: center;
}

.drafts .content {
  overflow: auto;
  height: 550px;
}
.focus{
  border-radius: 50px !important;
}
</style>
