<template>

  <div class="add_ticker">

    <div class="add_ticker_input">
      <label for="ticker">Тикер</label>
      <input type="text" name="ticker" v-model="coin" placeholder="Например DOGE">
    </div>

    <button class="add_button" :disabled="buttonDisabled" @click.prevent="addTicker">
      Добавить
    </button>

  </div>

</template>

<script>
export default {
  name: 'AddTicker',
  data(){
    return {
      coin: '',
      buttonDisabled: false
    }
  },
  methods: {
    async addTicker(){
      this.buttonDisabled = true
      await this.$store.dispatch('addTicker', this.coin)
      this.coin = ''
      this.buttonDisabled = false
    }
  }
}
</script>
