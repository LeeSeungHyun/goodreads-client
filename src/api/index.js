import axios from 'axios';

let env = process.env.NODE_ENV === 'production'
const url = env === 'production' ? 'https://book-fishing.herokuapp.com' : 'http://localhost:3000';

const config = {
  appKey: 'KakaoAK e382e5fe0284648ec925142a6db4f021'
}

export default{
  checkUser: async () => {
    try {
      let response = await axios.get(url + '/auth/check', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response || null;
    } catch(err) {
      console.log(err);
    }
  },
  logoutUser: async () => {
    try {
      let response = await axios.get(url + '/auth/logout', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response || null;
    } catch(err) {
      console.log(err);
    }
  },
  updateUser: async (user) => {
    try{
      let response = await axios.post(url + '/user/update', user);
      console.log(response);
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  },
  getBookList: async () => {
    try{
      let response = await axios.get(url + '/book/list') 
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  },
  registerBook: async (book) => {
    try{
      let response = await axios.post(url + '/book/register', book) 
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  },
  getBookInfo: async (searchText) => {
    try{
      let response = await axios.get('https://dapi.kakao.com/v3/search/book', { 
        params:{
          query: searchText,
          target: 'title&person'
        },
        headers: { 
          'Authorization': 'KakaoAK e382e5fe0284648ec925142a6db4f021'
        } 
      })
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  },
  getBookCommentList: async (bookid) => {
    try{
      let response = await axios.get(url + '/book/comment/list', { params: { bookid: bookid }});
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  },
  saveBookComment: async (bookComment) => {
    try{
      let response = await axios.post(url + '/book/comment/save', bookComment);
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  }
}