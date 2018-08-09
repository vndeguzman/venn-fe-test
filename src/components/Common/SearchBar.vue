<template>
  <div class="search-bar">
    <input
      class="form-control"
      ref="input"
      :value="value"
      @input="updateValue($event.target.value)"
      placeholder="Search..." >
    <icon class="icon" name="search"></icon>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
.search-bar {
  width: 90%;
  position: relative;
}

.search-bar .icon {
  position: absolute;
  top: 7px;
  right: 0;
  font-size: 15px;
  opacity: 0.7;
}
</style>
