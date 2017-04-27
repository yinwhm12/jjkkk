<template>
  <div>

  <el-row>
    <!--<el-col :span="14" :push="5" :pull="5"><div class="grid-content bg-purple-light body-height">-->
    <el-col :span="24">
      <div class="grid-content bg-purple-light body-height">
      <!--主体-->

      <div>
        <el-button @click="close(false)">关闭</el-button>
      </div>


      <el-row>
        <el-col>
            <div class="title-head">
              <!--主体-->
              {{article.title}}
            </div>
        </el-col>
      </el-row>
        <!--发布时间 作者  阅读次数 赞-->
      <el-row>
        <el-col :span="8">
          <div class="second-head"><i class="el-icon-date"></i>
            <!--时间-->
            {{article.created_time | time }}
          </div>
        </el-col>

        <el-col :span="8">
          <div class="second-head">
            <!--作者-->
            <!--<span v-if="article.user">{{ article.user.email }}</span>-->
            <el-button type="info" size="mini"><span v-if="article.user">{{ article.user.email }}</span></el-button>
          </div>
        </el-col>

        <el-col :span="5">
          <div class="second-head"><i class="el-icon-document"></i>阅读:
          <span v-if="article.value_article">{{ article.value_article.read_count}}</span></div>
        </el-col>

        <el-col :span="3">
          <div class="second-head">
            <el-button type="primary" size="mini">
              <i class="el-icon-circle-check">赞:<span
                v-if="article.value_article">{{ article.value_article.up_vout}}</span>
              </i></el-button>
          </div>
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

  .close-button {
    padding: 0;
    margin: 0;
  }
</style>

<script>
  import CommentsView from './comments.vue'
  export default {
    props: ["article_id"],
  components:{
    CommentsView
  },
    data: function () {
          return{
            textarea: '',
            article: {},
          }
    },
    methods: {
      close(needRefresh = false){
//          console.debug()
        this.$emit('close', needRefresh)
      },
      getArticle(){//根据id 获取具体的文章
        console.debug("id----", this.article_id)
        this.$http.get('/article/getOne/' + this.article_id)
          .then((res => {
            this.article = res.data
            console.debug("aaaaaa", this.article)
          }))
      },
      getValue(){//获取文章 价值

      }

    },
    watch: {
      article_id(){
        console.debug("-------dddid", this.article_id)
        this.getArticle()
      }
    },
    mounted: function () {
      this.getArticle();
    }
  }
</script>
