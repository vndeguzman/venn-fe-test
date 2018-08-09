<template>
  <div class="user-list">
    <div class="freeze-pane">
      <app-search-bar v-model="query"></app-search-bar>
      <div class="list-title">
        <icon class="database-icon" name="database"></icon> Users
      </div>
    </div>
    <app-menu-list
      :list="userList"
      track="username"
      :query="query"
      :not-found-api="notFoundApi"
      @filter-no-result="getUserByUsername(query)"
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
      userList: [],
      notFoundApi: undefined
    };
  },
  methods: {
    async getUsers() {
      let err, response;
      [err, response] = await this.$to(this.$http.get(`${api}/users`));
      if (!err) {
        this.userList = await response.json();
      } else {
        console.log(err);
      }
    },
    async getUserByUsername(username) {
      console.log("hello");
      let err, response;
      [err, response] = await this.$to(
        this.$http.get(`${api}/users?username=${username}`)
      );
      if (!err) {
        let list = await response.json();
        if (list.length > 0) {
          this.userList = list;
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
    this.getUsers();
  }
};
</script>
<style>
.user-list {
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
  opacity: 0.3;
}
</style>
