import axios from 'axios';

let config = process.env.NODE_ENV === 'production'

const api = {
  bookList: config ? '' : 'http://localhost:3000/book/list',
  registerBook: config ? '' : 'http://localhost:3000/book/register',
  login: config ? '' : 'http://localhost:3000/auth/google',
  logout: config ? '' : 'http://localhost:3000/auth/logout',
  checkUser: config ? '' : 'http://localhost:3000/auth/check',
};

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
  googleLogin: async () => {
    try {
      let response = await axios.get(api.login, {
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
      let response = await axios.get(api.logout, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response || null;
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
  }
}