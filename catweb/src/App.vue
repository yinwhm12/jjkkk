<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <head-view></head-view>
    <!--<board-view></board-view>-->
    <!--<user-view></user-view>-->
    <router-view></router-view>
    <footer-view></footer-view>

  </div>
</template>

<script>
  import HeadView from './components/publish/head.vue'
  //  import BoardView from './components/publish/board.vue'
  import FooterView from './components/publish/footer.vue'
  //  import UserView from './components/user/user_info.vue'
export default {
  name: 'app',
  components: {
    HeadView,
//    BoardView,
    FooterView,
//    UserView,
  }
}
</script>

<style>
  .el-loading-mask {
    position: static !important;
  }
</style>
