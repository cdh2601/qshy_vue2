<template>
  <div class="body">
    <section id="section-1">
      <div class="content-slider">
        <input type="radio" id="banner1" class="sec-1-input" name="banner" checked>
        <input type="radio" id="banner2" class="sec-1-input" name="banner">
        <input type="radio" id="banner3" class="sec-1-input" name="banner">
        <input type="radio" id="banner4" class="sec-1-input" name="banner">
        <input type="radio" id="banner5" class="sec-1-input" name="banner">
        <input type="radio" id="banner6" class="sec-1-input" name="banner">
        <div class="slider">
          <div id="top-banner-1" class="banner">
            <div class="banner-inner-wrapper" :style="background1">
              <h2>The Bund</h2>
              <h1>Welcome<br>to Shanghai</h1>
              <div class="line"></div>
              <div class="learn-more-button" @click="go()">了解更多</div>
            </div>
          </div>
          <div id="top-banner-2" class="banner">
            <div class="banner-inner-wrapper" :style="background2">
              <h2>Here We Are</h2>
              <h1>We Are<br>Oceanarium</h1>
              <div class="line"></div>
              <div class="learn-more-button" @click="go()">了解更多</div>
            </div>
          </div>
          <div id="top-banner-3" class="banner">
            <div class="banner-inner-wrapper" :style="background3">
              <h2>How to be happy</h2>
              <h1>Go To<br>Disney</h1>
              <div class="line"></div>
              <div class="learn-more-button" @click="go()">了解更多</div>
            </div>
          </div>
          <div id="top-banner-4" class="banner">
            <div class="banner-inner-wrapper" :style="background4">
              <h2>Our Specialty</h2>
              <h1>Crazy<br>Happy Valley</h1>
              <div class="line"></div>
              <div class="learn-more-button" @click="go()">了解更多</div>
            </div>
          </div>
          <div id="top-banner-5" class="banner">
            <div class="banner-inner-wrapper" :style="background5">
              <h2>Yu Garden</h2>
              <h1>Famous<br>Tourist Destination</h1>
              <div class="line"></div>
              <div class="learn-more-button" @click="go()">了解更多</div>
            </div>
          </div>
          <div id="top-banner-6" class="banner">
            <div class="banner-inner-wrapper" :style="background6">
              <h2>Planetarium</h2>
              <h1>Explore<br>Starry Sky</h1>
              <div class="line"></div>
              <div class="learn-more-button" @click="go()">了解更多</div>
            </div>
          </div>
        </div>

        <nav>
          <div class="controls">
            <label for="banner1"><span class="progressbar"><span class="progressbar-fill"></span></span><span>01</span>
              外滩</label>
            <label for="banner2"><span class="progressbar"><span class="progressbar-fill"></span></span><span>02</span>
              海洋公园</label>
            <label for="banner3"><span class="progressbar"><span class="progressbar-fill"></span></span><span>03</span>
              迪士尼乐园</label>
            <label for="banner4"><span class="progressbar"><span class="progressbar-fill"></span></span><span>04</span>
              欢乐谷</label>
            <label for="banner5"><span class="progressbar"><span class="progressbar-fill"></span></span><span>05</span>
              豫园</label>
            <label for="banner6"><span class="progressbar"><span class="progressbar-fill"></span></span><span>06</span>
              天文馆</label>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
import $ from "@/utils/jquery.js"

