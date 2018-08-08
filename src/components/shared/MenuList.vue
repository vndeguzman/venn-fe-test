<template>
  <div class="menu-list">
    <div class="heading">
      <icon name="database"></icon> {{ heading }}
    </div>
    <ul class="list">
     <li v-for="item in filteredList" v-bind:key="item[track]">
       {{ item[track] }}
     </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    track: String,
    heading: String,
    filter: String
  },
  computed: {
    filteredList: function() {
      return this.list.filter(item => {
        return (
          item[this.track].toLowerCase().indexOf(this.filter.toLowerCase()) > -1
        );
      });
    }
  }
};
</script>

<style scoped>
.menu-list {
  text-align: left;
}

.heading {
  margin-top: 15px;
}

.list {
  margin-left: 15px;
  list-style: none;
}
</style>
