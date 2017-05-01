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
        <el-col :span="6">
          <div class="second-head">
            <!--时间-->
            <!--{{article.created_time | time }}-->
            <el-button type="text" size="mini"><i class="el-icon-date">{{article.created_time | time }}</i></el-button>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="second-head">
            <!--作者-->
            <!--<span v-if="article.user">{{ article.user.email }}</span>-->
            <el-button type="info" size="mini"><span v-if="article.user">{{ article.user.email }}</span></el-button>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="second-head">
            <el-button type="text" size="mini">
              <i class="el-icon-caret-right">
                阅读:<span v-if="article.value_article">{{ article.value_article.read_count}}</span>
              </i></el-button>

          </div>
        </el-col>

        <el-col :span="4">
          <div class="second-head">
            <el-button type="primary" size="mini" @click="parseButton(articleState.up_state)">
              <i class="el-icon-circle-check">
                <span v-if="articleState.up_state">已赞:</span>
                <span v-else>
                  赞:
                </span>
                <span v-if="article.value_article">{{ article.value_article.up_vout}}</span>
              </i></el-button>
          </div>
        </el-col>
        <!--收藏-->
        <el-col :span="4">
          <div class="second-head">
            <el-button type="primary" size="mini" @click="collectButton(articleState.collect_state)">
              <i class="el-icon-star-on">
                <span v-if="articleState.collect_state">已收藏:</span>
                <span v-else>收藏:</span>
                <span v-if="article.value_article">{{ article.value_article.collected_count}}</span>
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
            v-model="article.text_content">
          </el-input>
        </el-col>
      </el-row>

      <!--评论-->
        <comments-view :article_id="article_id"></comments-view>

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
  import {mapState} from 'vuex'
  export default {
    props: ["article_id", "needRefreshThemePart"],
  components:{
    CommentsView
  },
    computed: {
      ...mapState({
        userInfo: ({userInfo}) => userInfo,
      })
    },
    data: function () {
          return{
            textarea: '',
            article: {},
            articleState: {
              up_state: 0,//点赞状态
              collect_state: 0,//收藏状态
            },
            noLoginState: 'yes',
          }
    },
    methods: {
      close(needRefresh = false){
//          console.debug()

        this.$emit('close', needRefresh)
      },
      getArticle(){//根据id 获取具体的文章
//        console.debug("id----", this.article_id)
        this.$http.get('/article/getOne/' + this.article_id)
          .then((res => {
            this.article = res.data
//            console.debug("aaaaaa", this.article)
          }))
      },
      getValue(){//获取文章 价值

      },
      parseButton(tag){//点赞事件
        this.getLoginState();
        if (this.noLoginState === 'yes') {
          return
        }
        var flag = 'err'
        if (tag === 1) {
          flag = 'no'
        } else if (tag === 0) {
          flag = 'yes'
        } else {
        }
        let url = '/user/sayUp/' + this.article_id + '?flag=' + flag
        this.$http.put(url)
          .then((res => {
            let message = res.data;
            this.$message({
              type: 'success',
              message: message
            }),
              this.getArticle();
            this.getArticleState();
          }))
          .catch((err => {
            this.$message({
              type: 'warning',
              message: '点赞失败!'
            })
          }))
      },
      //收藏事件
      collectButton(tag){
        this.getLoginState();
        if (this.noLoginState === 'yes') {
          return
        }
        let flag = 'err';//标记是否 已收藏 或者取消收藏 或者 不知错误
        if (tag === 1) {
          flag = 'no'
        } else if (tag === 0) {
          flag = 'yes'
        } else {
        }
        let url = '/user/sayCollect/' + this.article_id + '?flag=' + flag
        this.$http.put(url)
          .then((res => {
            let message = res.data
            this.$message({
              type: 'success',
              message: message
            }),
              this.getArticle();
            this.getArticleState();
          }))
          .catch((err => {
            this.$message({
              type: 'warning',
              message: '收藏失败!'
            })
          }))
      },
      //获取用户是否已经点过赞或者已经收藏过 状态
      getArticleState(){
        if (this.userInfo.id !== '' && this.userInfo.accessToken !== '') {
          let url = '/user/getUpState/' + this.article_id
          this.$http.get(url)
            .then((res => {
              this.articleState = res.data
            }))
        }
      },
      getLoginState(){
        if (this.userInfo.id !== '' && this.userInfo.accessToken !== '') {
          //已登录 修改状态
          this.noLoginState = 'no'
          return
        } else {
          this.$message({
            type: 'warning',
            message: '请登录!'
          })
          return
        }
      }

    },
    watch: {
      article_id(){
        this.getArticle();
        this.getArticleState();
      }
    },
    mounted: function () {
      this.getArticle();
      this.getArticleState();
    }
  }
</script>
