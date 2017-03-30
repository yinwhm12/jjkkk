<template>
  <div>
    <!--<img src="./assets/logo.png">-->
    <head-view></head-view>
    <board-view></board-view>
    <router-view></router-view>

  </div>
</template>

<script>
  import HeadView from './components/publish/head.vue'
  import BoardView from './components/publish/board.vue'
export default {
  name: 'app',
  components: {
    HeadView,
    BoardView,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
