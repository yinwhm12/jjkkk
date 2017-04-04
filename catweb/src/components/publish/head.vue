<template>
  <div>
    <el-row>
      <el-col :lg="7" :sm="3" :md="5" :xs="1">
        <div class="grid-content-left bg-purple-dark">catW</div>
      </el-col>
      <el-col :lg="10" :xs="20" :sm="18" :md="14">
        <el-menu theme="dark" class="grid-content el-menu" mode="horizontal"
                 @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :lg="3" :sm="2" :md="2" :xs="1">
        <div class="grid-content bg-purple-dark">
          <el-input
            placeholder="搜索"
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick">
          </el-input>
        </div>
      </el-col>
      <!--登录弹出框-->
      <!--<template scope="scope">-->
      <el-col :lg="4" :sm="1" :md="3" :xs="1">
        <div class="grid-content-right bg-purple-dark">
          <div class="right-head">
            <!--<span v-if=""></span>-->

            <span v-if="user===null">
                <el-dropdown>
                  <span class="el-dropdown-link dropdown">
                    {{user.email}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人资料设置</el-dropdown-item>
                    <el-dropdown-item divided>我的收藏</el-dropdown-item>
                    <el-dropdown-item divided>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            <span v-else>
          <el-button type="text" @click="login" size="large">登录</el-button>
        <el-button type="text" @click="register" size="large">注册</el-button>
                </span>
          </div>
        </div>
      </el-col>
      <!--</template>-->
    </el-row>
    <el-dialog :title="dialogType?'注册':'登录'" size="tiny" v-model="isShowDialog">
      <span v-if="dialogType===0">
        <dialog_login></dialog_login>
      </span>
      <span v-else>
      <dialog_register></dialog_register>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Dialog_login from "./login.vue"
  import Dialog_register from "./register.vue"
  export default {
    components: {
      Dialog_login,
      Dialog_register
    },
    data() {
      return {

        isShowDialog: false,//是否弹出界面
        dialogType: 0,//弹出界面类型  0为登录 1为注册
        input2: '',
        dialogTableVisible: false,
        user: {
          name: '',
          email: 'yinwhm12',
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      login(){
        this.isShowDialog = true;
        this.dialogType = 0;
      },
      register(){
        this.isShowDialog = true;
        this.dialogType = 1;
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleconClick(ev){
        console.log(ev);
      },
      handleIconClick(){

      },
    }
  }
</script>
<style>
  body {
    margin: 0 0;
  }
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #324157;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 0px;
    min-height: 60px;
    font-size: 38px;
  }

  .el-menu {
    border-radius: 0px !important;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .grid-content-left {
    min-height: 60px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-family: 仿宋;
    color: red;
    text-align: right;
    font-size: 52px;
  }

  .grid-content-right {
    min-height: 60px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .grid-font {
    font-size: 5px;
    font-family: 仿宋;
  }

  .grid-search {
    /*text-align: left;*/
  }

  .dialog {
    text-align: center;
  }

  .top-body {
    margin-top: -8px;
  }

  .right-head {
    text-align: center;
    height: 100%;
    margin-right: 32px;
    padding-top: 20px;
    vertical-align: middle;
  }

  .dropdown {
    display: inline-block;
    padding: 0 0px 0 10px;
    color: #20A0FF;
    font-size: 20px;
  }

  /*------------*/

</style>
