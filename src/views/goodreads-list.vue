<template>
  <article>
    <!-- <div :class="[this.isUserProfileActive === false || 'background-filter']"></div> -->
    <header class="main-header">
      <div class="book-logo">
        <img src="@/assets/img/book-logo.png" width="70" height="70" alt="logo">
      </div>
      <div class="dropdown-custom">
        <b-button 
          size="is-small" 
         
          type="is-danger" 
          class="logout-button" 
          @click="toggleUserProfile"
        >
          <i class="fas fa-sign-out-alt"></i>
        </b-button>
      </div>
      <div class="dropdown-content" v-if="isUserProfileActive === true">
        <!-- <router-link to="/register" tag="button">글쓰기</router-link> -->
        <b-button class="logout" size="is-small" @click="logoutUser">Logout</b-button>

        <div class="image-preview">
          <!-- <input type="file" ref="file" name="image" @change="onProfileImageChanged($event)" accept="image/*" /> -->
          <img alt="" :src='config + user.profileimage'  width="80" height="80"/>
        </div>
        <div class="profile-intro">
          <div class="profile-name">
            {{user.username}}
            <b-button class="profile-edit" size="is-small" @click="editUserProfile">Edit</b-button>
          </div>
          <div class="profile-mail">{{user.job}}</div>
           <div class="profile-mail">{{user.email}}</div>
        </div>

      </div>
      <b-button 
        size="is-small" 
        v-if="Object.keys(user).length === 0" 
        type="is-primary" 
        class="login-button" 
        @click="isLoginModalActive = true"
      >
        <i class="fas fa-sign-in-alt"></i> Login
      </b-button>
      <div class="search-input">
        <div class="main-title">
          <div>생각보다 유익해서 당황하셨어요?! ^^</div>
          <div>Book Fishing</div>
        </div>
        <input type="text" placeholder=" search..." class="search-text" required>
        <button type="button" class="submit">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </header>
    <main>
      <div class="books-container">
        <div v-for="(book, index) in books" :key=index>
          <img :src="book.bookimage" alt="" width="120" height="200" @click="getBookDetail(book)">
        </div>
      </div>
    </main>
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
      <book-detail :book="book"/>
    </b-modal>
    <b-modal 
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
import { mapState } from 'vuex';

let config = process.env.NODE_ENV === 'production'

export default {
  components: {
    LoginModal,
    BookDetail,
    UserProfile
  },
  computed: {
    ...mapState([
      'user',
      'books',
      'profile'
    ]),
  },
  mounted() {
    this.config = config ? 'https://frozen-hamlet-20379.herokuapp.com/' : 'http://localhost:3000/'
    this.$store.dispatch('checkUserInfo');
    this.$store.dispatch('getBookList');
  },
  methods: {
    userLogin() {
      this.showModal = true;
    },
    getBookDetail(book) {
      this.book = {...book};
      this.isBookDetailActive = this.isBookDetailActive ? false : true;
    },
    logoutUser() {
      this.$store.dispatch('logoutUserInfo');
      this.isUserProfileActive = false;
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
    async checkUser() {
      try {
        let response = await API.checkUser();
        if(response !== null) {
          console.log(response.data)
        }
      } catch(err) {
        console.log(err)
      }
    }
  },
  data() {
    return {
      index: 0,
      book: {},
      config: '',
      profileImage: null,
      isLoginModalActive: false,
      isUserProfileActive: false,
      isUserProfileEditActive: false,
      isBookDetailActive: false
    }
  }
}
</script>

<style scoped lang="scss">
.background-filter {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background:rgba(0,0,0,0.25);
}
.main-header {
  background-image: url('../assets/img/books-background.jpg');
  height: 340px;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .book-logo {
    position: absolute;
    margin: 10px;
    top: 0;
    left: 0;
  }

  & > .dropdown-custom {
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
    height: 140px;
    display: flex;

    & > .image-preview {
      width: 70px;
    }

    & > .profile-intro {
      flex: 1;
      padding: 10px 0 0 20px;
      & .profile-edit {
        margin-left: 8px;
      }
    }

    & > .logout {
      position: absolute;
      bottom: 4px;
      right: 4px;
    }
  }

  & > .login-button {
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

  & > .search-input{
    line-height: 100%;
    display: table;
    margin: 0;
    width: 100%; 
    text-align: center;

    & > .main-title {
      color: #FFF;
      font-size: 2rem;
      & > div:nth-child(2) {
        margin-top: 18px;
      }
    }

    & > .search-text{
      height: 30px;
      padding: 8px;
      width: 30%;
      min-width: 320px;
      color: #DDD;
      margin-top: 30px;
      border: 1px solid orange;
      box-shadow: 1px 0px 3px orange;
      border-radius: 50px;
      font-size: 15px;
      text-transform: capitalize;
      outline: none;
      background-color: #FFF;
    }

    & > .submit{
      padding: 10px;
      height: 40px;
      width: 80px;
      font-size: 1rem;
      color: white;
      background: orange;
      border: none;
      margin: 10px;
      border-radius: 50px;
      box-shadow: 0px 0px 10px orange;
      outline: none;
      cursor: pointer;
    }
  }
}

.books-container {
  padding: 40px;
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
</style>