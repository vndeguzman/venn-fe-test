<template>
  <div class="post-list">
    <div class="freeze-pane">
      <app-search-bar v-model="query"></app-search-bar>
      <div class="list-title">
        <icon class="database-icon" name="database"></icon> Posts
      </div>
    </div>
    <app-menu-list
      heading="Posts"
      :list="postList"
      track="title"
      :query="query"
      :not-found-api="notFoundApi"
      @filter-no-result="getPostByTitle(query)"
    >
    </app-menu-list>
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
      postList: [],
      notFoundApi: undefined
    };
  },
  methods: {
    async getPosts() {
      let err, response;
      [err, response] = await this.$to(this.$http.get(`${api}/posts`));
      if (!err) {
        this.postList = await response.json();
      } else {
        console.log(err);
      }
    },
    async getPostByTitle(title) {
      let err, response;
      [err, response] = await this.$to(this.$http.get(`${api}/posts?title=${title}`));
      if (!err) {
        let list = await response.json();
        if (list.length > 0) {
          this.postList = list;
          this.notFoundApi = false;
        } else {
          this.notFoundApi = true;
        }
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
<style>
.post-list {
  overflow-y: auto;
  text-align: left;
}
.freeze-pane {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 999;
}
.list-title {
  margin-top: 15px;
  padding-bottom: 5px;
}
.database-icon {
  opacity: 0.7;
}
</style>
