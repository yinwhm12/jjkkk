<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="content-width-head content-font">
          <el-table
            :data="tableData"
            style="height: 220px;width: 500px"
          >
            <el-table-column
              prop="title"
              label="日期"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
            >
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="address"-->
            <!--label="地址">-->
            <!--</el-table-column>-->
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
  //  import {mapState} from 'vuex'
  export default {
//    computed: {
//      ...mapState({
//        mapUserInfo: ({userInfo}) => userInfo,
//      })
//    }
    data() {
      return {
        tableData: [{
          title: '2016-05-02',
          name: '王小虎',
        }, {
          title: '2016-05-04',
          name: '王小虎',
        }, {
          title: '2016-05-01',
          name: '王小虎',
        },
//          {
//          date: '2016-05-03',
//          name: '王小虎',
//          address: '上海市普陀区金沙江路 1516 弄'
//        }
        ]
      }
    }
  }
</script>

