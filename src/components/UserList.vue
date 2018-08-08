<template>
  <div class="user-list">
    <app-search-bar v-model="query"></app-search-bar>
    <app-menu-list heading="Users" :list="userList" track="username" :filter="query"></app-menu-list>
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
      userList: []
    };
  },
  methods: {
    async getUsers() {
      let err, response;
      [err, response] = await this.$to(fetch(`${api}/users`));
      if (!err) {
        this.userList = await response.json();
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
    this.getUsers();
  }
};
</script>
