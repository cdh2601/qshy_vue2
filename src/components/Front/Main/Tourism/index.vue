<template>
  <div class="bckColor">
    <div class="jieshao">
      <div class="row row-summary row-bg">
        <div class="wrapper">
          <h2 class="title">景点概况</h2>
          <div>
            <p style="display: none; color: #666">
              到上海，你永远不会觉得无事可做，你可以到外滩尽情感受夜的风情，去徐汇区的天平路和湖南路找最漂亮的老洋房，在老上海的里弄感受历史的沉淀，或者索性也彻底小资一把，去田子坊、新天地静坐冥想，任时光流逝；衡山路酒吧街对饮狂欢...
            </p>
            <span id="mdd_poi_desc" class="zi"
              >到上海，你永远不会觉得无事可做，你可以到外滩尽情感受夜的风情，去徐汇区的天平路和湖南路找最漂亮的老洋房，在老上海的里弄感受历史的沉淀，或者索性也彻底小资一把，去田子坊、新天地静坐冥想，任时光流逝；衡山路酒吧街对饮狂欢；1933老厂房这些艺术仓库看看中西混搭的艺术魅力。最后千万别忘了登上东方明珠，放眼看看这个国际化的大都市。</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <div> -->
      <!-- <div class="scope-info-up"> -->
        <!-- <h2 class="title">景点地图</h2>
        <h2 class="suikou">让你的旅行，不止拍拍照就离开</h2>  -->
      <!-- </div> -->
      <!-- <mapShow/> -->
    <!-- </div> -->
    <!-- <MonthRecommend/> -->
    <routerScenic/>
    <!-- <Theme/> -->
  </div>
</template>

<script> 
import MapShow from '../Home/Content/MapShow'
import MonthRecommend from './content/MonthRecommend'
import Theme from './content/Theme'
import routerScenic from './content/routerScenic'
import $ from "@/utils/jquery";
export default {
  name: "Tourism",
  components:{
    MapShow, 
    MonthRecommend,
    Theme,
    routerScenic
  },
  mounted() {
    (function () {
      function getRownum(obj) {
        try {
          var lines = obj.getClientRects(),
            i = lines.length,
            map = {},
            num = 0;
          while (i--) {
            if (!map[lines[i].top]) {
              num++;
              map[lines[i].top] = 1;
            }
          }
          return num;
        } catch (e) {
          return 1;
        }
      }
      var $con = $("#mdd_poi_desc"),
        rownum = getRownum($con[0]);
      if (rownum > 2) {
        $('<a style="color:rgb(184, 28, 34);cursor: pointer;">展开全部</a>')
          .appendTo($con.hide().prev().show())
          .click(function (e) {
            e.preventDefault();
            $(this).parent().hide().next().show();
          });
      }
    })();
  },
};
</script>

<style scoped>
/* .bckColor {
  background-color: #E1E1E1;
} */
.scope-info-up {
  margin: 70px -20px 50px -20px;
  
}

