<template>
  <modal>
    <h3 slot="header">Create User</h3>
    <form class="form" slot="body">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" class="form-control" placeholder="Lorem ipsum dolor..." autocomplete="off" required />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" v-model="form.username" class="form-control" placeholder="Consectetur adipiscing!" autocomplete="off" required />
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input id="city" v-model="form.city" class="form-control" placeholder="Sed do eiusmod?" autocomplete="off" required/>
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input id="street" v-model="form.street" class="form-control" placeholder="Tempor incididunt ut..." autocomplete="off"  required/>
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
        this.$http.post(`${api}/users`, this.form)
      );
      if (!err) {
        let responseObj = await response.json();
        EventBus.$emit("userCreated", responseObj);
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
