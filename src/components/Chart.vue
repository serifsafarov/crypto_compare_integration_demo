<template>

  <div class="ticker_graph">
    <Bar
        :style="prices.length < 10 ? `width: ${21 * prices.length}px` : ''"
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :height="200"
    />
  </div>

</template>

<script>
import {Bar} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'Chart',
  components: {Bar},
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    prices: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      let prices = this.prices
      let res = {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
      for (var key in prices) {
        res.labels.push('')
        res.datasets[0].data.push(prices[key])
      }
      return res
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: '#FCD34D',
        borderSkipped: true,
        plugins: {
          legend: {
            display: false
          },
        },
        events: [],
        barThickness: 17,
        scales: {
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false
            },
          }
        }
      }
    }
  }
}
</script>
