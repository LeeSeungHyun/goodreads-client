<template>
  <div class="container">
    <div class="user-container">
      <div class="profile-image">
        <img alt="" :src='config + user.profileimage' width="80" />
      </div>
      <div class="user-info">
        <div class="user-name">
          {{ user.username }}
        </div>
        <div class="user-job">
          {{ user.job }}
        </div>
        <div class="user-email">
          {{ user.email }}
        </div>
      </div>
    </div>
    <section class="user-detail-container">
      <b-tabs type="is-boxed">
        <b-tab-item>
          <template slot="header">
            <span> 찜 목록 <b-tag rounded> {{ bookListFavorite.length }} </b-tag> </span>
          </template>
          <ul class="book-list">
            <!-- <div class="book-no-comments" :class="[this.bookListFavorite.length === 0 && 'comment-display']">
              찜한 책이 없습니다.
            </div> -->
            <li v-for="(book, index) of bookListFavorite" :key=index>
              <div style="margin-bottom: 50px">
                <div class="book-body">
                  <div class="book-image">
                    <img :src="book.bookimage" alt="thumbnail" width="100">
                    <b-rate 
                      class="average-rate"
                      :value="book.averageRate"
                      icon-pack="fas"
                      :spaced="false"
                      :show-score="true"
                      :disabled="true">
                    </b-rate>
                  </div>
                  <div class="book-content">
                    <div class="book-name" v-line-clamp="2">{{book.bookname}}</div>
                    <div class="book-etc-info">
                      <span class="author">{{book.author}}</span>
                      <span class="publisher">{{book.publisher}}</span>
                    </div>
                    <div class="book-message">
                      {{book.message}}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </b-tab-item>
        <b-tab-item>
          <template slot="header">
            <span> 글 등록 목록 <b-tag rounded> {{ bookListForUserDetail.length }} </b-tag> </span>
          </template>
          <ul class="book-list">
            <!-- <div class="book-no-comments" :class="[this.bookListForUserDetail.length === 0 && 'comment-display']">
              등록한 책이 없습니다.
            </div> -->
            <li v-for="(book, index) of bookListForUserDetail" :key=index>
              <div style="margin-bottom: 50px">
                <div class="book-body">
                  <div class="book-image">
                    <img :src="book.bookimage" alt="thumbnail" width="100">
                    <b-rate 
                      class="average-rate"
                      :value="book.averageRate"
                      icon-pack="fas"
                      :spaced="false"
                      :show-score="true"
                      :disabled="true">
                    </b-rate>
                  </div>
                  <div class="book-content">
                    <div class="book-name" v-line-clamp="2">{{book.bookname}}</div>
                    <div class="book-etc-info">
                      <span class="author">{{book.author}}</span>
                      <span class="publisher">{{book.publisher}}</span>
                    </div>
                    <div class="book-message">
                      {{book.message}}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </b-tab-item>
        <b-tab-item>
          <template slot="header">
            <span> 댓글 목록 <b-tag rounded> {{ commentListUserDetail.length }} </b-tag> </span>
          </template>
          <ul class="book-comment">
            <div class="book-no-comments" :class="[this.commentListUserDetail.length === 0 && 'comment-display']">
              등록한 댓글이 없습니다.
            </div>
            <li v-for="(comment, index) of commentListUserDetail" :key=index class="li-comment">
           
              <div class="li-comment-profile-image">
                <img :src='config + comment.profileimage' alt="profile" width="22" height="22">
              </div>
              <div class="li-comment-username">
                {{comment.username}}
              </div>
              <div class="li-comment-comment">
                <b-rate 
                  class="comment-rate"
                  v-model="comment.rate"
                  icon-pack="fas"
                  :spaced="true"
                  :disabled="true">
                </b-rate>
                <span>{{comment.createdtime | moment("YYYY-MM-DD HH:mm:ss")}}</span>
                <div>
                  {{comment.comment}}
                </div>
              </div>
            </li>
          </ul>
        </b-tab-item>
      </b-tabs>
    </section>
    <b-button @click="backToBookList">뒤로가기</b-button>
  </div>
</template>

<script>
import LoginValidation from '@/mixins/login-validation.js';
import commonMethods from '@/mixins/common-methods.js';
import { mapState } from 'vuex';

let config = process.env.NODE_ENV === 'production'

