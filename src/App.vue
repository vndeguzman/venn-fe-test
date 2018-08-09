<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer';

export default {
  data() {
    return {
      showModal: true
    }
  },
  components: {
    NprogressContainer
  }
}
</script>

<style>
body {
  overflow-x: hidden;
}

#nprogress .bar {
  background: #5a92a8 !important;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 5vh 90vh auto;
}

header {
  position: absolute;
  right: 5px;
  top: 15px;
}

.btn {
  float: left;
  margin-right: 5px;
  background-color: #6295ac;
  padding: 8px;
  border-radius: 3px;
  border: none;
  color: #fff;
  cursor: pointer;
}

.btn:focus {
  outline: none;
  transform: scale(0.98);
}

.btn.default {
  background-color: #ebebeb;
  color: #333;
}

.form {
  display: flex;
  flex-flow: column;
}

.form-group {
  flex: 1;
  text-align: left;
  margin-bottom: 15px;
}

.form-group label {
  font-size: smaller;
  color: #707070;
  font-weight: 600;
}

.form-control {
  width: 100%;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #ebebeb;
  padding: 5px;
  background-color: #fff;
}

.form-control:focus {
  outline: 1px solid #5a92a8;
}

::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-track {
  background: #dbdbdb;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #6295ac;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #dddddd;
}
</style>
