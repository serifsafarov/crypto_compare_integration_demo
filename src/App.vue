<script setup>
import AddTicker from "./components/AddTicker.vue";
import Tickers from "./components/Tickers.vue";
import Pagination from "./components/Pagination.vue";</script>

<template>
  <div class="container">

    <AddTicker/>

    <Tickers/>

    <Pagination/>

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  mounted() {
    this.subscribeToWebsocket()
  },
  methods: {
    async subscribeToWebsocket() {
      let api_key = this.$store.state.api_key
      while (api_key === null){
        api_key = prompt('Введите апи ключ')
      }
      this.$store.dispatch('setApiKey', api_key)
      this.$store.dispatch('initWebSocket')
    }
  }
}
</script>
