<template>
  <!--个人信息页面-->
  <div>
    <el-row>
      <el-col :span="24" type="flex" justify="center" :push="5">
        <!--<el-col :span="6" :push="4" :pull="14">-->
        <div style="margin:20px;"></div>
        <!--<el-row>-->
        <!--<el-col>-->
        <!--昵称:<el-input v-model="name" placeholder="请输入内容"-->
        <!--type="text" :maxlength="100" auto-complete="on">-->

        <!--</el-input>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-form label-position="right" label-width="110px" :model="userInfo">
          <el-form-item label="昵称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email" :readonly="true" type="text"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="userInfo.city"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="userInfo.school"></el-input>
          </el-form-item>
          <el-form-item label="座右铭">
            <el-input v-model="userInfo.motto" type="textarea"
                      :autosize="{minRows:1,maxRows:5}"></el-input>
          </el-form-item>
          <el-form-item label="个人介绍">
            <el-input v-model="userInfo.describe" type="textarea"
                      :autosize="{minRows:2,maxRows:5}"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitUserInfo(userInfo)">修改信息</el-button>
            <el-button @click="resetUserInfo(userInfo)">重置</el-button>
            <el-button type="danger" @click="changePWD">修改密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--旧密码输入-->
    <template>
      <el-dialog
        title="提示=>修改密码"
        v-model="dialogVisible"
        size="tiny">
        <span>旧密码:<el-input v-model="oldPWD" type="password" placeholder="请输入密码"></el-input></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="putOldPWD">确 定</el-button>
        </span>
      </el-dialog>
    </template>

    <!--新密码输入-->
    <template>
      <el-dialog title="新密码设置" v-model="newPWDDialogVisible" size="tiny">
        <el-form :model="newPWD" label-position="right" label-width="80px">
          <el-form-item label="新密码">
            <el-input type="password" v-model="newPWD.input_new_pwd" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="newPWD.input_again_pwd" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="newPWDDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="putNewPWD">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

<style scoped>
  .el-input__inner {
    padding: 0 0 !important;
  }

  .el-input {
    width: 280px;
  }

  .label-font {
    font-family: 仿宋;
    font-size: 20px;
  }

  .el-row {
    margin-bottom: 5px;
  }

  .el-form-item__label {
    width: 300px !important;
  }

  .el-form-item {
    width: 500px;
    margin-bottom: 12px;
  }

  .el-col.el-col-24.el-col-push-5 {
    width: 550px;
  }
</style>

<script>
  export default{
    props: ['selectMenu'],
    data(){
      return {
        userInfo: {
          name: '',
          email: '',
          city: '',
          school: '',
          motto: '',
          describe: '',
        },
        dialogVisible: false,
        oldPWD: '',//旧密码,
        newPWDDialogVisible: false,
        newPWD: {
          input_new_pwd: '',
          input_again_pwd: ''
        },
      }
    },
    methods: {
      submitUserInfo(userInfo){//提交信息
        let data = JSON.stringify(this.userInfo)
        this.$http.put('/user/otherInfo/', data)
          .then((res => {
            this.$message(res.data)
          }))
          .catch((err => {
            this.$message({
              type: 'warning',
              message: '请检查网络!'
            })
          }))

      },
      resetUserInfo(){
        this.getMyself()
      },

      getUserInfo(){//获取用户基本信息
        let url = '/user/getSelf/'
        this.$http.get(url)
          .then((res => {
            this.userInfo = res.data
          }))
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            console.debug("closing")
            done();
          })
          .catch(_ => {
          });
      },
      changePWD(){
        this.dialogVisible = true
      },
      putOldPWD(){
        if (this.oldPWD === '') {
          this.$message({
            type: 'warning',
            message: '密码不能为空!'
          })
        } else {
          this.$http.put('/user/putOld?oldPWD=' + this.oldPWD)
            .then((res => {
//                  let message = res.data
//                  this.$message(message)
              this.dialogVisible = false
              this.newPWDDialogVisible = true
            }))
            .catch((err => {
              let message = err.data
              this.$message({
                type: 'warning',
                message: message
              })
            }))
        }
      },
      putNewPWD(){
        if (this.newPWD.input_new_pwd === '' || this.newPWD.input_again_pwd === '') {
          this.$message({
            type: 'warning',
            message: '密码不能为空!'
          })
          return
        } else if (this.newPWD.input_new_pwd !== this.newPWD.input_again_pwd) {
          this.$message({
            type: 'warning',
            message: '两次密码不一致!'
          })
          return
        } else if (this.newPWD.input_new_pwd.length < 6) {
          this.$message({
            type: 'warning',
            message: '密码长度不能小于6位!'
          })
          return
        }
        let url = '/user/newPWD/'
        let data = JSON.stringify(this.newPWD)
        this.$http.put(url, data)
          .then((res => {
            let message = res.data
            this.$message(message)
            this.newPWDDialogVisible = false
          }))
          .catch((err => {
            let message = res.data
            this.$message({
              type: 'warning',
              message: message
            })
          }))
      },
      resetNew(){

      },
      getMyself(){
        this.$http.get('/user/getSelf/')
          .then((res => {
            this.userInfo = res.data
          }))
      },
      load(){
        if (this.selectMenu === 'privateInfo') {
          this.getMyself();
        }
      }

    },
    watch: {
      selectMenu(){
        this.load();
      }
    },
    mounted: function () {
//      this.getMyself();
      this.load();
    }
  }
</script>
