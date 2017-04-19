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
                                    :data="ones"
                                    :show-header="false"
                                    style="height: 220px">
                                    <el-table-column
                                      prop="ones.title"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      style="float: right"
                                      prop="ones.created_time"
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
                                    :data="tableData"
                                    :show-header="false"
                                    style="height: 220px">
                                    <el-table-column
                                      prop="title"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                      style="float: right"
                                      prop="date"
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
            <article-theme></article-theme>

          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PartTwo from '../part_two.vue'
  import ArticleTheme from '../article_theme.vue'

  export default{
    components: {
      ArticleTheme,
      PartTwo,
    },
    data(){
      return {
        ones: [],
        tableData: [{
          title: '2016-05-02',
          date: '2016-05-02'
        }, {
          title: '2016-05-02',
          date: '2016-05-02'
        }, {
          title: '2016-05-02',
          date: '2016-05-02'
        }, {
          title: '2016-05-02',
          date: '2016-05-02'
        }, {
          title: '2016-05-02',
          date: '2016-05-02'
        }, {
          title: '2016-05-02',
          date: '2016-05-02'
        }, {
          title: '2016-05-02',
          date: '2016-05-02'
        }, {
          title: '2016-05-02',
          date: '2016-05-02'
        }, {
          title: '2016-05-02',
          date: '2016-05-02'
        },
        ]
      }
    },
    mounted: function () {
      let url = '/article/getNine/3'
      this.$http.get(url)
        .then((res) => {
          this.ones = res.data
          console.debug("--------", this.ones)
        })
    }

  }
</script>

<style>
  .body-height {
    max-height: 2000px;
    min-height: 500px;
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




