<template>
  <div>
    <h1 class="mt-4 text-center">Check Out</h1>
    <div class="checkout border">
      <div class="checkout-section">
        <div class="cs1">
          <div class="cs1-img-div">
            <img
              :src="`${imageUrl}/${purchaseData.product.image.defaultImage}`"
              alt=""
            >
          </div>
        </div>
        <div class="cs2">
          <div>
            <p><span>Produto:</span> {{purchaseData.product.productName}}</p>
            <p><span>Preço:</span> R${{purchaseData.price}}</p>
            <p><span>Dono:</span> {{purchaseData.owner.firstname}} {{purchaseData.owner.lastname}}</p>
            <p><span>Comprador:</span> {{purchaseData.user.firstname}} {{purchaseData.user.lastname}}</p>
          </div>
        </div>
      </div>

      <div class="btn-cs-div">
        <button
          @click="handleCheckout"
          class="site-btn btn btn-lg"
        >Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
let stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
export default {
  computed: {
    ...mapState('Purchase', ['session']),
  },

  data: () => ({
    purchaseData: null,
    imageUrl: null,
    userAuth: null,
  }),

  methods: {
    ...mapActions('Purchase', ['checkout']),

    async handleCheckout() {
      stripe.redirectToCheckout({
        sessionId: this.session.id,
      });
    },
  },

  async created() {
    this.purchaseData = this.$route.params.purchaseData;
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    this.imageUrl = process.env.VUE_APP_API_IMAGES;

    await this.checkout({
      token: this.userAuth.token,
      purchaseId: this.purchaseData._id,
    });

    if (!this.purchaseData) {
      this.$router.push('/');
    }
  },
};
</script>

<style>
.checkout {
  width: 60%;
  margin: 0 auto;
  padding: 20px 20px 0 20px;
}
.checkout-section {
  display: flex;
  justify-content: center;
}

.cs1 {
  width: 50%;
}

.cs2 {
  width: 50%;
}

.cs2 p {
  margin: 0;
}

.cs2 span {
  font-weight: bold;
}
.cs2 div {
  font-size: 16px;
  padding: 10px 0 0 10px;
  line-height: 2em;
}
.cs1-img-div {
  width: 80%;
  height: 350px;
  float: right;
}

.cs1-img-div img {
  width: 100%;
  height: 100%;
}

.btn-cs-div {
  text-align: center;
  padding: 10px;
  margin: 0;
}
</style>