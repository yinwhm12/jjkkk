<template>
  <!--关注人信息页面  点击是弹出框 显示关注人信息-->
  <div>
    <el-row>
      <el-col :push="1">
        <div class="grid-content bg-purple-light body-css">
          <el-collapse v-model="activeNames" @change="handleChange">
            <template v-for="user in users">
              <el-collapse-item :title="user.email" name="1">
                <div>昵称:{{user.name}}&nbsp &nbsp &nbsp 邮箱:{{user.email}}</div>
                <div>城市:{{user.city}} &nbsp &nbsp &nbsp 学校:{{user.school}}</div>
                <div>座右铭:&nbsp
                  <el-input type="textarea" :rows="1" auto-complete="on" :readonly="true" placeholder="座右铭"
                            v-model="user.motto" style="width: 598px;"></el-input>
                </div>
                <div>
                  <el-input type="textarea" :rows="2" placeholder="自我描述" auto-complete="on" :readonly="true"
                            v-model="textarea"></el-input>
                </div>
                <div style="margin: 5px"></div>
                <div style="float: right">
                  <el-button type="primary" size="small" @click="attention(user.id)"> 取消关注</el-button>
                </div>
              </el-collapse-item>
            </template>
          </el-collapse>

          <!--Page-->
          <div class="block" style="text-align: center">
            <!--<span class="demonstration">显示总数</span>-->
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageInfo.currentPage"
              :page-size="pageInfo.limit"
              layout="total, prev, pager, next"
              :total="pageInfo.total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .body-css {
    width: 690px !important;
  }
</style>

<script>
  import util from '../utiljs/utils'
  export default {

    props: ['selectMenu'],
    data() {
      return {
        activeNames: ['1'],
        textarea: '',
        pageInfo: {
          currentPage: 1,
          limit: ENV.PAGE_SHOW_COUNT,
          offset: 0,
          total: 0,
        },
        users: {}
      };
    },
    methods: {
      getAllUsers(page = 0){
        if (page === 0) {
          this.pageInfo.offset = 0
        }
        let url = '/user/getAllUser/?limit=' + this.pageInfo.limit
          + '&offset=' + this.pageInfo.offset
        this.$http.get(url)
          .then((res => {
            this.users = res.body.data
            this.pageInfo.total = res.body.total
          }))
      },
      handleCurrentChange(currentPage){
        let offset = util.buildOffsetByPage(currentPage, this.pageInfo.limit)
        this.pageInfo.offset = offset
      },
      handleChange(){

      },
      //取消关注
      attention(id){
        let url = '/user/sayUser/' + id + '?flag=yes'
        this.$http.put(url)
          .then((res => {
            this.$message(res.data)
          }))
          .catch((err => {
            let message = err.data
            this.$message({
              type: 'warning',
              message: message
            })
          }))
      },
      load(){
        if (this.selectMenu === 'collectUsers') {
          this.getAllUsers(0)
        }
      }
    },
    watch: {
      selectMenu(){
        this.load();
      }
    },
    mounted: function () {
//      this.getAllUsers(0)
      this.load();
    }
  }
</script>
