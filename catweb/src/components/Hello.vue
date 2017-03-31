<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <div class="line"></div>

    <el-row>
      <el-col :span="24">
        <div class="medium-content"></div>
      </el-col>
    </el-row>

  </div>

</template>


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
    border-radius: 4px;
    min-height: 120px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .medium-content {
    min-height: 200px;
    background: #F9FAFC;
  }
</style>
