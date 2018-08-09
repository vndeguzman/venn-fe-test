<template>
  <div class="home">
    <nav>
      <button class="btn" @click="showCreateUserModal = true">Create User</button>
      <button class="btn" @click="showCreatePostModal = true">Create Post</button>
      <span class="install-link">
        <router-link to="/desktop">Install Desktop App</router-link>
      </span>
    </nav>
    <div class="side-nav">
      <app-user-list></app-user-list>
      <app-post-list></app-post-list>
    </div>
    <div class="main">
      <div v-if="activeMain === undefined" class="splash-message">Select item on the left</div>
      <app-user-detail v-show="activeMain === 'UserList'"></app-user-detail>
      <app-post-detail v-show="activeMain === 'PostList'"></app-post-detail>
    </div>
    <!-- use the modal component, pass in the prop -->
    <app-create-user-modal v-if="showCreateUserModal" @close="showCreateUserModal = false"></app-create-user-modal>
    <app-create-post-modal v-if="showCreatePostModal" @close="showCreatePostModal = false"></app-create-post-modal>
  </div>
</template>

<script>
import UserList from "../components/User/UserList.vue";
import UserDetail from "../components/User/UserDetail.vue";
import CreateUser from "../components/User/CreateUser.vue";
import PostList from "../components/Post/PostList.vue";
import PostDetail from "../components/Post/PostDetail.vue";
import CreatePost from "../components/Post/CreatePost.vue";
import EventBus from "../event-bus";
import Modal from '../components/Common/Modal.vue';

export default {
  data() {
    return {
      showCreateUserModal: false,
      showCreatePostModal: false,
      activeMain: undefined
    }
  },
  mounted() {
    EventBus.$on('userPostListReceived', () => {
      this.activeMain = 'UserList';
    });
    EventBus.$on('postCommentListReceived', () => {
      this.activeMain = 'PostList';
    });
    EventBus.$on('userCreated', () => {
      this.showCreateUserModal = false;
    });
    EventBus.$on('postCreated', () => {
      this.showCreatePostModal = false;
    });
  },
  components: {
    appUserList: UserList,
    appUserDetail: UserDetail,
    appPostList: PostList,
    appPostDetail: PostDetail,
    appCreateUserModal: CreateUser,
    appCreatePostModal: CreatePost,
    Modal
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
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
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
  display: flex;
  align-items: center;
}

.splash-message {
  flex: 1;
}

.install-link {
  position: absolute;
  right: 15px;
  top: 15px;
}

@media only screen and (max-width: 600px) {
  .install-link {
    visibility: hidden;
  }
  .home {
    grid-template-columns: 30vw 1fr;
  }
}
</style>
