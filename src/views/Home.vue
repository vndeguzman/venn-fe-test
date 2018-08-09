<template>
  <div class="home">
    <nav>
      <button>Create User</button>
      <button>Create Post</button>
    </nav>
    <div class="side-nav">
      <app-user-list></app-user-list>
      <app-post-list></app-post-list>
    </div>
    <div class="main"></div>
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";
import PostList from "../components/PostList.vue";


export default {
  components: {
    appUserList: UserList,
    appPostList: PostList,
  }
};
</script>


<style scoped>
.home {
  display: grid;
  grid-template-columns: 20vw 1fr;
  grid-template-rows: 1fr 90vh 1fr;
}

nav {
  grid-row: 1;
  grid-column: span 2;
  border-bottom: 1px solid rgba(226, 226, 226, 0.67);
  padding-bottom: 5px;
}

nav button {
  float: left;
  margin-right: 5px;
  background-color: #6295ac;
  padding: 8px;
  border-radius: 3px;
  border: none;
  color: #fff;
}

nav button:hover {
  cursor: pointer;
}

.side-nav {
  grid-column: 1;
  grid-row: 2;
  padding-top: 10px;
}

.side-nav > div {
  height: 45vh;
}

.side-nav > div:nth-child(2) {
  margin-top: 2vh;
  height: 43vh;
}

.main {
  grid-column: 2;
  grid-row: 2;
}
</style>
