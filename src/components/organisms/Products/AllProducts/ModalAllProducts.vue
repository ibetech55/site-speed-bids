<template>
  <b-modal 
    :id="`modalAllProducts${productData._id}`"
    size="xl"
    centered
    :title="`Detalhes do Produto ${productData.productName}`"
  >
      <div class="col-12 row">
        <div class="col-3">
          <label for="">Nome do Produto</label>
          <input v-model="productData.productName" class="form-control" type="text" readonly>
        </div>

        <div class="col-3">
            <label for="">Preço R$</label>
            <input :value="`R$${productData.price}`" class="form-control" type="text" readonly>
        </div>

          <div class="col-3">
            <label for="">Categoria</label>
            <input v-model="productData.category" class="form-control" type="text" readonly>
          </div>

          <div class="col-3">
            <label for="">Data Adicionado</label>
            <input :value="formatDateTime(productData.endDate)" class="form-control" type="text" readonly>
        </div>
      </div>

      <div class="col-12 mt-3 row">
        <div class="col-3">
          <label for="">Dia Final</label>
          <input :value="formatDateTime(productData.endDate)" class="form-control" type="text" readonly>
        </div>

        <div class="col-3">
            <label for="">Preço R$</label>
            <input v-model="productData.price" class="form-control" type="text" readonly>
        </div>

          <div class="col-3">
            <label for="">Usuário</label>
            <input v-model="productData.user.username" class="form-control" type="text" readonly>
          </div>

          <div class="col-3">
            <label for="">Status do Produto</label>
            <input :value="productData.active ? 'Ativo' : 'Desativado'" class="form-control" type="text" readonly>
        </div>
      </div>

      <template v-slot:modal-footer>
        <button @click="handleStatus" class="btn btn-outline-danger">Desativar Produto</button>
        <button @click="closeModal" class="site-btn btn">Ok</button>
      </template>
  </b-modal>
</template>

<script>
import {mapActions} from 'vuex'
import moment from 'moment';
moment.locale('pt-br');


export default {
    props:['productData', 'userAuth'],

    methods:{
      ...mapActions('Product', ['getAllProductsAdmin', 'productStatus']),
    closeModal() {
      this.$bvModal.hide(`modalAllProducts${this.productData._id}`);
    },
      formatDateTime(time){
        return moment(time).format('DD/MM/YYYY hh:mm')
      },

      async handleStatus(){
        await this.productStatus({
          token:this.userAuth.token,
          productId:this.productData._id,
          active:this.productData.active
        })

        await this.getAllProductsAdmin({
            token:this.userAuth.token,
        })
      }
    }
}
</script>

<style scoped>
  input:read-only{
    background:#fff;
  }
</style>