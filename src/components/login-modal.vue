<template>
   <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">로그인</p>
      </header>
      <section class="modal-card-body">
        <div class="modal-intro">
            읽은 책을 공유해주세요. <br />
            함께 나누면 즐거움이 두 배로 :)
        </div>
        <div class="social-login">
          <button class="loginBtn loginBtn--facebook" @click="facebookLogin">
            Login with Facebook
          </button>

          <button class="loginBtn loginBtn--google" @click="googleLogin">
            Login with Google
          </button>
        </div>
      </section>
      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </div>
</template>

<script>
import API from '@/api/index.js';

export default {
  props: {
    userInfo: Object,
    email: String,
    password: String
  },
  methods: {
    async googleLogin() {
      this.isLoading = true;
      window.location.href = 'http://localhost:3000/auth/google';
    },
    async facebookLogin() {
      this.isLoading = true;
      window.location.href = 'http://localhost:3000/auth/facebook';
    },
  },
  data() {
    return {
      isFullPage: true,
      isLoading: false
    }
  }
}
</script>

<style scoped lang="scss">
$Phone: "screen and (max-width : 768px)";
.modal-card {
  width: 280px;
  margin: 0 auto;
  & > .modal-card-body {
    text-align: center;
    & > .modal-intro {
      font-size: 1.2rem;
    } 
    & > .social-login {
      margin-top: 20px;
    }
  }
  @media #{$Phone} {
    width: auto;
  }
}
/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  width: 224px;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 1rem;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
</style>