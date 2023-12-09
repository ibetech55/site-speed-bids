<template>
  <div>
    <div v-if="loading">
      <h1>Carregando...</h1>
    </div>
    <div v-else class="productDiv">
      <div class="defaultImgDiv">
        <div class="defaultImgDiv2">
          <div class="imgDiv border">
            <img :src="`${imageUrl}/${product.image.defaultImage}`" alt />
            <div v-b-modal="`productImageModal${product._id}`" class="imgOverlayProduct"></div>

            <ProductModal
              :id="product._id"
              :images="product.image.productImages"
              :defaultImage="product.image.defaultImage"
            />
          </div>
          <div class="pt-3">
            <div class="prd-info-div-cust">
              <h1>{{product.productName}}</h1>

              <div class="prd-btns-div">
                <router-link
                  class="site-btn btn btn-lg"
                  :to="`/buy-product/${product._id}`"
                >Comprar Produto</router-link>
              </div>
            </div>
            <h3>Dia da Lança: {{formatProductTime2(product.endDate)}}</h3>
          </div>
          <div class="desc">
            <h2>Preço:${{product.price}}</h2>
            <router-link :to="`/user/${product.user._id}`">{{product.user.username}}</router-link>
            <h2 class for>Descrição</h2>
            <p>{{product.description}}</p>
          </div>
        </div>
      </div>
      <div class="otherImg">
        <h4 class="similarItems">Itens Similares</h4>
        <div
          class="otherProducts border-bottom"
          v-for="(prd, i) in products"
          :key="i"
          @click="viewProduct(prd._id)"
        >
          <div class="imgDiv2">
            <img :src="`${imageUrl}/${prd.image.defaultImage}`" alt />
          </div>
          <div @click="handleSimilarItem(prd._id)">
            <p class="m-0">{{prd.productName}}</p>
            <p class="m-0">R${{prd.price}}</p>
            <p class="m-0">{{prd.user.username}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProductModal from "../Product/ProductModal.vue";
import moment from "moment";
moment.locale("pt-br");

export default {
  data: () => ({
    imageUrl: null,
    loading: false,
  }),

  components: {
    ProductModal,
  },

  computed: {
    ...mapState("Product", ["product", "products"]),
  },

  methods: {
    ...mapActions("Product", ["getProduct", "getSimilarProducts"]),
    handleSimilarItem(id){
      this.loading = true;
      this.$router.push(`/product/${id}`);
      this.loading = false;
    },

    formatProductTime2(time) {
      return moment(time).format("lll");
    },
    async viewProduct(id) {
      await this.getProduct({ id });

      await this.$router.push(`/product/${id}`);

      await this.getSimilarProducts({
        id: this.$route.params.id,
        category: this.product.category,
      });
    },
  },

  async created() {
    this.loading = true;

    await this.getProduct({ id: this.$route.params.id });

    await this.getSimilarProducts({
      id: this.$route.params.id,
      category: this.product.category,
    });
    this.imageUrl = process.env.VUE_APP_API_IMAGES;
    this.loading = false;
  },
};
</script>

<style>
h3 {
  font-weight: 100;
}
.productDiv {
  display: flex;
  justify-content: center;
}
.defaultImgDiv {
  width: 70%;
  padding-top: 20px;
  margin-right: 20px;
}

.imgDiv {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

.imgDiv img {
  width: 100%;
  height: 100%;
}

.imgDiv:hover {
  cursor: pointer;
}

.imgDiv:hover > .imgOverlayProduct {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.defaultImgDiv2 {
  width: 100%;
  height: 500px;
  margin: 0 auto;
}

.otherImg {
  width: 30%;
  /* padding-top: 20px; */
}

.otherProducts {
  width: 100%;
  /* height: 150px; */
  display: flex;
  padding: 20px 0;
}

.otherProducts:first-child {
  border-top: 1px solid #e6e6e6;
}

.otherProducts:hover {
  cursor: pointer;
}

.imgDiv2 {
  width: 25%;
  height: 100px;
  margin-right: 10px;
}

.imgDiv2 img {
  width: 100%;
  height: 100%;
}

.desc h2 {
  font-weight: 300;
}

.similarItems {
  margin-bottom: 0;
  margin-top: 20px;
  font-weight: 300;
}

.prd-info-div-cust{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>