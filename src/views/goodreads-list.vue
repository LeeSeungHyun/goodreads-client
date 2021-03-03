<template>
  <article>
    <!-- <div :class="[this.isUserProfileActive === false || 'background-filter']"></div> -->
    <header class="main-header">
      <nav class="nav" id="nav-header">
        <div class="book-logo">
          <a href="#">
            <img src="@/assets/img/book-logo.png" width="70" height="70" alt="logo">
          </a>
        </div>
        <b-button 
          size="is-small" 
          v-if="Object.keys(user).length === 0" 
          type="is-primary" 
          class="login-button" 
          @click="isLoginModalActive = true"
        >
          Login <i class="fas fa-sign-in-alt"></i>
        </b-button>
        <div class="dropdown-custom">
          <b-button 
            size="is-small" 
            v-if="Object.keys(user).length !== 0" 
            type="is-danger" 
            class="logout-button" 
            @click="toggleUserProfile"
          >
          <i class="fas fa-sign-out-alt"></i>
          </b-button>
        </div>
        <div class="dropdown-content" v-if="isUserProfileActive === true">
        <!-- <router-link to="/register" tag="button">글쓰기</router-link> -->
          <b-button class="history" size="is-small" @click="userDetail">상세활동내역</b-button>
          <b-button class="logout" size="is-small" @click="logoutUser">Logout</b-button>

          <div class="image-preview">
          <!-- <input type="file" ref="file" name="image" @change="onProfileImageChanged($event)" accept="image/*" /> -->
            <img alt="" :src='config + user.profileimage'/>
          </div>
          <div class="profile-intro">
            <div class="profile-name">
              {{user.username}}
              <b-button class="profile-edit" size="is-small" @click="editUserProfile">Edit</b-button>
            </div>
            <div class="profile-email">{{user.email}}</div>
          </div>
        </div>
      </nav>
      <div class="search-input">
        <div class="main-title">
          <div>생각보다 유익해서 당황하셨어요?! ^^</div>
          <div>Book Fishing</div>
        </div>   
      
        <b-field class="search-text">
          <b-input style="position: relative; z-index: 1"
            @keyup.enter.native="searchByEnter"
            v-model="searchText"
            icon-pack="fas"
            icon="search"
            placeholder="책 제목 및 저자 이름으로 검색해주세요."
          ></b-input>
        </b-field>
        <button type="button" class="search-submit" @click="searchBook">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <b-button 
        v-if="Object.keys(user).length !== 0" 
        @click="registerBook" 
        class="register-button"
      >
        <i class="fas fa-pen"></i> 글쓰기
      </b-button>
    </header>
    <main>
      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true">
      </b-loading>
      <div class="in-order-of-rate" v-if="isLoading === false && isSearched === false">
        <div class="rate-title">
          평점 높은 순
        </div>
        <div>
          <carousel 
            :navigationEnabled="true" 
            paginationActiveColor="#7957d5" 
            :minSwipeDistance="10"
            :perPageCustom="[[320, 2], [420, 3], [576, 4], [768, 5], [992, 6],[1080, 7], [1280, 8], [1600, 10]]" 
            :paginationSize="8"
            :paginationPadding="10"
          >
            <slide v-for="(book, index) in books" :key=index class="slider">
              <img :src="book.bookimage" alt="" width="100%" style="border: 1px solid #eee" @click="getBookDetail(book)">
              <div>
                <div v-line-clamp="1">
                  {{book.bookname}}
                </div>
                <b-rate 
                  class="average-rate"
                  :value="book.averageRate"
                  icon-pack="fas"
                  :show-score="true"
                  :spaced="true"
                  :disabled="true">
                </b-rate>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
      <div class="in-order-of-rate" v-if="isLoading === false && isSearched === false">
        <div class="rate-title">
          최신 글 
        </div>
        <div>
          <carousel 
            :navigationEnabled="true" 
            paginationActiveColor="#7957d5" 
            :minSwipeDistance="10"
            :perPageCustom="[[320, 2], [420, 3], [576, 4], [768, 5], [992, 6],[1080, 7], [1280, 8], [1600, 10]]" 
            :paginationSize="8"
            :paginationPadding="10"
          >
            <slide v-for="(book, index) in sortedByTimeBooks" :key=index class="slider">
              <img :src="book.bookimage" alt="" width="100%" style="border: 1px solid #eee" @click="getBookDetail(book)">
              <div>
                <div v-line-clamp="1">
                  {{book.bookname}}
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
       <div class="in-order-of-rate" v-if="isLoading === false && isSearched === true">
        <div class="rate-title">
          검색 결과
        </div>
        <div>
          <carousel 
            :navigationEnabled="true" 
            paginationActiveColor="#7957d5" 
            :minSwipeDistance="10"
            :perPageCustom="[[320, 2], [420, 3], [576, 4], [768, 5], [992, 6],[1080, 7], [1280, 8], [1600, 10]]" 
            :paginationSize="8"
            :paginationPadding="10"
          >
            <slide v-for="(book, index) in searchedBooks" :key=index class="slider">
              <img :src="book.bookimage" alt="" width="100%" style="border: 1px solid #eee" @click="getBookDetail(book)">
              <div>
                <div v-line-clamp="1">
                  {{book.bookname}}
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </main>
    <footer v-if="isLoading === false" :class="[this.isSearched === true && 'searched-book']">
      <div>
        Copyright ⓒ 2020. All rights reserved
      </div>
    </footer>
    <b-modal 
      :active.sync="isLoginModalActive"
      has-modal-card
      trap-focus
      :width="280"
      aria-role="dialog"
      aria-modal>
      <login-modal />
    </b-modal>
    <b-modal 
      :active.sync="isBookDetailActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal>
      <book-detail 
        :book="book"
        :bookCommentList="bookCommentList"
        v-on:close="closeBookDetailpage"
      />
    </b-modal>
    <b-modal 
      class="user-profile"
      :active.sync="isUserProfileEditActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal>
      <user-profile />
    </b-modal>
  </article>
