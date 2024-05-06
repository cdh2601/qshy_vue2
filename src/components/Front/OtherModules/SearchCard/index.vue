<template>
  <!-- 卡片/搜索功能 -->
  <el-card class="search_card">
    <div class="search_img_box">
      <img :src="url" />
    </div>
    <div class="search_input_box">
      <!-- 搜索框 -->

      <el-input
          v-model="input"
          class="w-50 m-2 search_input"
          size="large"
          placeholder="搜索攻略..."
          clearable
          prefix-icon="el-icon-search"
          @keyup.enter.native="searchContent('')"
      />
    </div>
    <div class="search_link_box">
      <p>
        <el-link class="xuanfu" type="info" :underline="false" @click="searchContent('外滩')"
        ><span>外滩</span></el-link
        >
        <el-link class="xuanfu" type="info" :underline="false" @click="searchContent('公园')"
        ><span>公园</span></el-link
        >
        <el-link class="xuanfu" type="info" :underline="false" @click="searchContent('动物园')"
        ><span>动物园</span></el-link
        >
        <el-link class="xuanfu" type="info" :underline="false" @click="searchContent('迪士尼')"
        ><span>迪士尼</span></el-link
        >
      </p>
    </div>
  </el-card>
</template>

<script>
import Axios from "@/utils/request";
export default {

  name: "SearchCard",
  methods: {
    searchContent(val) {
      if (val == "") {
        if (this.input !== "") {
          this.$router.push({
            path: "/searchStrategy",
            query: {
              keyword: this.input,
            },
          });

        } else {
          this.$message.error("请输入关键字进行搜索");
        }
      } else {
        this.$router.push({
          path: "/searchStrategy",
          query: {
            keyword: val,
          },
        });
      }
    },
  },
  data() {
    return {
      input: "",
      nonce: null,
      url: null,
    };
  },
  created() {
    const nonce = Math.floor(Math.random() * 7 + 1);
    const nonce2 = nonce < 10 ? "0" + nonce : nonce;
    this.url = require("../../../../assets/images/banner/banner" + nonce2 + ".png");
  },
};
</script>

<style scoped>
.xuanfu:hover span{
  color:rgb(184, 28, 34)
}
.el-card {
  border-radius: 10px;
  margin-bottom: 20px;
}

:deep(.el-card__body) {
  padding: 0;
}

.search_img_box {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}

.search_img_box img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.search_input_box {
  text-align: center;
  font-size: 12px;
  margin-bottom: 8px;
}

.search_input {
  width: 90%;
  border-radius: 50px;
}

.search_link_box {
  /*height: 18%;*/
  /*margin: 25px 0 0 35px;*/
}

.search_link_box p {
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
}

:deep(.el-input--large .el-input__wrapper) {
  margin-top: 0px;
  border-radius: 50px;
}

.el-link {
  margin-right: 10px;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>