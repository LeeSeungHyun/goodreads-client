<template>
  <article>
    <header class="main-header">
        <div class="text-logo">
          GoodReads
        </div>
        <b-button v-if="Object.keys(user).length !== 0" type="is-danger" class="logout-button" @click="logoutUser">
          <i class="fas fa-sign-out-alt"></i>
        </b-button>
        <b-button v-if="Object.keys(user).length === 0" type="is-primary" class="login-button" @click="isLoginModalActive = true">
          <i class="fas fa-sign-in-alt"></i>
        </b-button>
        <div class="search-input">
            <div class="main-title">
                책을 읽읍시다... 일주일에 한권씩
                {{ user }}
            </div>
            <input type="text" placeholder=" search..." class="search-text" required>
            <button type="button" class="submit">
                <i class="fas fa-search"></i>
            </button>
        </div>
    </header>
    <main>
      <div class="books-container">
          <div class="gallery">
                <div class="gallery-item" tabindex="0">
                    <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" class="gallery-image" alt="">
                    <!-- <div class="gallery-item-info">
                        <ul>
                            <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 56</li>
                            <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
                        </ul>
                    </div> -->
                </div>
                <div class="gallery-item" tabindex="0">
                    <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop" class="gallery-image" alt="">
                    <!-- <div class="gallery-item-info">
                        <ul>
                            <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 89</li>
                            <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 5</li>
                        </ul>
                    </div> -->
                </div>

                <div class="gallery-item" tabindex="0">
                    <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop" class="gallery-image" alt="">
                   
                        <!-- <span class="visually-hidden">Gallery</span><i class="fas fa-clone" aria-hidden="true"></i>
                    </div>
                    <div class="gallery-item-info">
                        <ul>
                            <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 42</li>
                            <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 1</li>
                        </ul>
                    </div> -->
                </div>

                 <div class="gallery-item" tabindex="0">
                    <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop" class="gallery-image" alt="">
                </div>
          </div>
            <!-- End of gallery -->
        </div>
        <!-- End of container -->
    </main>
     <b-modal :active.sync="isLoginModalActive"
              has-modal-card
              trap-focus
              aria-role="dialog"
              aria-modal>
        <login-modal />
      </b-modal>
  </article>
</template>

<script>
import API from '@/api/index.js';
import LoginModal from '@/components/login-modal.vue';
import { mapState } from 'vuex';

export default {
  components: {
    LoginModal
  },
  mounted() {
    this.$store.dispatch('checkUserInfo');
  },
  computed: {
    ...mapState([
      'user'
    ]),
  },
  methods: {
    userLogin() {
      this.showModal = true;
    },
    logoutUser() {
      this.$store.dispatch('logoutUserInfo');
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
      isLoginModalActive: false
    }
  }
}
</script>

<style scoped lang="scss">
  .main-header {
    background-image: url('../assets/img/books-background.jpg');
    height: 36rem;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    & > .text-logo {
      position: absolute;
      margin: 10px;
      top: 0;
      left: 0;
    }

    & > .login-button {
      position: absolute;
      margin: 14px;
      top: 0;
      right: 0;
      cursor: pointer;

      & > i {
        font-size: 2.2rem;
        color: #EEE;
      }
    }

    & > .logout-button {
      position: absolute;
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
        font-size: 2.4rem;
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
        font-size: 1.3rem;
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
    max-width: 90%;
    margin: 0 auto;
    padding: 0;
    margin-top: 70px;
  }

  ::-webkit-input-placeholder{
    color: #DDD;
  }

  ::-moz-input-placeholder{
    color: #DDD;
  }

  ::-ms-input-placeholder{
    color: #DDD;
  }

  .text:focus{
    box-shadow: 1px 1px 8px orange;
  }

  .submit:active{
    box-shadow: 0px 0px 7px orange;
  }

  /* Gallery Section */

  /* .gallery {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem -1rem;
    padding-bottom: 3rem;
  }

  .gallery-item {
    position: relative;
    flex: 1 0 32rem;
    margin: 1rem;
    color: #fff;
    cursor: pointer;
  } */

   .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        grid-gap: 3rem;
    }
    
    .gallery-item,
    .gallery {
        width: auto; 
        margin: 0;
    }

/* .gallery-item:hover .gallery-item-info,
.gallery-item:focus .gallery-item-info {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

.gallery-item-info {
    display: none;
}

.gallery-item-info li {
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 600;
}

.gallery-item-likes {
    margin-right: 2.2rem;
}

.gallery-item-type {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2.5rem;
    text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
} */

/* .fa-clone,
.fa-comment {
    transform: rotateY(180deg);
} */

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


/* Loader */

/*

The following code will only run if your browser supports CSS grid.

Remove or comment-out the code block below to see how the browser will fall-back to flexbox & floated styling. 

*/

@supports (display: grid) {
    /* .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 2rem;
    }
    
    .gallery-item,
    .gallery {
        width: auto;
        margin: 0;
    } */
}
</style>