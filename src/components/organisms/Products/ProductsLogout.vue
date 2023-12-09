<template>
  <div>
    <Navbar2 />
    <h1 class="text-center mt-4">Produtos</h1>
    <div class="products-grid p-4">
      <div v-for="(product, i) in productsLogout" :key="i">
        <div class="pg-img">
          <img :src="`${imageUrl}/${product.image.defaultImage}`" alt="">
        </div>
        <div class="border p-3">
          <p><span class="font-weight-bold">Nome:</span> {{product.productName}}</p>
          <p><span class="font-weight-bold">Preço:</span> R${{product.price}}</p>
          <p><span class="font-weight-bold">Categoria:</span> {{product.category}}</p>
          <p class="m-0"><span class="font-weight-bold">Carregado:</span> {{ formatDate(product.createdAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Navbar2 from '../../template/Navbar'
import moment from 'moment';
moment.locale('pt-br');

export default {
  components:{
    Navbar2,
  },

  computed:{
    ...mapState('Product',  ['productsLogout'])
  },

  data:()=>({
    imageUrl:null,
  }),

  methods:{
    ...mapActions('Product', ['getProductsLogout']),

    formatDate(date){
       return moment(date).format('DD/MM/YYYY hh:mm'); 
    }
  },
  
  mounted(){
    this.imageUrl = process.env.VUE_APP_API_IMAGES;
  },

  created(){
    this.getProductsLogout();
  }
};
</script>

<style>
.products-grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 30px;
}

.pg-img{
  height: 250px;
  background: gray;
}

.pg-img img{
  height: 100%;
  width:100%;
}
</style>