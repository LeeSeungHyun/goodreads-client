<template>
  <ValidationObserver ref="observer">
    <div class="form-container"> 
      <div class="image-preview">
        <div class="label-container" v-show="bookImage.length === 0">
          <div>
            <i class="fas fa-book"></i>
          </div>
          <div>
            <label for="image-upload">
              <img src="@/assets/img/book-logo.png" width="80" height="80" alt="logo">
            </label>
          </div>
        </div>
        <!-- <input type="file" ref="file" name="image" id="image-upload" data-width="500" data-height="500" @change="onFileChanged($event)" accept="image/*" /> -->
        <img alt="" v-if="bookImage != null" :src=bookImage  width="140" height="194"/>
      </div>
      <div class="contents">
        <div class="contents-title">
          검색을 통해 책을 선택해주세요.
          <b-button size="is-small" @click="searchBook">검색하기</b-button>
        </div>   
        <div class="book-name">
          <!-- <ValidationProvider name="book name" rules="required">
            <div slot-scope="{ errors }"> -->
              <b-field>
                <b-input v-model="bookName" placeholder="책 이름을 입력해주세요."></b-input>
              </b-field>
              <!-- <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider> -->
        </div>
        <div class="book-author">
          <!-- <ValidationProvider name="author" rules="required">
            <div slot-scope="{ errors }"> -->
              <b-field>
                <b-input v-model="author" placeholder="저자 이름을 입력해주세요."></b-input>
              </b-field>
            <!--  <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider> -->
        </div>
        <div class="book-publisher">
          <!-- <ValidationProvider name="publisher" rules="required">
            <div slot-scope="{ errors }"> -->
              <b-field>
                <b-input v-model="publisher" placeholder="출판사를 입력해주세요."></b-input>
              </b-field>
              <!-- <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider> -->
        </div>
        <div class="book-message">
          <!-- <ValidationProvider name="message" rules="required">
            <div slot-scope="{ errors }"> -->
              <b-field>
                <b-input v-model="message" maxlength="150" type="textarea" placeholder="책에 대한 짧은 감상평 남겨주세요. (최대 150자)"></b-input>
              </b-field>
              <!-- <span style="position: relative; top: -18px">{{ errors[0] }}</span>
            </div>
          </ValidationProvider> -->
          <!-- <b-field>
            <b-input v-model="message" maxlength="200" type="textarea" placeholder="책에 대한 짧은 감상평 남겨주세요. (최대 200자)"></b-input>
          </b-field> -->
        </div>
        <!-- <div class="book-rates">
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
        </div> -->
        <div class="book-buttons">
          <b-button type="is-primary" @click="registerBook" v-if="mode === 'create'">등록하기</b-button>
          <b-button type="is-primary" @click="updateBook" v-if="mode === 'update'">수정하기</b-button>
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
        <book-search-modal
          v-on:getBookInfo="getBookInfo"
        />
      </b-modal>
    </div>
  </ValidationObserver>
</template>

<script>
import API from '@/api/index.js';
import BookSearchModal from '@/components/book-search-modal.vue';
import LoginValidation from '@/mixins/login-validation.js';
import commonMethods from '@/mixins/common-methods.js';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapState } from 'vuex';

