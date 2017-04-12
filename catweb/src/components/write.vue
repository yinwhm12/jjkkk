<template>
  <div>
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="15" :push="1" :pull="8">
        <div class="grid-content bg-purple-light content-height">
          <el-row>
            <el-col>
              <div class="theme-font">
                主页/社区/文章

              </div>
            </el-col>
          </el-row>
          <!--标题 类型-->
          <el-row>
            <el-col :push="2" :span="22">
              <div class="c-font">
                <span class="red-sign">*</span>
                标题
                <el-cascader
                expand-trigger="hover"
                :options="options"
                :props="props"
                v-model="selectType"
                placeholder="请选择类型"
                size="small"
                class="theme"
                @change="handleChange">
                </el-cascader>
                <el-input v-model="article.title" placeholder="请输入标题" class="input" size="small"></el-input>
              </div>
            </el-col>
          </el-row>

          <!--内容-->
          <el-row style="margin-bottom: 0">
            <el-col :push="2" :span="2">
              <div class="c-font">
                <span class="red-sign">*</span>内容

              </div>
            </el-col>
            <el-col :push="2" :span="16">
              <div>
                <el-input
                  type="textarea"
                  :autosize="{minRows:15,maxRows: 50}"
                  placeholder="请输入内容"
                  v-model="article.text_content">
                </el-input>
              </div>
            </el-col>
            <el-col :push="2" :span="4">
              <el-upload
                class="upload-demo"
                action="//up.qbox.me"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="upSuccess"
                :before-upload="handleBefore"
                :file-list="fileList">
                <el-button size="large" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-col>
          </el-row>

          <el-row>
            <el-col :push="8" :span="12">
              <el-button type="primary" @click="post">发布</el-button>
            </el-col>
          </el-row>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    props: ['article_type'],
    data(){
      return {
        options: [],
        props: {
          value: 'label',
          children: 'ctype'
        },
        levelType: [],
        root2Type: [],
        selectedOptions2: [],
        selectType: [],
        ss: [],
        article: {
          title: '',
          text_content: '',
        },
        fileList: [],
        level_id: 0,
        root2_id: 0,
      }
    },
    methods: {
      handleChange(){
        console.debug("ggggggg", this.selectType)
        console.debug("gggglll", this.levelType)
        console.debug("gggrrrr", this.root2Type)
//        let level = JSON.stringify(this.levelType)
//        var json= eval('('+level+')');
//        console.debug("===",json)
//        for(var name in json){
//
//            console.debug("---1",name)
//            console.debug("---",json[name])
//        }
      },
      getLevelType: function () {
        var url = '/level_type/'
        this.$http.get(url)
          .then((res) => {
            this.levelType = res.data
          })
      },
      getRoot2Type: function () {
        var url = '/root_2_type/'
        this.$http.get(url)
          .then((res => {
            this.root2Type = res.data
          }))
      },
      check(){
        if (this.selectType.length === 0) {
          return "请选择标题类型!"
        }
        if (this.article === null || this.article.title === '') {
          return "请输入标题!"
        }
        if (this.article === null || this.article.text_content === '') {
          return "请输入内容!"
        }
        return ''
      },
      post(){
        let errInfo = this.check()
        if (errInfo) {
          this.$message({
            type: 'warning',
            message: errInfo
          })
          return
        }
        let body = {
          "article_root_1": 1,
          "article_title": this.article.title,
          "article_content": this.article.text_content,
          "article_root_2": this.root2_id,
          "article_level": this.level_id,
        }
        var data = JSON.stringify(body)
        this.$http.post('/article/', data)
          .then((res) => {
            this.$message("ok");
          })

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleBefore(file){
        const isJPG = file.type === 'image/jpeg';
//          const isGIF = file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2;
        const isGIF = file.type === 'image/gif';
        console.log("----file");
        if (!isJPG && !isGIF) {
          console.log("----file---");
          this.$message.error('上传头像图片只能是 JPG/GIF 格式!');
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return (isJPG || isGIF) && isLt2M
      },
      upSuccess(file){

      },
      //获取一级目录信息
      getRoot2Info(){

      },
      //获得二级目录信息
      getLevelInfo(){

      },
    },
    created: function () {

    },
    watch: {
      levelType() {
        for (let i = 0; i < this.levelType.length; ++i) {
          var option = {}
          option.label = this.levelType[i].level_type_name
          option.value = this.levelType[i].level_type_id
          this.ss.push(option)
        }
      },

      root2Type(){
        for (let i = 0; i < this.root2Type.length; ++i) {
          var option = {}
          option.label = this.root2Type[i].root_2_type_name
          option.value = this.root2Type[i].root_2_type_id
          option.ctype = this.ss
          this.options.push(option)
        }
        this.options.ctyp = this.ss
      },
      selectType(){
        if (this.levelType.length > 0) {
          for (let i = 0; i < this.levelType.length; i++) {
            if (this.levelType[i].level_type_name === this.selectType[1]) {
              this.level_id = this.levelType[i].level_type_id
              break
            }
          }
        }
        if (this.root2Type.length > 0) {
          for (let i = 0; i < this.levelType.length; i++) {
            if (this.root2Type[i].root_2_type_name === this.selectType[0]) {
              this.root2_id = this.root2Type[i].root_2_type_id
              break
            }
          }
        }
        console.debug("pppp", this.level_id, this.root2_id)
      },
    },
    mounted: function () {
      this.getLevelType();
      this.getRoot2Type();
    },

  }
</script>

<style scoped="scoped">
  body {
    margin: 0 0;
    padding: 0 0;
  }
  .content-height {
    height: 700px;
  }

  .theme-font {
    font-size: 20px;
    font-family: 仿宋;
    color: #20A0FF;
  }

  .red-sign {
    color: red;
    font-size: large;
  }

  .c-font {
    font-size: 22px;
    font-weight: 100;
  }

  .input {
    width: 250px;
  }

  .theme {
    width: 180px;
  }

  .content {
    height: 300px !important;
  }

  .up {
    padding-top: 0 !important;
  }

</style>
