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
          <!--内容-->
          <el-row>
            <el-col>
              <template v-for="item in articles">
                <el-row>
                  <el-col :push="3">
                    <div class="page-head">
                      <!--主体-->
                      <!--{{ item.title }}-->
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
                      <el-button type="text" size="mini"><i class="el-icon-circle-check" style="color: #475669;">赞:<span
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
        </div>
      </el-col>
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
  body {
    margin: 0;
  }

  .body-css {
    height: 540px;
    max-height: 1200px;
    width: 690px !important;
  }

  .el-input {
    width: 300px !important;
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
        radio: '2',
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
      }
    },
    methods: {
      handleIconClick(){
        this.getSearchArticles(0)
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
        if (page === 0) {
          this.pageInfo.offset = 0
        }
        var url = ''
        let urlCommon = '&limit=' + this.pageInfo.limit
          + '&offset=' + this.pageInfo.offset
        if (this.radio === '1') {//全文搜索
          url = '/search/searchContent/?' + this.searchContent

        } else if (this.radio === '2') {//标题搜索
          url = '/search/searchTitle/?' + this.searchContent

        } else if (this.radio === '3') {//作者搜索
          url = '/search/searchName/?' + this.searchContent

        } else {//radio出错
          this.$message({
            type: 'warning',
            message: '类型有误!'
          })
          return
        }
        this.$http.get(url)
          .then((res => {
            if (res.body.total > 0) {
              this.article = res.body.data
              this.pageInfo.total = res.body.total
            }
          }))
      }
    },
    watch: {
      radio(){
        this.getSearchArticles(0)
      }
    },
    mounted: function () {

    }
  }
</script>
