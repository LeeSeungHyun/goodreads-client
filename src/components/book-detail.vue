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
              <!-- <b-rate 
                class="average-rate"
                v-model="averageRate"
                icon-pack="fas"
                :spaced="true"
                :disabled="true">
              </b-rate> -->
              <div class="average-rate">
                평점: {{averageRate}}
              </div>
            </div>
            <div class="book-content">
              <div class="book-name" v-line-clamp="2">{{book.bookname}}</div>
              <div class="book-etc-info">
                <span class="author">{{book.author}}</span>
                <span class="publisher">{{book.publisher}}</span>
              </div>
              <div class="book-message">
                {{book.message}}
                <!-- Thank you, everyone. 맞아. 그래, 이건
                이 앨범의 7번을 장식하는 track
                I'd like to say sumthin' to all my friends and supporters
                Who've been there since day one. 나와 문제 있던
                이들에게도 감사해. They helped me find my way
                In a way, anyway, 모든 건 내 음악 안에
                녹아들어갔다 생각해. -->
              </div>
            </div>
          </div>
        </div>
        <div class="book-comments">
          <ul class="book-comment">
            <div class="book-no-comments" :class="[this.commentList === null && 'book-display']">
              책에 대한 소감을 댓글로 남겨주세요.
            </div>
            <li v-for="(comment, index) in commentList" :key=index class="li-comment">
           
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
          <div class="book-reply" v-if="Object.keys(user).length !== 0">
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
          <div v-if="Object.keys(user).length === 0" class="no-user-info">
            <span>로그인을 하고 댓글을 달아주세요.</span>
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
    this.config = config ? 'https://book-fishing.herokuapp.com/' : 'http://localhost:3000/';
    this.getCommentList();
  },
  methods: {
    selectRate() {
      // rate: ''
    },
    async getCommentList() {
      let response = await API.getBookCommentList(this.book._id);

      if(response.length > 0) {
        this.commentList = [...response];
        let length = this.commentList.length;
        let sum = this.commentList.reduce((prev, next) => { return prev + next.rate }, 0)
        let result = sum / length;
        this.averageRate = parseFloat(result.toFixed(1));
      } else {
        this.commentList = null;
      }

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
        if(this.commentList === null) {
          this.commentList = [];
        } 
        this.comment = '';
        this.rate = 0;
        this.commentList.unshift(commentObj);
        this.$buefy.toast.open({
          duration: 3000,
          message: '등록 되었습니다.',
          position: 'is-bottom',
          type: 'is-success'
        })
      }
    }
  },
  data() {
    return {
      texts: ['매우 불만족', '불만족', '보통', '만족', '매우 만족'],
      rate: 0,
      averageRate: 0,
      comment: '',
      commentList: [],
      config: ''
    }
  }
}
</script>

<style scoped lang="scss">
$Phone: "screen and (max-width : 640px)";
.book-detail {
  // height: 400px;
  display: flex;
  @media #{$Phone} {
    display: block;
  }
  & > .book-detail-info {
    width: 330px;
    padding-right: 20px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    @media #{$Phone} {
      width: 100%;
      border: 0;
    }
  }
  & > .book-comments {
    flex: 1;
    padding-left: 20px;
    padding-bottom: 0;

    @media #{$Phone} {
      width: 100%;
      padding-left: 0;
    }

    .book-comment {
      min-height: 200px;
      max-height: 300px;
      overflow: auto;
      -ms-overflow-style: none;

      @media #{$Phone} {
        width: 100%;
        padding-left: 0;
        margin-top: 20px;
        min-height: 80px;
        max-height: 160px;
      }

      .book-no-comments {
        display: none;
      }

      .book-display {
        display: block;
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }

    & .li-comment {
      // display: flex;
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
        font-size: 0.6rem;
        display: inline-block;
      }

      & > .li-comment-comment {
        font-size: 0.8rem;
        margin-top: -6px;

        & > .comment-rate {
          font-size: 0.5rem; 
          display: inline;
        }

        & > span {
          position: relative;
          bottom: 7px;
          font-size: 0.5rem;
          // padding-left: 8px;
          margin-left: 5px;
          // border-left: 1px solid rgba(0, 0, 0, 0.3);
          color: #bbb; 
        }
      }
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
    .no-user-info {
      font-size: 0.8rem;
      & > span {
        position: relative; 
        top: 8px;
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
      & > .average-rate {
        font-size: 0.8rem;
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
::-webkit-scrollbar {
  display:none;
}
</style>