export default {
  name: "SearchCard",
  data() {
    return {
      background1: {
        backgroundImage: "url(" + require("@/assets/images/banner/banner01.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      background2: {
        backgroundImage: "url(" + require("@/assets/images/banner/banner02.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      background3: {
        backgroundImage: "url(" + require("@/assets/images/banner/banner03.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      background4: {
        backgroundImage: "url(" + require("@/assets/images/banner/banner04.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      background5: {
        backgroundImage: "url(" + require("@/assets/images/banner/banner05.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      background6: {
        backgroundImage: "url(" + require("@/assets/images/banner/banner06.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }
    }
  },
  methods: {
    go(){
      this.$bus.$emit('goDown','sb')
    },
    init() {
      function bannerSwitcher() {
        var next = $('.sec-1-input').filter(':checked').next('.sec-1-input');
        if (next.length) next.prop('checked', true);
        else $('.sec-1-input').first().prop('checked', true);
      }

      var bannerTimer = setInterval(bannerSwitcher, 5000);

      $('nav .controls label').click(function () {
        clearInterval(bannerTimer);
        bannerTimer = setInterval(bannerSwitcher, 5000)
      })
    }
  },
  mounted() {
    this.init()
  },
};
</script>

<style scoped lang="less">
/* General Variables */
@main-font: Montserrat, sans-serif;
@content-font: Roboto, sans-serif;
@h3-font: 'Kaushan Script', cursive;
@main-color: #fff;
@icon-color: #95e1d3;

/* General Styles */
.body {
  margin: 0px auto;
  padding: 0;
  font-size: 16px;
  background: @main-color;

  section {
    display: block;
  }

  h1, h2, h3, h4, h5, h6, ul, li {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-family: @main-font;
    font-weight: 700;
    //text-transform: uppercase;
  }

  h2 {
    font-family: @main-font;
    font-size: 1.875em;
    font-weight: 700;
    text-transform: uppercase;
  }

  h3 {
    font-family: @h3-font;
    font-size: 1.5em;
    font-weight: 400;
  }

  h4 {
    font-family: @main-font;
    font-size: 0.875em;
    font-weight: 400;
    text-transform: uppercase;
  }

  p {
    line-height: 150%;
    font-family: @content-font;
    font-size: 0.9375em;
    color: #999;
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

}

.bg-wrapper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .8));
}

.section-header {
  padding-top: 5.625em;
  text-align: center;

  h3 {
    margin-bottom: 0.5em;
  }

  .line-red {
    margin: 2.5em auto 2.9375em auto;
  }

}

.line-red {
  display: block;
  width: 4em;
  height: 0.1875em;
  margin: 0 auto;
  background: #95e1d3;
}

/* Main Header Styles */
.main-header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
  font-family: @main-font;
  color: @main-color;
  background: transparent;

  .header-wrapper {
    display: block;
    width: 70%;
    margin: 0 auto;
    padding-top: 1em;

    .main-logo {
      float: left;
      font-weight: 700;
      font-size: 1.875em;
    }

    .main-menu {
      float: right;
      text-align: center;

      li {
        display: inline-block;
        padding: 0.75em 1.875em;

        a {
          padding-bottom: 0.75em;
          text-transform: uppercase;
          color: @main-color;
          font-size: 0.875em;

          &:hover {
            color: #fce38a;
            border-bottom: 0.1875em solid #fce38a;
            transition: .1s;
          }

          span {
            font-size: 1.2em;
          }

        }

        &:last-child {
          padding: 0.75em 0;
        }

        &:nth-child(6) a:hover,
        &:last-child a:hover {
          border: none;
        }

      }
    }
  }
}

/* Section-1 Styles */
#section-1 {
  height: 38em;
  color: @main-color;
  background-color: #222;

  .content-slider {
    position: relative;
    width: 100%;
    height: 100%;

    input {
      display: none;
    }

    .slider {
      position: relative;
      width: inherit;
      height: inherit;
      overflow: hidden;

      .banner {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 0;
        width: inherit;
        height: inherit;
        text-align: center;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        transition: all .5s ease;

        .banner-inner-wrapper {
          height: 100%;
          padding-top: 6em;
          background-image: linear-gradient(rgba(243, 129, 129, .9), rgba(252, 227, 138, .9));
          box-sizing: border-box;

          h2 {
            padding-bottom: 0.3em;
            font-family: @h3-font;
            font-weight: 400;
            font-size: 2.5em;
            text-transform: none;
          }

          h1 {
            font-size: 6em;
            line-height: 95%;
          }

          .line {
            display: block;
            width: 4em;
            height: 0.1875em;
            margin: 2.5em auto;
            background: @main-color;
          }

          .learn-more-button {
            padding-bottom: 5em;
            z-index: 15 !important;
            width: 70px;
            margin: 0 auto;
            cursor: pointer;
            padding: 0.5em 2em;
            text-align: center;
            font-family: @main-font;
            font-size: 0.875em;
            color: #fff;
            text-transform: uppercase;
            border: 0.1875em solid @main-color;
            box-shadow: 0 0 5px #000;

            &:hover {
              color: #fff;
              background: rgba(0, 0, 0, 0.75);
              border: 0.1875em solid @main-color;
              transition: .3s;
            }


          }
        }
      }

    }

    nav {
      position: absolute;
      bottom: 0.5em;
      width: 100%;
      z-index: 10;
      text-align: center;

      .controls {
        display: block;
        width: 100%;
        margin: 0 auto;
        font-family: @main-font;
        color: @main-color;

        label {
          position: relative;
          display: inline-block;
          width: 13%;
          height: 3.1em;
          overflow: hidden;
          margin: 0 1em;
          padding-top: 1em;
          text-align: left;
          text-transform: uppercase;
          font-family: @main-font;
          font-size: 1em;
          color: #edc5c6;
          font-weight: 400;
          cursor: pointer;
          transition: all .3s;

          .progressbar {
            position: absolute;
            top: 0;
            left: 0;
            height: 3px;
            width: 100%;
            background: #edc5c6;
            z-index: 100;

            .progressbar-fill {
              position: inherit;
              width: inherit;
              height: inherit;
              margin-left: -100%;
              background: rgb(184, 28, 34);
            }

          }

          span {
            font-size: 1.4em;
            font-weight: 700;
          }

          &:hover {
            color: rgb(184, 28, 34);
          }

        }
      }
    }

    #banner1:checked ~ .slider #top-banner-1,
    #banner2:checked ~ .slider #top-banner-2,
    #banner3:checked ~ .slider #top-banner-3,
    #banner4:checked ~ .slider #top-banner-4,
    #banner5:checked ~ .slider #top-banner-5,
    #banner6:checked ~ .slider #top-banner-6 {
      opacity: 1;
      z-index: 1;
    }

    #banner1:checked ~ nav label:nth-of-type(1),
    #banner2:checked ~ nav label:nth-of-type(2),
    #banner3:checked ~ nav label:nth-of-type(3),
    #banner4:checked ~ nav label:nth-of-type(4),
    #banner5:checked ~ nav label:nth-of-type(5),
    #banner6:checked ~ nav label:nth-of-type(6) {
      cursor: default;
      color: @main-color;
      transition: all .5s;
    }

    #banner1:checked ~ nav label:nth-of-type(1) .progressbar,
    #banner2:checked ~ nav label:nth-of-type(2) .progressbar,
    #banner3:checked ~ nav label:nth-of-type(3) .progressbar,
    #banner4:checked ~ nav label:nth-of-type(4) .progressbar,
    #banner5:checked ~ nav label:nth-of-type(5) .progressbar,
    #banner6:checked ~ nav label:nth-of-type(6) .progressbar {
      background: @main-color;
    }

    #banner1:checked ~ nav label:nth-of-type(1) .progressbar-fill,
    #banner2:checked ~ nav label:nth-of-type(2) .progressbar-fill,
    #banner3:checked ~ nav label:nth-of-type(3) .progressbar-fill,
    #banner4:checked ~ nav label:nth-of-type(4) .progressbar-fill,
    #banner5:checked ~ nav label:nth-of-type(5) .progressbar-fill,
    #banner6:checked ~ nav label:nth-of-type(6) .progressbar-fill {
      animation: progressBarFill 5s linear;
    }

  }
}

