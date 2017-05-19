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
  name: '',
  email: '',
  article_type: 0,
  types: {//暂时 无用
    name: '',
    value: 0,
  },
  article_url: {
    '/home/article_list': 'root1=1',
    '/home/post_list': 'root1=2',
    '/home/outsides_list': 'root1=3',
    '/home/subject/chinese_list': 'root2=1',
    '/home/subject/math_list': 'root2=2',
    '/home/subject/english_list': 'root2=3',
  },
  url_value: '',
  needRefreshByClickRead: false,
  boardFlag: false,//暂无用
}

const mutations = {
  //设置token登录名 头像
  [SET_BASEINFO] (state, data) {
    try {
      state.id = data.uid
      state.accessToken = data.token
      state.name = data.name
      state.email = data.email
    } catch (err) {
      console.log(err)
    }
  },
  reset(state){
    state.id = '',
      state.email = '',
      state.accessToken = ''
  },
  setArticleType(state, data){
    // console.debug("------", data)
    state.article_type = data
  },
  setTypes(state, data){//暂时无用
    state.types.name = data.name
    state.types.value = data.value
  },
  setUrl(state, data){
    // console.debug("-------", data)
    state.url_value = state.article_url[data]
  },
  setRefreshByRead(state, data){
    state.needRefreshByClickRead = data
  },
  setUserEmail(state, data){
    state.email = data
  },
  setBoardFlag(state, data){//暂无用
    // console.debug("-----",data)
    state.boardFlag = data
  }
}

const getters = {
  getUrlValue: state => {
    return state.url_value
  },
  getRefreshState: state => {
    return state.needRefreshByClickRead
  },
  getBoardFlag: state => {//暂无用
    return state.boardFlag
  }
}

export default {
  state,
  mutations,
  getters
}
