<template>
  <div>
    <el-row>
      <el-col :lg="7" :sm="3" :md="5" :xs="1">
        <div class="grid-content-left bg-purple-dark">
          <router-link :to="{name: 'board'}"><a>catW</a></router-link>
        </div>
      </el-col>
      <el-col :lg="10" :xs="20" :sm="18" :md="14">
        <el-menu theme="dark" class="grid-content el-menu" mode="horizontal"
                 @select="handleSelect">
          <el-menu-item index="1">社区中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">科目天地</template>
            <el-menu-item index="root2=1">
              <router-link :to="{name: 'chinese', params:{root2:1}}">语文</router-link>
            </el-menu-item>
            <el-menu-item index="root2=2">
              <router-link :to="{name: 'math', params:{root2:2}}">数学</router-link>
            </el-menu-item>
            <el-menu-item index="root2=3">
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
            @keyup.enter.native="searchEvent"
            :on-icon-click="handleIconClick">
          </el-input>
        </div>
      </el-col>
      <!--登录弹出框-->
      <!--<template scope="scope">-->
      <el-col :lg="4" :sm="1" :md="3" :xs="1">
        <div class="grid-content-right bg-purple-dark">
          <div class="right-head">
            <span v-if="mapUserInfo.email !== ''">
              <el-badge :value="messageNumber>0?'new':''">
                <el-button size="mini" @click="readMessage">{{messageNumber}}</el-button>
              </el-badge>
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
        messageNumber: 0,
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
        if (this.input2 !== '') {
          this.$router.push({name: 'search', params: {searchContent: this.input2}})
          this.input2 = ''
        } else {
          this.$message({
            type: 'warning',
            message: '搜索内容不能为空!'
          })
        }
      },
      searchEvent(){
        this.handleIconClick();
      },
      onEditClose(needRefresh){
        this.isShowDialog = false;
        let eamil = window.localStorage.getItem('userEmail')
        if (eamil !== null) {
//          this.$store.commit("setUserEmail", eamil)
          this.getMessageNumber();
        }
      },
      handleSelect(key, keypath){
//        console.debug("keeeeee", key)
//        console.debug("keeeeee", keypath)

//        console.debug("-----111111",key.indexOf("root1"))
//        let ss = key.split("=")
//        if(key.indexOf("root1")===0){
//          if (ss[1] === '1') {
//            this.$router.push({path: '/home/article_list', params: {root1: 1}})
//          } else if (ss[1] === '2') {
//            this.$router.push({path: '/home/post_list', params: {root1: 2}})
//          } else if (ss[1] === '3'){
//            this.$router.push({path: '/home/outsides_list', params: {root1: 3}})
//          }else{
//              this.$router.push({path: '/not_found'})
//          }
//        }else if(key.indexOf("root2")===0){
//          if (ss[1] === '1') {
//            this.$router.push({path: '/home/subject/chinese_list', params: {root2: 1}})
//          } else if (ss[1] === '2') {
//            this.$router.push({path: '/home/subject/math_list', params: {root2: 2}})
//          } else if (ss[1] === '3'){
//            this.$router.push({path: '/home/subject/english_list', params: {root2: 3}})
//          }else{
//            this.$router.push({path: '/not_found'})
//          }
//        }else {
//          this.$router.push({path: '/not_found'})
//        }
//        this.$store.commit("setTypes", {name: ss[0], value: ss[1]})
//        console.debug("gggggg", this.mapUserInfo.types)


      },
      personMenu(command){
        if (command === "personal_data") {
          this.$router.push({name: 'userInfo', params: {selectType: "privateInfo"}})
        } else if (command === "collection") {
          this.$router.push({name: 'userInfo', params: {selectType: "collectArticles"}})
        } else if (command === "logout") {
          this.$store.commit('reset')
//          this.$router.push({path: '/home'})
          sessionStorage.removeItem('token')
          //删去本地
          window.localStorage.removeItem('userEmail')
        } else if (command === "write_article") {
          this.$store.commit("setArticleType", 1)
          this.$router.push({path: '/article'})

        } else if (command === "write_post") {
          this.$store.commit("setArticleType", 2)
          this.$router.push({path: '/article'})
        } else if (command === "rest_time") {
          this.$store.commit("setArticleType", 3)
          this.$router.push({path: '/article'})
        } else {

        }
      },
      getLoginState(){
        let eamil = window.localStorage.getItem('userEmail')
        if (eamil !== null) {
          this.$store.commit("setUserEmail", eamil)
          this.getMessageNumber();
        }
      },
      getMessageNumber(){
        let url = '/message/getNews/'
        this.$http.get(url)
          .then((res => {
            this.messageNumber = res.data
          }))
      },
      readMessage(){
        this.$router.push({name: 'userInfo', params: {selectType: "messages"}})
      }
    },
    watch: {
//      '$route'(to,from){
//        console.debug("-----to-",to.name)
//        if (to.name === "board"){
//          this.$store.commit("setBoardFlag", true)
//        }
////        console.debug("-----===",from)
//      }
    },
    mounted: function () {
      this.getLoginState();
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

  .router-link-active {
    color: red;
    text-decoration: none;
  }

  a:-webkit-any-link {
    text-decoration: none;
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
