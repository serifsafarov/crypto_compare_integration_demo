<template>
  <div class="search_ticker_input">
    <input type="text" v-model="search" placeholder="Найти тикер">
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  watch: {
    search(newVal, oldVal) {
      this.$store.dispatch('setSearch', newVal)
    }
  }
}
</script>