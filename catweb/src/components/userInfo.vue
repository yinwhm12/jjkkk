<template>
  <el-row style="margin-top: -20px">
    <el-col :span="14" :push="5" :pull="5">
      <div class="grid-content bg-purple-light body-height">
        <!--<el-button v-show="false" v-loading.fullscreen.lock="fullscreenLoading"-->
        <!--element-loading-text="拼命加载中..."></el-button>-->

        <el-tabs v-model="selectMenu" type="card" @tab-click="handleClick">
          <el-tab-pane label="个人信息" name="privateInfo">
            <!--个人信息-->
            <private-info :selectMenu="selectMenu"></private-info>
          </el-tab-pane>
          <el-tab-pane label="我收藏的文章" name="collectArticles">
            <!--收藏的文章-->
            <collect-articles :selectMenu="selectMenu"></collect-articles>
          </el-tab-pane>
          <el-tab-pane label="我的文章" name="myArticles">
            <!--我的文章-->
            <my-articles :selectMenu="selectMenu"></my-articles>
          </el-tab-pane>
          <el-tab-pane label="我关注的人" name="collectUsers">
            <!--关注-->
            <collect-users :selectMenu="selectMenu"></collect-users>
          </el-tab-pane>
          <el-tab-pane label="消息" name="messages">
            <!--消息-->
            <message-view :selectMenu="selectMenu"></message-view>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
  .body-height {
    height: 700px;
    max-height: 1200px;
  }

  body {
    margin: 0 0;
  }

</style>

<script>
  import PrivateInfo from '../components/privateInfo.vue'
  import CollectArticles from '../components/collectArticles.vue'
  import CollectUsers from '../components/collectUsers.vue'
  import MessageView from '../components/message.vue'
  import MyArticles from '../components/myArticles.vue'
  export default{
    components: {
      PrivateInfo,
      CollectArticles,
      CollectUsers,
      MessageView,
      MyArticles,
    },
    data() {
      return {
        selectMenu: 'privateInfo',
//        fullscreenLoading: false,
      }
    },
    methods: {
      handleClick(tab, event) {
//          this.fullscreenLoading = true
//          switch(tab.name) {
//            case "privateInfo":
//                console.debug("-----first");
//                break;
//            case "collectArticles":
//                console.debug("----second")
//                  break;
//            case "myArticles":
//                break;
//            case "collectUsers":
//                break;
//            case "messages":
//                break;
//            default:
//                this.selectMenu = 'privateInfo'
//                console.debug("=====default");
//                break;
//
//          }
        this.selectMenu = tab.name
//        console.log("====",tab.index);
//        console.log("====name--",tab.name);
//        console.log("====labe--",tab.label);
//        console.log("----------", event);
      },
      getSelectMenu(){
        this.selectMenu = this.$route.params.selectType

      }
    },
    mounted: function () {
      this.getSelectMenu();
    }
  }
</script>
