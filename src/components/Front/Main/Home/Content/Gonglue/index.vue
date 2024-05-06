<template>
  <div class="gonglue" style="border-radius: 0px;padding-right: 65px;">
    <div class="gonglueTop">
      <h2 class="title">推荐攻略</h2>
      <h2 class="suikou">让你的旅行，不止拍拍照就离开</h2>
      <h3 class="more"><router-link :to="`/community`">更多>></router-link></h3>
    </div>
    <div class="gonglueMain">
      <div class="goods-list">
        <ul class="yui3-g">
          <li class="yui3-u-1-5">
            <router-link :to="`/strategyDetails/VTCu3kPJVdkY`">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/gonglve/dishini.jpg"/>
                </div>
                <div style="background: white">
                  <div class="introduction">
                    <p>
                      上海迪士尼攻略
                    </p>
                  </div>
                  <div class="time">
                    <p>时间：2023-04-27 </p>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
          <li class="yui3-u-1-5">
            <router-link :to="`/strategyDetails/OW0T2OsN7RhV`">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/gonglve/dongwuyuan.jpg"/>
                </div>
                <div style="background: white">
                  <div class="introduction">
                    <p>
                      上海野生动物园，一日游
                    </p>
                  </div>
                  <div class="time">
                    <p>时间：2023-04-27</p>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
          <li class="yui3-u-1-5">
            <router-link :to="`/strategyDetails/8nCOlDgsXcye`">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/gonglve/waitan.png"/>
                </div>
                <div style="background: white">
                  <div class="introduction">
                    <p>
                      不一样的外滩
                    </p>
                  </div>
                  <div class="time">
                    <p>时间：2023-04-27</p>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <ul class="yui3-g" style="padding-bottom: 50px;">
          <li class="yui3-u-1-5">
            <router-link :to="`/strategyDetails/Ld-qCdF75IbA`">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/gonglve/gongyuan.jpg"/>
                </div>
                <div style="background: white">
                  <div class="introduction">
                    <p>
                      上海值得一去的7个公园，免费又好玩！
                    </p>
                  </div>
                  <div class="time">
                    <p>时间：2023-04-27</p>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
          <li class="yui3-u-1-5">
            <router-link :to="`/strategyDetails/4OxtzfqxarNc`">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/gonglve/kejiguan.jpg"/>
                </div>
                <div style="background: white">
                  <div class="introduction">
                    <p>
                      魔都遛娃胜地｜上海科技馆
                    </p>
                  </div>
                  <div class="time">
                    <p>时间：2023-04-27</p>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
          <li class="yui3-u-1-5">
            <router-link :to="`/strategyDetails/WlBB9NxAQPWV`">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/gonglve/yuyuan.jpg"/>
                </div>
                <div style="background: white">
                  <div class="introduction">
                    <p>
                      最详尽的“豫园游玩指南”新鲜出炉，必到景点和必玩线路请收好
                    </p>
                  </div>
                  <div class="time">
                    <p>时间：2023-04-27</p>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.gonglueTop {
  margin-left: 60px;
  margin-right: -20px;
  /*border-bottom: 2px solid #e6e6e6;*/
}

.gonglueTop .title {
  font-size: 35px;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 500;
  color: white;
  padding-top: 70px;
}

.gonglueTop .suikou {
  color: white;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.gonglueTop .more {
  color: white;
  position: relative;
  float: right;
  font-size: 16px;
  cursor: pointer;
  margin: -40px 25px 0px 0px;
  font-style: normal;
}

.gonglue {
  background: #006fe8;
  margin-top: 40px;
}

.goods-list {
  margin: 60px 0 0 30px;;

  ul {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;

    li {
      height: 390px;
      width: 30%;
      margin: 0px auto;
      list-style-type: none;
      line-height: 28px;

      a {
        text-decoration: none;
      }

      .list-wrap {

        &:hover .introduction  p {
          color: rgb(184, 28, 34);
        }

        //border: 1px solid #e6e6e6;

        .p-img {
          overflow: hidden;
          transition: all 0.6s;
          img {
            width: 100%;
            height: 280px;
            vertical-align: middle;
          }
          img:hover{
            transform: scale(1.2);
            transition: all 0.6s;
          }

        }

        .time {
          margin: 10px 10px 0 10px;
          color: #a3a2a2;
          font-size: 14px;
          //border-bottom: 1px solid #e6e6e6;
          p{
            margin: 0px;
            padding: 10px;
          }
        }

        .introduction {
          // padding-left: 15 px;
          font-size: 18px;
          color: black;
          //text-align: center;
          p{
            margin: 0px;
            padding: 20px 10px 0px 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 90%;
          }
          strong {
            font-weight: 700;

            i {
              margin-left: -5px;
            }

          }
        }
      }
    }
  }
}
.more a{
  color: white;
  text-decoration: none;
}
</style>