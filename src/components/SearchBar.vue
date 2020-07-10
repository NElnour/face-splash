<template>
  <div>
    <v-text-field
      type="text"
      regular
      placeholder="try searching for 'people'"
      id="search-bar"
      v-on:keyup="validateQuery"
    >
      <v-btn slot="append" icon color="#a13d63" @click="search"
        ><v-icon>mdi-image-search</v-icon></v-btn
      >
    </v-text-field>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutations({ setSearchQuery: "setSearchQuery" }),
    ...mapActions({ searchUnsplash: "search" }),
    search: function() {
      let query = document.getElementById("search-bar").value;
      this.setSearchQuery(query);
      this.searchUnsplash();
      this.$emit("refresh-view");
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
div {
  padding: 5px;
}
</style>
