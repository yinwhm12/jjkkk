<template>
  <div>
    <el-row>
      <el-col :lg="24">
        <div class="grid-content bg-purple head-change"></div>
      </el-col>
    </el-row>
    <div class="hh">
      <el-row>
        <el-col :lg="14" :push="5" :pull="5">
          <div class="grid-content bg-purple body-height">
            <!--内容-->

            <div id="t1">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-light content-first">
                    <!--内容 1 -->
                    <el-row :gutter="15">
                      <el-col :span="12">
                        <div class="divid-height">
                          <el-row>
                            <el-col>
                              <div class="content-width-head content-font">
                                最新资料<span style="float: right"> 更多>></span>
                                <div>
                                  <el-table
                                    v-loading="loading1"
                                    element-loading-text="拼命加载..."
                                    :data="ones"
                                    :show-header="false"
                                    @row-click='open'
                                    style="height: 220px">
                                    <el-table-column
                                      prop="title"
                                    >
                                      <!--<template scope="scope">-->
                                      <!--<p>{{scope.row.title}}</p></template>-->
                                    </el-table-column>
                                    <el-table-column
                                      style="float: right"
                                      prop="created_time"
                                    >
                                    </el-table-column>

                                  </el-table>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="divid-height">
                          <el-row>
                            <el-col>
                              <div class="content-width-head content-font">
                                热门帖子<span style="float: right"> 更多>></span>
                                <div>
                                  <el-table
                                    v-loading="loading2"
                                    element-loading-text="拼命加载..."
                                    :data="twos"
                                    :show-header="false"
                                    @row-click='open'
                                    style="height: 220px">
                                    <el-table-column
                                      prop="title"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      style="float: right"
                                      prop="created_time"
                                    >
                                    </el-table-column>

                                  </el-table>
                                </div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>

            <!--内容 2 -->
            <part-two></part-two>

            <!--内容3-->
            <article-theme @themeDialog="OnEditThemeDialog"></article-theme>

          </div>
        </el-col>
      </el-row>

    </div>
    <el-dialog
      title="阅读"
      size="small"
      v-model="isShowReadDialog">
      <read-article :article_id="article_id" @close="onEditClose"></read-article>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import PartTwo from '../part_two.vue'
  import ArticleTheme from '../article_theme.vue'
  import Util from '../../utiljs/utils'
  import ReadArticle from '../read_article.vue'

  export default{
    components: {
      ArticleTheme,
      PartTwo,
      ReadArticle
    },
    data: function () {
      return {

        article_id: 0,
        isShowReadDialog: false,
        ones: [],
        twos: [],
        tableData: [{
          title: '2016-05-02',
          date: '2016-05-02'
        }
        ],
        needRefreshThemePart: false, //标记article_theme 被点击 关闭时，阅读数量增1 需更新数据
        loading1: true,//左上角1 加载
        loading2: true,//右上角 2 加载
      }
    },
    mounted: function () {
      this.getOne();
      this.getTwo();
    },
    watch: {},
    methods: {
      getOne(){
        let url = '/article/getNine/3'
        this.$http.get(url)
          .then((res) => {
            let ss = res.data
//              this.ones = res.data
            if (ss.length !== 0) {
              var newDate = new Date()
              for (let i in ss) {
                var option = {}
                option.tid = ss[i].tid
                option.title = ss[i].title
                newDate.setTime(ss[i].created_time * 1000)
                option.created_time = newDate.toLocaleString()
                this.ones.push(option)
              }
              this.loading1 = false
            }
          })
      },
      getTwo(){
        let url = '/article/getNine/2'
        this.$http.get(url)
          .then((res) => {
            let ss = res.data
            if (ss.length !== 0) {
              var newDate = new Date()
              for (let i in ss) {
                var option = {}
                option.tid = ss[i].tid
                option.title = ss[i].title
                newDate.setTime(ss[i].created_time * 1000)
                option.created_time = newDate.toLocaleString()
                this.twos.push(option)
              }
              this.loading2 = false
            }
          })
      },
      open(row){
//        console.log("-------hello")
//        console.log("-------hellorow", row)
        this.isShowReadDialog = true;
        this.article_id = row.tid
//        this.$http.get()
//        console.debug("from===",this.article_id)
      },
      onEditClose(needRefresh){//来自read_article界面
        this.isShowReadDialog = false;
        if (this.needRefreshThemePart) {
          this.$store.commit("setRefreshByRead", true)//重置 article-theme
        }

      },
      OnEditThemeDialog(item, flagRefresh){//来自theme界面 flagRefresh为 article-theme 重置信号
//        console.debug("-----------on",flagRefresh)
        this.needRefreshThemePart = flagRefresh;
        this.open(item);

      }
    }

  }
</script>

<style>
  .body-height {
    max-height: 2000px;
    height: 1200px;
  }

  .hh {
    margin-top: -20px;
  }

  .content-first {
    max-height: 500px;
    min-width: 180px;
    height: 240px;
  }

  .content-second {
    /*background: #20A0FF;*/
    max-height: 600px;
    min-height: 200px;
    height: 240px;
  }

  .head-change {
    min-height: 40px;
  }

  .content-width-head {
    font-size: 18px;
    font-weight: bold;
  }

  .content-font {
    font-family: 仿宋;
  }

  .divid-height {
    height: 240px;
  }

  .el-table td, .el-table th {
    height: 25px !important;
  }

  .el-table .cell, .el-table th > div {
    padding: 0 !important;
  }

  .el-table_1_column_1 {
    color: #20A0FF;
  }

  .el-table_1_column_3 {
    color: #20A0FF;
  }

  .el-table_1_column_5 {
    color: #20A0FF;
  }

  .el-table_1_column_7 {
    color: #20A0FF;
  }

  .el-table_1_column_2 {
    text-align: right;
  }

  .el-table_1_column_4 {
    text-align: right;
  }

  .el-table_1_column_6 {
    text-align: right;
  }

  .el-table_1_column_8 {
    text-align: right;
  }
</style>




