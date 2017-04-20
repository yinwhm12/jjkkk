<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light content-three">
          <el-row>
            <el-col>
              <div class="content-width-head content-font">
                最新文章<span style="float: right">more>></span>
                <template v-for="item in articles">
                  <el-row>
                    <el-col>
                      <div class="title-css content">
                        <!--主题-->
                        {{item.title}}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <div class="content">
                        <!--内容-->
                        {{ item.text_content }}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <!--作者-->
                      {{ item.user.email }}

                    </el-col>
                    <el-col :span="4">
                      <!--时间-->
                      {{ item.created_time}}

                    </el-col>
                    <el-col :span="4">
                      赞

                    </el-col>
                    <el-col :span="4">
                      收藏

                    </el-col>
                    <el-col :span="4">
                      评论

                    </el-col>
                  </el-row>
                  <!--分隔界限-->
                  <el-row>
                    <el-col>
                      <div class="grid-content divide bg-purple-light"></div>
                    </el-col>
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
    height: 1000px;
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

  .divide {
    height: 20px !important;
    min-height: 20px !important;
  }
</style>

<script>

  export default{
    data: function () {
      return {
        articles: []
      }
    },
    mounted: function () {
      this.getThemeArticle();
    },
    methods: {
      getThemeArticle(){
        let url = '/article/getThemes/1?flag=index'
        this.$http.get(url).then((res => {
          this.articles = res.data
          console.log("kkkkkkkkkk", this.articles)
          console.log("kkkkkkkkkk", this.articles[0].user)
        }))

      }
    }
  }
</script>
