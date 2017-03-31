<template>
  <div>
    <el-row>
      <el-col :lg="24">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <div class="hh">
      <el-row>
        <el-col :lg="14" :push="5" :pull="5">
          <div class="grid-content bg-purple body-height">
            <!--内容-->
            <div>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark content-first">
                    <!--内容 1 -->
                  </div>
                </el-col>
              </el-row>
            </div>
            <!--内容 2 -->
            <el-row>
              <el-col :span="24">
                <div class="grid-content content-second"></div>
              </el-col>
            </el-row>
            <div></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style>
  .body-height {
    max-height: 2000px;
    min-height: 500px;
    height: 1300px;
  }

  .hh {
    margin-top: -20px;
  }

  .content-first {
    max-height: 500px;
    min-width: 180px;
    height: 350px;
  }

  .content-second {
    background: #475669;
    max-height: 600px;
    min-height: 200px;
    height: 500px;
  }

</style>




