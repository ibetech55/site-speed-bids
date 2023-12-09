<template>
  <div>
    <h1 class="text-center">Compras {{user.firstname}} {{user.lastname}}</h1>
    <div class="myTable">
      <b-table
        class="mt-3"
        striped
        :fields="fields"
        :items="items"
        responsive
      >

        <template v-slot:cell(price)="row">
          <span class="align-middle">R${{row.item.price}}</span>
        </template>

        <template v-slot:cell(createdAt)="row">
          <span class="align-middle">{{formatDate(row.item.createdAt)}}</span>
        </template>

        <template v-slot:cell(status)="row">
          <span :class="row.item.status === 'Pending' ? 'pending' : 'paid' ">{{row.item.status === 'Pending' ? 'Pendente' : 'Pago'}}</span>
        </template>

        <template v-slot:cell(options)="row">
          <button
            class="site-btn btn mr-3"
            v-b-modal="`ModalProductInfo${row.item._id}`"
          >Produto</button>
          
          <button
            v-if="row.item.status === 'Pending'"
            @click="checkout(row.item)"
            class="site-btn btn"
          >Checkout</button>
          <ModalProductInfo
            :id="row.item._id"
            :items="row.item"
          />
        </template>
      </b-table>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalProductInfo from './ModalProductInfo';
import moment from 'moment';
moment.locale('pt-br');

export default {
  components: {
    ModalProductInfo,
  },

  data: () => ({
    userAuth: null,
    fields: [
      {
        key: 'product.productName',
        label: 'Nome do Produto',
        class: 'align-middle',
      },
      { key: 'price', label: 'Preço' },
      { key: 'createdAt', label: 'Data' },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'options', label: 'Opções' },
    ],
    items: null,
  }),

  computed: {
    ...mapState('Purchase', ['purchases']),
    ...mapState('User', ['user']),
  },

  methods: {
    ...mapActions('Purchase', ['getPurchases']),
    ...mapActions('User', ['getUser']),

    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    },

    checkout(data) {
      this.$router.push({
        name: 'checkout',
        params: { purchaseData: data },
      });
    },
  },

  async created() {
    this.userAuth = JSON.parse(localStorage.getItem('_speedbids'));

    if(this.$route.params.id){
      if(this.userAuth.username !== 'pibewiro'){
        this.$router.push('/dashboard')
      }

      else{

        this.getUser({id:this.$route.params.id})
          await this.getPurchases({
        token: this.userAuth.token,
        userId: this.$route.params.id
      });
      }

    }
    else{
      this.getUser({id:this.userAuth.userId})
      await this.getPurchases({
        token: this.userAuth.token,
        userId: this.userAuth.userId
      });
    }


    this.items = this.purchases;
  },
};
</script>

<style>
.pending,
.paid {
  display: block;
  font-weight: bold;
  color: #fff;
  padding: 0;
  width: 80px;
  border-radius: 5px;
  text-align: center;
  padding: 2px 0;
  margin-top: 3px;
}

.pending {
  background: red;
}

.paid {
  background: var(--primaryColor);
}

.info {
  display: flex;
}

.myTable {
  width: 100%;
  margin: 0 auto;
}
</style>