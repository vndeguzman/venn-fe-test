<template>
  <div class="user-detail">
    <div class="heading">
      {{ `${username}'s Posts` }}
    </div>
    <div class="card-list">
      <div class="card" v-for="post in userPostList">
        <h2>{{ post.title | titlelize }}</h2>
        <p>
          {{ post.body | capitalize }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../event-bus';
  export default {
    data() {
      return {
        username: '',
        userPostList: []
      };
    },
    mounted() {
      EventBus.$on('userPostListReceived', (payload) => {
        this.username = payload.username;
        this.userPostList = payload.posts;
      });
    }
  }
</script>

<style scoped>
.user-detail  {
  overflow-x: hidden;
  height: 100%;
}

.heading {
  position: absolute;
  top: 15px;
  left: 50%;
  background-color: #fff;
  color: #6295ac;
  font-weight: 800;
}

.card-list {
  flex: 1;
}

.card {
  flex: 1;
  text-align: left;
  padding: 14px;
  text-decoration: none;
  border: 1px solid #e8e8e8;
  overflow-y: hidden;
}

.card p {
  flex: 1;
  overflow-wrap: break-word;
}

.card:nth-of-type(1) {
  border-top: none;
}
</style>