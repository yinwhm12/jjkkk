<template>
  <div>
    <el-row>
      <el-col :lg="7" :sm="3" :md="5" :xs="1">
        <div class="grid-content-left bg-purple-dark">catW</div>
      </el-col>
      <el-col :lg="10" :xs="20" :sm="18" :md="14">
        <el-menu theme="dark" class="grid-content el-menu" mode="horizontal"
                 @select="handleSelect">
          <el-menu-item index="1">社区中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">科目天地</template>
            <el-menu-item index="2-1">
              <router-link :to="{name: 'chinese', params:{root2:1}}">语文</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link :to="{name: 'math', params:{root2:2}}">数学</router-link>
            </el-menu-item>
            <el-menu-item index="2-3">
              <router-link :to="{name: 'english', params:{root2:3}}">英语</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="root1=1">
            <router-link :to="{name: 'articles', params:{root1:1}}">文章</router-link>
          </el-menu-item>
          <el-menu-item index="root1=2">
            <router-link :to="{name: 'posts', params:{root1:2}}">帖子</router-link>
          </el-menu-item>
          <el-menu-item index="root1=3">
            <router-link :to="{name: 'outsides', params:{root1:3}}" replace>课间操</router-link>
          </el-menu-item>
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
            <span v-if="mapUserInfo.id !== ''">
                <el-dropdown @command="personMenu">
                  <span class="el-dropdown-link dropdown">
                    {{mapUserInfo.email}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personal_data">个人资料设置</el-dropdown-item>
                    <el-dropdown-item divided command="collection">我的收藏</el-dropdown-item>
                    <el-dropdown-item divided command="write_article">写文章</el-dropdown-item>
                    <el-dropdown-item divided command="write_post">发帖子</el-dropdown-item>
                    <el-dropdown-item divided command="rest_time">说说</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出</el-dropdown-item>
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
        <dialog_login @close="onEditClose"></dialog_login>
      </span>
      <span v-else>
      <dialog_register @close="onEditClose"></dialog_register>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Dialog_login from "./login.vue"
  import Dialog_register from "./register.vue"
  import {mapState} from 'vuex'
  export default {
    components: {
      Dialog_login,
      Dialog_register,
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
        formLabelWidth: '120px',
        article_type: 0,
      };
    }, computed: {
      ...mapState({
        mapUserInfo: ({userInfo}) => userInfo,
      })
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
      handleIconClick(){
      },
      onEditClose(needRefresh){
        this.isShowDialog = false;
      },
      handleSelect(key, keypath){
        console.debug("keeeeee", key)
//        $.trim(key)
//        let ss = key.split("?")
//        console.debug("---------sss", ss[ss.length - 1])
//        this.$router.push({path: '/home/article_list/',params: { root1: ss[ss.length-1]}})
//        console.debug("okkkk")
//        console.debug("ssssss",ss)
//        console.debug("keeeeeepp",keypath)
        let ss = key.split("=")
        this.$store.commit("setTypes", {name: ss[0], value: ss[1]})
        console.debug("gggggg", this.mapUserInfo.types)
        if (ss[1] === '1') {
          this.$router.push({path: '/home/article_list', params: {root1: 1}})
        } else if (ss[1] === '2') {
          this.$router.push({path: '/home/post_list', params: {root1: 2}})
        } else {
          this.$router.push({path: '/home/post_list', params: {root1: 3}})
        }

      },
      personMenu(command){
        if (command === "personal_data") {

        } else if (command === "collection") {

        } else if (command === "logout") {
          this.$store.commit('reset')
//          this.$router.push({path: '/home'})
          sessionStorage.removeItem('token')
        } else if (command === "write_article") {
          this.$store.commit("setArticleType", 1)
          this.$router.push({path: '/home/article'})

        } else if (command === "write_post") {
          this.$store.commit("setArticleType", 2)
          this.$router.push({path: '/home/article'})
        } else if (command === "rest_time") {
          this.$store.commit("setArticleType", 3)
          this.$router.push({path: '/home/article'})
        } else {

        }
      }
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
