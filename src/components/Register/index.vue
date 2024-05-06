<template>
  <div class="loginBox">
    <a class="login_logo"></a>
    <div class="midgroup">
      <div class="loginwrap loginwarrp">
        <div class="logingroup login_form">
          <h2 style="text-align: center; color: rgb(184, 28, 34)">注 册</h2>
          <el-form ref="ruleFormRef" :model="state.ruleForm" status-icon :rules="rules" label-width="120px"
            style="padding-top: 20px" label-position="top" size="large" class="demo-ruleForm">
            <el-form-item prop="registerName">
              <el-input prefix-icon="el-icon-user" v-model="state.ruleForm.registerName" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item prop="registerEmail">
              <el-input prefix-icon="el-icon-message" v-model="state.ruleForm.registerEmail" placeholder="请输入电子邮箱" />
            </el-form-item>
            <el-form-item prop="registerPass">
              <el-input prefix-icon="el-icon-lock" v-model="state.ruleForm.registerPass" show-password autocomplete="off"
                placeholder="请输入密码" />
            </el-form-item>
            <el-form-item prop="inputVerificationCode">
              <el-input prefix-icon="el-icon-right" v-model="state.ruleForm.inputVerificationCode" placeholder="邮箱验证码">
                <template #append>
                  <input type="button" :plain="true" @click="getCode()" :disabled="!state.show" style="
                      width: 100%;
                      height: 100%;
                      border: 0px;
                      background: none;
                      color: #ababab;
                      cursor: pointer;
                    " :value="state.codeText" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <span style="color: #606266;">喜欢的景点分类：</span>
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="loginBtn" class="loginBtn">
              <el-button color="rgb(184, 28, 34)" plain style="width: 100%" @click="submitAddRegisterInfo()">立即注册
              </el-button>
            </el-form-item>
            <p style="font-size: 12px; text-align: center; color: #999;margin-top: -3px;">
              已有账号，<a href="/login" style="color: rgb(184, 28, 34); text-decoration: none">立即登录</a>
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
import { Message, Loading, Notification } from "element-ui";

import Axios from "@/utils/request";
import { ref } from "vue";
import { pencode } from "@/utils/encode";

