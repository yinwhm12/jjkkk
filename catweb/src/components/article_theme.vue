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
                        <el-button type="text" size="large" :plain="true" @click="read(item)">{{item.title}}</el-button>
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
                    <el-col :span="6">
                      <!--作者-->
                      <!--<el-button type="info" size="mini">{{ item.user.email }}</el-button>-->
                      <el-button type="info" size="mini" @click="readUserInfo(item)"><i
                        class="el-icon-caret-right"><span
                        v-if="item.user">{{ item.user.email }}</span></i></el-button>


                    </el-col>
                    <el-col :span="6">
                      <!--时间-->
                      <!--{{ new Date(item.created_time).toLocaleString()}}-->
                      <el-button type="text" size="mini"><i class="el-icon-date"
                                                            style="color: #475669;">{{item.created_time | time }}</i>
                      </el-button>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="text" size="mini" @click="read(item)"><i class="el-icon-caret-right"
                                                                                style="color: #475669;">阅读:<span
                        v-if="item.value_article">{{ item.value_article.read_count}}</span></i></el-button>

                    </el-col>
                    <el-col :span="3">
                      <el-button type="text" size="mini"><i class="el-icon-circle-check" style="color: #475669;">赞:<span
                        v-if="item.value_article">{{ item.value_article.up_vout}}</span></i></el-button>

                    </el-col>
                    <el-col :span="3">
                      <el-button type="text" size="mini"><i class="el-icon-star-on" style="color: #475669;">收藏:<span
                        v-if="item.value_article">{{ item.value_article.collected_count}}</span></i></el-button>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="text" icon="edit" size="mini" style="color: #475669;">评论:
                        <span v-if="item.value_article">{{item.value_article.value_count}}</span></el-button>
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

  .el-button.el-button--text.el-button--large.is-plain {
    height: 60px;
    font-size: 38px;
    text-align: center;
    color: #8492A6;
  }
</style>

<script type="text/ecmascript-6">
  //  import ReadTheme from '../components/read_theme.vue'
  import {mapState, mapGetters} from 'vuex'
  import UserDialog  from './userInfo_dialog.vue'

  export default{
    props: ["needRefreshThemePart"],
    components: {
//      ReadTheme
      UserDialog
    },
    computed: {
      ...mapState({
        needRefreshInfo: ({userInfo}) => userInfo,
      }),
      ...mapGetters({
        getNeedRefresh: 'getRefreshState'
      })
    },
    data: function () {
      return {
        articles: [],
        article_id: 0,
        isShowThemeDialog: false,
        theme: {},//文章Id
        isShowUserDialog: false,
        user_id: 0,
      }
    },
    mounted: function () {
      this.getThemeArticle();
    },
    methods: {
      getThemeArticle(){
        let url = '/article/getThemes/1?flag=index'
        this.$http.get(url).then((res => {
          this.articles = res.data;
        }))
      },
      read(item){
        if (item.tid > 0) {
//          this.open(item.tid);
          this.theme = item;
          this.openDialog(this.theme)
        }
      },
      open(id){
        this.isShowThemeDialog = true;
        this.article_id = id;
      },
      openDialog(needOpenTheme, needReresh = true){
//        needOpenThemeId = this.themeId
        this.$emit('themeDialog', needOpenTheme, needReresh)
//        this.store.commit("setRefreshByRead",true)
      },
      closeUserInfoDialog(freshState){
        this.isShowUserDialog = false
      },
      readUserInfo(item){
        if (item.user !== null) {
          this.user_id = item.user.id
          this.isShowUserDialog = true
        }
      },
    },
    watch: {
      getNeedRefresh(){
        if (this.getNeedRefresh === true) {
          this.getThemeArticle();
          this.$store.commit("setRefreshByRead", false);
        }
      }
    }
  }
</script>
