<template>
  <div>
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-user">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="user.pwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="user.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">注册</el-button>
        <el-button type="primary" @click="resetForm('user')">重置</el-button>
        <el-button type="primary" @click="close(false)">关闭</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("请输入密码"));
        } else {
          if (this.user.checkPass !== '') {
            this.$refs.user.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.user.pwd) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      };
      return {
        user: {
          email: '',
          pwd: '',
          checkPass: ''
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ],
          pwd: [
            {required: true, min: 6, max: 12, message: '请输入6到12长度密码'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            alert('submit!');
            var url = '/session/register/'
            var data = JSON.stringify(this.user)
            this.$http.post(url, data)
              .then((res) => {
//                console.debug("-----tttt----", res.data)
                sessionStorage.setItem('token', res.data.token)
                this.$store.commit('SET_BASEINFO', res.data)
                //在本地存入email信息
                window.localStorage.setItem('userEmail', this.user.email)
//                this.$router.push({path: '/'})
                this.close(true)
              })
          } else {
//            console.log('error submit!!');
            this.$message({
              type: 'warning',
              message: '输入信息有误!'
            })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      close(needRefresh = false){
        this.$emit('close', needRefresh)
      }
    }
  }
</script>

