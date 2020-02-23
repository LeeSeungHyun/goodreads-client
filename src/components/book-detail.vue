<template>
   <div class="modal-card">
    <section class="modal-card-body">
      <div class="book-detail">
        <div class="book-detail-info">
          <div class="profile-header">
            <div class="profile-image-preview">
              <img :src='config + book.profileimage' alt="profile" width="35" height="35">
            </div>
            <div class="profile-username" v-line-clamp="1">
              {{book.username}}
            </div>
          </div>
          <div class="book-body">
            <div class="book-image">
              <img :src="book.bookimage" alt="thumbnail" width="100">
            </div>
            <div class="book-content">
              <div class="book-name" v-line-clamp="2">{{book.bookname}}</div>
              <div class="book-etc-info">
                <span class="author">{{book.author}}</span>
                <span class="publisher">{{book.publisher}}</span>
              </div>
              <div class="book-message">
                {{book.message}}
                Thank you, everyone. 맞아. 그래, 이건
                이 앨범의 7번을 장식하는 track
                I'd like to say sumthin' to all my friends and supporters
                Who've been there since day one. 나와 문제 있던
                이들에게도 감사해. They helped me find my way
                In a way, anyway, 모든 건 내 음악 안에
                녹아들어갔다 생각해.
              </div>
            </div>
          </div>
        </div>
        <div class="book-comments">
          <div class="book-review">
           
          </div>
          <div class="book-reply">
            <b-rate 
              class="book-rate"
              icon-pack="fas" 
              @change="selectRate" 
              :show-text="true"
              :texts="texts"
              v-model="rate"
              ref="bookRate"
            >
            </b-rate>
            <b-field>
              <b-input class="book-reply-input" size="is-small" v-model="comment" placeholder="댓글 달기.."></b-input>
              <b-button size="is-small" @click="saveComment">게시</b-button>
            </b-field>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import API from '@/api/index.js';
import { mapState } from 'vuex';

let config = process.env.NODE_ENV === 'production'

export default {
  props: {
    book: Object
  },
  computed: {
    ...mapState([
      'user'
    ]),
  },
  mounted() {
    this.config = config ? 'https://frozen-hamlet-20379.herokuapp.com/' : 'http://localhost:3000/';
    this.getCommentList();
  },
  methods: {
    selectRate() {
      // rate: ''
    },
    async getCommentList() {
      let response = await API.getBookCommentList(this.book._id);
      console.log(response);
    },
    async saveComment() {
      let commentObj = {
        bookid: this.book._id,
        userid: this.user._id,
        username: this.user.username,
        profileimage: this.user.profileimage,
        comment: this.comment,
        rate: this.rate
      }
      // console.log(commentObj);
      let response = await API.saveBookComment(commentObj);

      if(response.message === 'success') {

      }
    }
  },
  data() {
    return {
      texts: ['매우 불만족', '불만족', '보통', '만족', '매우 만족'],
      rate: null,
      comment: '',
      config: '',
    }
  }
}
</script>

<style scoped lang="scss">
.book-detail {
  height: 400px;
  display: flex;
  & > .book-detail-info {
    width: 330px;
    padding-right: 20px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  & > .book-comments {
    flex: 1;
    padding-left: 20px;
    padding-bottom: 0;

    .book-review {
      height: 360px;
      overflow: auto;
    }
    .book-reply {
      font-size: 0.6rem;
      & .book-rate {
        margin-bottom: 0;
      }

      & .book-reply-input {
        width: 90%;
        margin-right: 4px;
      }
    }
  }

  .profile-header {
    height: 45px;
    margin-bottom: 10px;
    display: flex;
    & > .profile-image-preview {
      width: 35px;
      height: 35px;
      border: 1px solid #ddd;
      border-radius: 50%;
      position: relative;
      top: -8px;
      overflow: hidden;
      background-color: #fff;
      color: #fff;
    }
    & > .profile-username {
      flex: 1;
      position: relative;
      top: 1px;
      left: 10px;
    }
  }

  .book-body {
    display: flex;
    & > .book-image {
      width: 116px;
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
</style>