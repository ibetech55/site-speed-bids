<template>
  <div>
      <h1 class="text-center mb-3">Todos os Produtos</h1>
      <div class="mb-3">
        <label class="mr-2" for="">Filtro por Email: </label>
        <div class="form-inline">
            <input @keydown="filterEmail" type="text" class="form-control mr-2" v-model="productFilter">
        </div>
      </div>
      <div class="all-products">
          <b-table
          responsive
          :fields="fields"
          :items="products"
          >
            <template v-slot:cell(price)="row">
                <span> R${{row.item.price}}</span>         
            </template>

            <template v-slot:cell(user)="row">
                <span>{{row.item.user.email}}</span>         
            </template>

            <template v-slot:cell(createdAt)="row">
                <span>{{formatDateTime(row.item.createdAt)}}</span>         
            </template>

            <template v-slot:cell(active)="row">
                <span> {{row.item.active ? 'Ativo' : 'Desativado'}}</span>         
            </template>

            <template v-slot:cell(options)="row">
                <button v-b-modal="`modalAllProducts${row.item._id}`" class="site-btn btn">Detalhes</button>
                <ModalAllProducts :productData="row.item" :userAuth="userAuth" />
            </template>
          </b-table>
      </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ModalAllProducts from './ModalAllProducts';
import moment from 'moment';
moment.locale('pt-BR');

export default {
    components:{
        ModalAllProducts
    },

    data:()=>({
        userAuth:null,
        items:null,
        productFilter:null,
        fields:[
            {key:'productName', label:'Nome do Produto', sortable:true},
            {key:'user', label:'Email do Usuário', sortable:true},
            {key:'price', label:'Preço', sortable:true},
            {key:'category', label:'Categoria', sortable:true},
            {key:'createdAt', label:'Data Adicionado', sortable:true},
            {key:'active', label:'Status', sortable:true},
            {key:'options', label:'Opções'},
        ]
    }),

    computed:{
    ...mapState('Product', ['products'])
    },

    methods:{
        ...mapActions('Product', ['getAllProductsAdmin']),

        formatDateTime(time){
            return moment(time).format('DD/MM/YYYY hh:mm')
        },

        filterEmail(){
            setTimeout(async ()=>{
            await this.getAllProductsAdmin({
            token:this.userAuth.token,
            productFilter:this.productFilter
            })
            }, 1000)
        }
    },

    async created(){
        this.userAuth = JSON.parse(localStorage.getItem('_speedbids'))
        await this.getAllProductsAdmin({
            token:this.userAuth.token,
        })
    }
}
</script>

<style>

</style>