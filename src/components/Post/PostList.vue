<template>
  <div class="post-list">
    <div class="freeze-pane">
      <app-search-bar v-model="query"></app-search-bar>
      <div class="list-title">
        <icon class="database-icon" name="database"></icon> Posts
      </div>
    </div>
    <app-menu-list
      :list="postList"
      track="title"
      :query="query"
      :not-found-api="notFoundApi"
      :click-handler="getPostCommentListByPostId"
      @filter-no-result="getPostByTitle(query)"
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
    },
    async getPostCommentListByPostId(post) {
      let err, response;
      [err, response] = await this.$to(this.$http.get(`${api}/comments?postId=${post.id}`));
      if (!err) {
        let postCommentList = await response.json();
        if (await postCommentList.length > 0) {
          let payload = {
            post: post,
            postCommentList: postCommentList
          };
          EventBus.$emit('postCommentListReceived', payload);
        }
      } else {
        console.log(err);
      }
    },
  },
  components: {
    appSearchBar: SearchBar,
    appMenuList: MenuList
  },

  mounted() {
    this.getPosts();
    EventBus.$on('postCreated', (newPost) => {
      this.postList.push(newPost);
    })
  }
};
</script>
<style>
.post-list {
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
  opacity: 0.7;
}
</style>