</template>
<script>
import API from '@/api/index.js';
import LoginModal from '@/components/login-modal.vue';
import BookDetail from '@/components/book-detail.vue';
import UserProfile from '@/components/user-profile.vue';
import LoginValidation from '@/mixins/login-validation.js';
import commonMethods from '@/mixins/common-methods.js';
import { Carousel, Slide } from 'vue-carousel';
import { mapState } from 'vuex';

let config = process.env.NODE_ENV === 'production'

export default {
  components: {
    LoginModal,
    BookDetail,
    UserProfile
  },
  mixins: [
    LoginValidation,
    commonMethods
  ],
  watch: {
    selected: function(selected) {
      if(selected !== null) {
        this.$store.commit('searchBookList', selected.bookname);
      }
    },
    searchText: function(searchText) {
      if(searchText === '') {
        this.isSearched = false;
        this.$store.dispatch('getBookList').then((res) => {
          this.books.forEach((book) => {
            this.$store.commit('addAverageRate', { bookId: book._id, averageRate: this.getAverageOfRate(book._id) });
          })
          this.$store.commit('sortOfAverateRate');
        });
      }
    }
  },
  computed: {
    ...mapState([
      'user',
      'books',
      'comments',
      'profile'
    ])
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('click', this.handleClick);
  },
  mounted() {
    this.config = config ? 'https://book-fishing.herokuapp.com/' : 'http://localhost:3000/'
    this.$store.dispatch('checkUserInfo');
    console.log(this.user)
   
    if(this.books.length === 0) {
      this.isLoading = true;
      this.$store.dispatch('getBookList').then((res) => {
        this.$store.dispatch('getCommentList').then((res) => {
          this.isLoading = false;
          this.sortedByTimeBooks = [...this.books];
          this.books.forEach((book) => {
            this.$store.commit('addAverageRate', { bookId: book._id, averageRate: this.getAverageOfRate(book._id) });
          })
          this.$store.commit('sortOfAverateRate');
        });
      });
    } else {
      this.sortedByTimeBooks = [...this.books];
      this.sortedByTimeBooks.sort((a, b) => {
        return a.createdTime > b.createdTime ? -1 : a.createdTime < b.createdTime ? 1 : 0;
      })
    }

    let params = this.$route.params;
    if(params.hasOwnProperty('book')) {
      this.sortedByTimeBooks = [...this.books];
      this.books.forEach((book) => {
        this.$store.commit('addAverageRate', { bookId: book._id, averageRate: this.getAverageOfRate(book._id) });
      })
      this.$store.commit('sortOfAverateRate');
      this.getBookDetail(params.book);
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('click', this.handleClick);
  },
  methods: {
    userLogin() {
      this.showModal = true;
    },
    getBookDetail(book) {
      this.book = {...book};
      this.bookCommentList = this.comments.filter((comment) => {
        return comment.bookid === book._id;
      })
      this.isBookDetailActive = this.isBookDetailActive ? false : true;
    },
    registerBook () {
      this.$router.replace(this.$route.query.redirect || '/register')
    },
    userDetail() {
      this.$router.replace(this.$route.query.redirect || '/user/detail')
    },
    logoutUser() {
      this.$store.dispatch('logoutUserInfo');
      this.isUserProfileActive = false;
    },
    async closeBookDetailpage(bookId) {
      let response = await API.deleteBook(bookId);
      if(response.deletedCount === 1) {
        this.$store.commit('deleteBook', bookId);
        this.sortedByTimeBooks = [...this.books];
        this.sortedByTimeBooks.sort((a, b) => {
          return a.createdTime > b.createdTime ? -1 : a.createdTime < b.createdTime ? 1 : 0;
        })
        this.isBookDetailActive = false;
        this.$buefy.toast.open({
          duration: 3000,
          message: '삭제 되었습니다.',
          position: 'is-bottom',
          type: 'is-success'
        })
      }
    },
    searchBook() {
      let isSearch = false;
      this.books.forEach((book) => {
        if(book.bookname.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 || 
          book.author.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) {
          isSearch = true;
        }
      })
      if(isSearch) {
        this.isSearched = true;
        // this.$store.commit('searchBookList', this.searchText);
        this.searchedBooks = this.books.filter(book => {
          return book.bookname.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 || 
            book.author.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
        })
        console.log(this.searchedBooks);
      } else {
        this.$buefy.dialog.alert('검색한 내용이 없습니다.');
      }
    },
    toggleUserProfile() {
      this.isUserProfileActive = this.isUserProfileActive ? false : true;
    },
    editUserProfile() {
      this.isUserProfileEditActive = this.isUserProfileEditActive ? false : true;
    },
    onProfileImageChanged(event) {
      const file = event.target.files[0];
      let reader = new FileReader();

      this.file = file;
  
      reader.onload = (e) => {
        this.profileImage= e.target['result'];
      };
      reader.readAsDataURL(file);
    },
    handleScroll (event) {
      let scrollY = window.scrollY
      let element = document.getElementById('nav-header');
      if(scrollY > 50) {
        element.classList.add('affix');
      } else {
        element.classList.remove("affix");
      }
    },
    searchByEnter() {
      this.searchBook(this.searchText);
    },
    handleClick (event) {
      if (!event.target.matches('.logout-button') && 
          !event.target.matches('.logout-button *') && 
          !event.target.matches('.dropdown-content') && 
          !event.target.matches('.dropdown-content *') &&
          !event.target.matches('.user-profile') && 
          !event.target.matches('.user-profile *')) {
        this.isUserProfileActive = false;
      }
    }
  },
  data() {
    return {
      index: 0,
      isFullPage: true,
      isLoading: false,
      averageRate: 3.5,
      book: {},
      config: '',
      searchText: '',
      searchedBooks: [],
      selected: null,
      profileImage: null,
      isSearched: false,
      isLoginModalActive: false,
      isUserProfileActive: false,
      isUserProfileEditActive: false,
      isBookDetailActive: false,
      sortedByTimeBooks: [],
      bookCommentList: [],
    }
  }
}
</script>

<style scoped lang="scss">
$Phone: "screen and (max-width : 768px)";
.background-filter {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  background:rgba(0,0,0,0.25);
}
.main-header {
  background-image: url('../assets/img/books-background.jpg');
  height: 320px;
  position: relative;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  @media #{$Phone} {
    height: 280px;
  }
  & .book-logo {
    position: absolute;
    margin-top: 6px;
    margin-left: 10px;
    top: 0;
    left: 0;
  }

  & .dropdown-custom {
    position: absolute;
    top: 0;
    right: 0;
  }

  & .dropdown-content::before {
    border-top: 0px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
    content: "";
    position: absolute;
    top: -8px;
    right: 8px;
  }

  & .dropdown-content {
    position: absolute;
    top: 50px;
    right: 14px;
    width: 320px;
    height: 120px;
    display: flex;

    & > .image-preview {
      width: 50px;
      height: 50px;
    }

    & > .profile-intro {
      flex: 1;
      padding: 10px 0 0 20px;
      & .profile-edit {
        margin-left: 8px;
        margin-top: -2px;
      }

      & > .profile-job {
        margin-top: 2px;
        font-size: 0.9rem;
      }

      & > .profile-email {
        margin-top: 4px;
        font-size: 0.9rem;
        color: #bbb; 
      }
    }

    & > .history {
      position: absolute;
      bottom: 4px;
      right: 60px;
    }

    & > .logout {
      position: absolute;
      bottom: 4px;
      right: 4px;
    }
  }

  & .login-button {
    position: absolute;
    margin: 14px;
    top: 0;
    right: 0;
    cursor: pointer;

    & > i {
      font-size: 1.6rem;
      color: #EEE;
    }
  }

  & .logout-button {
    position: relative;
    margin: 14px;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .register-button {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 14px;
  }

  & .search-input{
    line-height: 100%;
    display: table;
    margin: 0;
    width: 100%; 
    text-align: center;

    & > .main-title {
      color: #fff;
      font-size: 2rem;
      @media #{$Phone} {
        font-size: 1.7rem;
      }
      @media screen and (max-width: 380px)  {
        font-size: 1.4rem;
      }
      & > div:nth-child(2) {
        margin-top: 20px;
      }
    }

    & > .search-text{
      height: 30px;
      padding: 8px;
      width: 30%;
      min-width: 260px;
      margin-top: 30px;
      // border: 1px solid #7957d5;
      // box-shadow: 1px 0px 3px #7957d5;
      border-radius: 50px;
      font-size: 1rem;
      // text-transform: capitalize;
      outline: none;
      display: inline-block;
      // background-color: #FFF;
    }

    & > .search-submit{
      padding: 10px;
      height: 40px;
      width: 80px;
      font-size: 1rem;
      color: white;
      background-color: #7957d5;
      border: none;
      margin: 4px;
      margin-top: 20px;
      border-radius: 50px;
      box-shadow: 0px 0px 10px #7957d5;
      outline: none;
      cursor: pointer;
      position: relative;
      top: 11px;
      @media screen and (max-width: 380px)  {
        font-size: 0.8rem;
        width: 50px;
        border-radius: 30px;
      }
    }
  }
}

