<template>
  <modal>
    <h3 slot="header">Create Post</h3>
    <form class="form" slot="body">
      <div class="form-group">
        <label for="name">Username</label>
        <input id="name" v-model="form.username" class="form-control" placeholder="Lorem ipsum dolor..." autocomplete="off" required />
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="form.title" class="form-control" placeholder="Consectetur adipiscing!" autocomplete="off" required />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <div>
          <textarea id="content" v-model="form.content" class="form-control" placeholder="Sed do eiusmod?" autocomplete="off" required>
          </textarea>
        </div>
      </div>
    </form>
    <div slot="footer">
      <button class="btn default" @click="$emit('close')">Cancel</button>
      <button class="btn" @click="submit" >Submit</button>
    </div>
  </modal>
</template>

<script>
import Modal from "../Common/Modal.vue";
import EventBus from "../../event-bus";

const api = process.env.VUE_APP_API_BASE_URL;
export default {
  data() {
    return {
      EventBus: EventBus,
      form: {
        name: "",
        username: "",
        city: "",
        street: ""
      }
    };
  },
  methods: {
    async submit() {
      let err, response;
      [err, response] = await this.$to(
        this.$http.post(`${api}/posts`, this.form)
      );
      if (!err) {
        let responseObj = await response.json();
        EventBus.$emit("postCreated", responseObj);
        console.log(responseObj);
      } else {
        console.log(err);
      }
    }
  },
  components: {
    Modal
  }
};
</script>
<style scoped>
#content {
  min-height: 100px;
}
</style>
