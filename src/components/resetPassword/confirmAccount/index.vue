<template>
  <div style="z-index: 666">
    <div class="title">
      <span>找回步骤：</span>
      <span style="font-size: 15px;font-weight: 600;">1. 确认账号</span>
<!--      &gt;&nbsp;&nbsp; <span>2.安全验证</span>-->
      &nbsp;&nbsp;&gt;&nbsp;&nbsp;
      <span>2. 安全验证--重置密码</span>&nbsp;&nbsp;&gt;&nbsp;&nbsp; <span>3. 成功</span>
    </div>
    <el-form ref="ruleFormRef" :model="state.ruleForm" status-icon :rules="rules" label-width="120px"
             style="padding-top:20px;" label-position="top" size="large" class="demo-ruleForm">
      <el-form-item prop="userNameOrEmail" label="请填写您需要找回的电子邮箱：">
        <el-input prefix-icon="el-icon-user" v-model="state.ruleForm.userNameOrEmail" placeholder="请输入者电子邮箱"/>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="inputVerificationCode" >
        <el-input prefix-icon="el-icon-right" v-model="state.ruleForm.inputVerificationCode" placeholder="请输入验证码">
          <template #append>
            <VerificationCode ref="player" @getVerificationCode="getVerificationCode" title="看不清？点击换一张">
            </VerificationCode>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="loginBtn" class="reset_password_btn">
        <el-button color="rgb(184, 28, 34)" plain style="width:50%;margin-left: 50%;" @click="nextStep">下一步
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 验证码组件
import VerificationCode from './VerificationCode'

import Axios from "@/utils/request";
export default {
  components: {
    VerificationCode
  },
  data() {
    var emailGrep =/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    // 用户名或邮箱的非空、是否存在验证
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写此字段~'))
      } else {
        // 将输入的用户名或邮箱传给后台，判断是否存在该用户
        // let params = {
        //   userNameOrEmail: value
        // };
        // axios.get("/resetPassword/showUserNameOrEmail", {
        //   params
        // }).then((res) => {
        //   if (res.data.code == 1) {
        //     callback(new Error('当前输入的用户未注册本平台'));
        //   } else {
        //     state.showUserInfo = res.data.data;
        callback()
        //   }
        // })
      }
    };
    // 验证码的非空、输入正确验证
    const validateVerificationCode = (rule, value, callback) => {
      // 判断用户名or邮箱的正则是否通过，没有通过则先不验证验证码
      // this.$refs.ruleFormRef.validateField('userNameOrEmail', err => {
      if (emailGrep.test(this.state.ruleForm.userNameOrEmail)) {
        if (this.state.affirmGet) {
          if (!value) {
            return callback(new Error('请填写此字段~'))
          } else {
            if (value.toLowerCase() == this.state.ruleForm.verificationCode.toLowerCase()) {
              callback()
            } else {
              return callback(new Error('嘿，验证码输入有误哟~'))
            }
          }
        }
      }
      // })
    };

    return {
      emailGrep,
      affirmGet: false,
      state: {
        ruleForm: {
          userNameOrEmail: '',
          // 随机生成的验证码
          verificationCode: '',
          // 输入的验证码
          inputVerificationCode: '',
        },
        showUserInfo: null,
        // 验证码
        code: ""
      },
      rules: {
        userNameOrEmail: [{
          validator: validateName,
          trigger: 'blur'
        }],
        inputVerificationCode: [{
          validator: validateVerificationCode,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    getVerificationCode(codeList) {
      this.state.ruleForm.verificationCode = codeList;
    },
    nextStep() {
      this.state.affirmGet = true;
      this.$refs.ruleFormRef.validate((valid) => {
        // 如果表单校验成功
        if (valid) {
          // 生成六位数随机验证码发送给后台
          // for (var i = 0; i < 6; i++) {
          //   state.code += Math.floor(Math.random() * 10);
          // }
          // 发送验证码
          // let params = {
          //     registerEmail: decodeURI(state.showUserInfo.userEmail),
          //     verificationCode: state.code
          // };
          // // 将验证码、用户输入的邮箱传给后台，发送给用户邮箱
          // axios.get("/register/registerGetCode", {
          //     params
          // }).then((res) => {
          // if (res.data.code == 0) {
          const params = {
            email: this.state.ruleForm.userNameOrEmail,
            type: "rs",
            // content: "【Bpvank博客】验证码：" + state.code + "，此验证码用于重置密码，请勿将验证码告知他人，妥善保管。"
          }
          Axios.get("/user/emailCheck", {
            params
          }).then((res) => {
            if (res.code == 200) {
              // 将用户输入的用户名或邮箱查询到的用户信息传给父组件
              let info=this.state.ruleForm.userNameOrEmail;
                // code: state.code
              const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
              })
              setTimeout(() => {
                loading.close()
                this.$emit('setUserInfo', info);
              }, 1500)
              // 调用子组件方法（下一个验证码）refreshCode
              this.$refs.player.refreshCode();
              // 重置表单项，将其值重置为初始值，并移除校验结果
              this.$refs.ruleFormRef.resetFields()
            } else {
              this.$message({
                message: '糟糕，系统出错啦！请再输入一次电子邮箱',
                type: 'warning',
              })
              window.location.href = "/resetPassword"
            }
          })

        }
      })
    }
  }
}
</script>

<style scoped>
.title {
  width: 100% -20px;
  padding: 10px 10px;
  background: linear-gradient(to right, #535b9a, #30bcd7);
  color: white;
  font-size: 14px;
  border-radius: 3px;
}
</style>