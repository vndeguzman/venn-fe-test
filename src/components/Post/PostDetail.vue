<template>
  <div class="post-detail">
    <div class="post-item">
      <h2>"{{ post.title | titlelize }}"</h2>
      <p>{{ post.body | capitalize }}</p>
      <div class="comment-list">
        <div class="comment" v-for="comment in postCommentList">
          <span class="name">{{ comment.name | nicknemize }}</span>
          <span class="email">&nbsp;({{ comment.email }})</span>
          <span class="body">
            {{ comment.body | capitalize }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../event-bus';
  export default {
    data() {
      return {
        post: {},
        postCommentList: []
      };
    },
    mounted() {
      EventBus.$on('postCommentListReceived', (payload) => {
        this.post = payload.post;
        this.postCommentList = payload.postCommentList;
      });
    }
  }
</script>

<style scoped>
.post-detail {
  overflow-x: hidden;
  height: 100%;
  width: 70vw;
}
.post-item {
  flex: 1;
  padding: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.comment-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.comment {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  background-color: beige;
  margin-bottom: 15px;
  color: #6295ac;
  overflow-wrap: break-word;
}

.comment .name {
  padding-left: 5px;
  font-weight: 800;
  font-size: larger;
}

.comment .body {
  color: #333;
}


</style>