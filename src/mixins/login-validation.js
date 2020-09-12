import API from '@/api/index.js';
import { mapState } from 'vuex';

export default{
  computed: {
    ...mapState([
      'user',
    ]),
  },
  mounted() {
    this.isUserAuthorized();
  },
  methods: {
    async isUserAuthorized() {
      let response = await API.checkUser();
      // console.log(response)
      if (!response.data.hasOwnProperty('user')) {
        this.$router.replace(this.$route.query.redirect || '/list')
      } else {
        this.$store.commit('getUserInfo', response.data);
      }
    }
  }
}