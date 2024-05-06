<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
      <div class="left_box">
        <h3 class="title">
          <i class="el-icon-user" style="margin-right: 10px;margin-top: 5px;"></i>
          个人设置
        </h3>
        <div class="set">
          <h4>基本设置</h4>
          <el-form ref="basicFormRef" :rules="basicRules" status-icon :model="state.basic" class="demo-form-inline">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
                <el-form-item prop="userName" label="昵称：" style="width: 100%;">
                  <el-input v-model="state.basic.userName" placeholder="请输入用户名"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
                <el-form-item prop="introduction" label="签名：" style="width: 100%;">
                  <el-input v-model="state.basic.introduction" placeholder="请输入个性签名" maxlength="20"
                            show-word-limit required/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10" style="width: 30%;">
                <el-form-item prop="travelAge" label="游龄：">
                  <el-input v-model="state.basic.travelAge" style="width: 70%;" placeholder="请输入游龄" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="3" :xl="3">
                <el-form-item>
                  <div class="tijiao" @click="onBasicSubmit" style="">
                    提交
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-divider border-style="dashed"/>

        <div class="set">
          <h4>更换头像</h4>
          <div style="display: flex;">
            <p style="display: inline-flex;
                    justify-content: center;
                    align-items: center;">
              <i class="el-icon-upload2" style="margin-right: 5px;"></i>
              请选择头像文件
            </p>
            <el-row :gutter="20" style="margin: 10px 0px 0 15px; width: 70%;">
              <el-col :xs="12" :sm="12" :md="24" :lg="24" :xl="24">
                <!--                <el-avatar :src="UserInfo.header"></el-avatar>-->
                <el-upload class="avatar-uploader" action="#" :show-file-list="false"
                           :http-request="handleAvatarSuccess" :before-upload="beforeUploadFunction">
                  <!-- 用户没设置头像的情况下使用系统默认的 -->
                  <img v-if="state.userInfo.avatar" :src="state.avatar"
                       style="width: 50px;border-radius: 50px;margin-top: -5px;"/>
                  <img v-if="!state.userInfo.avatar" src="@/assets/images/logo.png"
                       style="width: 50px;border-radius: 50px;margin-top: -5px;"/>
                  <span style="margin: 12px;position: absolute;font-size: 13px;line-height: 20px;">点击更换</span>
                </el-upload>
              </el-col>
            </el-row>
          </div>
        </div>

        <el-divider border-style="dashed"/>

        <!-- 修改密码 -->
        <div class="set">
          <h4>修改密码</h4>
          <p style="display: inline-flex;
                    justify-content: center;
                    align-items: center;">
            <i class="el-icon-circle-check" style="margin-right: 5px;"></i>
            密码6~18位字母、数字、特殊字符组成
          </p>
          <br>
          <p style="display: inline-flex;
                    justify-content: center;
                    align-items: center;">
            <i class="el-icon-warning-outline" style="margin-right: 5px;"></i>
            安全提示：新密码请勿与旧密码过于相似
          </p>
          <el-form ref="modifyFormRef" :rules="modifyRules" :model="state.modify" class="demo-form-inline">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item prop="usedPass" label="旧密码：" style="width: 100%;">
                  <el-input v-model="state.modify.usedPass" show-password placeholder="请输入旧密码"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item prop="newPass" label="新密码：" style="width: 100%;">
                  <el-input v-model="state.modify.newPass" show-password placeholder="请输入新密码"/>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="15" :md="12" :lg="12" :xl="12">
                <el-form-item prop="code" label="验证码：" style="width: 100%;">
                  <el-input v-model="state.modify.code" placeholder="请输入邮箱验证码">
                    <template #append>
                      <input type="button" :plain="true" @click="getCode()" :disabled="!state.show"
                             style="height: 100%;border: 0px;background: none;width: 80px;color: #ababab;cursor: pointer;"
                             :value="state.codeText"/>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" style="text-align: center;">
                <el-form-item style="margin-right: 0px;margin-top: -3px;">
                  <div class="tijiao" @click="modifySubmit" style="">提交
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

      </div>
    </el-col>

    <!-- 右侧个人信息展示 -->
    <el-col class="hidden-md-and-down" :md="18" :lg="6" :xl="6">
      <div class="right_box">
        <h3 class="title">
          <i class="el-icon-s-grid" style="margin-right: 10px;margin-top: 5px;"></i>
          信息展示
        </h3>
        <div class="info">
          <div class="right_photo">
            <!-- 用户没设置头像的情况下使用系统默认的 -->
            <img v-if="!state.userInfo.avatar" src="@/assets/images/logo.png">
            <img v-if="state.userInfo.avatar" :src="state.avatar">
          </div>
          <h2>Hi，{{ state.userInfo.userName }}</h2>
          <p class="email">{{ state.userInfo.email }}</p>
          <p class="slogan" v-if="state.userInfo.introduction===null">这家伙很懒，什么也没留下</p>
          <p class="slogan" v-if="state.userInfo.introduction!==null">{{ state.userInfo.introduction }}</p>
          <p class="slogan">游龄：{{ state.userInfo.travelAge }} 年</p>
        </div>
        <el-divider/>
        <h3 class="title">
          <i class="el-icon-sunrise" style="margin-right: 10px;margin-top: 5px;"></i>
          账号类型
        </h3>
        <div class="type">
          <h3>游客</h3>
          <p>可对本站文章、界面、用户进行访问</p>
          <br>
          <p>如有疑问请及时联系站长</p>
          <p>
            站长邮箱：<a style="text-decoration: none;"
                    href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=614617433@qq.com"
                    target="_blank" data-v-634963c2="">614617433 @qq.com</a>
          </p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import Axios from "@/utils/request"
