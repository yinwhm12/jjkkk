<template>
  <el-row style="margin-top: -20px">
    <el-col :span="14" :push="5" :pull="5">
      <div class="grid-content bg-purple-light body-height">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="个人信息" name="first">
            <!--个人信息-->
            <private-info></private-info>
          </el-tab-pane>
          <el-tab-pane label="我收藏的文章" name="second">
            <!--收藏的文章-->
            <collect-articles></collect-articles>
          </el-tab-pane>
          <el-tab-pane label="我赞过的文章" name="third">点赞过的文章</el-tab-pane>
          <el-tab-pane label="我关注的人" name="fourth">
            <!--关注-->
            <collect-users></collect-users>
          </el-tab-pane>
          <el-tab-pane label="消息" name="fifth">
            <!--消息-->
            <message-view></message-view>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
  .body-height {
    height: 600px;
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
  export default{
    components: {
      PrivateInfo,
      CollectArticles,
      CollectUsers,
      MessageView,
    },
    data() {
      return {
        activeName2: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
