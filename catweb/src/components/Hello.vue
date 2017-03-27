<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div>
      <input type="text" v-model="user.name" placeholder="your name"><br>
      <input type="password" v-model="user.pwd" placeholder="your password">
      <br><button @click="post">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: {
          name: '',
          pwd: ''
      }
    }
  },
  methods: {
      post () {
          let data = this.user
          this.$http.post('/user/',data)
            .then((res) => {
              this.$message({
                  message: '注册成功',
                  type: 'success'
              }),
                this.$router.push({path: '/home/welcome'})
            })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
