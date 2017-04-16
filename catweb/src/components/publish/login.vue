<template>
  <div>
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-user">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="user.pwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">登录</el-button>
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
        }
      };
      return {
        user: {
          email: '',
          pwd: '',
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          pwd: [
            {required: true, min: 6, max: 12, message: '请输入6到12位长度的有效密码'},
            {validator: validatePass, trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            alert('submit!');
            var url = '/session/'
            var data = JSON.stringify(this.user)
            this.$http.post(url, data)
              .then((res) => {
                console.debug("---", res.data)
                this.$store.commit('SET_BASEINFO', res.data)
                //将token放在本地的header
                sessionStorage.setItem('token', res.data.token)
                this.close(true)
              })
          } else {
            console.log('error submit!!');
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
