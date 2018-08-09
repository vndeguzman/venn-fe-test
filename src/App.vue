<template>
  <div id="app">
    <router-view />
    <footer>
      <router-link to="/">WebApp</router-link> |
      <router-link to="/desktop">Install Desktop Version</router-link>
    </footer>
  </div>
</template>
<script>
  import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

  export default {
    components: {
      NprogressContainer
    }
  }
</script>

<style>
body {
  overflow: hidden;
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

footer {
  grid-row: 3;
}
</style>
