<template>
  <div class="reset_password_box">
    <a class="reset_password_logo"></a>
    <div class="midGroup">
      <div class="reset_password_group">
        <div v-if="state.componentsInfo.isShow">
          <h2>通过电子邮箱找回密码</h2>
          <!-- 1、确认账号 -->
          <ConfirmAccount v-if="state.componentsInfo.confirmAccountIsShow" @setUserInfo="getUserInfo">
          </ConfirmAccount>
          <!-- 2、安全验证 -->
<!--          <SafetyVerification v-if="componentsInfo.safetyVerificationIsShow" @setPass="getPass"-->
<!--                              :setUserEmail="userInfo.email" >-->
<!--          </SafetyVerification>-->
          <!-- 3、重置密码 -->
          <ResetPassword v-if="state.componentsInfo.resetPasswordIsShow" @updateSucceed="succeed"
                         :setUserEmail="state.email"></ResetPassword>

        </div>
        <!-- 4、成功 -->
        <div v-if="!state.componentsInfo.isShow" style="padding: 100px 0px;">
          <p style="font-size: 30px;font-weight:600;color:rgb(184, 28, 34);text-align: center;line-height: 60px;">
            密码重置成功</p>
          <p style="text-align: center;color: #999999;font-size: 14px;">{{ state.count }}秒后返回登录界面</p>
        </div>

        <div style="font-size: 12px; color:#999;">
          还没有账号，<span @click="toPath('/register')" style="color:rgb(184, 28, 34);cursor:pointer;">立即注册</span>
          <p class="rests_path">
            <span @click="toPath('/login')">返回登录</span> | <span @click="toPath('/')">前往首页</span>
          </p>
        </div>
        <footer style="text-align:center;">
          <p>海纳百川 有容乃大</p>
        </footer>
      </div>
    </div>
    <div class="footer_copyright">
      <p>
        Copyright © 2024 DHU
      </p>
    </div>
  </div>
</template>
<script>
// 1、确认账号
import ConfirmAccount from './confirmAccount/index.vue'
// 2、安全验证
// import SafetyVerification from './safetyVerification/index.vue'
// 3、重置密码
import ResetPassword from './resetPassword/index.vue'

const TIME_COUNT = 3
export default {
  components: {
    ConfirmAccount,
    // SafetyVerification,
    ResetPassword
  },
  data() {
    return {
      state:{
        componentsInfo: {
          isShow: true,
          confirmAccountIsShow: true,
          // safetyVerificationIsShow: false,
          resetPasswordIsShow: false,
        },
        userInfo: {},
        email:'',
        code: "",
        count: '',
        timer: null,
      }
    }
  },
  methods: {
    toPath(path) {
      this.$router.push(path);
    },
    // 第一步：确认信息，子组件传的值（邮箱）
    getUserInfo(info){
      this.state.email = info;
      // this.state.code = info.code
      this.state.componentsInfo.confirmAccountIsShow = false;
      // this.state.componentsInfo.safetyVerificationIsShow = true;
      this.state.componentsInfo.resetPasswordIsShow = true;
    },
    // 第二步：将生成的验证码传给第二个子组件

    // 第三步：用户验证输入正确之后
    // getPass(info){
    //   this.state.componentsInfo.safetyVerificationIsShow = false;
    //   this.state.componentsInfo.resetPasswordIsShow = true;
    // },
    succeed(info) {
      this.state.componentsInfo.resetPasswordIsShow = false;
      this.state.componentsInfo.isShow = false;
      // 3秒后跳转到登录界面
      if (!this.state.timer) {
        this.state.count = TIME_COUNT
        this.state.timer = setInterval(() => {
          if (this.state.count > 1 && this.state.count <= TIME_COUNT) { //限制倒计时区间
            this.state.count--
          } else {
            clearInterval(this.state.timer) //删除定时器
            this.state.timer = null
            // 跳转
            window.location.href = "/login"
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.reset_password_box {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #fff url(../../assets/images/bg.png) no-repeat;
  background-size: cover;
}

.reset_password_logo {
  display: block;
  position: absolute;
  left: 8vw;
  top: 20px;
  width: 160px;
  height: 100px;
  background: url(../../assets/images/logo.png) no-repeat center;
  background-size: 70px;
}

.reset_password_box .midGroup {
  width: 700px;
  margin: 12vh auto;
  position: relative;
}

.reset_password_box h2 {
  border-bottom: 1px dashed #ddd;
  padding: 10px 0;
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
  color: rgb(184, 28, 34);
  padding-bottom: 10px;
}

.reset_password_box .midGroup .reset_password_group {
  padding: 20px 40px;
  background: white;
  overflow: hidden;
  box-shadow: 0 1px 10px 0 rgb(7 17 27 / 10%);
  padding-top: 20px;
  border-radius: 10px;
}

.reset_password_box .midGroup .reset_password_group footer {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dotted #ddd;
  color: #999;
  font-size: 12px;
  overflow: hidden;
}

.footer_copyright {
  width: 100%;
  text-align: center;
  line-height: 24px;
  color: #999;
  font-size: 12px;
  position: fixed;
  left: 0;
  bottom: 0;
  overflow: hidden;
  padding: 10px;
  border-top: 1px solid #eee;
  background: white;
}


:global(.el-input-group__append) {
  padding: 0px;
  background: #f6f6f6;
}

.reset_password_btn :deep(.el-form-item__error) {
  text-align: center;
  width: 100%;
}

.rests_path {
  float: right;
  color: #999;
  margin-top: -3px;
}

.rests_path span {
  cursor: pointer;
}

.rests_path span:hover {
  color: rgb(184, 28, 34);
}
</style>