// 获取验证码60秒倒计时
const TIME_COUNT = 60;
// 3分钟=180秒，三分钟后清除验证码
const TIME_CLEAR_COUNT = 180;
export default {
  name: "Register",
  data() {

    var nameGrep = /^[\u4e00-\u9fa5a-zA-Z0-9_]{2,8}$/;
    // 邮箱正则表达式判断
    var emailGrep =
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    // 密码正则表达式判断
    var passGrep = /^[a-zA-Z0-9_.-=*&^%$#@!+]{6,18}$/;

    // 用户名的非空、正则验证
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写此字段~"));
      } else {
        if (!nameGrep.test(value)) {
          callback(new Error("用户名由2~8位中英文、数字、下划线组成"));
        } else {
          // let params = {
          //   registerName: value,
          // };
          // Axios.get("/register/showUserName", {
          //   params,
          // }).then((res) => {
          //   if (res.data.code === 1) {
          //     callback(new Error("此用户名已被注册，请更换一个"));
          //   } else {
          callback();
          //   }
          // });
        }
      }
    };
    // 密码的非空验证
    const validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写此字段~"));
      } else {
        if (!passGrep.test(value)) {
          callback(new Error("密码6~18位字母、数字、特殊字符组成"));
        } else {
          callback();
        }
      }
    };
    // 邮箱的非空验证
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写此字段~"));
      } else {
        if (!emailGrep.test(value)) {
          callback(new Error("请按照正确的邮箱格式输入"));
        } else {
          // let params = {
          //   registerEmail: value,
          // };
          // Axios
          //     .get("/register/showUserEmail", {
          //       params,
          //     })
          //     .then((res) => {
          //       console.log(res.data.isExistUserEmail);
          //       if (res.data.code == 1) {
          //         callback(new Error("此邮箱已被注册，请更换一个"));
          //       } else {
          callback();
          //   }
          // });
        }
      }
    };

    // 验证码的非空、输入正确验证
    const validateVerificationCode = (rule, value, callback) => {
      // 判断邮箱的正则是否通过，没有通过则先不验证此字段
      // this.$ref.ruleFormRef.validateField("registerEmail", (err) => {
      if (emailGrep.test(this.state.ruleForm.registerEmail)) {
        if (this.state.affirmGet) {
          if (!value) {
            return callback(new Error("请填写此字段~"));
          } else {
            // 输入的验证码正确
            // if (value != this.state.code) {
            //   return callback(new Error("验证码有误，请重新输入"));
            // } else {
            callback();
            // }
          }
        } else {
          if (!value) {
            return callback(new Error("获取验证码，填写此字段~"));
          }
        }
      }
      // });
    };

    return {
      options: [{
        value: 1,
        label: '地标建筑'
      }, {
        value: 2,
        label: '亲子游'
      }, {
        value: 3,
        label: '上海夜景'
      }, {
        value: 4,
        label: '小清新摄影地'
      }, {
        value: 5,
        label: '人气免票公园'
      }, {
        value: 6,
        label: '历史烙印'
      }, {
        value: 7,
        label: '周边古镇'
      }, {
        value: 8,
        label: '绿色户外'
      }],
      value: '',
      ruleFormRef: null,
      affirmEmail: "",
      timerb: null,
      emailGrep,
      state: {
        ruleForm: {
          registerName: "",
          registerEmail: "",
          registerPass: "",
          // 随机生成的验证码
          verificationCode: "",
          // 输入的验证码
          inputVerificationCode: "",
        },
        //获取当前访问的协议/:IP/端口
        loginUrl: location.protocol + "//" + location.host + "/" + "login.html",
        // 获取验证码 点击后为禁止状态
        show: true,
        // 获取验证码的文字 点击后改变
        codeText: "获取验证码",
        // 当前秒数
        count: "",
        // 时间  计时器
        timer: null,
        // 存放生成的六位随机数   验证码
        code: "",
        // 三分钟后清除验证码,计时器
        clearCount: "",
        timer2: null,
        // 点击发送验证码，再进行验证验证码输入框
        affirmGet: false,
      },
      rules: {
        registerName: [
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
        registerPass: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        registerEmail: [
          {
            validator: validateEmail,
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
    // getVerificationCode(codeList) {
    //   this.state.ruleForm.verificationCode = codeList;
    // },

    //用于倒数验证码过期时间  3分钟后向服务器请求删除该验证码
    countCheckCode() {
      // console.log("验证码删除倒计时3分钟")
      clearTimeout(this.$data.timerb)
      this.$data.timerb = setTimeout(() => {
        Axios.get("/user/deleteCheckCode", {
          params: {
            email: this.state.ruleForm.registerEmail,
          }
        })
      }, 180000)
    },
    getCode() {
      // 点击发送验证码，再进行验证验证码输入框
      // console.log(this.$ref.ruleFormRef);
      this.state.affirmGet = true;
      // 判断邮箱的正则是否通过
      // this.$ref.ruleFormRef.validate("registerEmail", (err) => {
      if (this.emailGrep.test(this.state.ruleForm.registerEmail)) {
        // 获取验证码，将当前表单中的邮箱号保存
        this.affirmEmail = this.state.ruleForm.registerEmail;
        // 生成六位数随机验证码发送给后台
        // for (var i = 0; i < 6; i++) {
        //   this.state.code += Math.floor(Math.random() * 10);
        // }
        // let params = {
        //     registerEmail: decodeURI(this.state.ruleForm.registerEmail),
        //     verificationCode: this.state.code
        // };
        // // 将验证码、用户输入的邮箱传给后台，发送给用户邮箱
        // axios.get("/register/registerGetCode", {
        //     params
        // }).then((res) => {
        //     if (res.data.code == 0) {
        // 将验证码、用户输入的邮箱传给后台，发送给用户邮箱
        // console.log(this.state.code)
        const params = {
          email: this.state.ruleForm.registerEmail, // 用户当前邮箱
          type: "r",
          // content:
          //     "【QSHY--轻松沪游】验证码：" +
          //     this.state.code+
          //     "，请勿将验证码告知他人，有效期3分钟，请妥善保管。",
        };
        Axios.get("/user/emailCheck", {
          params,
        }).then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.countCheckCode()
            if (!this.state.timer) {
              this.state.count = TIME_COUNT;
              this.state.show = false;
              this.state.timer = setInterval(() => {
                if (
                  this.state.count > 0 &&
                  this.state.count <= TIME_COUNT
                ) {
                  if (this.state.ruleForm.registerEmail == this.affirmEmail) {
                    this.state.count--;
                    this.state.codeText = this.state.count + "s";
                  } else {
                    this.state.show = true;
                    window.clearInterval(this.state.timer);
                    this.state.timer = null;
                    this.state.codeText = "获取验证码";
                    this.affirmEmail = "";
                    this.state.code = "";
                  }
                } else {
                  this.state.show = true;
                  window.clearInterval(this.state.timer);
                  this.state.timer = null;
                  this.state.codeText = "重新获取";
                  this.affirmEmail = "";
                }
              }, 1000);
            }
          } else {
            this.$message.error("验证码获取失败!");
          }
        })
      } else {
        this.$message.error("按要求填写电子邮箱后再获取验证码!");
        return false;
      }
      // });
    },
    submitAddRegisterInfo() {
      // 1：校验注册信息  validate
      this.$refs.ruleFormRef.validate((valid) => {
        // 如果表单校验成功 提交数据到后台
        if (valid) {
          Axios.post(
            "/user/register",
            {
              user: {
                username: this.state.ruleForm.registerName,
                password: pencode(this.state.ruleForm.registerPass),
                email: this.state.ruleForm.registerEmail,
                likeType: this.value
              },
              CheckCode: this.state.ruleForm.inputVerificationCode,
            }
          ).then((res) => {
            // console.log(res)
            if (res.code === 402) {
              this.$message.error("用户已存在!");
            }
            else if (res.code === 500) {
              this.$message.error("验证码错误!");
            }
            else {
              // console.log(res)
              if (res.code === 200) {
                // 加载动画
                const loading = this.$loading({
                  lock: true,
                  text: "Loading",
                  background: "rgba(0, 0, 0, 0.7)",
                });
                setTimeout(() => {
                  loading.close();
                }, 1000);

                setTimeout(() => {
                  this.$message({
                    title: "注册成功",
                    message: "登录即可访问QSHY个人主页",
                    type: "success",
                  });
                  // 重置表单项，将其值重置为初始值，并移除校验结果
                  this.$refs.ruleFormRef.resetFields();
                  this.state.show = true;
                  window.clearInterval(this.state.timer);
                  this.state.timer = null;
                  this.state.codeText = "获取验证码";
                  this.affirmEmail = "";
                  this.state.code = "";
                }, 1200);
                setTimeout(() => {
                  window.location.href = "/login";
                }, 1800);
              }
            }
          });
        }
      });
    },

  },
  destroyed() {
    clearTimeout(this.$data.timerb)
    this.$data.timerb = null
  }
}
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
  top: 20px;
  width: 160px;
  height: 100px;
  background: url(../../assets/images/logo.png) no-repeat center;
  background-size: 70px;
}

.midgroup {
  width: 420px;
  margin: 15vh auto;
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
  padding: 0px 10px;
  background: #f6f6f6;
}

/*.loginBtn :deep(.el-form-item__error) {*/
/*  text-align: center;*/
/*  width: 100%;*/
/*}*/
</style>
