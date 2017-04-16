<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content content-second bg-purple-light">
          <el-row :gutter="15">
            <el-col :span="12">
              <div class="divid-height">
                <el-row>
                  <el-col>
                    <div class="content-width-head content-font">
                      最新资料<span style="float: right"> 更多>></span>
                      <div>
                        <el-table
                          :data="tableData"
                          :show-header="false"
                          style="height: 220px">
                          <el-table-column
                            prop="title">
                          </el-table-column>
                          <el-table-column
                            prop="date">
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
</template>

<style scoped>

</style>

<script>

  export default{
    data(){
      return {
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
    }
  }
</script>
