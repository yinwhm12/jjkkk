/**
 * Created by Administrator on 2017/4/4.
 */
import {
  SET_BASEINFO,
  // SET_DETAIL
}from '../mutation_types'

const state = {
  //保存第一页数据 用户数据
  id: '',
  accessToken: '',
  // name: '',
  email: ''
}

const mutations = {
  //设置token登录名 头像
  [SET_BASEINFO] (state, data) {
    try {
      state.id = data.id
      state.accessToken = data.accessToken
      // state.name = data.name
      state.email = data.email
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  mutations
}