.scope-info-up .title {
  font-size: 35px;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 500;
  color: rgb(184, 28, 34);
}
.scope-info-up .suikou{
  color: rgb(169, 169, 169);
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}
.jieshao {
  margin: -20px -20px 0 -20px;
  padding: 0;
  word-wrap: break-word;
}
.zi {
  color: #666;
}
h2.title {
  font-size: 20px;
  color: #333;
  font-weight: normal;
  margin-bottom: 25px;
  line-height: 22px;
}
.wrapper {
  width: 1000px;
  margin: 0 auto;
}
.row-summary {
  font-size: 16px;
  line-height: 24px;
}
.row-bg {
  background-color: #fafafa;
}
.row {
  padding: 30px 0;
  min-width: 980px;
  border-bottom: 1px solid #e4e4e4;
}
.row-top5 .item {
  height: 290px;
  background: #fafafa;
  border-radius: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.row-top5 .info {
  float: left;
  width: 385px;
  height: 270px;
  padding: 0px 15px 0px 20px;
  display: table;
  line-height: 24px;
  font-size: 14px;
}
.row-top5 .pic {
  padding-top: 10px;
}
.row-top5 .pic .large {
  width: 380px;
  height: 270px;
  margin-right: 10px;
}
.large img,
.small img {
  border-radius: 50px;
}
.row-top5 .pic div {
  float: left;
  display: inline;
  width: 185px;
  height: 130px;
  margin-bottom: 10px;
}
.middle {
  display: table-cell;
  vertical-align: middle;
}
.row-top5 h3 {
  margin-bottom: 25px;
  font-size: 18px;
  line-height: 20px;
  font-weight: normal;
}
.row-top5 .num {
  float: left;
  margin-right: 18px;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: rgb(184, 28, 34);
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.row-top5 .rev-total {
  float: right;
  font-size: 12px;
}
.row-top5 .rev-total em {
  font-style: normal;
  color: rgb(184, 28, 34);
}
.row a {
  color: rgb(184, 28, 34);
  text-decoration: none;
  padding-right: 10px;
}
.row-top5 .info p {
  margin-bottom: 12px;
  font-size: 16px;
  color: #666;
}
.row-top5 .links {
  color: #999;
}

.row-hotScenic .grid {
  float: left;
  width: 242px;
  height: 320px;
  display: inline;
  margin: 0 15px 20px 0;
}
.row-hotScenic .grid-two {
  width: 485px;
}
.row-hotScenic .grid-two .figure {
  width: 485px;
  height: 320px;
}
.row-hotScenic .figure {
  width: 242px;
  height: 155px;
  position: relative;
  margin-bottom: 10px;
  line-height: 20px;
  font-size: 14px;
  overflow: hidden;
}
.row-hotScenic .bd {
  margin: 0 -20px -20px 0;
  *zoom: 1;
}
.row-hotScenic .mask-container {
  position: absolute;
  left: 0;
  top: 100%;
  right: 0;
  bottom: 0;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#66000000',endColorstr='#66000000',GradientType=0);
  -webkit-transition: top 0.5s ease 0s;
  transition: top 0.5s ease 0s;
  height: 100%;
}
.row-hotScenic .mask {
  display: table;
  width: 100%;
  height: 100%;
}
.middle {
  display: table-cell;
  vertical-align: middle;
}
img {
  border: 0;
  vertical-align: middle;
}
.row-hotScenic .figure a {
  color: #fff;
  display: block;
}
h2.title {
  font-size: 20px;
  color: #333;
  font-weight: normal;
  margin-bottom: 25px;
  line-height: 22px;
}
.row-hotScenic .figure .title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  padding-left: 14px;
  padding-right: 14px;
  background: -moz-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.8) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(15%, rgba(0, 0, 0, 0)),
    color-stop(100%, rgba(0, 0, 0, 0.8))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.8) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.8) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.8) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.8) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000',endColorstr='#99000000',GradientType=0);
  -webkit-transition: opacity 0.5s ease 0s;
  transition: opacity 0.5s ease 0s;
}
.row-hotScenic .grid-two h3 {
  font-size: 20px;
  line-height: 30px;
}
.row-hotScenic h3 {
  font-size: 16px;
  padding-bottom: 10px;
  line-height: 24px;
  font-weight: normal;
}
.row-hotScenic .figure a:hover .mask-container {
  top: 0;
}
.tip-trangle-bottom {
  width: 1px;
  height: 3px;
  margin: -25px 11px 9px 75px;
  /* background-color: #fff; */
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #fda400;
}
.row-allScenic .nav {
  margin-bottom: 5px;
  line-height: 30px;
  font-size: 14px;
  list-style: none;
}
.row-allScenic .nav li {
  float: left;
  position: relative;
}
.row-allScenic .nav .on a {
  background-color: rgb(184, 28, 34);
  color: #fff;
}
.row-allScenic .nav a {
  display: inline-block;
  color: #333;
  padding: 0 20px;
  border-radius: 1px;
}
.row-allScenic .nav li:before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  width: 1px;
  height: 15px;
  background-color: #333333;
}
.row-allScenic .nav .on a:hover {
  text-decoration: none;
}
.row-allScenic .nav .on:before,
.row-allScenic .nav .on + li:before {
  display: none;
}
</style>