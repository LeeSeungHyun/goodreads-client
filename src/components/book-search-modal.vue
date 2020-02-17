<template>
  <div class="modal-card" :class="[this.bookList.length === 0 ?'': 'modal-height']">
    <section class="modal-card-body">
      <div class="book-search" >
        <b-field>
          <b-input v-debounce:600ms="getBookListInfo" type="input" icon-pack="fas" icon="search" v-model="searchText" placeholder="저자명, 책이름으로 검색해주세요."></b-input>
        </b-field>
      </div>
      <div class="book-list">
        <ul>
          <li v-for="(book, index) in bookList" :key=index class="book-info" @click="getBookInfo(book)">
            <div>
              <img :src="book.thumbnail" alt="thumbnail" width="46" height="60">
            </div>
            <div>
              <div class="book-title" v-line-clamp="1">{{book.title}}</div>
              <div class="book-etc-info">
                <span class="author">{{book.authors[0]}}</span>
                <span class="publisher">{{book.publisher}}</span>
                <div class="book-publish-date">
                  {{book.datetime | moment("YYYY-MM-DD")}}
                </div>
              </div>
            </div>
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
  
  },
  methods: {
    async getBookListInfo() {
      if(this.searchText === '') {
        return false;
      }

      let response = await API.getBookInfo(this.searchText);
      this.bookList = [...response.documents]
    },
    getBookInfo(book) {
      this.$emit('getBookInfo', book);
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
.modal-height {
  height: 460px;
}
.book-list {
  margin-top: 20px;
  & .book-info {
    display: flex;
    margin: 10px auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    :hover{
      cursor: pointer;
    }
    & > div:nth-child(1) {
      width: 80px;
    }
    & > div:nth-child(2) {
      flex: 1;
      & > .book-title {
        font-weight: bold;
      }
      & > .book-etc-info {
        font-size: 0.8rem;
        margin-top: 6px;
        & > .author {
          border-right: 1px solid rgba(0, 0, 0, 0.3);
          padding-right: 5px;
          height: 5px;
        }
        & > .publisher {
          padding-left: 5px;
        }
      }
    }
  }
}

</style>