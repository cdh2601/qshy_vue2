<template>
  <div>
    <div class="title">
      <span>找回步骤：</span>
      <span>1. 确认账号</span> &gt;&nbsp;&nbsp;
      <span style="font-size: 15px;font-weight: 600;">2.安全验证--重置密码</span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;
      <span>3. 成功</span>
    </div>

    <el-form ref="ruleFormRef" :model="state.ruleForm" status-icon :rules="rules" label-width="100px"
             style="padding-top:20px;" size="large" class="demo-ruleForm">
      <div style="color: #606266;margin-bottom: 12px;font-size: 14px;">
        您的帐号可能存在安全风险，为了确保为您本人操作，请先进行安全验证。
        <p>我们已向您的邮箱{{ state.userEmail }}发送了一条验证码。</p>
      </div>
      <el-form-item prop="verificationCode" label="邮箱验证码：">
        <el-input prefix-icon="el-icon-key" v-model="state.ruleForm.verificationCode" placeholder="请输入六位数验证码"/>
      </el-form-item>
      <el-form-item prop="password" label="新密码：">
        <el-input prefix-icon="el-icon-lock" v-model="state.ruleForm.password" placeholder="请输入新密码" show-password
                  autocomplete="off"/>
      </el-form-item>
      <el-form-item prop="confirmPassword" label="确认新密码：">
        <el-input prefix-icon="el-icon-key" v-model="state.ruleForm.confirmPassword" placeholder="请确认新密码" show-password
                  autocomplete="off"/>
      </el-form-item>
      <el-form-item prop="loginBtn" class="reset_password_btn">
        <el-button color="rgb(184, 28, 34)" plain @click="nextStep" style="width: 50%;margin-left: 50%;">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Axios from "@/utils/request";
import {pencode} from '@/utils/encode.js'
export default {
  components: {},
  props: {
    setUserEmail: String
  },
  data(){
    const validateVerificationCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写此字段~'))
      } else {
        callback()
      }
    };
    // 密码正则表达式判断
    var passGrep = /^[a-zA-Z0-9_.-=*&^%$#@!+]{6,18}$/;
    // 新密码
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写此字段~'))
      } else {
        if (value) {
          if (!passGrep.test(value)) {
            callback(new Error('密码6~18位字母、数字、特殊字符组成'));
          } else {
            if (!this.$refs.ruleFormRef) return
            this.$refs.ruleFormRef.validateField('confirmPassword', () => null)
          }
        }
        callback()
      }
    };

    // 确认密码
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写此字段~'))
      } else if (value !== this.state.ruleForm.password) {
        callback(new Error("您输入的密码与确认密码不一致"))
      } else {
        callback()
      }
    };
    return{
      state:{
        ruleForm: {
          verificationCode: '',
          password: '',
          confirmPassword: ''
        },
        userEmail: this.setUserEmail,
        email:this.setUserEmail
      },
      rules:{
        verificationCode: [{
          validator: validateVerificationCode,
          trigger: 'blur'
        }],
        password: [{
          validator: validatePassword,
          trigger: 'blur'
        }],
        confirmPassword: [{
          validator: validateConfirmPassword,
          trigger: 'blur'
        }]
      }
    }
  },
  mounted(){
    // 将用户邮箱部分数字加上星号
    this.state.userEmail = this.state.userEmail.substr(0, 2) + '***' + this.state.userEmail.substr(5, this.state.userEmail.split('')
        .length);
  },
  methods:{
    nextStep() {
      // 1：校验登录信息
      this.$refs.ruleFormRef.validate((valid) => {
        // 表单校验成功
        if (valid) {
          // 将用户输入的密码通过get请求到服务器，进行修改
          let params = {
            password: pencode(this.state.ruleForm.confirmPassword),
            email: this.state.email,
            checkCode:this.state.ruleForm.verificationCode
          };
          Axios.get("/user/forgetPassword", {
            params
          }).then((res) => {
            // console.log(res)
            if(res.msg==='修改失败'){
              this.$message.error("用户不存在!请先注册。");
            }
            else if(res.code===500){
              this.$message.error("验证码错误!");
            }
            else {
              // 修改成功
              if (res.code === 200) {
                this.$emit('updateSucceed', res.code);
                // 重置表单项，将其值重置为初始值，并移除校验结果
                this.$refs.ruleFormRef.resetFields()
              } else {
                this.$message({
                  message: '糟糕，系统出错啦！耐心的再来一遍吧',
                  type: 'warning',
                })
                window.location.href = "/resetPassword"
              }
            }
          })
        }
      })
    }
  },
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