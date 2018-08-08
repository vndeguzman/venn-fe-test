<template>
  <div class="search-bar">
    <input
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
  width: 100%;
  position: relative;
}

.search-bar input {
  width: 100%;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #e2e2e2;
  padding: 5px;
}

.search-bar .icon {
  position: absolute;
  top: 7px;
  right: 0;
  font-size: 15px;
  opacity: 0.7;
}
</style>
