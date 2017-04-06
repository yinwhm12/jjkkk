<template>
  <div>
    <h1> welcome {{mapUserInfo.email}}</h1>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        mapUserInfo: ({userInfo}) => userInfo,
      })
    }
  }
</script>

