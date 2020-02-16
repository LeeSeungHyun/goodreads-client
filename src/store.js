import Vue from 'vue';
import Vuex from 'vuex';

import API from '@/api/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // data
    user: {},
    books: []
  },
  getters: { // computed
    userInfo: state => {
      return state.user;
    },
    bookList: state => {
      return state.books;
    }
  },
  mutations: {
    getBookList: (state, payload) => {
      state.books = [...payload];
    },
    getUserInfo: (state, payload) => {
      state.user = {...payload};
    }
  },
  actions: {
    getBookList: async (context) => {
      let response = await API.getBookList()
      return context.commit('getBookList', response);
    },
    checkUserInfo: async (context) => {
      let response = await API.checkUser();
      return context.commit('getUserInfo', response.data);
    },
    logoutUserInfo: async (context) => {
      let response = await API.logoutUser();
      if(response.data.message === 'Logged out') {
        return context.commit('getUserInfo', {});
      } else {
        return false;
      }
    }
  }
});