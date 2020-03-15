<template>
  <div class="container">
    <div class="user-container">
      <div class="profile-image">
        <img alt="" :src='config + user.profileimage' width="80" height="80"/>
      </div>
      <div class="user-info">
        <div>
          {{ user.username }}
        </div>
        <div>
          {{ user.job }}
        </div>
          <div>
          {{ user.email }}
        </div>
      </div>
    </div>
    <section>
      <b-tabs type="is-boxed">
        <b-tab-item label="Pictures" icon="search">
          1
        </b-tab-item>
        <b-tab-item label="Music" icon="search">
          2
        </b-tab-item>
        <b-tab-item label="Videos" icon="video">
          
        </b-tab-item>
      </b-tabs>
    </section>
    <b-button @click="backToBookList">뒤로가기</b-button>
  </div>
</template>

<script>
import LoginValidation from '@/mixins/login-validation.js';
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
    LoginValidation
  ],
  mounted() {
    this.config = config ? 'https://book-fishing.herokuapp.com/' : 'http://localhost:3000/';

    this.$store.dispatch('checkUserInfo').then((res) => {
      this.profileImage = this.user.profileimage;
      this.userName = this.user.username;

      // if(this.books.length === 0) {
        this.$store.dispatch('getBookList').then((res) => {
          this.$store.dispatch('getCommentList').then((res) => {
            this.bookListForUserDetail = this.books.filter((book) => {
              return book.userid === this.user._id;
            })

            this.commentListUserDetail = this.comments.filter((comment) => {
              return comment.userid === this.user._id;
            })
          });
        });
      // }
    });
  },
  methods: {
    backToBookList() {
      this.$router.push({ name: 'list' });
    },
    sortOfBooks() {

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
    }
    & > .user-name {
      flex: 1;
    }
  }
}
</style>