import {pencode} from "@/utils/encode";
// 获取验证码60秒倒计时
const TIME_COUNT = 60;
// 3分钟=180秒，三分钟后清除验证码
const TIME_CLEAR_COUNT = 180;
export default {
  data() {
    //游龄判断
    // var age = /^[1-9][0-9]?$/;
    // const validateTravelAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('请填写此字段~'))
    //   } else {
    //     // console.log( typeof value);
    //     if (value !== this.state.userInfo.travelAge) {
    //       if (!age.test(value)) {
    //         callback(new Error('请输入0-100的整数'));
    //       } else {
    //         // let params = {
    //         //   registerName: value
    //         // };
    //         // Axios.get("/register/showUserName", {
    //         //   params
    //         // }).then((res) => {
    //         //   if (res.data.code == 1) {
    //         //     callback(new Error('该用户名太受欢迎了，请更换一个'));
    //         //   } else {
    //         callback()
    //         //   }
    //         // })
    //       }
    //     } else {
    //       callback()
    //     }
    //   }
    // };
    // 用户名正则表达式判断
    var nameGrep = /^[\u4e00-\u9fa5a-zA-Z0-9_]{2,8}$/;
    // 用户名的非空、正则验证
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写此字段~'))
      } else {
        // console.log(value === this.state.userInfo.userName);
        if (value !== this.state.userInfo.userName) {
          if (!nameGrep.test(value)) {
            callback(new Error('用户名由2~8位中英文、数字、下划线组成'));
          } else {

            // let params = {
            //   registerName: value
            // };
            // Axios.get("/register/showUserName", {
            //   params
            // }).then((res) => {
            //   if (res.data.code == 1) {
            //     callback(new Error('该用户名太受欢迎了，请更换一个'));
            //   } else {
            callback()
            //   }
            // })
          }
        } else {
          callback()
        }

      }
    }
        // 用户名的非空、正则验证
    const validateQianming = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写此字段~'))
      } else {
          callback()
      }
    }

    // // 旧邮箱的验证码的非空、输入正确验证
    // const validateCode = (rule, value, callback) => {
    //   if (!this.state.show) {
    //     if (!value) {
    //       return callback(new Error('请填写此字段~'))
    //     } else {
    //       // 输入的验证码正确
    //       if (value != this.state.toBind.verificationCode) {
    //         return callback(new Error('验证码有误，请重新输入'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   } else {
    //     return callback(new Error('获取验证码，填写此字段~'))
    //   }
    // }
    // var emailGrep =
    //     /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    // // 邮箱的非空验证
    // const validateEmail = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('请填写此字段~'))
    //   } else {
    //     if (!emailGrep.test(value)) {
    //       callback(new Error('请按照正确的邮箱格式输入'));
    //     } else {
    //       let params = {
    //         registerEmail: value
    //       };
    //       Axios.get("/register/showUserEmail", {
    //         params
    //       }).then((res) => {
    //         console.log(res.data.isExistUserEmail);
    //         if (res.data.code == 1) {
    //           callback(new Error('此邮箱已被注册，请更换一个'));
    //         } else {
    //           callback()
    //         }
    //       })
    //     }
    //   }
    // }
    // // 新邮箱的验证码的非空、输入正确验证
    // const validateCode2 = (rule, value, callback) => {
    //   this.$refs.toBindFormRef.validateField('email', err => {
    //     if (err) {
    //       if (!this.state.show) {
    //         if (!value) {
    //           return callback(new Error('请填写此字段~'))
    //         } else {
    //           // 输入的验证码正确
    //           if (value != this.state.toBind.verificationCode) {
    //             return callback(new Error('验证码有误，请重新输入'))
    //           } else {
    //             callback()
    //           }
    //         }
    //       } else {
    //         return callback(new Error('获取验证码，填写此字段~'))
    //       }
    //     }
    //   })
    //
    // }

    const validateUsedPass = (rule, value, callback) => {
      // console.log(value);
      if (!value) {
        return callback(new Error('请填写此字段~'))
      } else {
        // 输入的旧密码正确
        // if (value != this.state.userInfo.userPass) {
        //   return callback(new Error('旧密码输入有误，请重新输入'))
        // } else {
        callback()
        // }
      }
    }

    // 密码正则表达式判断
    var passGrep = /^[a-zA-Z0-9_.-=*&^%$#@!+]{6,18}$/;
    const validateNewPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写此字段~'))
      } else {
        if (!passGrep.test(value)) {
          callback(new Error('密码6~18位字母、数字、特殊字符组成'));
        } else {
          callback()
        }
      }
    }

    const validateCode = (rule, value, callback) => {
      // 判断邮箱的正则是否通过，没有通过则先不验证此字段
      // this.$ref.ruleFormRef.validateField("registerEmail", (err) => {
      // if (emailGrep.test(this.state.ruleForm.registerEmail)) {
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
      // }
      // });
    };
    return {
      // 存储确认好的邮箱  一旦用户再次修改则清除验证码 需重新获取
      affirmEmail: "",
      state: {
        // 当前登录的用户信息
        userInfo: [],
        // 用户邮箱
        userEmail: '',
        // 基本信息
        basic: {
          userName: '',
          introduction: '',
          travelAge: '',
        },
        avatar: '', //头像
        // 更换邮箱绑定
        toBind: {
          // 随机生成的验证码
          verificationCode: '',
          // 输入的验证码
          // code: '',
          email: '',
          // 输入的验证码
          code2: ''
        },
        // 获取验证码 点击后为禁止状态
        show: true,
        // 获取验证码的文字 点击后改变
        codeText: '获取验证码',
        // 当前秒数
        count: '',
        // 时间  计时器
        timer: null,
        // 计时三分钟   后 销毁验证码
        timer2: null,
        // 存放生成的六位随机数   验证码
        // code: '',
        // 三分钟后清除验证码,计时器
        clearCount: "",
        // 修改密码
        modify: {
          usedPass: "",
          newPass: "",
          code:""
        },
        // 点击更改绑定邮箱 显示获取验证码框
        showGetCode: false,
        // 输入旧邮箱的验证码正确后  点击按钮 显示输入新邮箱的表单
        showNewEmail: false,
        affirmGet: false,
      },
      basicRules: {
        userName: [{
          validator: validateUserName,
          trigger: 'blur'
        }],
        introduction: [{
          validator: validateQianming,
          trigger: 'blur'
        }],
      },
      // toBindRules: {
      //   code: [{
      //     validator: validateCode,
      //     trigger: 'blur'
      //   }],
      //   email: [{
      //     validator: validateEmail,
      //     trigger: 'blur'
      //   }],
      //   code2: [{
      //     validator: validateCode2,
      //     trigger: 'blur'
      //   }]
      // },
      modifyRules: {
        usedPass: [{
          validator: validateUsedPass,
          trigger: 'blur'
        }],
        newPass: [{
          validator: validateNewPass,
          trigger: 'blur'
        }],
        code: [
          {
            validator: validateCode,
            trigger: "blur",
          },
        ],
      }
    }
  },
  methods: {
    // 图片上传格式、大小要求
    beforeUploadFunction(rawFile) {
      // console.log(rawFile.type);
      if (rawFile.type !== 'image/jpeg' &&
          rawFile.type !== 'image/jpg' &&
          rawFile.type !== 'image/png') {
        this.$message.error('仅支持图片格式 .png | .jpg | .jpeg ')
        return false
      } else if (rawFile.size / 1024 / 1024 > 5) {
        this.$message.error('仅支持大小不超过5MB的图片!')
        return false
      }
      let formData = new FormData();
      formData.append('file', rawFile);
      formData.append('userId', this.state.userInfo.userId);
      Axios.post('/user/header', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': localStorage.getItem("token")
        }
      }).then((res) => {
        // console.log(res)
        if(res.code===200){
          window.sessionStorage.setItem("userInfo", JSON
              .stringify(res.data.user));
          this.$message({
            message: '照片上传成功~',
            type: 'success',
          })
          location.reload();
        }
      })
      return true
    },
    // 图片上传成功后执行的函数
    handleAvatarSuccess(response) {
      this.state.avatar = response;
    },
    // 提交基本信息
    onBasicSubmit() {
      // 信息没有任何变化
      if (this.state.basic.userName !== this.state.userInfo.userName ||
          this.state.basic.introduction !== this.state.userInfo.introduction ||
          this.state.basic.travelAge !== this.state.userInfo.travelAge) {
        // 校验表单
        this.$refs.basicFormRef.validate((valid) => {
          // 表单校验成功 提交数据到后台进行修改
          if (valid) {
            let params = {
              userId: this.state.userInfo.userId,
              userName: this.state.basic.userName,
              introduction: this.state.basic.introduction,
              travelAge:this.state.basic.travelAge
            };
            // 将修改信息传给服务器
            Axios.post("/user/save", {}, {
              params,
              headers: {
                'token': localStorage.getItem("token")
              }
            }).then((res) => {
              // console.log(res)
              if (res.code === 200) {
                // 自动重新登录一次 修改token的值
                // let params = {
                //   loginName: this.state.userInfo.email,
                //   loginPass: this.state.userInfo.userPass,
                // };
                // Axios.get("/login/showAllUserInfo", {
                //   params
                // }).then((res) => {
                //   if (res.data.code == "0") {
                // 修改token的值
                window.sessionStorage.setItem("userInfo", JSON
                    .stringify(res.data.user));
                // 提示
                this.$message({
                  message: '基础信息修改成功~',
                  type: 'success',
                })
                // 刷新界面
                location.reload();
                // }
                // })
              }
            })
          }
        })
      } else {
        this.$message({
          message: '小样，基础信息没有任何的变化~',
          type: 'success',
        })
      }
    },
    //用于倒数验证码过期时间  3分钟后向服务器请求删除该验证码
    countCheckCode() {
      // console.log("验证码删除倒计时3分钟")
      clearTimeout(this.$data.timerb)
      this.$data.timerb = setTimeout(() => {
        Axios.get("/user/deleteCheckCode", {
          params: {
            email: this.state.userEmail,
          }
        })
      }, 180000)
    },
    // 获取验证码
    getCode() {
      this.state.affirmGet = true;
      // 邮箱是否输入正确
      // this.$refs.toBindFormRef.validateField('email', err => {
      // type = 1  为旧邮箱  不需要进行邮箱验证
      // if (err || type == 1) {
      //   var Email = '';
      //   if (type == 1) {
      //     Email = this.state.userEmail // 旧邮箱
      //   } else {
      //     Email = this.state.toBind.email // 新输入的邮箱
      //   }
      // 生成六位数随机验证码发送给后台
      // for (var i = 0; i < 6; i++) {
      //   this.state.toBind.verificationCode += Math.floor(Math.random() * 10);
      // }
      // 将验证码、用户输入的邮箱传给后台，发送给用户邮箱
      const params = {
        email: this.state.userEmail, // 用户当前邮箱
        type:"rs",
        // content: "【Bpvank博客】验证码：" + this.state.toBind.verificationCode +
        //     "，此验证码用于更换邮箱绑定，请勿将验证码告知他人，有效期3分钟，请妥善保管。"
      }
      Axios.get("/user/emailCheck",{
        params,
      }).then((res) => {
        // console.log(res)
        if (res.code === 200) {
          this.countCheckCode()
          // 点击后倒计时60秒
          if (!this.state.timer) {
            this.state.count = TIME_COUNT;
            this.state.show = false;
            this.state.timer = setInterval(() => {
              if (this.state.count > 0 && this.state.count <= TIME_COUNT) {
                if (this.state.userEmail === this.state.userEmail) {
                  this.state.count--;
                  this.state.codeText = this.state.count + 's';
                } else {
                  this.state.show = true;
                  window.clearInterval(this.state.timer);
                  this.state.timer = null;
                  this.state.codeText = "重新获取";
                  this.state.toBind.email = ""
                }

              } else {
                this.state.show = true;
                window.clearInterval(this.state.timer);
                this.state.timer = null;
                this.state.codeText = "重新获取";
              }
            }, 1000)
          }
        } else {
          this.$message.error('验证码获取失败!')
        }
      })

      // }
      // })
    },
    // 提交旧邮箱验证码
    // confirmCode() {
    //   // 校验验证码是否输入正确
    //   this.$refs.toBindFormRef.validateField('code', err => {
    //     if (err) {
    //       // 显示新邮箱的输入框
    //       this.state.showNewEmail = true;
    //       // 关闭旧邮箱验证码输入框
    //       this.state.showGetCode = false
    //
    //       // 清除计时器
    //       this.state.show = true;
    //       window.clearInterval(this.state.timer);
    //       this.state.timer = null;
    //       this.state.codeText = "获取验证码";
    //       // window.clearInterval(state.timer2);
    //       // state.timer2 = null;
    //       this.state.toBind.verificationCode = ""
    //     } else {
    //       this.$message.error('按要求进行更换邮箱绑定操作.')
    //       return false;
    //     }
    //   })
    // },
    // // 提交邮箱更改绑定
    // toBindSubmit() {
    //   // 新邮箱验证
    //   this.$refs.toBindFormRef.validateField('email', err1 => {
    //     if (err1) {
    //       // 验证码输入校验
    //       this.$refs.toBindFormRef.validateField('code2', err2 => {
    //         if (err2) {
    //           // 清除计时器
    //           this.state.show = true;
    //           window.clearInterval(this.state.timer);
    //           this.state.timer = null;
    //           this.state.codeText = "获取验证码";
    //           // clearInterval(state.timer2);
    //           // state.timer2 = null;
    //           this.state.toBind.verificationCode = ""
    //
    //           // 修改邮箱
    //           let params = {
    //             userId: this.state.userInfo.userId,
    //             userEmail: this.state.toBind.email,
    //           };
    //           // 将修改信息传给服务器
    //           Axios.get("/user/updateUserEmail", {
    //             params
    //           }).then((res) => {
    //             if (res.data.code == 0) {
    //               // 自动重新登录一次 修改token的值
    //               let params = {
    //                 loginName: this.state.userInfo.userName,
    //                 loginPass: this.state.userInfo.userPass,
    //               };
    //               Axios.get("/login/showAllUserInfo", {
    //                 params
    //               }).then((res) => {
    //                 if (res.data.code == "0") {
    //                   // 修改token的值
    //                   window.sessionStorage.setItem(
    //                       "userInfo", JSON
    //                           .stringify(res.data));
    //                   // 提示
    //                   this.$message({
    //                     message: '更换绑定邮箱成功~',
    //                     type: 'success',
    //                   })
    //                   // 刷新界面
    //                   location.reload();
    //                 }
    //               })
    //             }
    //           })
    //         } else {
    //           this.$message.error('按要求进行更换邮箱绑定操作.')
    //           return false;
    //         }
    //       })
    //     } else {
    //       this.$message.error('按要求进行更换邮箱绑定操作.')
    //       return false;
    //     }
    //
    //   })
    // },
    // 提交修改密码
    modifySubmit() {
      // 旧密码验证
      this.$refs.modifyFormRef.validate((valid) => {
        if (valid) {
          // 新密码 != 旧密码
          if (this.state.modify.newPass !== this.state.modify.usedPass) {
            // 修改邮箱
            let params = {
              email: this.state.userEmail,
              oldpass:pencode(this.state.modify.usedPass),
              newpass: pencode(this.state.modify.newPass),
              checkCode:this.state.modify.code
            };
            // 将修改信息传给服务器
            Axios.post("/user/changePassword", {},{
              params,
              headers: {
                'token': localStorage.getItem("token")
              }
            }).then((res) => {
              // console.log(res)
              if(res.code===606){
                this.$message.error('原密码输入错误！')
              }
              else if(res.code===500){
                this.$message.error('验证码输入错误！')
              }
              else if (res.code == 200) {
                // 自动重新登录一次 修改token的值
                // let params = {
                //   loginName: this.state.userInfo.userName,
                //   loginPass: this.state.modify.newPass,
                // };
                // Axios.get("/login/showAllUserInfo", {
                //   params
                // }).then((res) => {
                //   if (res.data.code == 200) {
                // 修改token的值
                window.sessionStorage.setItem(
                    "userInfo", JSON
                        .stringify(res.data.user));
                // 提示
                this.$message({
                  message: '修改密码成功~',
                  type: 'success',
                })
                // 刷新界面
                location.reload();
                // }
                // })
              }
            })
          } else {
            this.$message.error('新密码与旧密码过于相似！')
            return false;
          }
        }
      })
    }
  },
  mounted() {
    // 获取登录的用户信息
    const tokenStr = sessionStorage.getItem("userInfo");
    const userInfo = JSON.parse(tokenStr);
    this.state.userInfo = userInfo;

    // 将用户的基础信息填进表单中
    this.state.basic.userName = this.state.userInfo.userName;
    this.state.basic.introduction = this.state.userInfo.introduction;
    this.state.basic.travelAge =this.state.userInfo.travelAge;
    this.state.avatar=this.state.userInfo.avatar;
    // console.log(typeof this.state.basic.travelAge);
    //发邮箱用
    this.state.userEmail = this.state.userInfo.email;
    // 将邮箱中间位置转为星号
    this.state.userInfo.email = this.state.userInfo.email.substr(0, 3) + '****' + this.state.userInfo
        .email.substr(7)
  }
}
</script>
<style scoped>
.personSetup_box {
  width: 100%;
  height: auto;
}

