<template>
  <!--搜索页面-->
  <div>
    <el-row style="margin-top: -20px">
      <el-col :span="14" :push="5" :pull="5">
        <div class="grid-content bg-purple-light body-css">

          <el-row style="margin-bottom: -20px">
            <el-col :push="6">
              <!--搜索栏-->
              <el-input
                placeholder="搜索"
                icon="search"
                v-model="searchContent"
                @keyup.enter.native="enterEvent"
                :on-icon-click="handleIconClick">
              </el-input>
            </el-col>
          </el-row>
          <!--单选项-->
          <el-row style="margin-top: -20px">
            <el-col :push="7">
              <template>
                <el-radio class="radio" v-model="radio" label="1">全文</el-radio>
                <el-radio class="radio" v-model="radio" label="2">标题</el-radio>
                <el-radio class="radio" v-model="radio" label="3">作者</el-radio>
              </template>
            </el-col>
          </el-row>
          <!--articles list-->
          <el-button v-show="false" v-loading.fullscreen.lock="fullscreenLoading"
                     element-loading-text="拼命加载中..."></el-button>
          <span v-if="pageInfo.total > 0">
            <el-row style="margin-top: -10px">
              <el-col>
                <template v-for="item in articles">
                  <el-row style="margin-top: -20px">
                    <el-col :push="3">
                      <div class="page-head">
                        <!--主体-->
                        <!--{{ item.title }}-->
                        <el-button type="text" size="large" :plain="true" @click="read(item)">{{item.title}}</el-button>
                      </div>
                    </el-col>
                  </el-row>
                  <!--内容-->
                  <el-row style="margin-top: -20px">
                    <el-col>
                      <!--<el-input-->
                      <!--type="text"-->
                      <!--:row="3"-->
                      <!--size="small"-->
                      <!--:maxlenght="150"-->
                      <!--:readonly="true"-->
                      <!--placeholder="请输入内容"-->
                      <!--v-model="item.text_content">-->
                      <!--</el-input>-->
                      <div class="content">{{item.text_content}}</div>
                    </el-col>
                  </el-row>
                  <!--文章详情-->
                  <el-row style="margin-top: -20px">
                    <el-col :span="6">
                      <div class="second-head">
                        <!--<i class="el-icon-date"></i>-->
                        <!--时间-->
                        <el-button type="text" size="mini" style="color: #475669;"><i
                          class="el-icon-date">{{item.created_time | time }}</i>
                        </el-button>
                        <!--{{ item.created_time | time}}-->
                      </div>
                    </el-col>

                    <el-col :span="6">
                      <div class="second-head">
                        <!--作者-->
                        <el-button type="info" size="mini" @click="readUserInfo(item)"><i
                          class="el-icon-caret-right"><span
                          v-if="item.user">{{ item.user.email }}</span></i></el-button>

                      </div>
                    </el-col>

                    <el-col :span="3">
                      <div class="second-head">
                        <el-button type="text" size="mini" @click="read(item)"><i class="el-icon-caret-right"
                                                                                  style="color: #475669;">阅读:<span
                          v-if="item.value_article">{{ item.value_article.read_count}}</span></i></el-button>
                      </div>
                    </el-col>

                    <el-col :span="3">
                      <div class="second-head">
                        <el-button type="text" size="mini"><i class="el-icon-circle-check"
                                                              style="color: #475669;">赞:<span
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
                        <el-button type="text" icon="edit" size="mini" style="color: #475669;">评论:
                      <span v-if="item.value_article">{{item.value_article.value_count}}</span></el-button>
                      </div>
                    </el-col>

                  </el-row>
                </template>
              </el-col>
            </el-row>

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
          </span>
          <span v-else>
            <div style="font-family: 仿宋;font-size: 28px; text-align: center">
              <!--暂无该关键字的内容，换个关键字搜搜吧！-->
              {{noContentList}}
            </div>
          </span>
        </div>
      </el-col>
    </el-row>

    <el-dialog size="small" v-model="isShowReadDialog">
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
  body {
    margin: 0;
  }

  .body-css {
    height: 880px;
    max-height: 2200px;
    width: 690px !important;
  }

  .el-input {
    width: 300px !important;
  }

  .content {
    width: 100%;
    max-height: 65px;
    color: #8492A6;
    font-family: 仿宋;
    font-size: 18px;
    border: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    /*white-space: nowrap;*/
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

  }

  .el-row {
    /*margin: 0;*/
  }
