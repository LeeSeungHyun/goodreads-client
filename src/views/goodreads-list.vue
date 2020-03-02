<template>
  <article>
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
          <i class="fas fa-sign-in-alt"></i> Login
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
            <div class="profile-job">{{user.job}}</div>
            <div class="profile-email">{{user.email}}</div>
          </div>
        </div>
      </nav>
    
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
          <img :src="book.bookimage" alt="" width="150" style="border: 1px solid #eee" @click="getBookDetail(book)">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
        </div>
        <div>
          <img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20200223122259" alt="" width="156" style="border: 1px solid #eee">
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
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.config = config ? 'https://book-fishing.herokuapp.com/' : 'http://localhost:3000/'
    this.$store.dispatch('checkUserInfo');
    this.$store.dispatch('getBookList');
  },
  destroyed() {
    window.addEventListener('scroll', this.handleScroll);
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
    },
    handleScroll (event) {
      let scrollY = window.scrollY
      let element = document.getElementById('nav-header');
      if(scrollY > 50) {
        element.classList.add('affix');
      } else {
        element.classList.remove("affix");
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
$Phone: "screen and (max-width : 768px)";
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
  height: 320px;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

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
        margin-top: -2px;
      }

      & > .profile-job {
        margin-top: 2px;
        font-size: 0.9rem;
      }

      & > .profile-email {
        margin-top: 2px;
        font-size: 0.9rem;
        color: #bbb; 
      }
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
      border: 1px solid orange;
      box-shadow: 1px 0px 3px orange;
      border-radius: 50px;
      font-size: 1rem;
      // text-transform: capitalize;
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
  padding: 30px;
  // position: relative;
  z-index: 1;
}

.books-container {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 3rem;

  & > div {
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

@supports (display: grid) {
  .books-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
    grid-gap: 30px;
    @media screen and (max-width: 420px) {
      grid-template-columns: repeat(auto-fit, minmax(126px, 1fr));
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