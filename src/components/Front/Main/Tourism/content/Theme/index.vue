<template>
  <div>
    <div class="section">
      <div class="themeTop">
        <h2 class="title">精选主题</h2>
        <h2 class="suikou">让你的旅行，充满特色和愉快</h2>
      </div>
      <ul class="case-study-wrapper">
        <li class="case-study-name">
          <a href="" class="hover-target">地标建筑</a>
        </li>
        <li class="case-study-name">
          <a href="" class="hover-target">上海夜景</a>
        </li>
        <li class="case-study-name">
          <a href="" class="hover-target">历史烙印</a>
        </li>
        <li class="case-study-name">
          <a href="" class="hover-target">周边古镇</a>
        </li>
      </ul>
      <ul class="case-study-images">
        <li>
          <div class="img-hero-background">
            <span>
              <img
                  src="@/assets/images/theme/dongfangmingzhu.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: 222px;margin-top: -146px;">
                <router-link :to="`/detail/1`" class="lianjie"><p>东方明珠广播电视塔</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/bowuguan.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px; margin-left: 222px;margin-top: -146px;">
                <router-link :to="`/detail/10`" class="lianjie"><p>上海博物馆</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/huanqiu.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-top: -146px; margin-left: -227px;">
                <router-link :to="`/detail/11`" class="lianjie"><p>上海环球金融中心</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/wanguo.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: -227px;margin-top: -146px;">
                <router-link :to="`/detail/12`" class="lianjie"><p>万国建筑博览群</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
          </div>
          <div class="hero-number-back">01</div>
          <!-- <div class="hero-number">01</div>
          <div class="hero-number-fixed">04</div> -->
        </li>
        <li>
          <div class="img-hero-background">
            <span>
              <img
                  src="@/assets/images/theme/waitan.jpeg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: 222px;margin-top: -146px;">
                <router-link :to="`/detail/28`" class="lianjie"><p>外滩</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/lujiazui.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: -227px;margin-top: -146px;">
                <router-link :to="`/detail/29`" class="lianjie"><p>上海陆家嘴中心</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/xintiandi.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: -227px; margin-top: -146px;">
                <router-link :to="`/detail/3`" class="lianjie"><p>上海新天地广场</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/jingansi.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: 222px;margin-top: -146px;">
                <router-link :to="`/detail/30`" class="lianjie"><p>上海静安寺</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
          </div>
          <div class="hero-number-back">02</div>
          <!-- <div class="hero-number">02</div> -->
        </li>
        <li>
          <div class="img-hero-background">
            <span>
              <img
                  src="@/assets/images/theme/yuyuan.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: 222px;margin-top: -146px;">
                <router-link :to="`/detail/48`" class="lianjie"><p>豫园</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/zgydhz.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: -227px;margin-top: -146px;">
                <router-link :to="`/detail/49`" class="lianjie"><p>中共一大会址</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/zgjz.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: 222px;margin-top: -146px;">
                <router-link :to="`/detail/5`" class="lianjie"><p>中共代表团办事旧址</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/longhua.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: -227px;margin-top: -147px;">
                <router-link :to="`/detail/50`" class="lianjie"><p>龙华古寺</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
          </div>
          <div class="hero-number-back">03</div>
          <!-- <div class="hero-number">03</div> -->
        </li>
        <li>
          <div class="img-hero-background">
            <span>
              <img
                  src="@/assets/images/theme/zhujiajiao.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: -227px;margin-top: -146px;">
                <router-link :to="`/detail/51`" class="lianjie"><p>朱家角古镇</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/qibao.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: -227px;margin-top: -146px;">
                <router-link :to="`/detail/52`" class="lianjie"><p>七宝古镇</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/fengjing.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: 222px;margin-top: -146px;">
                <router-link :to="`/detail/53`" class="lianjie"><p>枫泾古镇</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
            <span>
              <img
                  src="@/assets/images/theme/xinchang.jpg"
                  alt=""
              />
              <div class="xianshi" style="margin-right: -300px;margin-left: 222px;margin-top: -146px;">
                <router-link :to="`/detail/54`" class="lianjie"><p>新场古镇</p></router-link>
                <div style="display:flex;justify-content: space-around;font-size: 15px; color: #e6a23c;">
                    <div class="score">
                      <el-rate
                        :value="4.8"
                        disabled
                        score-template="{value}"
                      ></el-rate>
                      <div class="score-text">
                        <p>评分:4.8分</p>
                      </div>
                    </div>
                   <!-- <div>
                     <i class="el-icon-s-flag" style="border: 2px solid;border-radius: 50px;padding: 4px 0px 0px 1.9px;"></i><p>收藏</p>
                   </div> -->
                </div>
              </div>
            </span>
          </div>
          <div class="hero-number-back">04</div>
          <!-- <div class="hero-number">04</div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import jQuery from "@/utils/jquery.js";