main {
  width: 100%;
  margin: 0 auto;
  padding: 40px 30px 0 30px;
  z-index: 1;
  text-align: left;

  & .in-order-of-rate {
    margin-bottom: 60px;
    & .rate-title {
      font-size: 1.4rem;
      padding: 12px;
    }
    & .slider {
      cursor: pointer;
      padding: 12px;
    }
    & .average-rate {
      font-size: 0.6rem;
    }
  }
}

.books-container {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 3rem;

  & div {
    text-align: center;
    position: relative;
    flex: 1 0 156px;
    cursor: pointer;
  }
}

.image-preview {
  width: 70px;
  height: 70px;
  border: 1px solid #ddd;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  color: #fff;
  margin-top: 5px;
  margin-left: 10px;

  & > input {
    line-height: 70px;
    font-size: 70px;
    position: absolute;
    opacity: 0;
    z-index: 10;
  }

  & > img {
    width: 100%;
    height: 100%;
  }
}

footer {
  // margin-top: 20px; 
  height: 50px; 
  background-color: #3e3e3e;
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    color: #fff;
    font-size: 0.9rem;
  }
}

.searched-book {
  position: fixed;
  left: 0;
  bottom: 0; 
  height: 50px; 
  width: 100%; 
}

@supports (display: grid) {
  .books-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(156px, 1fr));
    grid-gap: 30px;
    @media screen and (max-width: 420px) {
      grid-template-columns: repeat(auto-fill, minmax(126px, 1fr));
    }

    & > div {
      position: relative;
      cursor: pointer;
    }
  }
}

.nav {
  width: 100%;
  height: 48px;
  position: fixed;
  top: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  z-index: 2;
}

.affix {
  padding: 0;
  background-color: #7957d5;
}

</style>