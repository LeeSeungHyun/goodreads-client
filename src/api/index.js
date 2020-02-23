import axios from 'axios';

let env = process.env.NODE_ENV === 'production'

const api = {
  bookList: env ? '' : 'http://localhost:3000/book/list',
  registerBook: env ? '' : 'http://localhost:3000/book/register',
  login: env ? '' : 'http://localhost:3000/auth/google',
  logout: env ? '' : 'http://localhost:3000/auth/logout',
  checkUser: env ? '' : 'http://localhost:3000/auth/check',
  kakaoBook: 'https://dapi.kakao.com/v3/search/book',
  updateUser: env ? '' : 'http://localhost:3000/user/update',
};

const config = {
  appKey: 'KakaoAK e382e5fe0284648ec925142a6db4f021'
}

export default{
  checkUser: async () => {
    try {
      let response = await axios.get(api.checkUser, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response || null;
    } catch(err) {
      console.log(err);
    }
  },
  googleLogin: () => {
    // try {
    //   let response = await axios.get(api.login, {
    //     headers: { 'Content-Type': 'application/json' },
    //     withCredentials: true
    //   });
    //   return response || null;
    // } catch(err) {
    //   console.log(err);
    // }
  },
  logoutUser: async () => {
    try {
      let response = await axios.get(api.logout, {
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
      let response = await axios.post(api.updateUser, user);
      console.log(response);
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  },
  getBookList: async () => {
    try{
      let response = await axios.get(api.bookList) 
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  },
  registerBook: async (book) => {
    try{
      let response = await axios.post(api.registerBook, book) 
      return response.data || null;
    } catch(err) {
      console.log(err);
    }
  },
  getBookInfo: async (searchText) => {
    try{
      let response = await axios.get(api.kakaoBook, { 
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
  }
}