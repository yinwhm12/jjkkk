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
                  @change="handleChange">
                </el-cascader>

              </div>
            </el-col>
          </el-row>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
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
        ss: []

      }
    },
    methods: {
      handleChange(){
        console.debug("ggggggg", this.selectType)
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
          console.debug("level-", this.levelType[i].level_type_name)
        }
      },

      root2Type(){
        console.debug("======", this.ss)
        for (let i = 0; i < this.root2Type.length; ++i) {
          var option = {}
          console.log("-----------------")
          option.label = this.root2Type[i].root_2_type_name
          console.log("-----------------", option.label)
          option.value = this.root2Type[i].root_2_type_id
          option.ctype = this.ss
          this.options.push(option)
        }
        this.options.ctyp = this.ss
      },
    },
    mounted: function () {
      this.getLevelType();
      this.getRoot2Type();
    },

  }
</script>

<style scoped="scoped">
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
    font-size: 25px;
    font-weight: 100;
  }

  .el-input.el-input--smaill {
    width: 150px;
  }
</style>
