<template>
  <!--全部文章 分页-->
  <div>
    <el-row>
      <el-col :span="14" :push="5" :pull="5">
        <div class="grid-content bg-purple-light body-height">
          <!--标题-->
          <template v-for="item in articles">
            <el-row>
              <el-col :push="3">
                <div class="page-head">
                  <!--主体-->
                  {{ item.title }}
                </div>
              </el-col>
            </el-row>
            <!--内容-->
            <el-row>
              <el-col>
                <el-input
                  type="text"
                  :row="3"
                  size="small"
                  :maxlenght="150"
                  :readonly="true"
                  placeholder="请输入内容"
                  v-model="item.text_content">
                </el-input>
              </el-col>
            </el-row>
            <!--文章详情-->
            <el-row>
              <el-col :span="8">
                <div class="second-head">
                  <i class="el-icon-date"></i>
                  <!--时间-->
                  {{ item.created_time | time}}
                </div>
              </el-col>

              <el-col :span="8">
                <div class="second-head"><i class="el-icon-caret-right"></i>
                  <!--作者-->
                  <span v-if="item.user">{{ item.user.email }}</span>
                </div>
              </el-col>

              <el-col :span="5">
                <div class="second-head"><i class="el-icon-document"></i>
                  阅读次数
                </div>
              </el-col>

              <el-col :span="3">
                <div class="second-head"><i class="el-icon-check"></i>
                  赞
                </div>
              </el-col>
            </el-row>
          </template>
          <!--页数-->
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
  .body-height {
    height: 600px;
    max-height: 1200px;
  }

  .page-head {
    line-height: 33px;
    font-size: 30px;
  }

  element.style {
    height: 100px;
  }

  .content-height {
    height: 100px !important;
  }

  .el-row {
    margin-bottom: 0;
  }

  .el-col.el-col-24 {
    margin-top: 0;
  }

  .second-head {
    min-height: 18px;
    font-size: 13px;
  }
</style>

<script>
  import {mapState, mapGetters} from 'vuex'
  import util from '../utiljs/utils'

  export default{
    data: function () {
      return {
        textarea: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        pageInfo: {
          currentPage: 1,
          limit: ENV.PAGE_SHOW_COUNT,
          offset: 0,
          total: 0,
        },
        articles: {}
      }
    },
    mounted: function () {

    },
    computed: {
      ...mapState({
        typesInfo: ({userInfo}) => userInfo,
      }),
      ...mapGetters({
          url_value: 'getUrlValue'
        }
      )
    },
    watch: {
      '$route'(to, from){//同级之间 会进入(有监控) 路由变化
        console.debug("fffff", from)
        console.debug("fffttttt", to)
        console.debug("---------------", this.$route.params.root1)
        this.$store.commit("setUrl", to.path)
        this.getAllInfo(0)
      },

    },
    methods: {

      handleCurrentChange(currentPage) {
        let offset = util.buildOffsetByPage(currentPage, this.pageInfo.limit)
        this.pageInfo.offset = offset
        this.getAllInfo(currentPage)
      },
      getAllInfo(page = 0){
        if (page === 0) {
          this.pageInfo.offset = 0
        }
        let url = '/article/getAll/?' + this.url_value + '&limit='
          + this.pageInfo.limit + '&offset=' + this.pageInfo.offset
        this.$http.get(url)
          .then((res => {
            this.articles = res.body.data
            this.pageInfo.total = res.body.total
          }))
      },
      load(){//不同级之间 会重新加载(路由)

        console.debug("------------------------")

        this.$store.commit("setUrl", this.$route.path)

        console.debug("--out------", this.url_value)

//        this.$route.path.trim()
        this.getAllInfo(0)
      },
    },
    mounted: function () {//不同级之间 会重新加载(路由)
      this.load();
    }
  }
</script>
