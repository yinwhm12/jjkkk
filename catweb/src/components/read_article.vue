<template>
  <div>
  <el-row>
    <el-col :span="14" :push="5" :pull="5"><div class="grid-content bg-purple-light body-height">
      <!--主体-->
      <el-row>
        <el-col>
            <div class="title-head">
              主体
            </div>
        </el-col>
      </el-row>
        <!--发布时间 作者  阅读次数 赞-->
      <el-row>
        <el-col :span="8">
          <div class="second-head"><i class="el-icon-date"></i>时间</div>
        </el-col>

        <el-col :span="8">
          <div class="second-head"><i class="el-icon-caret-right"></i>作者</div>
        </el-col>

        <el-col :span="5">
          <div class="second-head"><i class="el-icon-document"></i>阅读次数</div>
        </el-col>

        <el-col :span="3">
          <div class="second-head"><i class="el-icon-check"></i>赞</div>
        </el-col>
      </el-row>
      <!--内容-->
      <el-row>
        <el-col>
          <el-input
            type="textarea"
            :rows="2"
            :autosize="true"
            :readonly="true"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-col>
      </el-row>

      <!--评论-->
      <comments-view></comments-view>

    </div></el-col>
  </el-row>
  </div>
</template>

<style scoped>
  .body-height{
    height: 1000px;
    max-height: 3000px;
  }
  .title-head{
    text-align: center;
    line-height: 50px;
    font-weight: 200;
    font-family: 仿宋;
    font-size: 40px;
  }
  .second-head{
    min-height: 20px;
    font-size: 16px;
  }
</style>

<script>
  import CommentsView from './comments.vue'
  export default {
  components:{
    CommentsView
  },
    data (){
          return{
              textarea: ''
          }
      }
  }
</script>
