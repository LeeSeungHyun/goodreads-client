<template>
  <form class="form-container" @submit.prevent="validateBeforeSubmit"> 
    <div class="image-preview">
      <div class="label-container" v-show="bookImage.length === 0">
        <div>
          <i class="fas fa-upload"></i>
        </div>
        <div>
          <label for="image-upload">
            Select a image file
          </label>
        </div>
      </div>
      <input type="file" ref="file" name="image" id="image-upload" data-width="500" data-height="500" @change="onFileChanged($event)" accept="image/*" />
      <img alt="" v-if="bookImage != null" :src=bookImage />
    </div>
    <div class="contents">
      <div class="contents-title">
        책 공유 같이 해요!!
        <b-button size="is-small" @click="searchBook">검색하기</b-button>
      </div>   
      <div class="book-name">
        <b-field>
          <b-input v-model="bookName" name="bookName" placeholder="책 이름을 입력해주세요."></b-input>
        </b-field>
      </div>
      <div class="book-author">
        <b-field>
          <b-input v-model="author" placeholder="저자 이름을 입력해주세요."></b-input>
        </b-field>
      </div>
      <div class="book-message">
        <b-field>
          <b-input v-model="message" maxlength="300" type="textarea" placeholder="책에 대한 짧은 감상평 남겨주세요. (최대 300자)"></b-input>
        </b-field>
      </div>
      <div class="book-rates">
        <div>책을 평가해주세요.</div>
        <b-rate 
          icon-pack="fas" 
          @change="selectRate" 
          :show-text="true"
          :texts="texts"
          v-model="rate"
          ref="bookRate"
        >
        </b-rate>
      </div>
      <div class="book-buttons">
        <b-button type="is-primary" @click="registerBook">등록하기</b-button>
        <b-button @click="backToBookList">뒤로가기</b-button>
      </div>
    </div>
    <b-modal 
      :active.sync="isBookSearchModalActive"
      has-modal-card
      :width="400"
      trap-focus
      aria-role="dialog"
      aria-modal>
      <book-search-modal/>
    </b-modal>
  </form>
</template>

<script>
import API from '@/api/index.js';
import BookSearchModal from '@/components/book-search-modal.vue';
import { mapState } from 'vuex';

export default {
  components: {
    BookSearchModal
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
    onFileChanged(event) {
      const file = event.target.files[0];
      let reader = new FileReader();

      this.file = file;
      reader.onload = (e) => {
        this.bookImage= e.target['result'];
      };
      reader.readAsDataURL(file);
    },
    selectRate() {
      // console.log(this.$refs.bookRate)
    },
    searchBook() {
      this.isBookSearchModalActive = true;
    },
    backToBookList() {
      this.$router.replace(this.$route.query.redirect || '/')
    },
    resetForm() {
      this.bookImage = '';
      this.bookName = '';
      this.author = '';
      this.message = '';
      this.rate = null;
    },
    async registerBook() {
      const formData = new FormData();
      
      formData.append('userid', this.user.user.uniqueid);
      formData.append('username', this.user.user.username);
      formData.append('bookname', this.bookName);
      formData.append('author', this.author);
      formData.append('message', this.message);
      formData.append('rate', this.rate);
      formData.append('bookfile', this.file);

      let response = await API.registerBook(formData)
      if(response.message === 'success') {
        this.resetForm();
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
      bookImage: '',
      bookName: '',
      author: '',
      message: '',
      rate: null,
      isBookSearchModalActive: false,
      labelPosition: 'on-border',
      texts: ['매우 불만족', '불만족', '보통', '만족', '매우 만족']
    }
  }
}
</script>

<style scoped lang="scss">
$Phone: "screen and (max-width : 768px)";
.form-container {
  max-width: 768px;
  margin: 40px auto;
  padding: 40px 40px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;

  @media #{$Phone} {
    display: block;
    padding: 20px 20px;
  }

  & >.image-preview {
    width: 300px;
    height: 300px;
    border: 1px solid #ddd;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    color: #fff;

  @media #{$Phone} {
    width: 250px;
    height: 250px;
    border: 1px solid #ddd;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    color: #fff;
  }

    & > #image-upload {
      width: 300px;
      height: 300px;

      @media #{$Phone} {
        width: 250px;
        height: 250px;
      }
    }

    & > .label-container {
      width: 130px;
      height: 80px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      text-align: center;

      & > div:nth-child(1) {
        font-size: 1.8rem;
        line-height: 30px;
        color: #000;
      }
       & > div:nth-child(2) {
        background-color: #5882FA;
        margin-top: 14px;
        font-size: 0.8rem;
        line-height: 1.6rem;
      }
    }

    & > input {
      line-height: 130px;
      font-size: 130px;
      position: absolute;
      opacity: 0;
      z-index: 10;
    }

    & > img {
      padding: 5px;
      width: 100%;
      height: 100%;
    }
  }

  & > .contents {
    flex: 1;
    margin-left: 40px;

    @media screen and (max-width: 768px) {
      margin-top: 10px;
      margin-left: 0;
    }

    & > .contents-title {
      font-size: 1.4rem;
      font-weight: 700;
    }

    & > .book-name,
        .book-author,
        .book-message {
          margin-top: 16px;
        }
    & > .book-rates {
      & > div:nth-child(1) {
        font-size: 0.8rem;
      }
    }

    & > .book-buttons {
      margin-top: 30px;
      text-align: right;

      & > button:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
}
</style>