<template>
  <div class="post-list">
    <app-search-bar v-model="query"></app-search-bar>
    <app-menu-list heading="Posts" :list="postList" track="title" :filter="query"></app-menu-list>
  </div>
</template>

<script>
  import SearchBar from "./shared/SearchBar.vue";
  import MenuList from "./shared/MenuList.vue";

  const api = process.env.VUE_APP_API_BASE_URL;
  export default {
    data() {
      return {
        query: "",
        postList: []
      };
    },
    methods: {
      async getPosts() {
        let err, response;
        [err, response] = await this.$to(fetch(`${api}/posts`));
        if (!err) {
          this.postList = await response.json();
        } else {
          console.log(err);
        }
      }
    },
    components: {
      appSearchBar: SearchBar,
      appMenuList: MenuList
    },

    mounted() {
      this.getPosts();
    }
  };
</script>
