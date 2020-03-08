import Vue from 'vue';
import Vuex from 'vuex';

import API from '@/api/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // data
    user: {},
    // profile: {},
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
    deleteBook: (state, payload) => {
      state.books = state.books.filter((book) => {
        return book._id !== payload;
      });
    },
    getUserInfo: (state, payload) => {
      state.user = {...payload};
    }
  },
  actions: {
    getBookList: async (context) => {
      let response = await API.getBookList()
      context.commit('getBookList', response);
    },
    checkUserInfo: async (context) => {
      let response = await API.checkUser();
      context.commit('getUserInfo', response.data.user);
    },
    logoutUserInfo: async (context) => {
      let response = await API.logoutUser();
      if(response.data.message === 'Logged out') {
        context.commit('getUserInfo', {});
      }
    }
  }
});