<template>

  <div v-if="pagination.prev_btn_visible || pagination.next_btn_visible" class="pagination">

    <div class="pagination_text">
      Показано {{ pagination.shown }} результатов из {{ pagination.total }}
    </div>

    <div class="pagination_buttons">
      <div @click.prevent="prevPage" v-if="pagination.prev_btn_visible" class="pagination_button pagination_button_prev">
        Назад
      </div>

      <div @click.prevent="nextPage" v-if="pagination.next_btn_visible" class="pagination_button pagination_button_next">
        Вперёд
      </div>
    </div>

  </div>

</template>

<script>
export default {
  data(){
    return {
      buttonsDisabled: false
    }
  },
  computed: {
    pagination() {
      return this.$store.getters.formattedCoins.pagination
    },
  },
  methods: {
    async nextPage() {
      if (this.buttonsDisabled)
        return
      this.buttonsDisabled = true
      this.$store.dispatch('nextPage')
      this.buttonsDisabled = false
    },
    async prevPage() {
      if (this.buttonsDisabled)
        return
      this.buttonsDisabled = true
      this.$store.dispatch('prevPage')
      this.buttonsDisabled = false
    }
  }
}
</script>