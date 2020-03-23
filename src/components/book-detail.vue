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
            <div v-if="user._id === book.userid && Object.keys(user).length !== 0">
              <b-dropdown aria-role="list">
                <p
                  class="ellipsis-vertical"
                  slot="trigger"
                  role="button"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </p>

                <b-dropdown-item aria-role="listitem" @click="updateBook">수정</b-dropdown-item>
                <b-dropdown-item aria-role="listitem" @click="confirmDelete">삭제</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="book-body">
            <div class="book-image">
              <img :src="book.bookimage" alt="thumbnail" width="100">
              <b-rate 
                class="average-rate"
                :value="getAverageOfRateForDetail()"
                icon-pack="fas"
                :spaced="false"
                :show-score="true"
                :disabled="true">
              </b-rate>
              <div class="my-book" v-if="Object.keys(user).length !== 0">
                <!-- <b-button 
                  type="is-text"
                  style="padding: 0; color: #fb366e;"
                > -->
                  <i @click="toggleFavorite" v-if="isFavorite === true" class="fas fa-heart selected-favorite"></i>
                  <i @click="toggleFavorite" v-if="isFavorite === false" class="fas fa-heart unselected-favorite"></i>
                <!-- </b-button> -->
                <span>찜 하기</span>
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
              </div>
            </div>
          </div>
        </div>
        <div class="book-comments">
          <ul class="book-comment">
            <div class="book-no-comments" :class="[this.commentList.length === 0 && 'book-display']">
              책에 대한 소감을 댓글로 남겨주세요.
            </div>
            <li v-for="(comment, index) in commentList" :key=index class="li-comment">
           
              <div class="li-comment-profile-image">
                <img :src='config + comment.profileimage' alt="profile" width="22" height="22">
              </div>
              <div class="li-comment-username">
                {{comment.username}}
                <span v-if="comment.userid === user._id">
                  <b-button type="is-text" size="is-small" @click="updateCommentForm(comment)">수정</b-button>
                  <!-- <b-button 
                    type="is-text" 
                    size="is-small" 
                    v-if="commentMode === 'update' && Object.keys(this.commentForUpdate).length > 0 && comment._id === this.commentForUpdate._id" 
                    @click="updateCommentForm(comment)"
                  >
                    수정 취소
                  </b-button> -->
                  <b-button type="is-text" size="is-small" @click="confirmCommentDelete(comment)">삭제</b-button>
                </span>
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
              <b-button size="is-small" v-if="commentMode === 'create'" @click="saveComment">게시</b-button>
              <b-button size="is-small" v-if="commentMode === 'update'" @click="updateComment">수정</b-button>
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
    book: Object,
    bookCommentList: Array
  },
  computed: {
    ...mapState([
      'user',
      'comments'
    ]),
  },
  mounted() {
    this.config = config ? 'https://book-fishing.herokuapp.com/' : 'http://localhost:3000/';
    this.getCommentList();
    let temp = this.book.favoriteList.filter((favorite) => {
      return favorite.userid === this.user._id;
    });
  
    if(temp.length > 0) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
  },
  methods: {
    selectRate() {
      // rate: ''
    },
    getAverageOfRateForDetail() {
      let length = this.commentList.length;

      if(length > 0) {
        let sum = this.commentList.reduce((acc, comment) => {
          return acc += comment.rate;
        }, 0);
        let result = sum / length;
        return parseFloat(result.toFixed(1));
      } else {
        return 0;
      }
    },
    getAverageOfRate(bookId) {
      let length = 0;
      let sum = 0;
      this.comments.forEach((comment) => {
        if(comment.bookid === bookId) {
          sum += comment.rate
          length++;
        }
      })
      if(length === 0) {
        return 0;
      } else {
        let result = sum / length;
        return parseFloat(result.toFixed(1));
      }
    },
    async getCommentList() {
      this.commentList = this.bookCommentList.sort((a, b) => {
        return a.createdtime > b.createdtime ? -1 : a.createdtime < b.createdtime ? 1 : 0;
      })
    },
    async saveComment() {
      if(this.comment === '' || this.rate === 0) {
        this.$buefy.dialog.alert('별점 및 댓글 정보 모두 입력해주세요.');
        return false;
      }

      let commentObj = {
        bookid: this.book._id,
        userid: this.user._id,
        username: this.user.username,
        profileimage: this.user.profileimage,
        comment: this.comment,
        rate: this.rate
      }
      let response = await API.saveBookComment(commentObj);

      if(response.message === 'success') {
        if(this.commentList === null) {
          this.commentList = [];
        } 
        this.$store.dispatch('getCommentList').then((res) => {
          this.comment = '';
          this.rate = 0;
          this.commentList.unshift(commentObj);
          this.$store.commit('addAverageRate', { bookId: commentObj.bookid, averageRate: this.getAverageOfRate(commentObj.bookid) });
          this.$store.commit('sortOfAverateRate');
          this.$buefy.toast.open({
            duration: 3000,
            message: '등록 되었습니다.',
            position: 'is-bottom',
            type: 'is-success'
          })
        })
      }
    },
    updateCommentForm(comment) {
      this.comment = comment.comment;
      this.rate = comment.rate;
      this.commentForUpdate = {...comment};
      this.commentMode = 'update';
    },
    async updateComment() {
      if(this.comment === '' || this.rate === 0) {
        this.$buefy.dialog.alert('별점 및 댓글 정보 모두 입력해주세요.');
        return false;
      }

      this.commentForUpdate.comment = this.comment;
      this.commentForUpdate.rate = this.rate;

      let response = await API.updateBookComment(this.commentForUpdate);
   
      if(response.nModified === 1) {
        this.commentMode = 'create';

        // this.getCommentList();
        this.commentList.forEach((comment, index) => {
          if(comment._id === this.commentForUpdate._id) {
            this.$store.commit('updateComment', { 
              'index': index, 
              'comment': this.commentForUpdate.comment, 
              'rate': this.commentForUpdate.rate 
            });
            this.commentList[index].comment = this.commentForUpdate.comment;
            this.commentList[index].rate = this.commentForUpdate.rate;
          }
        })
        this.comment = ''
        this.rate = 0;
        this.$store.commit('addAverageRate', { bookId: this.commentForUpdate.bookid, averageRate: this.getAverageOfRate(this.commentForUpdate.bookid) });
        this.$store.commit('sortOfAverateRate');
        this.$buefy.toast.open({
          duration: 3000,
          message: '수정 되었습니다.',
          position: 'is-bottom',
          type: 'is-success'
        })
      }
    },
    updateBook() {
      this.$router.push({ name: 'register', params: { book: this.book }})
    },
    confirmDelete() {
      this.$buefy.dialog.confirm({
        message: '삭제하시겠습니까?',
        confirmText: '확인',
        cancelText: '취소',
        onConfirm: () =>  {
          this.deleteBook();
        }
      })
    },
    deleteBook() {
      this.$emit('close', this.book._id);
    },
    confirmCommentDelete(comment) {
      this.$buefy.dialog.confirm({
        message: '댓글을 삭제하시겠습니까?',
        confirmText: '확인',
        cancelText: '취소',
        onConfirm: () =>  {
          this.deleteComment(comment);
        }
      })
    },
    async deleteComment(commentObj) {
      let response = await API.deleteBookComment(commentObj._id);
      if(response.deletedCount === 1) {
        this.commentList = this.commentList.filter(comment => {
          return comment._id !== commentObj._id;
        })
        this.$store.commit('deleteComment', commentObj._id);
        this.$store.commit('addAverageRate', { bookId: commentObj.bookid, averageRate: this.getAverageOfRate(commentObj.bookid) });
        this.$store.commit('sortOfAverateRate');
        this.$buefy.toast.open({
          duration: 3000,
          message: '삭제 되었습니다.',
          position: 'is-bottom',
          type: 'is-success'
        })
      }
    },
    async toggleFavorite() {
      let obj = {
        bookid: this.book._id,
        userid: this.user._id,
        username: this.user.username,
      }

      if(this.isFavorite === true) {
        let response = await API.deleteFavorite(obj);
        if(response.hasOwnProperty('userid')) {
          // this.book.favoriteList = this.book.favoriteList.filter(favorite => {
          //   return favorite.userid !== this.user._id;
          // })
          this.$store.commit('deleteFavorite', obj);
          
          this.isFavorite = false;
        };
      } else {
        let response = await API.saveFavorite(obj);
        if(response.hasOwnProperty('userid')) {
          this.$store.commit('saveFavorite', obj);
          this.isFavorite = true;
        };
      }
    }
  },
  data() {
    return {
      commentMode: 'create',
      commentForUpdate: {},
      texts: ['매우 불만족', '불만족', '보통', '만족', '매우 만족'],
      rate: 0,
      averageRate: 0,
      comment: '',
      commentList: [],
      config: '',
      isFavorite: false
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
      min-height: 260px;
      max-height: 280px;
      overflow: auto;
      -ms-overflow-style: none;

      @media #{$Phone} {
        width: 100%;
        padding-left: 0;
        margin-top: 20px;
        min-height: 80px;
        max-height: 140px;
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
        font-size: 0.8rem;
        margin-top: -6px;

        & > .comment-rate {
          font-size: 0.5rem; 
          display: inline;
          position: relative;
          bottom: 4px;
        }

        & > span {
          position: relative;
          bottom: 4px;
          font-size: 0.5rem;
          margin-left: 5px;
          color: #bbb; 
        }
      }
    }
    .book-reply {
      font-size: 0.6rem;
      position: relative;
      bottom: 0;
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
    & .ellipsis-vertical {
      cursor: pointer;
    }
  }

  .book-body {
    display: flex;
    & > .book-image {
      width: 116px;
      & > .average-rate {
        font-size: 0.7rem;
      }

      & > .my-book {
        & i {
          cursor: pointer;
        }
        & .selected-favorite {
          color: #fb366e;
        }
        & .unselected-favorite {
          color: #000;
        }
        & span {
          color: #000;
          font-size: 0.7rem;
          position: relative;
          left: 6px;
          top: -2px;
        }
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