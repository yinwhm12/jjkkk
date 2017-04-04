/**
 * Created by Administrator on 2017/4/4.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/user_info'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    userInfo
  },
  strict: debug,
  middlewares: debug ? [] : []
})
