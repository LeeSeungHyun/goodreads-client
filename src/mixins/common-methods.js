export default {
  methods: {
    getAverageOfRate (bookId) {
      let length = 0
      let sum = 0
      this.comments.forEach((comment) => {
        if (comment.bookid === bookId) {
          sum += comment.rate
          length++
        }
      })
      if (length === 0) {
        return 0
      } else {
        let result = sum / length
        return parseFloat(result.toFixed(1))
      }
    }
  }
}
