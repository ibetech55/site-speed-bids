<template>
  <b-modal
    :id="`ModalProductInfo${id}`"
    centered
    size="xl"
    title="Informação do Produto"
  >
    <div class="productData">
      <div class="pd1">
        <div class="pd1-img-div">
          <img
            :src="`${imageUrl}/${items.product.image.defaultImage}`"
            alt=""
          >
        </div>
      </div>
      <div class="pd2">
        <div class="pd2-data">
          <p><span>Produto:</span> {{items.product.productName}}</p>
          <p><span>Data do pagamento:</span> {{items.datePaid ? formatDate(items.datePaid) : null}}</p>
          <p><span>Dono:</span> {{items.owner.username}}</p>
          <p><span>Preço Original:</span> R${{items.product.price}}</p>
          <p><span>Data de Publicação:</span> {{ formatDate(items.product.createdAt)}}</p>
          <p><span>Preço:</span> R${{items.price}}</p>
          <p><span>Data Oferecido:</span> {{ formatDate(items.createdAt)}}</p>
          <p><span>Status:</span> {{items.status === 'Paid' ? 'Pago' : 'Pendente'}}</p>
        </div>
      </div>
    </div>

    <template v-slot:modal-footer>
      <button
        @click="handleDownload"
        v-if="items.status === 'Paid'"
        class="site-btn btn btn-lg"
      >Baixar Recibo</button>

      <button
        @click="closeModal"
        class="site-btn btn btn-lg"
      >Fechar</button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
moment.locale('pt-br');

export default {
  props: ['id', 'items'],
  data: () => ({
    imageUrl: null,
    userAuth: null,
  }),

  methods: {
    ...mapActions('Purchase', ['downloadReciept']),

    handleDownload() {
      this.downloadReciept({
        token: this.userAuth.token,
        purchaseId: this.id,
      });
    },

    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },

    closeModal() {
      this.$bvModal.hide(`ModalProductInfo${this.id}`);
    },
  },

  created() {
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));
    this.imageUrl = process.env.VUE_APP_API_IMAGES;
  },
};
</script>

<style scoped>
.productData {
  width: 100%;
  display: flex;
  justify-content: center;
}

.pd1 {
  width: 50%;
  text-align: right;
}

.pd1-img-div {
  width: 80%;
  height: 350px;
  float: right;
}

.pd1-img-div img {
  width: 100%;
  height: 100%;
}

.pd2 {
  width: 50%;
}

.pd2-data {
  line-height: 2em;
  padding: 10px 0 0 10px;
  font-size: 16px;
}

.pd2-data p {
  margin: 0;
}

.pd2-data span {
  font-weight: bold;
}
</style>