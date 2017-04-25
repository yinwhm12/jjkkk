<template>
  <!--全部文章 分页-->
  <div>
    <el-row>
      <el-col :span="14" :push="5" :pull="5">
        <div class="grid-content bg-purple-light body-height">
          <!--标题-->
          <template>
            <el-row>
              <el-col :push="3">
                <div class="page-head">
                  主体

                </div>
              </el-col>
            </el-row>
            <!--内容-->
            <el-row>
              <el-col>
                <el-input
                  type="textarea"
                  :row="5"
                  autosize
                  :readonly="true"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </el-col>
            </el-row>
            <!--文章详情-->
            <el-row>
              <el-col :span="8">
                <div class="second-head">
                  <i class="el-icon-date"></i>
                  时间

                </div>
              </el-col>

              <el-col :span="8">
                <div class="second-head"><i class="el-icon-caret-right"></i>
                  作者
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
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<style scoped>
  .body-height {
    height: 1000px;
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
  import {mapState} from 'vuex'

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
        url: '/article/getAll/'
      }
    },
    mounted: function () {

    },
    computed: {
      ...mapState({
        typesInfo: ({userInfo}) => userInfo,
      })
    },
    watch: {
      '$route'(to, from){
        console.debug("fffff", from)
        console.debug("fffttttt", to)
        console.debug("---------------", this.$route.params.root1)
      },
      'this.$route.path'(){
        console.debug("rrrrrrrrrr")
      },
      typesInfo(){
        console.debug("tttttt", this.typesInfo.types)
      },
      'typesInfo.types'(){
        console.debug("000000000")
      },
      'this.typesInfo.types'(){
        console.debug("ppppppp")
      }

    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      getAllInfo(page = 0){
        if (page === 0) {
          this.pageInfo.offset = 0
        }
        let url = '/article/getAll/?root1='
      },
      load(){
        console.debug("=========", this.$route.params.root1)
        console.debug("=========", this.$route.params.root2)
        console.debug("=========", this.$route.path)
        console.debug("=========tt", this.typesInfo.types)

//        this.$route.path.trim()
        let ss = this.$route.path.split("/")
        console.debug("=======ssss", ss)
        let len = ss.length
        if (len === 3) {//文章三大类
          if (ss[1] === 'home') {
            if (ss[2] === 1) {
            }
          }
        } else if (len === 4) {//语文 数学 英语

        } else {
          this.$route.push({path: '/not_found'})
        }
        if (this.$route.params.root1) {
          console.debug("nonoonoo")
          this.url += this.$route.params.root1
          console.debug("nonoonood", this.url)
        }
      }
    },
    mounted: function () {
      this.load();
    }
  }
</script>
