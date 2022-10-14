<template>

  <div class="ticker_box">
    <div class="ticker_box_header">{{ coin }}</div>
    <div class="ticker_box_price">{{ `${price[price.length - 1]}$` }}</div>
    <img class="ticker_box_delete_button" src="/src/assets/icons/trash.svg" @click.stop="$emit('deleteTicker')">
  </div>



</template>
<script>
import Chart from "./Chart.vue";
export default {
  components: {Chart},
  props: {
    coin: {
      type: String,
      required: true
    },
    price: {
      type: Array,
      required: true
    },
  }
}
</script>