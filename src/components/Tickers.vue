<template>

  <div class="tickers">

    <SearchTicker/>

    <div class="tickers_list">

      <Ticker :style="`order: ${index + 1}`" :class="{active: ticker.isActive}"
              v-for="(ticker, index) in tickers"
              :coin="ticker.coin" :price="ticker.price"
              @click.prevent="showChartForTicker(ticker.coin)"
              @deleteTicker="deleteTicker(ticker.coin)"
      />

      <Chart :style="`order: ${chartOrderNum}`" v-if="showChart" :prices="activeTicker.price"/>

    </div>


  </div>

</template>

<script>
import SearchTicker from "./SearchTicker.vue";
import Ticker from "./Ticker.vue";
import Chart from "./Chart.vue";

export default {
  name: 'Tickers',
  components: {Chart, Ticker, SearchTicker},
  data() {
    return {
      activeTickerCoin: null
    }
  },
  computed: {
    chartData() {
      if (this.activeTicker === null)
        return null
      return this.activeTicker.price
    },
    pagination() {
      return this.$store.state.pagination
    },
    search() {
      return this.$store.state.search
    },
    activeTicker() {
      let activeTicker = this.tickers.filter((ticker, index) => {
        return ticker.isActive
      })
      return activeTicker.length > 0 ? activeTicker[0] : null
    },
    tickers() {
      return this.$store.getters.formattedCoins.items.map((ticker, index) => {
        ticker.isActive = ticker.coin === this.activeTickerCoin
        ticker.index = index
        return ticker
      })
    },
    showChart() {
      return this.chartOrderNum !== null
    },
    chartOrderNum() {
      return this.activeTicker !== null ? (this.activeTicker.index + 1) : null
    }
  },
  watch: {
    pagination: {
      handler(newValue, oldValue) {
        this.activeTickerCoin = null
      },
      deep: true
    },
    search: {
      handler(newValue, oldValue) {
        this.activeTickerCoin = null
      },
      deep: true
    },
    activeTickerCoin() {
      this.$store.dispatch('clearPrices')
    }
  },
  methods: {
    async showChartForTicker(coin) {
      if (coin === this.activeTickerCoin)
        this.activeTickerCoin = null
      else
        this.activeTickerCoin = coin
    },
    async deleteTicker(coin) {
      if (this.activeTickerCoin === coin)
        this.activeTickerCoin = null
      this.$store.dispatch('removeTicker', coin)
    }
  }
}
</script>
