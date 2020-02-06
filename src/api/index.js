import axios from 'axios';

let config = process.env.NODE_ENV === 'production'

const api = {
  books: config ? '' : 'http://localhost:3000/book/list',
  write: config ? '' : 'http://localhost:3000/book/upload',
  login: config ? '' : 'http://localhost:3000/auth/google',
  logout: config ? '' : 'http://localhost:3000/auth/logout',
  checkUser: config ? '' : 'http://localhost:3000/auth/check'
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

    }
  },
  userLogout: async () => {
    try {
      let response = await axios.get(api.logout, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      return response || null;
    } catch(err) {

    }
  },
}