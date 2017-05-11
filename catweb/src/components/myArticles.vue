<template>
  <!--我的文章 点击弹出框形式-->
  <div>
    <el-row>
      <el-col>
        <div class="grid-content bg-purple-light body-height">
          <!--标题-->
          <template v-for="item in articles">
            <el-row>
              <el-col :push="3">
                <div class="page-head">
                  <!--主体-->
                  <el-button type="text" size="large" :plain="true" @click="read(item)">{{item.title}}</el-button>
                </div>
              </el-col>
            </el-row>
            <!--内容-->
            <el-row>
              <el-col>
                <el-input
                  type="text"
                  :row="3"
                  size="small"
                  :maxlenght="150"
                  :readonly="true"
                  placeholder="请输入内容"
                  v-model="item.text_content">
                </el-input>
              </el-col>
            </el-row>
            <!--文章详情-->
            <el-row>
              <el-col :span="6">
                <div class="second-head">
                  <!--<i class="el-icon-date"></i>-->
                  <!--时间-->
                  <el-button type="text" size="mini"><i class="el-icon-date">{{item.created_time | time }}</i>
                  </el-button>
                  <!--{{ item.created_time | time}}-->
                </div>
              </el-col>

              <el-col :span="6">
                <div class="second-head">
                  <!--作者-->
                  <el-button type="info" size="mini" @click="readUserInfo(userInfo)"><i class="el-icon-caret-right">
                    {{userInfo.email}}
                  </i></el-button>

                </div>
              </el-col>

              <el-col :span="3">
                <div class="second-head">
                  <!--阅读-->
                  <el-button type="text" size="mini" @click="read(item)" style="color: #475669;"><i
                    class="el-icon-caret-right">阅读:<span
                    v-if="item.value_article">{{ item.value_article.read_count}}</span></i></el-button>

                </div>
              </el-col>

              <el-col :span="3">
                <div class="second-head">
                  <!--赞-->
                  <el-button type="text" size="mini" style="color: #475669;"><i class="el-icon-circle-check">赞:<span
                    v-if="item.value_article">{{ item.value_article.up_vout}}</span></i></el-button>
                </div>
              </el-col>

              <el-col :span="3">
                <div class="second-head">
                  <el-button type="text" size="mini"><i class="el-icon-star-on" style="color: #475669;">收藏:<span
                    v-if="item.value_article">{{ item.value_article.collected_count}}</span></i></el-button>
                </div>
              </el-col>

              <el-col :span="3">
                <div class="second-head">
                  <el-button type="text" icon="edit" size="mini" style="color: #475669;">评论:</el-button>
                </div>
              </el-col>

            </el-row>
          </template>
          <!--页数-->
          <div class="block" style="text-align: center">
            <!--<span class="demonstration">显示总数</span>-->
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageInfo.currentPage"
              :page-size="pageInfo.limit"
              layout="total, prev, pager, next"
              :total="pageInfo.total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="阅读"
      size="small"
      v-model="isShowReadDialog">
      <read-article :article_id="article_id" @close="onEditClose"></read-article>
    </el-dialog>

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
  .body-height {
    height: 700px;
    max-height: 1200px;
  }

  .page-head {
    line-height: 33px;
    font-size: 30px;
  }

  element.style {
    height: 100px;
  }

  .content-height {
    height: 100px !important;
  }

  .el-row {
    margin-bottom: 0;
  }

  .el-col.el-col-24 {
    margin-top: 0;
  }

  .second-head {
    min-height: 18px;
    font-size: 13px;
  }
</style>

<script>
  import util from '../utiljs/utils'
  import ReadArticle from './read_article.vue'
  import UserDialog from './userInfo_dialog.vue'
  export default{
    props: ['selectMenu'],
    components: {
      ReadArticle,
      UserDialog
    },
    data(){
      return {
        pageInfo: {
          currentPage: 1,
          limit: ENV.PAGE_SHOW_COUNT,
          offset: 0,
          total: 0,
        },
        articles: {},
        isShowReadDialog: false,
        article_id: 0,
        isShowUserDialog: false,
        user_id: 0,
        userInfo: {}
      }
    },
    watch: {
      selectMenu(){
        this.load();
      }
    },
    methods: {

      onEditClose(needRefresh){
        this.isShowReadDialog = false;
        this.getCollectArticles();
      },
      closeUserInfoDialog(freshState){//关闭 个人信息对话框
        this.isShowUserDialog = false
      },
      handleCurrentChange(currentPage){
        let offset = util.buildOffsetByPage(currentPage, this.pageInfo.limit)
        this.pageInfo.offset = offset
        this.getCollectArticles(currentPage)
      },
      getCollectArticles(page = 0){
        if (page === 0) {
          this.pageInfo.offset = 0
        }
        let url = '/user/getMyArticles/?limit=' + this.pageInfo.limit
          + '&offset=' + this.pageInfo.offset
        this.$http.get(url)
          .then((res => {
            this.articles = res.body.data
            this.pageInfo.total = res.body.total
          }))
      },
      read(item){
        this.article_id = item.tid;
        this.isShowReadDialog = true
      },
      readUserInfo(item){

        this.user_id = item.id
        this.isShowUserDialog = true
      },
      //获取作者信息
      getMyInfo(){
        this.$http.get('/user/getSelf/')
          .then((res => {
            this.userInfo = res.data
          }))
      },
      load(){
        if (this.selectMenu === 'myArticles') {
          this.getCollectArticles(0);
          this.getMyInfo();
        }
      }
    },
    mounted: function () {
//      this.getCollectArticles();
//      this.getMyInfo();
      this.load();
    }
  }
</script>
