<template>
  <div class="myProducts">
    <h1 class="text-center">Meus Produtos</h1>
    <div v-if="loading">
      <h1>Carregando...</h1>
    </div>
    <div class="productsContent" v-else>
      <div v-for="(product, i) in products" :key="i" class="productContent border">
        <div class="prdContentImgDiv">
          <img :src="`${imageUrl}/${product.image.defaultImage}`" alt />
        </div>
        <div class="prdContentInfo">
          <div>
            <p class="text-center">
              <span class="font-weight-bold">Nome do Produto:</span>
              {{product.productName}}
            </p>
            <p class="text-center">
              <span class="font-weight-bold">Preço:</span>
              R${{product.price}}
            </p>
            <p class="text-center">
              <span class="font-weight-bold">Status:</span>
              {{product.active ? 'Ativo' : 'Inativo'}}
            </p>
            <div v-if="product.purchaseId">
              <div v-if="product.purchaseId.status === 'Paid'">
                <p class="text-center">
                  <span class="font-weight-bold">Preço com bonus:</span>
                  R${{ formatNumber(product.purchaseId.priceTaxedBonus) }}
                </p>
                <p class="text-center">
                  <span class="font-weight-bold">Bonus:</span>
                  R${{ formatNumber(product.purchaseId.bonus)}}
                </p>
                <p class="text-center">
                  <span class="font-weight-bold">Taxa:</span>
                  R${{ formatNumber(product.purchaseId.tax)}}
                </p>
              </div>
            </div>
            <div class="text-center">
              <button @click="productInfo(product._id)" class="site-btn btn btn-lg">Editar Produto</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    loading:false,
    userAuth: null,
    imageUrl: null,
  }),

  computed: {
    ...mapState("Product", ["products"]),
  },

  methods: {
    ...mapActions("Product", ["getMyProducts"]),

    productInfo(id) {
      this.$router.push(`/my-product/${id}`);
    },

    formatNumber(num) {
      return Number(num).toFixed(2);
    },
  },

  async created() {
    this.loading = true;
    this.userAuth = JSON.parse(localStorage.getItem("_speedbids"));
    await this.getMyProducts({
      id: this.userAuth.userId,
      token: this.userAuth.token,
    });

    this.imageUrl = process.env.VUE_APP_API_IMAGES;
    this.loading = false;
  },
};
</script>

<style>
.productsContent {
  width: 100%;
  padding-top: 20px;
}

.productContent {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prdContentInfo {
  width: 50%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prdContentImgDiv img {
  width: 100%;
  height: 100%;
}

.prdContentImgDiv {
  width: 50%;
  height: 300px;
}
</style>
