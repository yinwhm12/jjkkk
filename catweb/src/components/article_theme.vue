<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light content-three">
          <el-row>
            <el-col>
              <div class="content-width-head content-font">
                最新文章<span style="float: right">more>></span>
                <template>
                  <el-row>
                    <el-col>
                      <div class="title-css content">主题

                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <div class="content">
                        内容

                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">作者</el-col>
                    <el-col :span="4">时间</el-col>
                    <el-col :span="4">赞</el-col>
                    <el-col :span="4">收藏</el-col>
                    <el-col :span="4">评论</el-col>
                  </el-row>
                </template>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .content-three {
    height: 600px;
  }

  .title-css {
    text-align: center;
    height: 60px;
    font-size: 38px;
  }

  .content {
    color: #8492A6;
    font-family: 仿宋;
  }
</style>

<script>

  export default{
    data(){
      return {}
    }
  }
</script>
