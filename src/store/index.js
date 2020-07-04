import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    userName: localStorage.getItem('username') ? localStorage.getItem('username'): ''
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, obj) {
      state.Authorization = obj.Authorization
      state.userName = obj.username
      localStorage.setItem('Authorization', obj.Authorization);
      localStorage.setItem('username', obj.username);
    }
  }
});

export default store;
