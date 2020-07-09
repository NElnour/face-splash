<template>
  <span>
    <input
      type="text"
      placeholder="try searching for 'dog'"
      id="search-bar"
      v-on:keyup="validateQuery"
    />
    <button @click="search">Search</button>
  </span>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutations({ setSearchQuery: "setSearchQuery" }),
    ...mapActions({ searchUnsplash: "search"}),
    search: function() {
      let query = document.getElementById("search-bar").value;
      this.setSearchQuery(query);
      this.searchUnsplash();
      this.$emit('refresh-view')
    },
    validateQuery: function(e) {
      if (e.keyCode === 13) {
        this.search();
      }
    },
  },
};
</script>

<style>
input {
  width: 80%;
  border-top: none;
  border-right: none;
  border-left: none;
}
input:active,
input:focus,
button:active,
button:focus {
  outline: none;
}
button {
  border-radius: 40px;
  margin-left: 3%;
  background-color: deeppink;
  color: white;
  border-color: transparent;
}
</style>
