<template>
  <form class="form-container"> 
    <div class="image-preview">
      <div class="label-container" v-show="imageSrc.length === 0">
        <div>
          <i class="fas fa-upload"></i>
        </div>
        <div>
          <label for="image-upload">
            Select a image file
          </label>
        </div>
        <!-- <label for="image-upload">
          Choose File
        </label> -->
      </div>
      <input type="file" ref="file" name="image" id="image-upload" data-width="500" data-height="500" @change="onFileChanged($event)" accept="image/*" />
      <img alt="" v-if="imageSrc != null" :src=imageSrc />
    </div>
    <div id="contents">
      <div>
        <input type="text" placeholder="Please put the content.." name="idea" v-model="idea">
      </div>
      <div>
        <input type="text" placeholder="where are you?" name="location" v-model="location">
      </div>
      <div>
        <button type="button" class="styled-button" id="submit-button">
          <span>Upload</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('checkUserInfo');
  },
  methods: {
    onFileChanged(event) {
      const file = event.target.files[0];
      let reader = new FileReader();

      this.file = file;
      reader.onload = (e) => {
        this.imageSrc= e.target['result'];
      };
      reader.readAsDataURL(file);
    },
  },
  data() {
    return {
      imageSrc: '',
      file: '',
      idea: '',
      location: ''
    }
  }
}
</script>

<style scoped lang="scss">
.form-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 40px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.2);

  & >.image-preview {
    width: 360px;
    height: 360px;
    border: 1px solid #ddd;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    color: #fff;
    float: left;

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
        font-size: 2.6rem;
        line-height: 30px;
        color: #000;
      }
       & > div:nth-child(2) {
        background-color: #5882FA;
        margin-top: 1.4rem;
        font-size: 1.2rem;
        line-height: 2.6rem;
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
}

.form-container::after {
  display: block;
  content: "";
  clear: both;
}

@media screen and (max-width: 1060px) {
  .image-preview {
    width: 360px;
    height: 360px;
    margin: 0 auto;
    float: none;
  }

  #contents {
    width: 360px;
    margin: 0 auto;
    float: none;
    padding: 0;
  }

  input[type=text] {
    margin: 4px;
    padding: 0 10px;
    width: 360px;
    height: 36px;
    color: #5882FA;
    background: white;
    border: 1px solid #5882FA;
    border-radius: 4px;  
  }
  
  #contents > div:nth-child(1){
    margin-top: 30px;
  }
}

@media screen and (max-width: 768px) {
  .image-preview {
    width: 280px;
    height: 280px;
    margin: 0 auto;
    border: 1px solid #5882FA;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    color: #fff;
    float: none;
  }

  #contents {
    width: 280px;
    margin: 0 auto;
    float: none;
    padding: 0;
  }

  input[type=text] {
    margin: 4px;
    padding: 0 10px;
    width: 280px;
    height: 36px;
    color: #5882FA;
    background: white;
    border: 1px solid #5882FA;
    border-radius: 4px;  
  }
  
  #contents > div:nth-child(1){
    margin-top: 30px;
  }
}
</style>