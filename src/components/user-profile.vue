<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">프로필 수정</p>
    </header>
    <section class="modal-card-body">
      <div class="profile-edit-container">
        <div class="image-container">
          <div class="image-preview">
            <input type="file" ref="file" name="image" @change="onProfileImageChanged($event)" accept="image/*" />
            <!-- <img alt="" :src='config + profileImage'  width="80" height="80"/> -->
            <img alt="" v-if="profileFile === null" :src='config + profileImage' width="80" height="80"/>
            <img alt="" v-if="profileFile !== null" :src=profileFile width="80" height="80"/>
          </div>
        </div>
        <div class="profile-edit">
          <div class="profile-name">
            <b-field>
              <b-input v-model="userName" placeholder="이름을 입력해주세요."></b-input>
            </b-field>
          </div>
          <div class="profile-job">
            <b-field>
              <b-input v-model="job" placeholder="직업을 입력해주세요."></b-input>
            </b-field>
          </div>
          <div class="profile-email">
            <b-field>
              <b-input v-model="email" placeholder="이메일을 입력해주세요."></b-input>
            </b-field>
          </div>
        </div>
      </div>
        <div class="update-profile">
          <b-button type="is-primary" @click="updateUser">수정하기</b-button>
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
    this.config = config ? 'https://frozen-hamlet-20379.herokuapp.com/' : 'http://localhost:3000/'

    this.userName = this.user.username;
    this.profileImage = this.user.profileimage;
    this.job = this.user.job;
    this.email = this.user.email;
  },
  methods: {
    selectRate() {
      // rate: ''
    },
    registerReply() {

    },
    async updateUser() {
      // let userObj = {
      //   _id: this.user._id,
      //   username: this.userName,
      //   profileimage: this.profileImage,
      //   job: this.job,
      //   email: this.email
      // }

      const formData = new FormData();
      
      formData.append('_id', this.user._id);
      formData.append('username', this.userName);
      formData.append('profileimage', this.file);
      formData.append('job', this.job);
      formData.append('email', this.email);
    
      // let response = await API.updateUser(userObj);
      let response = await API.updateUser(formData);

      if(response.hasOwnProperty('image')) {
        this.user.username = this.userName;
        this.user.job = this.job;
        this.user.profileimage = response.image;
        this.user.email = this.email;
      } else {
        this.user.username = this.userName;
        this.user.job = this.job;
        this.user.email = this.email;
      }

      this.$store.commit('getUserInfo', this.user);
      this.$buefy.toast.open({
        duration: 3000,
        message: '수정 되었습니다.',
        position: 'is-bottom',
        type: 'is-success'
      })
    },
    onProfileImageChanged(event) {
      const file = event.target.files[0];
      let reader = new FileReader();

      this.file = file;
  
      reader.onload = (e) => {
        this.profileFile= e.target['result'];
      };
      reader.readAsDataURL(file);
    },
  },
  data() {
    return {
      review: '',
      profileImage: '',
      profileFile: null,
      userName: '',
      job: '',
      email: '',
      config: ''
    }
  }
}
</script>

<style scoped lang="scss">
$Phone: "screen and (max-width : 768px)";
.modal-card {
  width: 400px;
  height: 280px;
  margin: 0 auto;
  @media #{$Phone} {
    width: auto;
  }
}
.profile-edit-container {
  display: flex;
  & > .image-container {
    width: 80px;
    & > .image-preview {
      width: 80px;
      height: 80px;
      border: 1px solid #ddd;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      background-color: #fff;
      color: #fff;

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
  }

  & > .image-preview::after {
    background-color: #fff;
    color: #fff;
  }

  & > .profile-edit {
    flex: 1;
    padding-top: 4px;
    padding-left: 20px;
    & > .profile-name,
        .profile-job,
        .profile-email {
      margin-bottom: 14px;
    }
  }
}
.update-profile {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>