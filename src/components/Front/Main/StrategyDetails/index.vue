<template>
  <el-row :gutter="20">
    <!--    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">-->
    <!-- 左侧间隙 -->
    <!--    </el-col>-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <!-- 文章内容 -->
          <ArticleContents :articleInfo="state.articleInfo"></ArticleContents>
          <!-- 评论区 判断作者是否开启评论 -->
          <CommentsSection :articleId="$route.params.strategyId"></CommentsSection>
        </el-col>
        <el-col class="hidden-sm-and-down" :md="6" :lg="6" :xl="6">
          <!-- 搜索功能 -->
          <SearchCard></SearchCard>
          <!-- Featured精选 -->
          <Featured></Featured>
          <!-- 打赏本站 -->
<!--          <PlayTour></PlayTour>-->
        </el-col>
      </el-row>
    </el-col>
    <!--    <el-col :xs="0" :sm="1" :md="1" :lg="3" :xl="4">-->
    <!-- 右侧间隙 -->
    <!--    </el-col>-->
  </el-row>
</template>
<script>
// 文章内容
import ArticleContents from './content/articleContents/index.vue'
import CommentsSection from './content/commentsSection/index.vue'

// 引入搜索功能
import SearchCard from '../../OtherModules/SearchCard/index.vue';
// 引入Featured精选
import Featured from '../../OtherModules/featured/index.vue';
// 打赏本站
import PlayTour from '../../OtherModules/playTour/index.vue'

import Axios from '@/utils/request.js'

export default {
  data() {
    return {
      state: {
        articleInfo: {}
      }
    }
  },
  methods: {
    formatDate(timestamp) {
      // 补全为13位
      let arrTimestamp = (timestamp + '').split('');
      for (let start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
          arrTimestamp[start] = '0';
        }
      }
      timestamp = arrTimestamp.join('') * 1;
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      let month = day * 30;
      let now = new Date().getTime();
      let diffValue = now - timestamp;
      // 如果本地时间反而小于变量时间
      if (diffValue < 0) {
        return '不久前';
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
          return '0' + value;
        }
        return value;
      };
      // 使用
      if (monthC > 4) {
        // 超过1年，直接显示年月日
        return (function () {
          let date = new Date(timestamp);
          return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
        })();
      } else if (monthC >= 1) {
        return parseInt(monthC) + '月前';
      } else if (weekC >= 1) {
        return parseInt(weekC) + '周前';
      } else if (dayC >= 1) {
        return parseInt(dayC) + '天前';
      } else if (hourC >= 1) {
        return parseInt(hourC) + '小时前';
      } else if (minC >= 1) {
        return parseInt(minC) + '分钟前';
      }
      return '刚刚';
    },
    loadData() {
      const params = {
        // route.params.id 跳转到当前路由携带着文章id
        strategyId: this.$route.params.strategyId
      }
      // 点击的文章浏览量+1
      // Axios.get("/article/updateArticleClick", {
      //   params
      // })
      // 查询该文章数据
      Axios.get("/strategy/info", {
        params
      }).then(res => {
        // console.log(res)
        // 查询的文章数据
        let data = res.data.strategy;
        // 网页标题 = 当前文章标题
        document.title = res.data.strategy.strategyName
        // 时间戳格式化
        let time = data.createTime; // 当前发布文章的时间戳
        var date = new Date(time); // 初始化日期
        var month = date.getMonth() + 1; // 获取月份
        var day = date.getDate(); // 获取具体日
        data.createTime = this.formatDate(time) +
            ("(" +
                (month < 10 ? ("0" + month) : month) // 三元表达式 日期小于10加上0 例如01
                +
                "-" + day + ")"); // 简化时间 输出格式例如 3天前(7.28)
        // 图片 根url
        // const url = process.env.VUE_APP_URL;
        // // 缩略图 判断是点击上传的还是，网络图片
        // if (data.articleImgLitimg !== "" && !data.articleImgLitimg.includes('http') && !data.articleImgLitimg.includes('https')) {
        //   data.articleImgLitimg = url + data.articleImgLitimg
        // }
        // console.log(res.data[0]);
        this.state.articleInfo = res.data.strategy
      })
    }
  },
  mounted() {
    this.loadData();
    // log
  },
  // 组件路由拦截  判断当前进入的文章是否通过审核和是否所有人可见
  // beforeRouteEnter(to, from, next) {
  //   const params = {
  //     // to.params.id 跳转到当前路由携带着文章id
  //     articleId: to.params.id
  //   }
  //   axios.get("/article/showArticleInfo", {
  //     params
  //   }).then(res => {
  //     // 查询出来的数据不为空,为空则没有这篇文章  返回404
  //     if (res.data.length > 0) {
  //       if (res.data[0].articlePass === 2 && res.data[0].articleState === 1) {
  //         return next()
  //       } else {
  //         return next("/403")
  //       }
  //     } else {
  //       return next("/404")
  //     }
  //   })
  // },
  components: {
    ArticleContents,
    CommentsSection,
    SearchCard,
    Featured,
    PlayTour
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
}
</style>
