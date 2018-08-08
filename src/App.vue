<template>
  <div id="app">
    <router-view />
    <footer>
      <router-link to="/">WebApp</router-link> |
      <router-link to="/desktop">Install Desktop Version</router-link>
    </footer>
  </div>
</template>

<style>
body {
  overflow: hidden;
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
