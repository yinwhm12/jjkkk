<template>
  <!--评论-->
  <div>
    <template>
    <el-row :gutter="10">
      <!--作者 评价时间-->
      <el-col :span="5">
        <el-row>
          <el-col><div class="sayer">
            <!--<i class="el-icon-caret-right"></i>作者-->
            <el-button type="info" size="mini">作者</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col><div class="sayer">
            <el-button type="text" size="mini"><i class="el-icon-date">时间</i></el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!--评论内容-->
      <el-col :span="19">
        <div class="say-content-height">
        <el-input
          type="textarea"
          :rows="10"
          :autosize="true"
          :readonly="true"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        </div>
      </el-col>
    </el-row>
    </template>
    <!--写入地区-->
    <div style="margin: 20px 0;"></div>
    <el-row>
      <el-col>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入评论内容"
          v-model="textarea3">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="ok-button">
          <el-button type="info">发表评论</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.sayer{
  line-height: 22px!important;
  font-size: 18px!important;
  width: 100px!important;

}
  .say-content-height{
    height: 100px;
  }

.ok-button {
  margin-top: -26px;
  text-align: left;
}
</style>

<script>
  export default{
      data (){
          return{
            textarea: '',
            textarea3: ''
          }
      }
  }
</script>
