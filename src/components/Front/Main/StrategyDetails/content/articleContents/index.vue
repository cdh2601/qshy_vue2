<template>
  <div class="articleBox">
    <!-- 文章头部 -->
    <div class="articleHead">
      <p class="round"></p>
      <h2>{{ articleInfo.strategyName }}</h2>
      <div class="collections">
        <div><span style="color: rgb(184, 28, 34)">{{ articleInfo.collections.length }}</span>次收藏</div>
        <div v-if="!articleInfo.collections.includes(userId)&&!collect" class="notCollection" @click="chooseCollect">
          <div>
            <i class="el-icon-star-off"></i>
          </div>
          <span style="margin-left: 10px">收藏</span>
        </div>
        <div v-else class="collection" @click="goPersonCollect">
          <div>
            <i class="el-icon-star-on"></i>
          </div>
          <span style="margin-left: 10px">已收藏</span>
        </div>
      </div>
      <p class="articleInfo">
        <!-- 作者 -->
        <span>
          <i class="el-icon-user"></i>
          {{ articleInfo.ownerName }}
          <!--           <img class="focus" :src="articleInfo.avatar" style="width: 20px;height: 20px">-->
        </span>
        <!-- 时间 -->
        <span>
          <i class="el-icon-timer"></i>
          {{ articleInfo.createTime }}
        </span>
        <!-- 浏览量 -->
        <span>
          <i class="el-icon-star-off"></i>
          {{ articleInfo.collections.length }}
        </span>
      </p>
    </div>
    <!-- 文章内容 -->
    <div class="articleBody">
      <div class="article" v-html="articleInfo.text">
        <!--        {{ textList }}-->
      </div>
    </div>
    <!-- 文章尾部 -->
    <div class="articleFloot">
      <p>
        版权声明：本站所提供的图文等内容部分源于网络，仅供参考，如有侵权，联系删除。转载本站内容请注明相关出处。
      </p>
      <!--      <p>-->
      <!--        本文链接：<a :href="wPath">{{ wPath }}</a>-->
      <!--      </p>-->
    </div>
  </div>
</template>

<script>
import Axios from "@/utils/request";

export default {
  components: {},
  props: {
    articleInfo: Object,
  },
  data() {
    return {
      collect: false,
      scoreValue: 4.8,
      // eslint-disable-next-line vue/no-dupe-keys
      // articleInfo: {},
      // 获取当前页面地址，如http://localhost:8080/admin/index
      wPath: window.document.location.href,
      userId:''
    };
  },
  methods: {
    goPersonCollect() {
      Axios.get('/strategy/deCollection',{
        params:{
          userId:JSON.parse(sessionStorage.getItem('userInfo')).userId,
          strategyId:this.articleInfo.strategyId,
        }
      }).then((res)=>{
        // console.log(res)
        if(res.code===200){
          this.collect=!this.collect
          this.$message('取消收藏成功')
          location.reload();
        }
      })
      // this.$router.push({
      //   path: '/collect'
      // })
    },
    chooseCollect() {
      const userInfo = sessionStorage.getItem("userInfo");
      if (!userInfo) {
        // 登录验证
        this.$message.warning("请先登陆后收藏");
      } else {
        this.collect = !this.collect;
        let params = {
          strategyId: this.articleInfo.strategyId,
          userId: JSON.parse(sessionStorage.getItem('userInfo')).userId
        }
        // console.log(this.routeMsg.routeId,this.routeMsg.userId)
        Axios.get('/strategy/collection', {
          params,
          headers: {
            token: localStorage.getItem("token"),
          },
        }).then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.$message.success('收藏成功')
            // this.routeMsg.collectionUsers.length= res.data.route.collectionUsers.length;
            // console.log(this.routeMsg.collectionUsers.length)
          }
        })
      }
    }
  },
  mounted() {
    // console.log(this.articleInfo.text);
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      this.userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
    }
  },
};
</script>

<style scoped>
.articleBox {
  height: auto;
  overflow: hidden;
  background-color: white;
  padding: 25px;
  line-height: 30px;
  color: #474749;
  border-radius: 10px;
  margin-bottom: 20px;
}

/** 3个点 */
.round {
  width: 12px;
  height: 12px;
  background-color: #fc625d;
  border-radius: 16px;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  margin-bottom: 10px;
}

.articleHead {
  border-bottom: #dbdbdb 1px dashed;
  margin-bottom: 20px;
}

.articleHead h2 {
  line-height: 35px;
}

.articleInfo {
  line-height: 45px;
  color: #888;
  font-size: 13px;
}

.articleInfo span {
  margin-right: 20px;
  display: inline-flex;
  align-items: center;
}

.articleInfo .el-icon {
  margin-right: 8px;
}

/* 尾部样式 */
.articleFloot {
  margin: 20px 0;
  border-left: 5px solid rgb(184, 28, 34);
  padding: 10px 15px;
  background: #f8f8f8;
  font-size: 14px;
  color: #888;
  line-height: 22px;
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
}

.collections {
  margin: 10px 0 10px 0;
  color: #999;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}
.notCollection {
  color: white;
  display: flex;
  background-color: rgb(184, 28, 34);
  padding: 8px 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 20px;
}

.collection {
  color: white;
  display: flex;
  background-color: rgb(184, 28, 34);
  padding: 8px 15px;
  border-radius: 10px;
  margin-right: 20px;
  cursor: pointer;
}
blockquote{
  border-left: 5px solid rgb(184, 28, 34);
  padding-left: 20px;
  margin-left: 0px;
}
</style>