export default {
  mounted() {
    (function ($) {
      "use strict";

      $(document).ready(function () {
        /* Hero Case study images */

        $(".case-study-name:nth-child(1)").on("mouseenter", function () {
          $(".case-study-name.active").removeClass("active");
          $(".case-study-images li.show").removeClass("show");
          $(".case-study-images li:nth-child(1)").addClass("show");
          $(".case-study-name:nth-child(1)").addClass("active");
        });
        $(".case-study-name:nth-child(2)").on("mouseenter", function () {
          $(".case-study-name.active").removeClass("active");
          $(".case-study-images li.show").removeClass("show");
          $(".case-study-images li:nth-child(2)").addClass("show");
          $(".case-study-name:nth-child(2)").addClass("active");
        });
        $(".case-study-name:nth-child(3)").on("mouseenter", function () {
          $(".case-study-name.active").removeClass("active");
          $(".case-study-images li.show").removeClass("show");
          $(".case-study-images li:nth-child(3)").addClass("show");
          $(".case-study-name:nth-child(3)").addClass("active");
        });
        $(".case-study-name:nth-child(4)").on("mouseenter", function () {
          $(".case-study-name.active").removeClass("active");
          $(".case-study-images li.show").removeClass("show");
          $(".case-study-images li:nth-child(4)").addClass("show");
          $(".case-study-name:nth-child(4)").addClass("active");
        });
        $(".case-study-name:nth-child(1)").trigger("mouseenter");
      });
    })(jQuery);
  },
};
</script>


<style scoped>

.themeTop {
  /* margin-left: 40px;
  margin-right: -20px; */
  border-bottom: 2px solid #e6e6e6;
}

.themeTop .title {
  font-size: 35px;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 500;
  color: rgb(184, 28, 34);
  padding-top: 70px;
}

