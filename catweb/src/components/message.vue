<template>
  <!-- 消息页面-->
  <div>
    <el-row style="margin-top: -15px">
      <el-col>
        <div class="grid-content bg-purple-light body-css">
          <span v-if="hasMessageFlag ==='hasMessage'">
            <el-row>
              <el-col :push="5">
                <template>
                  <el-radio class="radio" v-model="radio" label="0">未读</el-radio>
                  <el-radio class="radio" v-model="radio" label="1">已读</el-radio>
                  <el-radio class="radio" v-model="radio" label="3">全部</el-radio>
                </template>
              </el-col>
            </el-row>

            <el-row>
              <el-col :push="2">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <template v-for="message in messages">
                    <el-collapse-item :title="message.content" :name="message.message_id">
                      <div>来自:{{message.from_user.email}} &nbsp &nbsp &nbsp @你时间:{{message.created_time | time}}</div>
                      <div>信息简述:{{message.content}}</div>
                      <div style="margin: 5px"></div>
                      <div style="float: right">
                        <el-button type="primary" size="small" @click="checkMessage(message)">查看详情</el-button>
                        <el-button type="primary" size="small" @click="deleteMessage(message)">删除</el-button>
                      </div>
                    </el-collapse-item>
                  </template>
                </el-collapse>

              </el-col>
            </el-row>

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
          </span>
          <span v-else>
            <div style="margin-top: 20px;text-align: center">
            暂无任何消息
            </div>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .body-css {
    height: 540px;
    max-height: 1200px;
    width: 690px !important;
  }
</style>

<script>
  import util from '../utiljs/utils'
  export default {
    data () {
      return {
        radio: '0',
        pageInfo: {
          currentPage: 1,
          limit: ENV.PAGE_SHOW_COUNT,
          offset: 0,
          total: 0,
        },
        messages: {},
        activeNames: ['1'],
        hasMessageFlag: 'noMessage',
      };
    },
    methods: {
      handleChange(){

      },
      getMessage(page = 0){
        if (page === 0) {
          this.pageInfo.offset = 0
        }
        let url = '/message/?page=' + this.radio
          + '&limit=' + this.pageInfo.limit + '&offset=' + this.pageInfo.offset
        this.$http.get(url)
          .then((res => {
            if (res.body.total <= 0) {
              return
            }
            this.messages = res.body.data
            this.pageInfo.total = res.body.total
            this.hasMessageFlag = 'hasMessage'
          }))
      },
      handleCurrentChange(){

      },
      //查看详情按钮
      checkMessage(message){

      },
      //删除信息
      deleteMessage(message){

      }
    },
    watch: {
      radio(){
        console.debug("------rr----", this.radio)
      }
    },
    mounted: function () {
      this.getMessage()
    },
  }
</script>
