import axios from 'axios';

let config = process.env.NODE_ENV === 'production'

const api = {
  books: config ? '' : 'http://localhost:3000/book/list',
  write: config ? '' : 'http://localhost:3000/book/upload',
};

function fetchTrips() {
  return axios.get(api.trips);
}

function tripWrite(formData) {
  return axios.post(api.write, formData);
}

export {
  fetchTrips,
  tripWrite
}