.personSetup_box > h3 {
  color: rgb(184, 28, 34);
  margin-bottom: 10px;
  padding: 20px 20px;
  background-color: white;
}

.title {
  color: rgb(184, 28, 34);
  margin-bottom: 10px;
  padding: 20px 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.left_box {
  width: 100%;
  height: auto;
  background: white;
  padding: 20px;
  /* 添加此属性 padding间距不扩大div */
  box-sizing: border-box;
}

.set {
  text-align: left;
  padding: 0px 20px;
  margin-bottom: 10px;
  color: #8f8f8f;
  line-height: 35px;
}

.set h4 {
  line-height: 45px;
  color: #8f8f8f;
}

.right_box {
  width: 100%;
  height: auto;
  background: white;
  padding: 20px;
  /* 添加此属性 padding间距不扩大div */
  box-sizing: border-box;
}

.right_photo {
  position: relative;
  text-align: center;
  height: 100px;
  width: 100px;
  margin-left: -50px;
  left: 50%;
}

.info {
  text-align: center;
}

.right_photo img {
  width: 100%;
  border-radius: 50%;
}

.right_box h2 {
  padding-top: 10px;
  letter-spacing: 0;
  font-size: 30px;
}

.email {
  padding: 5px 0px;
  font-size: 14px;
  font-weight: lighter;
}

.slogan {
  opacity: 0.3;
  font-size: 15px;
}

.type {
  text-align: center;
  opacity: 0.4;
  line-height: 30px;
}
.type p a:hover{
  color:rgb(184, 28, 34)
}
.el-input {
  width: 80%;
}
.tijiao {
  height: 40px;
  width: 80px;
  background-color: rgb(184, 28, 34);
  border: 1px solid rgb(184, 28, 34);
  border-radius: 5px;
  color: white;
  font-size: 15px;
  transition: 0.2s all;
  cursor: pointer;
  text-align: center;
}
.tijiao:hover {
  background: rgb(138 21 25);
  border: 1px solid rgb(138 21 25);
}
</style>