/* Animations */
@keyframes progressBarFill {
  from {
    margin-left: -100%;
  }
  to {
    margin-left: 0;
  }
}

/* Media Queries */
@media only screen and (min-width: 1920px) {
  body {
    font-size: 22px;
  }

  .main-header .header-wrapper {
    width: 57%;
  }

  #section-1 {
    height: 46em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper {
    padding-top: 12em;
  }
}

@media only screen and (max-width: 1919px) {
  body {
    font-size: 20px;
  }

  .main-header .header-wrapper {
    width: 60%;
  }

  #section-1 {
    height: 43em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper {
    padding-top: 11em;
  }
}

@media only screen and (max-width: 1680px) {
  body {
    font-size: 18px;
  }

  .main-header .header-wrapper {
    width: 65%;
  }

  #section-1 {
    height: 40em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper {
    padding-top: 9em;
  }
}

@media only screen and (max-width: 1366px) {
  body {
    font-size: 16px;
  }

  .main-header .header-wrapper {
    width: 70%;
  }
}

@media only screen and (max-width: 1120px) {
  .main-header .header-wrapper .main-menu li {
    padding: 0.75em 1.4em;
  }

  #section-1 {
    height: 35em;
  }

  #section-1 .content-slider nav {
    bottom: -0.2em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper {
    padding-top: 7em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper .line {
    margin: 2em auto;
  }
}

@media only screen and (max-width: 1024px) {
  body {
    font-size: 14px;
  }

  .main-header .header-wrapper .main-menu li {
    padding: 0.75em 1.3em;
  }

  #section-1 .content-slider nav {
    bottom: 0;
  }

  #section-1 .content-slider nav .controls {
    width: 80%;
  }
}

@media only screen and (max-width: 860px) {
  .main-header .header-wrapper .main-menu li {
    padding: 0.75em 0.9em;
  }

  #section-1 {
    height: 29em;
  }

  #section-1 .content-slider nav {
    bottom: -1em;
  }

  #section-1 .content-slider nav .controls {
    width: 90%;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper h2 {
    font-size: 2em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper h1 {
    font-size: 4.5em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper {
    padding-top: 5em;
  }
}

@media only screen and (max-width: 768px) {
  .main-header .header-wrapper .main-menu li {
    padding: 0.75em 0.5em;
  }

  #section-1 {
    height: 27em;
  }

  #section-1 .content-slider nav .controls {
    width: 100%;
  }

  #section-1 .content-slider nav .controls label {
    width: 19%;
    font-size: 0.8em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper .line {
    margin: 1.7em auto;
  }
}

@media only screen and (max-width: 650px) {
  .main-header .header-wrapper {
    width: 95%;
  }
}

@media only screen and (max-width: 480px) {
  .main-header .header-wrapper {
    width: 97%;
  }

  .main-header .header-wrapper .main-logo {
    display: none;
  }

  .main-header .header-wrapper .main-menu li {
    padding: 0.2em 0.3em;
  }

  .main-header .header-wrapper .main-menu li:last-child,
  .main-header .header-wrapper .main-menu li:nth-child(6) {
    padding: 0.2em 0.7em;
  }

  #section-1 {
    height: 26em;
  }

  #section-1 .content-slider nav {
    bottom: -0.5em;
  }

  #section-1 .content-slider nav .controls label {
    width: 40%;
    font-size: 0.7em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper h2 {
    font-size: 1.5em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper h1 {
    font-size: 3em;
  }

  #section-1 .content-slider .slider .banner .banner-inner-wrapper .line {
    margin: 1.7em auto;
  }
}
</style>