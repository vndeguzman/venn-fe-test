<template>
  <div class="menu-list">
    <div class="list-container">
      <ul class="list">
        <li
          class="list-item"
          v-for="item in filteredList"
          @click="clickHandler(item); setSelectedItem(item[track]);"
          :class="{ 'active': selectedItem === item[track]}"
        >
          <span class="text" :title="item[track]">
            <icon class="folder-icon" name="folder"></icon> {{ item[track] }}
          </span>
        </li>
      </ul>
      <div class="not-found" v-if="notFoundApi && filteredList.length === 0">{{ `No result for '${query}'` }}</div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../event-bus';

export default {
  data() {
    return {
      selectedItem: null,
      activeClientComponent: null
    }
  },
  props: {
    list: Array,
    track: String,
    clientComponent: String,
    query: String,
    notFoundApi: Boolean,
    clickHandler: Function
  },
  methods: {
    setSelectedItem: function(item) {
      this.selectedItem = item;
    }
  },
  computed: {
    filteredList: function() {
      return this.$_.orderBy(this.list, this.track).filter(item => {
        let itemVal = item[this.track].toLowerCase();
        let queryVal = this.query.toLowerCase();

        return itemVal.indexOf(queryVal) > -1;
      });
    }
  },
  watch: {
    filteredList: function(list) {
      if (list.length === 0) {
        this.$emit("filter-no-result", true);
      }
    }
  }
};
</script>

<style scoped>
.menu-list {
  margin-bottom: 50px;
  text-align: left;
}

.list-container {
  height: 30vh;
}

.list {
  margin-left: -40px;
  margin-top: 0;
  list-style: none;
}

.list-item {
  padding: 4px;
}

.list-item:hover {
  background-color: #ebebeb;
  cursor: pointer;
}

.text {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.folder-icon {
  opacity: 0.3;
}

.not-found {
  position: sticky;
  top: 150px;
  text-align: center;
  color: #adadad;
}

.active {
  background-color: #ebebeb;
}

</style>
