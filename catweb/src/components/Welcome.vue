<template>
  <div>
    <h1> welcome {{mapUserInfo.email}}</h1>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        mapUserInfo: ({userInfo}) => userInfo,
      })
    }
  }
</script>

