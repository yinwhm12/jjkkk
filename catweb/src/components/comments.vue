<template>
  <!--评论-->
  <div>
    <span v-if="noRespond === 'no_respond'">
      <el-row>
        <el-col><div class="grid-content bg-purple-light">暂无评论</div></el-col>
      </el-row>
    </span>
    <span v-else>
    <template v-for="(respond,index) in respondAll">
        <el-row :gutter="10">
          <!--作者 评价时间-->
          <el-col :span="7">
            <el-row>
              <el-col><div class="sayer">
                <!--<i class="el-icon-caret-right"></i>作者-->
                <el-button type="info" size="mini">
                  <!--作者-->
                  <span v-if="respond.user"> {{respond.user.email}}</span>
                </el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col><div class="sayer">
                <el-button type="text" size="mini"><i class="el-icon-date" style="color: #475669;">
                  <!--时间-->
                  <span>{{ respond.created_time | time}}</span>
                </i></el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <!--评论内容-->
          <el-col :span="17">
            <div class="say-content-height">
            <el-input
              type="textarea"
              :rows="10"
              :autosize="true"
              :readonly="true"
              placeholder="请输入内容"
              v-model="respond.text_content">
            </el-input>
            </div>
          </el-col>
        </el-row>

      <!--二级区-->
      <span v-if="respond.respond_twos">
      <template v-for="respondTwo in respond.respond_twos">
          <el-row :gutter="10" justify="center" align="middle" type="flex">
            <el-col :span="13" >
              <el-input
                type="textarea"
                :rows="10"
                :autosize="true"
                :readonly="true"
                placeholder="请输入内容"
                v-model="respondTwo.text_content">
                </el-input>
            </el-col>
            <el-col :span="7">
                <el-row>
                  <el-col><div class="sayer">
                    <!--<i class="el-icon-caret-right"></i>作者-->
                    <el-button type="success" size="mini">
                      <!--作者-->
                      <i style="color: #475669;"> <span v-if="respondTwo.user"> {{respondTwo.user.email}}</span></i>:顶你
                    </el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col><div class="sayer">
                    <el-button type="text" size="mini"><i class="el-icon-date" style="color: #475669;">
                      <!--时间-->
                      <span>{{ respondTwo.created_time | time}}</span>
                    </i></el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
          </el-row>
        </template>
        </span>
      <!--顶人区 写-->
      <div style="margin: 20px 0;"></div>
        <el-row justify="center" align="middle" type="flex">
          <el-col :span="9" :push="2">
              <el-input
                type="textarea"
                :rows="10"
                :autosize="true"
                placeholder="请输入内容"
                v-model="respond.respondTwoContent">
                </el-input>
            </el-col>
            <el-col :span="11" :push="2">
              <div><el-button type="warning" @click="respondTwoButton(respond)">顶楼上</el-button></div>
            </el-col>
        </el-row>
      <div style="margin: 20px 0;"></div>
        </template>
      </span>
    <!--写入地区-->
    <div style="margin: 20px 0;"></div>
    <el-row>
      <el-col>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入评论内容"
          v-model="respondOne.text_content">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="ok-button">
          <el-button type="info" @click="postRespondOne">发表评论</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.sayer{
  line-height: 22px!important;
  font-size: 18px!important;
  width: 100px!important;

}
  .say-content-height{
    height: 0;
  }

.ok-button {
  margin-top: -18px;
  text-align: left;
}
  .el-col.el-col-7{

  }
  .el-row{
    padding: 0;
    margin: 0;
  }
</style>

<script>
  export default{
    props: ["article_id"],
      data (){
          return{
            respondOne: {//写的数据 一级评论
              text_content: '',
              article_id: 0,
            },
            respondAll:[
              {respondTwoContent:''}
            ],
            noRespond: 'has',//判断是否有评论
            follow:{
                text: ''
            },
            respondTwo: {
                text_content: '',
                respond_one: 0,
            }
          }
      },
    methods: {
      //提交 respondOne
      postRespondOne(){//一级评论
        if (this.respondOne.text_content === '') {
          this.$message({
            type: 'warning',
            message: '评论内容不能为空!'
          })
          return
        }
        this.respondOne.article_id = this.article_id
        var data = JSON.stringify(this.respondOne)
        this.$http.post('/comment_area/', data)
          .then((res => {
            let message = res.data
            this.$message({
              type: 'success',
              message: message
            }),
              this.getAllRespond();
          }))
//            .catch((err =>{
//                this.$message({
//
//                })
//            }))

      },
      getAllRespond(){//获取评论
        let url = '/comment_area/getAll/' + this.article_id
        this.$http.get(url)
          .then((res =>{
              if (res.data === 'no_respond'){
                  this.noRespond = 'no_respond'
                return
              }
              this.respondAll =  res.data
              this.noRespond = 'has'
          }))
      },
      respondTwoButton(respond){
        if(respond.respondTwoContent === '' || respond.respond_one_id === 0){
            this.$message({
              type:'warning',
              message: '评论内容不能为空!'
            })
          return
        }
        this.respondTwo.text_content = respond.respondTwoContent
        this.respondTwo.respond_one = respond.respond_one_id
        let data = JSON.stringify(this.respondTwo)
        let url = '/comment_two/'
        this.$http.post(url,data)
          .then((res =>{
              let message = res.data
              this.$message({
                type: 'success',
                message: message
              })
//            this.respondAll[index].respondTwoContent = ''
            //评论之后重新加载 即可
            this.respondTwo.text_content = ''
            this.respondTwo.respond_one = ''

            //重新加载
            this.getAllRespond()

          }))
      }

    },
    watch: {
      article_id(){
        this.noRespond = 'no_respond';
        this.getAllRespond();
      },
    },
    mounted: function () {
      this.getAllRespond();
    }
  }
</script>
