<template>
  <!--评论-->
  <div>
    <template>
    <el-row :gutter="10">
      <!--作者 评价时间-->
      <el-col :span="5">
        <el-row>
          <el-col><div class="sayer">
            <i class="el-icon-caret-right"></i>作者
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col><div class="sayer">
            <i class="el-icon-date"></i>时间
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
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        </div>
      </el-col>
    </el-row>
    </template>
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
</style>

<script>
  export default{
      data (){
          return{
            textarea: ''
          }
      }
  }
</script>
