<template>
  <div>

    <el-row>
      <!--<el-col :span="14" :push="5" :pull="5"><div class="grid-content bg-purple-light body-height">-->
      <el-col :span="24">
        <div class="grid-content bg-purple-light body-height">
          <!--主体-->

          <div>
            <el-button @click="closeTheme(false)">关闭</el-button>
          </div>


          <el-row>
            <el-col>
              <div class="title-head">
                <!--主体-->
                <!--{{article.title}}-->
                <el-button type="text" size="large" :plain="true" @click="read(article)">{{article.title}}</el-button>
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
                <!--<i class="el-icon-caret-right"></i>-->
                <!--作者-->
                <!--<span v-if="article.user">{{ article.user.email }}</span>-->
                <el-button type="info" size="mini" @click="readUserInfo(article)"><i class="el-icon-caret-right"><span
                  v-if="article.user">{{ article.user.email }}</span></i></el-button>

              </div>
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

    <el-dialog
      size="small"
      v-model="isShowReadDialog"
    >
      <read-article :article_id="article_id" @close="onEditClose"></read-article>
    </el-dialog>

    <!--用户信息弹出框-->
    <el-dialog size="tiny" v-model="isShowUserDialog">
      <user-dialog :user_id="user_id" @closeUserDialog="closeUserInfoDialog"></user-dialog>
      <span slot="footer" class="dialog-footer">
            <el-button @click="isShowUserDialog = false" size="small">取 消</el-button>
        <!--<el-button type="primary" @click="isShowUserDialog = false">确 定</el-button>-->
          </span>
    </el-dialog>

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
  import ReadArticle from './read_article.vue'
  import UserDialog  from './userInfo_dialog.vue'

  export default {
    props: ["article_id"],
    components:{
      CommentsView,
      ReadArticle,
      UserDialog
    },
    data: function () {
      return{
        textarea: '',
        article: {},
        article_id: 0,
        isShowReadDialog: false,
        user_id: 0,
        isShowUserDialog: false,
      }
    },
    methods: {
      closeTheme(needRefresh = false){
        this.$emit('closeTheme', needRefresh)
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

      },
      readUserInfo(article){
//        console.debug("---------", article)
      },
      read(article){
        this.article_id = item.tid;
        this.isShowReadDialog = true;
      },
      closeUserInfoDialog(freshState){
        this.isShowUserDialog = false;
      },
      readUserInfo(item){
        if (item.user !== null) {
          this.user_id = item.user.id
          this.isShowUserDialog = true
        }
      },

    },
    watch: {
//      article_id(){
//          console.debug("-------id",this.article_id)
//      }
    },
    mounted: function () {
      this.getArticle();
    }
  }
</script>
