<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button @click="attention(userInfo.id)" size="small" type="info">
          <span v-if="attentionState === 'yes'">取消关注</span>
          <span v-else>关注</span>
        </el-button>
      </el-col>
    </el-row>
    <div style="margin: 20px"></div>
    <div class="font-css">
      <el-row>
        <el-col :span="12">昵称:{{userInfo.name}}</el-col>
        <el-col :span="12">邮箱:{{userInfo.email}}</el-col>
      </el-row>

      <el-row>
        <el-col :span="12">城市:{{userInfo.city}}</el-col>
        <el-col :span="12">学校:{{userInfo.school}}</el-col>
      </el-row>

      <el-row>
        <el-col :span="24">座右铭:

          <el-input
            type="textarea"
            :rows="1"
            :readonly="true"
            auto-complete="on"
            placeholder="请输入内容"
            v-model="userInfo.motto">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">自我描述:
          <el-input
            type="textarea"
            :rows="2"
            :readonly="true"
            auto-complete="on"
            placeholder="请输入内容"
            v-model="userInfo.describe">
          </el-input>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<style scoped>
  .font-css {
    font-family: 仿宋;
    font-size: 18px;
  }
</style>

<script>
  import {mapState} from 'vuex'
  export default{
    props: ["user_id"],
    data(){
      return {
        userInfo: {},
        attentionState: 'no',
      }
    },
    computed: {
      ...mapState({
        userStoreInfo: ({userInfo}) => userInfo,
      })
    },
    watch: {
      user_id(){
        console.debug("-----watch----", this.user_id)
        this.getUserInfo();
        this.getAttetionState()
      }
    },
    methods: {
      closeUserDialog(refreshState = false){
        this.$emit('closeUserDialog', refreshState)
      },
      attention(id){
        if (this.userStoreInfo.id !== '' && this.userStoreInfo.accessToken !== '') {
          let flag = this.attentionState
          this.$http.put('/user/sayUser/' + this.user_id + '?flag=' + flag)
            .then((res => {
              let message = res.data
              this.$message(message)
              this.getAttetionState()
            }))
            .catch((err => {
              this.$message({
                type: 'warning',
                message: err.data
              })
            }))
        } else {
          this.$message({
            type: 'warning',
            message: '请登录-操作'
          })
        }
      },
      getUserInfo(){
        this.$http.get('/session/getUserInfo/' + this.user_id)
          .then((res => {
            this.userInfo = res.data
          }))
      },
      getAttetionState(){
        console.debug("====", this.userStoreInfo)
        if (this.userStoreInfo.id !== '' && this.userStoreInfo.accessToken !== '') {
          this.$http.get('/user/getCollectUserState/' + this.user_id)
            .then((res => {
              this.attentionState = res.data
            }))
        }
      }
    },
    mounted: function () {
      this.getUserInfo();
      this.getAttetionState()
    }
  }
</script>
