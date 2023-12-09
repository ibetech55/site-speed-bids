<template>
  <div>
    <h1 class="text-center mt-5 mb-5">Sucesso de Pagamento</h1>
    <div class="text-center">
      <h1 class="mb-5">Obrigado por comprar em speedbuyer.com.</h1>
      <h2 class="mb-5">Seu produto chegará em breve.</h2>
      <div class="text-center">
        <router-link
          to="/purchases"
          class="site-btn btn btn-lg"
        >Retornar ao Site</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    userAuth: null,
  }),

  methods: {
    ...mapActions('Purchase', ['updatePurchase']),
  },
  async created() {
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    this.updatePurchase({
      token: this.userAuth.token,
      purchaseId: this.$route.params.purchaseId,
    });
  },
};
</script>

<style scoped>
h2 {
  font-weight: 100;
}
</style>