export default {
  computed: {
    ...mapState([
      'user',
      'comments',
      'books'
    ]),
  },
  mixins: [
    // LoginValidation
    commonMethods
  ],
  mounted() {
    this.config = config ? 'https://book-fishing.herokuapp.com/' : 'http://localhost:3000/';
    this.$store.dispatch('checkUserInfo');
    if(Object.keys(this.user).length === 0) {
      this.$store.dispatch('getBookList').then((res) => {
        this.$store.dispatch('getCommentList').then((res) => {
          this.books.forEach((book) => {
            this.$store.commit('addAverageRate', { bookId: book._id, averageRate: this.getAverageOfRate(book._id) });
          })
          this.$store.commit('sortOfAverateRate');
          this.getSortOfBookInfo();
        });
      });
    } else {
      this.getSortOfBookInfo();
    }
  },
  methods: {
    backToBookList() {
      this.$router.push({ name: 'list' });
    },
    getSortOfBookInfo() {
      this.bookListForUserDetail = this.books.filter(book => {
        return book.userid === this.user._id;
      }).sort((a, b) => {
        return a.createdtime > b.createdtime ? -1 : a.createdtime < b.createdtime ? 1 : 0;
      })

      this.commentListUserDetail = this.comments.filter((comment) => {
        return comment.userid === this.user._id;
      }).sort((a, b) => {
        return a.createdtime > b.createdtime ? -1 : a.createdtime < b.createdtime ? 1 : 0;
      })

      this.bookListFavorite = this.books.filter(book => {
        let isTemp = false;
        for(let i = 0; i < book.favoriteList.length; i++) {
          if(book.favoriteList[i].userid === this.user._id) {
            isTemp = true;
          }
        }
        if(isTemp) {
          return book;
        }
      })
    }
  },
  data() {
    return {
      config: '',
      profileImage: '',
      userName: '',
      commentListUserDetail: [],
      registeredBookForUserDetail: [],
      bookListForUserDetail: [],
      bookListFavorite: []
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 992px;
  padding: 15px;

  & > .user-container {
    display: flex;
    & > .profile-image {
      width: 80px;
      border: 1px solid #ddd;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      background-color: #fff;
      color: #fff;
      margin-top: 5px;
      margin-left: 10px;
    }
    & > .user-info {
      flex: 1;
      margin-top: 20px;
      margin-left: 15px;

      & > .user-job {
        margin-top: 2px;
        font-size: 0.9rem;
      }

      & > .user-email {
        margin-top: 2px;
        font-size: 0.9rem;
        color: #bbb; 
      }
    }
  }

  & > .user-detail-container {
    margin-top: 20px;

    & .book-list {
      height: calc(100vh - 280px);
      overflow: auto;

      & .book-body {
        display: flex;
        & > .book-image {
          width: 116px;
          & > .average-rate {
            font-size: 0.7rem;
          }
        }
        & > .book-content {
          flex: 1;
          & > .book-name {
            font-weight: bold;
            font-size: 1.1rem;
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

          & > .book-message {
            margin-top: 16px;
            font-size: 0.85rem;
            line-height: 24px;
          }
        }
      }
    }

    & .book-comment {
      height: calc(100vh - 280px);
      overflow: auto;

      .book-no-comments {
        display: none;
      }

      .comment-display {
        display: block;
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }

    & .li-comment {
      margin-bottom: 16px;
      & > .li-comment-profile-image {
        width: 22px;
        height: 22px;
        border: 1px solid #ddd;
        border-radius: 50%;
        overflow: hidden;
        background-color: #fff;
        color: #fff;
        display: inline-block;
      }

      & > .li-comment-username {
        position: relative;
        left: 6px;
        bottom: 7px;
        font-size: 0.8rem;
        display: inline-block;
        & > span {
          margin-left: 10px;
          position: relative;
          top: -6px;
          & button {
            padding: 0 2px;
          }
        }
      }

      & > .li-comment-comment {
        font-size: 0.9rem;
        margin-top: -6px;

        & > .comment-rate {
          font-size: 0.6rem; 
          display: inline;
          position: relative;
          bottom: 4px;
        }

        & > span {
          position: relative;
          bottom: 4px;
          font-size: 0.7rem;
          // padding-left: 8px;
          margin-left: 5px;
          // border-left: 1px solid rgba(0, 0, 0, 0.3);
          color: #bbb; 
        }
      }
    }
  }
}
/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 10px;
}
 
::-webkit-scrollbar-track {
    background-color: #ebebeb;
    -webkit-border-radius: 10px;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #6d6d6d; 
}
</style>