</style>

<script>
  import util from '../utiljs/utils'
  import ReadArticle from './read_article.vue'
  import UserDialog  from './userInfo_dialog.vue'

  export default{
    components: {
      ReadArticle,
      UserDialog,
    },
    data(){
      return {
        searchContent: '',
        radio: '1',
        articles: {},
        pageInfo: {
          currentPage: 1,
          limit: ENV.PAGE_SHOW_COUNT,
          offset: 0,
          total: 0,
        },
        isShowReadDialog: false,
        article_id: 0,
        isShowUserDialog: false,
        user_id: 0,
        fullscreenLoading: true,
        noContentList: ''//没有内容时赋值
      }
    },
    methods: {
      handleIconClick(){
//          altert("")
//        console.debug("-0---")
        this.getSearchArticles(0)
      },
      enterEvent: function () {
//          let i = 5
//          alert("---go---",i)
//          console.debug("--------enter----")
        this.handleIconClick();
      },
      onEditClose(needRefresh){
        this.isShowReadDialog = false;
        this.getSearchArticles(this.pageInfo.currentPage)
      },
      closeUserInfoDialog(freshState){
        this.isShowUserDialog = false;
      },
      handleCurrentChange(currentPage){
        let offset = util.buildOffsetByPage(currentPage, this.pageInfo.limit)
        this.pageInfo.offset = offset
        this.getSearchArticles(currentPage)
      },
      readUserInfo(item){
        if (item.user !== null) {
          this.user_id = item.user.id
          this.isShowUserDialog = true
        }
      },
      read(item){
        this.article_id = item.tid;
        this.isShowReadDialog = true;
      },
      getSearchArticles(page = 0){
        if (this.searchContent === '') {//搜索框没有内容
          this.$message({
            type: 'warning',
            message: '请输入你要搜索的内容!'
          })
          return
        }
        this.fullscreenLoading = true
        this.noContentList = ''
        if (page === 0) {
          this.pageInfo.offset = 0
        }
        var url = ''
        let urlCommon = '&limit=' + this.pageInfo.limit
          + '&offset=' + this.pageInfo.offset
        var urlValue = encodeURI(this.searchContent)
        if (this.radio === '1') {//全文搜索
          url = '/search/searchContent/?content=' + urlValue

        } else if (this.radio === '2') {//标题搜索
          url = '/search/searchTitle/?title=' + urlValue

        } else if (this.radio === '3') {//作者搜索
          url = '/search/searchName/?name=' + urlValue

        } else {//radio出错
          this.$message({
            type: 'warning',
            message: '类型有误!'
          })
          return
        }
//        console.debug(encodeURI(url+urlCommon))
        this.$http.get(url + urlCommon)
          .then((res => {
            if (res.body.total > 0) {
              this.articles = res.body.data
              this.pageInfo.total = res.body.total
              this.fullscreenLoading = false
            } else {
              this.pageInfo.total = 0
              this.noContentList = '暂无该关键字的内容，换个关键字搜搜吧!'
              this.fullscreenLoading = false
            }
//            this.fullscreenLoading = false
          }))
          .catch((err => {
            this.noContentList = '暂无该关键字的内容，换个关键字搜搜吧!'
            this.fullscreenLoading = false
          }))
//        this.fullscreenLoading = false
      },
      getFromHead(){
        this.searchContent = this.$route.params.searchContent
        if (this.searchContent !== '' || this.searchContent !== undefined) {
          this.pageInfo.currentPage = 1
          this.getSearchArticles(0)
        }
      }
    },
    watch: {
      radio(){
        this.pageInfo.currentPage = 1;
        this.articles = {}
        this.pageInfo.total = 0
        this.getSearchArticles(0)
      }
    },
    mounted: function () {
      this.getFromHead();
    }
  }
</script>