.themeTop .suikou {
  color: #a9a9a9;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

/* #Slider
 ================================================== */
.section {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  /* background: #E1E1E1; */
  display: block;
  overflow: hidden;
  height: 110vh;
}

/* Case Study Showcase
 ================================================== */
.case-study-wrapper {
  position: absolute;
  display: flex;
  top: 35%;
  left: 50%;
  z-index: 10;
  width: 1200px;
  margin: 0;
  padding: 0;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  list-style: none;
  justify-content: space-evenly;
}

.case-study-wrapper .case-study-name {
  margin: 0 auto;
  text-align: center;
  width: 325px;
  padding-right: 20px;
  border-right: 3px solid gray;
  padding-bottom: 10px;
  border-bottom: 2px dashed rgb(184, 28, 34);
}
.case-study-wrapper .case-study-name:first-child {
  margin-left: 50px;
}
.case-study-wrapper .case-study-name:last-child {
  border-right: none;
}

.case-study-wrapper .case-study-name a {
  position: relative;
  list-style: none;
  margin: 0 auto;
  display: inline-block;
  text-align: center;
  padding: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: math;
  font-size: 4vh;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: 3px;
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
  text-decoration: none;
}

.case-study-wrapper .case-study-name a:hover {
  text-decoration: none;
}

.case-study-wrapper .case-study-name.active a {
  color: rgba(47, 167, 185, 0.7);
}

.case-study-wrapper .case-study-name a:before {
  position: absolute;
  content: "";
  left: 50%;
  bottom: 0;
  height: 3px;
  width: 0;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #f19872, #e86c9a);
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

.case-study-wrapper .case-study-name:nth-child(2) a:before {
  background: linear-gradient(45deg, #0947db, #07d89d);
}

.case-study-wrapper .case-study-name:nth-child(3) a:before {
  background: linear-gradient(45deg, #ee2d29, #f8ae2c);
}

.case-study-wrapper .case-study-name:nth-child(4) a:before {
  background: linear-gradient(45deg, #3a3d98, #6f22b9);
}

.case-study-wrapper .case-study-name.active a:before {
  width: 100%;
}

.case-study-images {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 2;
  /* background-color: #999; */
}

.case-study-images li {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  list-style: none;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}

.case-study-images li .img-hero-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 20%;
  left: 0;
  overflow: hidden;
  list-style: none;
  opacity: 0;
  -webkit-transform: translateY(60px);
  transform: translateY(60px);
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
  /* display: flex;
  justify-content: space-around; */
}

.case-study-images li.show .img-hero-background {
  opacity: 1;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  z-index: 999;
}

.case-study-images li .hero-number-back {
  position: absolute;
  top: 67%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  list-style: none;
  opacity: 0;
  font-size: 10vw;
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 4px rgba(0, 0, 0, 0.7);
  z-index: 1;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}

.case-study-images li .hero-number {
  position: absolute;
  bottom: 25px;
  left: 50%;
  width: 40px;
  margin-left: -70px;
  display: block;
  letter-spacing: 2px;
  text-align: center;
  list-style: none;
  opacity: 0;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  line-height: 1;
  color: #fff;
  z-index: 6;
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}

.case-study-images li .hero-number-fixed {
  position: absolute;
  bottom: 25px;
  left: 50%;
  margin-left: 30px;
  width: 40px;
  text-align: center;
  display: block;
  letter-spacing: 2px;
  list-style: none;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  line-height: 1;
  color: #fff;
  z-index: 6;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}

.case-study-images li .hero-number-fixed:before {
  position: absolute;
  content: "";
  top: 50%;
  left: -60px;
  width: 60px;
  height: 1px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.4);
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}

.case-study-images li.show .hero-number {
  opacity: 1;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  z-index: 999;
}

.case-study-images li.show .hero-number-back {
  opacity: 1;
  z-index: 999;
}
.case-study-images li .img-hero-background span img {
  width: 222px;
  height: 146px;
  display: block;
  transform: scale(0.6, 1.7);
  transform-origin: center top;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}

.case-study-images li.show .img-hero-background span img {
  transform: scale(1);
  z-index: 999;
}

.case-study-images li:nth-child(1) .img-hero-background span {
  position: absolute;
  /* width: 15%; */
  top: 25%;
  left: 5%;
  display: block;
}

.case-study-images li:nth-child(1) .img-hero-background span:nth-child(2) {
  width: 15%;
  top: 50%;
  left: 59%;
}

.case-study-images li:nth-child(1) .img-hero-background span:nth-child(3) {
  width: 15%;
  top: 25%;
  left: 77%;
}

.case-study-images li:nth-child(1) .img-hero-background span:nth-child(4) {
  width: 15%;
  top: 50%;
  left: 23%;
}

.case-study-images li:nth-child(2) .img-hero-background span {
  position: absolute;
  width: 15%;
  top: 25%;
  left: 59%;
  display: block;
}

.case-study-images li:nth-child(2) .img-hero-background span:nth-child(2) {
  width: 15%;
  top: 25%;
  left: 23%;
}

.case-study-images li:nth-child(2) .img-hero-background span:nth-child(3) {
  width: 15%;
  top: 50%;
  left: 77%;
}

.case-study-images li:nth-child(2) .img-hero-background span:nth-child(4) {
  width: 15%;
  top: 50%;
  left: 5%;
}

.case-study-images li:nth-child(3) .img-hero-background span {
  position: absolute;
  width: 15%;
  top: 25%;
  left: 5%;
  display: block;
}

.case-study-images li:nth-child(3) .img-hero-background span:nth-child(2) {
  width: 15%;
  top: 50%;
  left: 23%;
}

.case-study-images li:nth-child(3) .img-hero-background span:nth-child(3) {
  width: 15%;
  top: 25%;
  left: 59%;
}

.case-study-images li:nth-child(3) .img-hero-background span:nth-child(4) {
  width: 15%;
  top: 50%;
  left: 77%;
}

.case-study-images li:nth-child(4) .img-hero-background span {
  position: absolute;
  width: 15%;
  top: 25%;
  left: 23%;
  display: block;
}

.case-study-images li:nth-child(4) .img-hero-background span:nth-child(2) {
  width: 15%;
  top: 25%;
  left: 77%;
}

.case-study-images li:nth-child(4) .img-hero-background span:nth-child(3) {
  width: 15%;
  top: 50%;
  left: 59%;
}

.case-study-images li:nth-child(4) .img-hero-background span:nth-child(4) {
  width: 15%;
  top: 50%;
  left: 5%;
}

/* #Media
 ================================================== */
@media (max-width: 991px) {
  .case-study-images li .hero-number-back {
    font-size: 26vw;
  }
}

@media (max-width: 767px) {
  .case-study-wrapper .case-study-name a {
    font-size: 26px;
    letter-spacing: 1px;
  }

  .case-study-images li .hero-number-back {
    font-size: 32vw;
  }
}

/*@media (max-width: 580px) {*/
/*  .case-study-images li:nth-child(1) .img-hero-background span,*/
/*  .case-study-images li:nth-child(2) .img-hero-background span,*/
/*  .case-study-images li:nth-child(3) .img-hero-background span,*/
/*  .case-study-images li:nth-child(4) .img-hero-background span {*/
/*    width: calc(100% - 40px);*/
/*    top: 50%;*/
/*    left: 20px;*/
/*    transform: translateY(-50%);*/
/*  }*/

/*  .case-study-images li:nth-child(1) .img-hero-background span:nth-child(2),*/
/*  .case-study-images li:nth-child(1) .img-hero-background span:nth-child(3),*/
/*  .case-study-images li:nth-child(1) .img-hero-background span:nth-child(4),*/
/*  .case-study-images li:nth-child(2) .img-hero-background span:nth-child(2),*/
/*  .case-study-images li:nth-child(2) .img-hero-background span:nth-child(3),*/
/*  .case-study-images li:nth-child(2) .img-hero-background span:nth-child(4),*/
/*  .case-study-images li:nth-child(3) .img-hero-background span:nth-child(2),*/
/*  .case-study-images li:nth-child(3) .img-hero-background span:nth-child(3),*/
/*  .case-study-images li:nth-child(3) .img-hero-background span:nth-child(4),*/
/*  .case-study-images li:nth-child(4) .img-hero-background span:nth-child(2),*/
/*  .case-study-images li:nth-child(4) .img-hero-background span:nth-child(3),*/
/*  .case-study-images li:nth-child(4) .img-hero-background span:nth-child(4) {*/
/*    display: none;*/
/*  }*/
/*}*/

/*@media (max-height: 127px) {*/
/*  .case-study-images li:nth-child(1) .img-hero-background span .xianshi,*/
/*  .case-study-images li:nth-child(2) .img-hero-background span .xianshi,*/
/*  .case-study-images li:nth-child(3) .img-hero-background span .xianshi,*/
/*  .case-study-images li:nth-child(4) .img-hero-background span .xianshi {*/
/*    height: calc(100% - 40px);*/
/*    top: 50%;*/
/*    left: 20px;*/
/*    transform: translateY(-50%);*/
/*  }*/
/*  .case-study-images li:nth-child(1) .img-hero-background span:nth-child(2) .xianshi,*/
/*  .case-study-images li:nth-child(1) .img-hero-background span:nth-child(3) .xianshi,*/
/*  .case-study-images li:nth-child(1) .img-hero-background span:nth-child(4) .xianshi,*/
/*  .case-study-images li:nth-child(2) .img-hero-background span:nth-child(2) .xianshi,*/
/*  .case-study-images li:nth-child(2) .img-hero-background span:nth-child(3) .xianshi,*/
/*  .case-study-images li:nth-child(2) .img-hero-background span:nth-child(4) .xianshi,*/
/*  .case-study-images li:nth-child(3) .img-hero-background span:nth-child(2) .xianshi,*/
/*  .case-study-images li:nth-child(3) .img-hero-background span:nth-child(3) .xianshi,*/
/*  .case-study-images li:nth-child(3) .img-hero-background span:nth-child(4) .xianshi,*/
/*  .case-study-images li:nth-child(4) .img-hero-background span:nth-child(2) .xianshi,*/
/*  .case-study-images li:nth-child(4) .img-hero-background span:nth-child(3) .xianshi,*/
/*  .case-study-images li:nth-child(4) .img-hero-background span:nth-child(4) .xianshi {*/
/*    display: none;*/
/*  }*/
/*}*/

.xianshi {
  background: rgb(184, 28, 34);
  position: absolute;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 600;
  height: 126px;
  width: 207px;
  /* color: #002245; */
  padding: 10px;
  font-size: 21px;
}
.case-study-images li:nth-child(1) .img-hero-background span:first-child .xianshi{
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.case-study-images li:nth-child(1) .img-hero-background span:nth-child(2) .xianshi {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.case-study-images li:nth-child(1) .img-hero-background span:nth-child(3) .xianshi {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.case-study-images li:nth-child(1) .img-hero-background span:nth-child(4) .xianshi {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.case-study-images li:nth-child(2) .img-hero-background span:first-child .xianshi{
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.case-study-images li:nth-child(2) .img-hero-background span:nth-child(2) .xianshi {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.case-study-images li:nth-child(2) .img-hero-background span:nth-child(3) .xianshi {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.case-study-images li:nth-child(2) .img-hero-background span:nth-child(4) .xianshi {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.case-study-images li:nth-child(3) .img-hero-background span:first-child .xianshi{
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.case-study-images li:nth-child(3) .img-hero-background span:nth-child(2) .xianshi {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.case-study-images li:nth-child(3) .img-hero-background span:nth-child(3) .xianshi {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.case-study-images li:nth-child(3) .img-hero-background span:nth-child(4) .xianshi {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.case-study-images li:nth-child(4) .img-hero-background span:first-child .xianshi{
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.case-study-images li:nth-child(4) .img-hero-background span:nth-child(2) .xianshi {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.case-study-images li:nth-child(4) .img-hero-background span:nth-child(3) .xianshi {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.case-study-images li:nth-child(4) .img-hero-background span:nth-child(4) .xianshi {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
img:hover{
  transform: scale(1.2);
  transition: all 0.6s;
}
body.light {
  background: #f2f5f5;
}

body.light {
  mix-blend-mode: normal;
}

body.light {
  border: 2px solid #000;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  mix-blend-mode: normal;
}

body.light.hover {
  background: rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 0 rgba(255, 255, 255, 0.2);
  border-color: transparent;
  mix-blend-mode: normal;
}

body.light .case-study-images li .hero-number-back {
  -webkit-text-stroke: 4px #ccc;
}

body.light .case-study-images li .hero-number {
  color: #212121;
}

body.light .case-study-images li .hero-number-fixed {
  color: #212121;
}

body.light .case-study-images li .hero-number-fixed:before {
  background-color: rgba(0, 0, 0, 0.4);
}

body.light .case-study-wrapper .case-study-name a {
  color: #777777;
}

body.light .case-study-wrapper .case-study-name.active a {
  color: #000;
}
.lianjie{
  color:rgba(255,255,255,0.9);
  text-decoration: none;
}
.lianjie:hover{
  color: rgb(184, 28, 34);
}
.score {
  /* margin: 0 0 10px 0px; */
  /* display: flex; */
  align-items: center;
}

.score .score-text {
  /* margin-left: 10px; */
  font-size: 16px;
  /* width: 100px; */
  /* height: 30px; */
  background-color: rgb(184, 28, 34);
  color: white;
  text-align: center;
  /* padding: 5px 10px; */
  border-radius: 10px;
}
</style>