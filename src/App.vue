<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
  :root {
    font-size: 10px;
  }

  body {
    font-family: "Open Sans", Arial, sans-serif;
    background-color: #fafafa;
    margin: 0;
    padding: 0;
    /* color: #262626;
    padding-bottom: 3rem;
    margin: 0 auto;
    max-width: 96.5rem;
    min-width: 320px;
    padding: 0 2rem;  */
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    display: flex;
    width: 320px;
    margin: 0px auto;
    padding: 10px 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }
</style>
