<template>
  <div class="modal-card">
    <section class="modal-card-body">
      <div class="book-search">
        <b-field>
          <b-input v-debounce:600ms="getBookInfo" type="input" icon-pack="fas" icon="search" v-model="searchText" placeholder="저자명, 책이름으로 검색해주세요."></b-input>
        </b-field>
      </div>
      <div class="book-list">
        <ul>
          <li v-for="(book, index) in bookList" :key=index>
            <img :src="book.thumbnail" alt="thumbnail" width="60" height="80">
            
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import API from '@/api/index.js';

export default {
  mounted() {
    this.getBookInfo();
  },
  methods: {
    async getBookInfo() {
      if(this.searchText === '') {
        return false;
      }

      let response = await API.getBookInfo(this.searchText);
      console.log(response)
      this.bookList = [...response.documents]
    }
  },
  data() {
    return {
      searchText: '',
      bookList: []
    }
  }
}
</script>

<style scoped lang="scss">
$Phone: "screen and (max-width : 768px)";
.modal-card {
  width: 400px;
  margin: 0 auto;
  @media #{$Phone} {
    width: auto;
  }
}
.book-list {
  margin-top: 10px;
}
</style>