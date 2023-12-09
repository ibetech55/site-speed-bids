<template>
  <div>
    <h1 class="text-center">Lance um Preço</h1>
    <div class="productSection border mb-4">
      <div class="prdImgDiv">
        <img
          :src="`${imageUrl}/${product.image.defaultImage}`"
          alt=""
        >
      </div>

      <div class="productInfo">
        <div>
          <p class="m-0"><span>Nome do Produto:</span> {{product.productName}}</p>
          <p class="m-0"><span>Vendador:</span> {{product.user.username}}</p>
          <p class="m-0"><span>Preço Inicial:</span> R${{product.price}}</p>
          <p class="m-0"><span>Preço Atual:</span> R${{buyers.currentPrice}}</p>
          <p class="m-0"><span>Dia Adicionado: </span> {{formatDate(product.createdAt)}}</p>
          <p
            class="m-0"
            v-if="buyers.bidType === 'Standard'"
          ><span>Dia de Lance: </span> {{formatDateTime(product.endDate)}}</p>
          <p
            v-if="buyers.bidType === 'Live'"
            class="m-0"
          ><span>Live:</span> {{formatDateTime(product.endDate)}}</p>
        </div>

      </div>
    </div>

    <div
      v-if="product.user._id !== userAuth.userId"
      class="form-group priceInput"
    >
      <div v-if="buyers.bidType === 'Standard'">
        <label for="">Lançar um Preço: </label>
        <input
          class="form-control"
          type="text"
          v-model="placePrice"
        >
        <button
          @click="handlePrice"
          class="site-btn btn"
        >Lançar Preço</button>
      </div>

      <div v-if="buyers.bidType === 'Live'">
        <button
          @click="handleLiveBid"
          class="site-btn btn btn-lg"
        >Participe do Live</button>
      </div>
      <p class="text-danger text-center">{{this.error.liveBidder}}</p>
      <p class="text-danger">{{this.error.price}}</p>
    </div>

    <div class="priceSection">
      <div
        v-for="(buyer, i) in buyers.prices"
        :key="i"
        class="priceCard border"
      >
        <p class="m-0"><span>Usuário:</span> {{buyer.buyerId.username}}</p>
        <p class="m-0"><span>Licitação:</span> ${{buyer.price}}</p>
        <p class="m-0"><span>Data Adicionado: </span> {{formatDateTime(buyer.dateAdded)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import swal from 'sweetalert2';
import moment from 'moment';
moment.locale('pt-br');

export default {
  data: () => ({
    userAuth: null,
    placePrice: null,
    productId: null,
    imageUrl: null,
    error: {},
  }),

  computed: {
    ...mapState('Product', ['product']),
    ...mapState('Buyer', ['buyers', 'addedPrice']),
  },

  methods: {
    ...mapActions('Product', ['getProduct']),
    ...mapActions('Buyer', ['getBuyers', 'addPrice', 'addLiveBidder']),

    async handleLiveBid() {
      try {
        await this.addLiveBidder({
          token: this.userAuth.token,
          data: {
            userId: this.userAuth.userId,
            buyerId: this.buyers._id,
          },
        });

        swal.fire('Você foi adicionado a este lance', '', 'success');
      } catch (err) {
        this.error = err.response.data;
      }
    },
    formatDate(time) {
      return moment(time).format('DD/MM/YYYY');
    },

    formatDateTime(time) {
      return moment(time).format('DD/MM/YYYY HH:mm');
    },

    async handlePrice() {
      try {
        await this.addPrice({
          token: this.userAuth.token,
          id: this.productId,
          data: {
            price: this.placePrice,
            userId: this.userAuth.userId,
          },
        });

        swal.fire('Preço Atualizado', `${this.addedPrice}`, 'success');
        await this.getBuyers({
          id: this.productId,
          token: this.userAuth.token,
        });

        this.placePrice = null;
        this.error = {};
      } catch (err) {
        this.error = err.response.data;
      }
    },
  },

  async created() {
    this.imageUrl = process.env.VUE_APP_API_IMAGES;
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    this.productId = this.$route.params.id;
    await this.getProduct({ id: this.productId });
    await this.getBuyers({
      id: this.productId,
      token: this.userAuth.token,
    });
  },
};
</script>

<style scoped>
.priceSection {
  width: 50%;
  margin: 0 auto;
}

.priceCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}

span {
  font-weight: bold;
}

.prdImgDiv {
  width: 400px;
  height: 400px;
  background: gray;
  margin: 0 auto;
}

.prdImgDiv img {
  width: 100%;
  height: 100%;
}

.productSection {
  width: 50%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 20px 0 10px 0;
}

.productInfo {
  line-height: 2em;
  width: 400px;
  margin: 0 auto;
}

.productInfo div {
  width: 50%;
  margin: 0 auto;
}

.priceInput {
  width: 50%;
  margin: 40px auto;
}

.priceInput div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.priceInput input {
  width: 55%;
  margin-left: 10px;
  margin-right: 10px;
}

.priceInput p {
  width: 75%;
  margin: 0 auto;
  text-align: left;
}
</style>