<template>
  <div>
    <el-row>
      <el-col :lg="7" :sm="3" :md="5" :xs="1">
        <div class="grid-content-left bg-purple-dark">catW</div>
      </el-col>
      <el-col :lg="10" :xs="20" :sm="18" :md="14">
        <el-menu theme="dark" :default-active="activeIndex" class="grid-content el-menu" mode="horizontal"
                 @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :lg="3" :sm="2" :md="2" :xs="1">
        <div class="grid-content bg-purple-dark grid-search">
          <el-input
            placeholder="搜索"
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick">
          </el-input>
        </div>
      </el-col>
      <!--登录弹出框-->
      <el-col :lg="4" :sm="1" :md="3" :xs="1">
        <div class="grid-content-right bg-purple-dark">
          <el-button type="text" @click="dialogFormVisible = true">Dialog</el-button>
          <el-dialog title="收货地址" v-model="dialogFormVisible" size="tiny" customClass="dialog">
            <el-form :model="form">
              <el-row type="flex" justify="center">
                <el-col>
                  <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="your name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row type="flex" justify="center">
              <el-col>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </el-col>
            </el-row>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        input2: '',
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleconClick(ev){
        console.log(ev);
      },
      handleIconClick(){

      },
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #324157;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 0px;
    min-height: 60px;
    font-size: 38px;
  }

  .el-menu {
    border-radius: 0px !important;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .grid-content-left {
    min-height: 60px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-family: 仿宋;
    color: red;
    text-align: right;
    font-size: 52px;
  }

  .grid-content-right {
    min-height: 60px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .grid-font {
    font-size: 5px;
    font-family: 仿宋;
  }

  .grid-search {
    /*text-align: left;*/
  }

  .dialog {
    text-align: center;
  }

</style>
