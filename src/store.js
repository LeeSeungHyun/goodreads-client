import Vue from 'vue';
import Vuex from 'vuex';

import API from '@/api/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // data
    user: {},
    // profile: {},
    books: [],
    comments: []
  },
  getters: { // computed
    userInfo: state => {
      return state.user;
    },
    bookList: state => {
      return state.books;
    },
    CommentList: state => {
      return state.comments;
    }
  },
  mutations: {
    searchBookList: (state, payload) => {
      state.books = state.books.filter((book) => {
        return book.bookname.toLowerCase().indexOf(payload.toLowerCase()) > -1
      })
    },
    getBookList: (state, payload) => {
      state.books = [...payload];
    },
    addAverageRate: (state, payload) => {
      state.books.forEach((book) => {
        if(book._id === payload.bookId) {
          book.averageRate = payload.averageRate;
        }
      })
    },
    sortOfAverateRate: (state) => {
      state.books = state.books.sort((a, b) => {
        return a.averageRate > b.averageRate ? -1 : a.averageRate < b.averageRate ? 1 : 0;
      })
    },
    deleteBook: (state, payload) => {
      state.books = state.books.filter((book) => {
        return book._id !== payload;
      });
    },
    getCommentList: (state, payload) => {
      state.comments = [...payload];
    },
    saveComment: (state, payload) => {
      state.comments.push(payload);
    },
    updateComment: (state, payload) => {
      state.comments[payload.index].comment = payload.comment;
      state.comments[payload.index].rate = payload.rate;
    },
    deleteComment: (state, payload) => {
      state.comments = state.comments.filter((comment) => {
        return comment._id !== payload;
      })
    },
    getUserInfo: (state, payload) => {
      state.user = {...payload};
    }
  },
  actions: {
    getBookList: async (context) => {
      let response = await API.getBookList()
      context.commit('getBookList', response);
      return response;
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
    },
    getCommentList: async (context) => {
      let response = await API.getCommentList()
      context.commit('getCommentList', response);
      return response;
    }
  }
});