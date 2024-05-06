<template>
  <div class="loginBox">
    <a class="login_logo"></a>
    <div class="midgroup">
      <div class="loginwrap loginwarrp">
        <div class="logingroup login_form">
          <h2 style="text-align: center; color: rgb(184, 28, 34)">登 录</h2>
          <el-form
              ref="ruleFormRef"
              :model="state.ruleForm"
              status-icon
              :rules="rules"
              label-width="120px"
              style="padding-top: 20px"
              label-position="top"
              size="large"
              class="demo-ruleForm"
          >
            <!-- @submit.native.prevent-->
            <el-form-item prop="loginName">
              <el-input
                  prefix-icon="el-icon-user"
                  v-model="state.ruleForm.loginName"
                  placeholder="请输入电子邮箱"
              />
            </el-form-item>
            <el-form-item prop="loginPass">
              <el-input
                  prefix-icon="el-icon-lock"
                  v-model="state.ruleForm.loginPass"
                  show-password
                  autocomplete="off"
                  placeholder="请输入密码"
              />
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item prop="inputVerificationCode">
              <el-input
                  prefix-icon="el-icon-right"
                  v-model="state.ruleForm.inputVerificationCode"
                  placeholder="请输入验证码"
              >
                <template #append>
                  <VerificationCode
                      ref="player"
                      @getVerificationCode="getVerificationCode"
                      title="看不清？点击换一张"
                  >
                  </VerificationCode>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="loginBtn" class="loginBtn">
              <el-button
                  color="rgb(184, 28, 34)"
                  plain
                  style="width: 100%"
                  @click="submitLoginInfo()"
              >立即登录
              </el-button>
            </el-form-item>
            <p class="toPath">
              还没有账号，<span
                style="color: rgb(184, 28, 34)"
                @click="toPath('/register')"
            >立即注册</span
            >
              <span
                  style="float: right; color: #999"
                  @click="toPath('/resetPassword')"
              >忘记密码？</span
              >
            </p>
          </el-form>

          <footer style="text-align: center">
            <p>海纳百川 有容乃大</p>
          </footer>
        </div>
      </div>
    </div>
    <div class="footer_copyright">
      <p>Copyright © 2024 DHU</p>
    </div>
  </div>
</template>
<script>
// 验证码组件
import VerificationCode from "./VerificationCode";


import {Loading, Message, Notification, MessageBox} from "element-ui";


import {pencode} from '@/utils/encode.js'
import {setToken} from '@/utils/token.js'
import {ref, unref} from "vue";
import Axios from "@/utils/request";


export default {
  name: "Login",
  components: {
    VerificationCode,
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写此字段~"));
      } else {
        callback();
      }
    };
    // 密码的非空验证
    const validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写此字段~"));
      } else {
        callback();
      }
    };
    // 验证码的非空、输入正确验证
    const validateVerificationCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写此字段~"));
      } else {
        if (
            value.toLowerCase() ==
            this.state.ruleForm.verificationCode.toLowerCase()
        ) {
          callback();
        } else {
          return callback(new Error("嘿，验证码输入有误哟~"));
        }
      }
    };

    return {
      // ruleFormRef: ref(""),
      state: {
        ruleForm: {
          loginName: "",
          loginPass: "",
          // 随机生成的验证码
          verificationCode: "",
          // 输入的验证码
          inputVerificationCode: "",
        },
        //获取当前访问的协议/:IP/端口
        registerUrl:
            location.protocol + "//" + location.host + "/" + "register.html",
      },
      rules: {
        loginName: [
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
        loginPass: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        inputVerificationCode: [
          {
            validator: validateVerificationCode,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 接收子组件（验证码）传的值
    getVerificationCode(codeList) {
      this.state.ruleForm.verificationCode = codeList;
    },
    toPath(path) {
      this.$router.push(path);
    },
    submitLoginInfo() {
      // console.log(this.ruleFormRef.value);
      // 1：校验登录信息  validate
      this.$refs.ruleFormRef.validate((valid) => {
        // 如果表单校验成功 提交数据到后台
        if (valid) {
          // 判断用户是否已经登录
          const userInfo = sessionStorage.getItem("userInfo");
          if (!userInfo) {
            // 登录验证
            this.continueLogin();
          } else {
            // 用户已经登录账号
            this.$confirm(
                "糟糕！系统检测到您已登录，请选择继续登录or返回首页",
                "登录提示",
                {
                  confirmButtonText: "继续登录",
                  cancelButtonText: "返回首页",
                  type: "warning",
                  center: true,
                }
            ).then(() => {
                  // 清除上一次登录信息
                  window.sessionStorage.removeItem("userInfo");
                  // 继续登录
                  this.continueLogin();
                })
                .catch(() => {
                  //前往后台
                  window.location.href = "/";
                });
          }
        }
      });
    },
    continueLogin() {
      // 验证用户名、密码是否正确,数据库中是否存在
      let params = {
        username: this.state.ruleForm.loginName,
        password: pencode(this.state.ruleForm.loginPass),
      };
      Axios.post("/user/login", {}, {params,}
      ).then((res) => {
        // console.log("登录返回", res)
        if(res.code===402){
          this.$message.error("用户不存在，请注册!")
        }
        else if (res.code === 200) {
          // console.log(res.data);
          // // 添加登录信息
          // axios.get("/login/insertLoginInfo", {
          //   params: {
          //     userId: res.data.data[0].userId,
          //   },
          // });
          setToken(res.data.token);
          // 将登录用户的信息存起来
          window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.user));
          // 调用子组件方法（下一个验证码）refreshCode
          this.$refs.player.refreshCode();
          // 重置表单项，将其值重置为初始值，并移除校验结果
          this.$refs.ruleFormRef.resetFields();

          // 加载动画
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            loading.close();
            // console.log(this.$route.query.redirect)
            // 判断是不是从别的页面跳转过来的
            if (this.$route.query.redirect) {
              this.$router.push({
                path: decodeURIComponent(this.$route.query.redirect), //跳转到原页面
              });
            } else {
              // this.$router.back()
              this.$router.push({
                path: "/",
              }); //正常登录流程进入的页面
            }
          }, 1000);
        } else {
          this.$message({
            showClose: true,
            message: "登录失败，用户名或密码有误！",
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.loginBox {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #fff url(../../assets/images/bg.png) no-repeat;
  background-size: cover;
}

.login_logo {
  display: block;
  position: absolute;
  left: 8vw;
  /* top: 20px; */
  width: 160px;
  height: 100px;
  background: url(../../assets/images/logo.png) no-repeat center;
  background-size: 70px;
}

.loginBox .midgroup {
  width: 420px;
  margin: 20vh auto;
  position: relative;
}

.loginBox .midgroup .logingroup {
  padding: 20px 40px;
  background: white;
  overflow: hidden;
  box-shadow: 0 1px 10px 0 rgb(7 17 27 / 10%);
  /* padding-top: 0px; */
  border-radius: 10px;
}

.loginBox .midgroup .logingroup footer {
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

/*.loginBtn :deep(.el-form-item__error) {*/
/*  text-align: center;*/
/*  width: 100%;*/
/*}*/

.toPath {
  font-size: 12px;
  color: #999;
}

.toPath span {
  cursor: pointer;
}

.toPath span:hover {
  color: rgb(184, 28, 34);
}
</style>