export default {
  components: {
    BookSearchModal,
    ValidationObserver,
    ValidationProvider
  },
  mixins: [
    LoginValidation,
    commonMethods
  ],
  mounted() {
    let params = this.$route.params;
    if(params.hasOwnProperty('book')) {
      this.bookImage = params.book.bookimage
      this.bookName = params.book.bookname
      this.author = params.book.author
      this.publisher = params.book.publisher
      this.message = params.book.message
      
      this.mode = 'update'
    } else {
      this.mode = 'create'
    }

    if(this.books.length === 0) {
        this.$store.dispatch('getBookList').then((res) => {
          this.$store.dispatch('getCommentList').then((res) => {
          this.books.forEach((book) => {
            this.$store.commit('addAverageRate', { bookId: book._id, averageRate: this.getAverageOfRate(book._id) });
          })
          this.$store.commit('sortOfAverateRate');
        });
      });
    }
  },
  computed: {
    ...mapState([
      'user',
      'books',
      'comments'
    ]),
  },
  methods: {
    // onFileChanged(event) {
    //   const file = event.target.files[0];
    //   let reader = new FileReader();

    //   this.file = file;
  
    //   reader.onload = (e) => {
    //     this.bookImage= e.target['result'];
    //   };
    //   reader.readAsDataURL(file);
    // },
    getBookInfo(book) {
      this.bookImage = book.thumbnail;
      this.bookName = book.title;
      this.author = book.authors[0];
      this.publisher = book.publisher;

      this.isBookSearchModalActive = false;
    },
    selectRate() {
      // console.log(this.$refs.bookRate)
    },
    searchBook() {
      this.isBookSearchModalActive = true;
    },
    backToBookList() {
      this.$router.push({ name: 'list' });
    },
    resetForm() {
      this.bookImage = '';
      this.bookName = '';
      this.author = '';
      this.publisher = ''
      this.message = '';
      this.rate = null;
    },
    async registerBook() {
      // const isValid = await this.$refs.observer.validate();
      // if (isValid) {

      if(this.bookImage !== '' && this.bookName !== '' &&
         this.author !== '' && this.publisher !== '' && this.message !== '') {
        let bookInfo = {
          userid: this.user.user._id,
          username: this.user.user.username,
          bookname: this.bookName,
          author: this.author,
          publisher: this.publisher,
          message: this.message,
          profileimage: this.user.user.profileimage,
          bookimage: this.bookImage
        }

        let response = await API.registerBook(bookInfo);

        if(response.message === 'success') {
         
          this.$store.dispatch('getBookList').then((res) => {
            this.books.forEach((book) => {
              this.$store.commit('addAverageRate', { bookId: book._id, averageRate: this.getAverageOfRate(book._id) });
            })
            this.$store.commit('sortOfAverateRate');

            this.resetForm();
            this.$buefy.toast.open({
              duration: 3000,
              message: '등록 되었습니다.',
              position: 'is-bottom',
              type: 'is-success'
            })
          });
        }
      } else {
        this.$buefy.dialog.alert('모든 정보를 입력해주세요.');
      }
    },
    async updateBook() {
      if(this.bookImage !== '' && this.bookName !== '' &&
      this.author !== '' && this.publisher !== '' && this.message !== '') {
        let bookInfo = {
          _id: this.$route.params.book._id,
          userid: this.user.user._id,
          username: this.user.user.username,
          bookname: this.bookName,
          author: this.author,
          publisher: this.publisher,
          message: this.message,
          profileimage: this.user.user.profileimage,
          bookimage: this.bookImage
        }

        let response = await API.updateBook(bookInfo);

        if(response.nModified === 1) {
          this.$store.dispatch('getBookList').then((res) => {
            this.resetForm();
            this.$router.push({ name: 'list', params: { book: bookInfo }})
            this.$buefy.toast.open({
              duration: 3000,
              message: '수정 되었습니다.',
              position: 'is-bottom',
              type: 'is-success'
            })
          });
        }
      } else {
        this.$buefy.dialog.alert('모든 정보를 입력해주세요.');
      }
    }
  },
  data() {
    return {
      bookImage: '',
      bookName: '',
      author: '',
      publisher: '',
      message: '',
      isBookSearchModalActive: false,
      mode: '',
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
    width: 140px;
    height: 194px;
    border: 1px solid #ddd;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    color: #fff;

  @media #{$Phone} {
    border: 1px solid #ddd;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    color: #fff;
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
        background-color: #7957d5;
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
        .book-publisher,
        .book-message {
      margin-top: 14px;
      & span {
        color: red;
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