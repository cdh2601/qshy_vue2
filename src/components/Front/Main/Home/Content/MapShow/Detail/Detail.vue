<template>
  <div id="detail" class="out">
    <div class="top">
      <h2>{{ title }}</h2>
    </div>
    <div class="jianjie">
      <p>
        {{ list.text }}
      </p>
    </div>
    <div class="shuliang">
      <p style="float: left; margin-left: 10px; color: #666;">[景点数量]</p>
      <h2 style="float: right; margin: 15px 0 0px 0px; color: #666;">{{list.number}}个</h2>
    </div>
    <div class="remen">
      <p style="float: left; margin-left: 10px; color: #666;">[代表景点]</p>
      <h2 style="float: right; margin: 15px 0 0px 0px; color: #666;">{{list.address}}</h2>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Detail",
  props: {
    DetailMessage: {
      type: Array,
    },
    details: {},
    pictures: {},
  },
  data() {
    return {
      title: "上海市",
      title1: "",
      value1: 0,
      deepth: "",
      list: {name:'上海市',address:'外滩',number:56,text:'到上海，你永远不会觉得无事可做，你可以到外滩尽情感受夜的风情，去徐汇区的天平路和湖南路找最漂亮的老洋房，在老上海的里弄感受历史的沉淀，或者索性也彻底小资一把，去田子坊、新天地静坐冥想，任时光流逝；衡山路酒吧街对饮狂欢；1933老厂房这些艺术仓库看看中西混搭的艺术魅力。最后千万别忘了登上东方明珠，放眼看看这个国际化的大都市。'},
    };
  },
  mounted() {
    // console.log(this.DetailMessage);
  },
  created() {
    this.biaoshi(),
      this.$bus.$on("dblclick", (title, deepth) => {
        if (deepth == 1) {
          this.title = title;
          for (let i = 0; i < this.DetailMessage.length; i++) {
          if (this.title == this.DetailMessage[i].name) {
            this.list = this.DetailMessage[i];
            // console.log(this.list);
          }
        }
        } else {
          this.title = "上海市";
          for (let i = 0; i < this.DetailMessage.length; i++) {
          if (this.title == this.DetailMessage[i].name) {
            this.list = this.DetailMessage[i];
            // console.log(this.list);
          }
        }
        }
        // this.deepth = deepth;
      })
      
  },
  methods: {
    closeDetail() {
      this.$emit("closeDetail");
    },
    biaoshi() {
      if (this.deepth == 1) {
        for (let i = 0; i < this.DetailMessage.length; i++) {
          if (this.title == this.DetailMessage[i].name) {
            this.list = this.DetailMessage[i];
          }
        }
      } else {
        this.title = "上海市";
      }
    },
  },
};
</script>
  
<style scoped>
.out {
  float: right;
  position: relative;
  width: 360px;
  height: 520px;
  margin-right: 25px;
  background-color: rgb(184, 28, 34);
  margin-top: -540px;
  z-index: 666;
  border-radius: 10px;
  padding-bottom: 10px;
}
.top {
  color: white;
  font-size: 18px;
  width: 300px;
  line-height: 30px;
  /* padding: 20px 0px 15px 0px; */
  margin-left: 27px;
  margin-bottom: 10px;
  border-bottom: 2px solid rgb(230, 230, 230);
  
}
.jianjie {
  background-color: white;
  font-size: 16px;
  line-height: 24px;
  color: #666;
  padding: 1px 10px 0px 10px;
  text-indent: 2em;
  margin: 0 30px 0 30px;
  height: 270px;
  border-radius: 10px;
}
.shuliang {
  background-color: white;
  font-size: 16px;
  line-height: 24px;
  color: black;
  padding: 0px 10px 0 0px;
  height: 60px;
  /* text-indent: 2em; */
  margin: 15px 30px 0 30px;
  /* display: flex; */
  justify-content: space-around;
  border-radius: 10px;
}
.remen {
  background-color: white;
  font-size: 16px;
  line-height: 24px;
  color:black;
  padding: 0px 10px 0px 0px;
  height: 60px;
  /* text-indent: 2em; */
  margin: 15px 30px 0 30px;
  /* display: flex; */
  justify-content: space-around;
  border-radius: 10px;
}
</style>
  