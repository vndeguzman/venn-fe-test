<template>
  <div class="user-list">
    <div class="freeze-pane">
      <app-search-bar v-model="query"></app-search-bar>
      <div class="list-title">
        <icon class="database-icon" name="database"></icon> Users
      </div>
    </div>
    <app-menu-list
      track="username"
      :list="userList"
      :query="query"
      :not-found-api="notFoundApi"
      :click-handler="getPostsByUserId"
      @filter-no-result="getUserByUsername(query)"
    >
    </app-menu-list>
  </div>
</template>

<script>
import SearchBar from "../Common/SearchBar.vue";
import MenuList from "../Common/MenuList.vue";
import EventBus from "../../event-bus";

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
    },
    async getPostsByUserId(user) {
      let err, response;
      [err, response] = await this.$to(
        this.$http.get(`${api}/posts?userId=${user.id}`)
      );
      if (!err) {
        let postsByUserId = await response.json();
        if ((await postsByUserId.length) > 0) {
          let payload = {
            username: user.username,
            posts: postsByUserId
          };
          EventBus.$emit("userPostListReceived", payload);
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
    EventBus.$on("userCreated", newUser => {
      this.userList.push(newUser);
      this.userList = this.$_.orderBy(this.userList, "username");
      console.log(this.userList);
    });
  }
};
</script>
<style>
.user-list {
  overflow-y: auto;
  overflow-x: hidden;
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
